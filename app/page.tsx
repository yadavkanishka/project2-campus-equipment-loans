
import Link from "next/link";

// Equipment card information.
interface EquipmentCardProps {
  icon: string;
  name: string;
  description: string;
  category: string;
}

// Reusable equipment card component.
function EquipmentCard({
  icon,
  name,
  description,
  category,
}: EquipmentCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-3xl">
        {icon}
      </div>

      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
        {category}
      </p>

      <h3 className="mb-2 text-lg font-bold text-slate-900">{name}</h3>

      <p className="text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

// Homepage.
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation */}
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-900 text-xl text-white">
              AV
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Campus Equipment
              </h1>
              <p className="text-xs text-slate-500">
                AV & Equipment Loans
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <Link href="/" className="text-blue-800">
              Home
            </Link>
            <Link href="#equipment" className="hover:text-blue-800">
              Equipment
            </Link>
            <Link href="#how-it-works" className="hover:text-blue-800">
              How It Works
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 sm:block"
            >
              Staff Login
            </Link>

            <Link
              href="/request"
              className="rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Request Equipment
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero section */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800">
              <span className="h-2 w-2 rounded-full bg-blue-600"></span>
              Campus equipment made accessible
            </div>

            <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-5xl">
              The equipment you need, when you need it.
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              Browse available campus AV equipment, submit a loan request,
              and keep track of your equipment loan in one convenient place.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/request"
                className="rounded-lg bg-blue-900 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                Request Equipment →
              </Link>

              <Link
                href="#equipment"
                className="rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Browse Equipment
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-8 border-t border-slate-200 pt-7">
              <div>
                <p className="text-2xl font-bold text-slate-900">Easy</p>
                <p className="mt-1 text-sm text-slate-500">
                  Online requests
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900">Clear</p>
                <p className="mt-1 text-sm text-slate-500">
                  Request tracking
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900">Simple</p>
                <p className="mt-1 text-sm text-slate-500">
                  Loan management
                </p>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="rounded-3xl bg-blue-950 p-8 text-white shadow-xl md:p-12">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-200">
                    CAMPUS AV SERVICES
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">
                    Equipment Loans
                  </h3>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                  🎓
                </div>
              </div>

              <div className="my-10 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/10 p-5">
                  <span className="text-4xl">📽️</span>
                  <p className="mt-4 font-semibold">Projectors</p>
                  <p className="mt-1 text-sm text-blue-200">
                    Presentation equipment
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-5">
                  <span className="text-4xl">🎤</span>
                  <p className="mt-4 font-semibold">Microphones</p>
                  <p className="mt-1 text-sm text-blue-200">
                    Audio equipment
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-5">
                  <span className="text-4xl">📷</span>
                  <p className="mt-4 font-semibold">Cameras</p>
                  <p className="mt-1 text-sm text-blue-200">
                    Photography equipment
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-5">
                  <span className="text-4xl">💻</span>
                  <p className="mt-4 font-semibold">Laptops</p>
                  <p className="mt-1 text-sm text-blue-200">
                    Computing equipment
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/10 p-4">
                <p className="text-sm text-blue-100">
                  One place to manage your campus equipment loans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment section */}
      <section id="equipment" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-800">
              Equipment catalogue
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Explore campus equipment
            </h2>

            <p className="mt-3 max-w-xl text-slate-600">
              Browse some of the equipment categories available for campus
              activities, presentations, and events.
            </p>
          </div>

          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800">
            Equipment preview
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <EquipmentCard
            icon="📽️"
            name="HDMI Projector"
            category="Presentation"
            description="Projection equipment for classroom presentations and campus events."
          />

          <EquipmentCard
            icon="🎤"
            name="Wireless Microphones"
            category="Audio"
            description="Wireless audio equipment for lectures, meetings, and events."
          />

          <EquipmentCard
            icon="📷"
            name="Tripod + DSLR Camera"
            category="Photography"
            description="Camera equipment for campus photography and recording activities."
          />

          <EquipmentCard
            icon="💻"
            name="Laptop Cart"
            category="Computing"
            description="Laptop equipment for classroom activities and group learning."
          />

          <EquipmentCard
            icon="🔊"
            name="Portable PA Speaker"
            category="Audio"
            description="Portable sound equipment for presentations and campus gatherings."
          />

          <EquipmentCard
            icon="📡"
            name="Zoom Conference Kit"
            category="Conference"
            description="Conference equipment for online and hybrid meetings."
          />

          <EquipmentCard
            icon="📋"
            name="Whiteboard on Wheels"
            category="Classroom"
            description="Mobile whiteboard for teaching, brainstorming, and collaboration."
          />

          <EquipmentCard
            icon="🔌"
            name="Extension Cords"
            category="Accessories"
            description="Power accessories for classroom and event equipment setups."
          />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-800">
              Simple process
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              How equipment loans work
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Follow these steps to request and manage campus equipment.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                📝
              </div>
              <p className="mt-5 text-sm font-bold text-blue-800">
                STEP 01
              </p>
              <h3 className="mt-2 text-xl font-bold">Submit a request</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Choose the equipment, provide your details, and select your
                required loan dates.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                ✅
              </div>
              <p className="mt-5 text-sm font-bold text-blue-800">
                STEP 02
              </p>
              <h3 className="mt-2 text-xl font-bold">Wait for a decision</h3>
              <p className="mt-3 leading-7 text-slate-600">
                The Coordinator reviews your request and confirms whether it
                can be approved.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                📦
              </div>
              <p className="mt-5 text-sm font-bold text-blue-800">
                STEP 03
              </p>
              <h3 className="mt-2 text-xl font-bold">Collect and return</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Collect your approved equipment from Depot Staff and return
                it when your loan period ends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-blue-950 px-6 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">
          Ready to request campus equipment?
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-blue-100">
          Start your equipment loan request and keep track of its progress
          online.
        </p>

        <Link
          href="/request"
          className="mt-8 inline-block rounded-lg bg-white px-7 py-3.5 font-semibold text-blue-950 transition hover:bg-blue-50"
        >
          Start a Request →
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 px-6 py-8 text-center text-sm text-slate-400">
        <p className="font-semibold text-white">
          Campus AV & Equipment Loans
        </p>
        <p className="mt-2">
          Campus equipment loan management system
        </p>
        <p className="mt-4">
          © 2026 Campus AV & Equipment Loans. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
