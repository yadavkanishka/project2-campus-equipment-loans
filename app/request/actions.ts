"use server";

import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import db from "@/lib/db";
import type { LoanRequestInput } from "@/lib/types";

export async function submitLoanRequest(data: LoanRequestInput) {
  // Validate the submitted information on the server.
  if (
    data.requesterName.trim().length < 2 ||
    !data.department.trim() ||
    !Number.isInteger(data.equipmentId) ||
    data.equipmentId < 1 ||
    !Number.isInteger(data.quantity) ||
    data.quantity < 1 ||
    data.purpose.trim().length < 10 ||
    !data.neededFrom ||
    !data.neededUntil ||
    data.neededFrom < new Date().toLocaleDateString("en-CA") ||
    data.neededUntil < data.neededFrom
  ) {
    return {
      success: false,
      message: "Please check your information and try again.",
    };
  }

  // Confirm that the selected equipment exists and is active.
  const selectedEquipment = db
    .prepare(
      "SELECT id FROM equipment WHERE id = ? AND is_active = 1"
    )
    .get(data.equipmentId);

  if (!selectedEquipment) {
    return {
      success: false,
      message: "The selected equipment is unavailable.",
    };
  }

  // Generate a unique tracking code.
  const trackingCode = `LOAN-${randomBytes(4).toString("hex").toUpperCase()}`;

  try {
    db.prepare(
      `INSERT INTO loan_requests (
        tracking_code,
        requester_name,
        department,
        equipment_id,
        quantity,
        purpose,
        needed_from,
        needed_until,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      trackingCode,
      data.requesterName.trim(),
      data.department.trim(),
      data.equipmentId,
      data.quantity,
      data.purpose.trim(),
      data.neededFrom,
      data.neededUntil,
      "Pending"
    );

    revalidatePath("/");

    return {
      success: true,
      message: "Your request was submitted successfully.",
      trackingCode,
    };
  } catch {
    return {
      success: false,
      message: "We could not save your request. Please try again.",
    };
  }
}