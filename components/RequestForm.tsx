"use client";

import { useState } from "react";
import type { Equipment } from "@/lib/equipment";
import type { LoanRequestInput } from "@/lib/types";
import { submitLoanRequest } from "@/app/request/actions";

interface RequestFormProps {
  equipment: Equipment[];
}

export default function RequestForm({ equipment }: RequestFormProps) {
  const [formData, setFormData] = useState<LoanRequestInput>({
    requesterName: "",
    department: "",
    equipmentId: 0,
    quantity: 1,
    purpose: "",
    neededFrom: "",
    neededUntil: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [trackingCode, setTrackingCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
  
    const newErrors: Record<string, string> = {};
  
    if (formData.requesterName.trim().length < 2) {
      newErrors.requesterName = "Please enter your full name.";
    }
  
    if (!formData.department.trim()) {
      newErrors.department = "Please enter your department.";
    }
  
    if (formData.equipmentId === 0) {
      newErrors.equipmentId = "Please select equipment.";
    }
  
    if (!Number.isInteger(formData.quantity) || formData.quantity < 1) {
      newErrors.quantity = "Quantity must be a positive whole number.";
    }
  
    if (formData.purpose.trim().length < 10) {
      newErrors.purpose = "Please provide at least 10 characters explaining the purpose.";
    }
  
    const today = new Date().toLocaleDateString("en-CA");
  
    if (!formData.neededFrom) {
      newErrors.neededFrom = "Please select a start date.";
    } else if (formData.neededFrom < today) {
      newErrors.neededFrom = "The start date cannot be in the past.";
    }
  
    if (!formData.neededUntil) {
      newErrors.neededUntil = "Please select an end date.";
    } else if (formData.neededUntil < formData.neededFrom) {
      newErrors.neededUntil = "The end date must be on or after the start date.";
    }
  
    setErrors(newErrors);
    setSubmissionMessage("");
    setTrackingCode("");
  
    if (Object.keys(newErrors).length > 0) return;
  
    setIsSubmitting(true);
  
    try {
      const result = await submitLoanRequest(formData);
      setSubmissionMessage(result.message);
  
      if (result.success && result.trackingCode) {
        setTrackingCode(result.trackingCode);
      }
    } catch {
      setSubmissionMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block font-medium text-slate-800">
          Your Name
        </label>
        <input
          type="text"
          value={formData.requesterName}
          onChange={(event) =>
            setFormData({ ...formData, requesterName: event.target.value })
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-800">
          Department
        </label>
        <input
          type="text"
          value={formData.department}
          onChange={(event) =>
            setFormData({ ...formData, department: event.target.value })
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
          placeholder="Enter your department"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-800">
          Equipment
        </label>
        <select
          value={formData.equipmentId}
          onChange={(event) =>
            setFormData({ ...formData, equipmentId: Number(event.target.value) })
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        >
          <option value={0}>Select equipment</option>
          {equipment.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-800">
          Quantity
        </label>
        <input
          type="number"
          min="1"
          value={formData.quantity}
          onChange={(event) =>
            setFormData({ ...formData, quantity: Number(event.target.value) })
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-800">
          Purpose of Request
        </label>
        <textarea
          value={formData.purpose}
          onChange={(event) =>
            setFormData({ ...formData, purpose: event.target.value })
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
          rows={4}
          placeholder="Explain why you need this equipment"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-800">
          Needed From
        </label>
        <input
          type="date"
          value={formData.neededFrom}
          onChange={(event) =>
            setFormData({ ...formData, neededFrom: event.target.value })
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-800">
          Needed Until
        </label>
        <input
          type="date"
          value={formData.neededUntil}
          onChange={(event) =>
            setFormData({ ...formData, neededUntil: event.target.value })
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        />
      </div>
        
        {Object.keys(errors).length > 0 && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="mb-2 font-semibold text-red-800">
                Please correct the following errors:
                </p>

                <ul className="list-inside list-disc space-y-1 text-sm text-red-700">
                {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
                </ul>
            </div>
            )}
        {submissionMessage && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="font-semibold text-green-800">
                {submissionMessage}
                </p>

                {trackingCode && (
                <p className="mt-2 text-sm text-green-800">
                    Your tracking code: <strong>{trackingCode}</strong>
                </p>
                )}
            </div>
            )}

        <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
            {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
    </form>
  );
}