
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface TrackingPageProps {
  params: Promise<{
    trackingCode: string;
  }>;
}

interface LoanRequest {
  tracking_code: string;
  requester_name: string;
  equipment_name: string;
  quantity: number;
  needed_from: string;
  needed_until: string;
  status: string;
  decision_reason: string | null;
}

// Pre-generate pages for the 10 most recent requests.
export async function generateStaticParams() {
  const requests = db
    .prepare(
      `SELECT tracking_code
       FROM loan_requests
       ORDER BY created_at DESC
       LIMIT 10`
    )
    .all() as { tracking_code: string }[];

  return requests.map((request) => ({
    trackingCode: request.tracking_code,
  }));
}

// Display a loading message while request details are prepared.
export default function TrackingPage({ params }: TrackingPageProps) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 p-16 text-center">
          Loading request status...
        </main>
      }
    >
      <TrackingDetails params={params} />
    </Suspense>
  );
}

// Retrieve and display the request details.
async function TrackingDetails({ params }: TrackingPageProps) {
  const { trackingCode } = await params;

  const request = db
    .prepare(
      `SELECT
        lr.tracking_code,
        lr.requester_name,
        e.name AS equipment_name,
        lr.quantity,
        lr.needed_from,
        lr.needed_until,
        lr.status,
        lr.decision_reason
      FROM loan_requests lr
      JOIN equipment e ON lr.equipment_id = e.id
      WHERE lr.tracking_code = ?`
    )
    .get(trackingCode) as LoanRequest | undefined;

  if (!request) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wider text-blue-800">
          Campus AV Services
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          Request Status
        </h1>

        <p className="mt-3 text-slate-600">
          Tracking code: <strong>{request.tracking_code}</strong>
        </p>

        <div className="mt-8 space-y-4">
          <p><strong>Requester:</strong> {request.requester_name}</p>
          <p><strong>Equipment:</strong> {request.equipment_name}</p>
          <p><strong>Quantity:</strong> {request.quantity}</p>
          <p><strong>Needed From:</strong> {request.needed_from}</p>
          <p><strong>Needed Until:</strong> {request.needed_until}</p>
          <p><strong>Current Status:</strong> {request.status}</p>

          {request.decision_reason && (
            <p>
              <strong>Coordinator's Reason:</strong>{" "}
              {request.decision_reason}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
