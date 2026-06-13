import { useState } from "react";
import SummaryCards from "../components/SummaryCards";
import UploadSection from "../components/UploadSection";
import RiskTable from "../components/RiskTable";
import RiskChart from "../components/RiskChart";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [results, setResults] = useState([]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Background Effects */}

      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl" />

      </div>

      {/* Navbar */}

      <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-slate-800 bg-slate-950/80">

        <div className="max-w-7xl mx-auto px-8">

          <div className="h-20 flex items-center justify-between">

            <div>

              <h1 className="text-2xl font-bold tracking-tight">
                MuleShield AI
              </h1>

              <p className="text-sm text-slate-400">
                Fraud Intelligence Platform
              </p>

            </div>

            <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">

              <span>Risk Monitoring</span>

              <span>Investigation Queue</span>

              <span>Analytics</span>

            </div>

          </div>

        </div>

      </nav>

      {/* Main Content */}

      <main className="relative max-w-7xl mx-auto px-8 py-10">

        {/* Hero Section */}

        <section className="mb-12">

          <div className="max-w-4xl">

            <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300 mb-6">
              AI-Powered Fraud Detection
            </div>

            <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tight">

              Mule Account

              <span className="block text-blue-400">
                Command Center
              </span>

            </h1>

            <p className="mt-6 text-lg text-slate-400 max-w-3xl leading-relaxed">

              Detect suspicious mule accounts, analyze transaction
              patterns, and prioritize investigations using machine
              learning-based risk scoring.

            </p>

          </div>

        </section>

        {/* Upload Section */}

        <section className="mb-10">

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8">

            <UploadSection
              setSummary={setSummary}
              setResults={setResults}
            />

          </div>

        </section>

        {/* Risk Overview */}

        {summary && (
          <section className="mb-10">

            <div className="mb-5">

              <h2 className="text-2xl font-semibold">
                Risk Overview
              </h2>

              <p className="text-slate-400 mt-1">
                Real-time insights generated from uploaded transaction data.
              </p>

            </div>

            <SummaryCards summary={summary} />

          </section>
        )}

        {/* Risk Distribution Chart */}

        {summary && (
          <section className="mb-10">

            <RiskChart summary={summary} />

          </section>
        )}

        {/* Investigation Queue */}

        {results.length > 0 && (
          <section>

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-semibold">
                  Investigation Queue
                </h2>

                <p className="text-slate-400 mt-1">
                  Accounts prioritized based on predicted fraud risk.
                </p>

              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-300">

                {results.length} Records Analyzed

              </div>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6">

              <RiskTable results={results} />

            </div>

          </section>
        )}

      </main>

    </div>
  );
}

export default Dashboard;