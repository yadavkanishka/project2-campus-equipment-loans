
import { getActiveEquipment } from "@/lib/equipment";
import RequestForm from "@/components/RequestForm";

// Public equipment request page.
export default async function RequestPage() {
  const equipment = await getActiveEquipment();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wider text-blue-800">
          Campus AV Services
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          Request Equipment
        </h1>

        <p className="mt-4 leading-7 text-slate-600">
          Complete the form below to request campus equipment.
          Your request will be reviewed by the Equipment Coordinator.
        </p>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <RequestForm equipment={equipment} />
        </div>
      </div>
    </main>
  );
}
