function getBadgeStyle(level) {
  switch (level) {
    case "Critical":
      return "bg-red-500/15 text-red-400 border border-red-500/20";

    case "High":
      return "bg-orange-500/15 text-orange-400 border border-orange-500/20";

    case "Medium":
      return "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20";

    default:
      return "bg-green-500/15 text-green-400 border border-green-500/20";
  }
}

function RiskTable({ results }) {
  if (!results.length) return null;

  return (
    <div>

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold">
            Investigation Queue
          </h2>

          <p className="text-slate-400 mt-1">
            Accounts ranked by predicted fraud risk.
          </p>

        </div>

        <div className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-sm text-slate-300">
          Top 25 Results
        </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/40">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-800 bg-slate-900/50">

              <th className="text-left px-6 py-5 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Account ID
              </th>

              <th className="text-left px-6 py-5 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Risk Score
              </th>

              <th className="text-left px-6 py-5 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Risk Level
              </th>

              <th className="text-left px-6 py-5 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Priority
              </th>

            </tr>

          </thead>

          <tbody>

            {results.slice(0, 25).map((row, idx) => (

              <tr
                key={idx}
                className="
                  border-b
                  border-slate-800
                  hover:bg-slate-900/60
                  transition-all
                "
              >

                <td className="px-6 py-5 font-medium">
                  {row.account_id || `ACC-${idx + 1000}`}
                </td>

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="w-24 h-2 rounded-full bg-slate-800 overflow-hidden">

                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${Math.min(
                            Number(row.risk_score),
                            100
                          )}%`
                        }}
                      />

                    </div>

                    <span className="font-semibold">
                      {row.risk_score}
                    </span>

                  </div>

                </td>

                <td className="px-6 py-5">

                  <span
                    className={`
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-medium
                      ${getBadgeStyle(row.risk_level)}
                    `}
                  >
                    {row.risk_level}
                  </span>

                </td>

                <td className="px-6 py-5">

                  <span className="text-slate-300">

                    {row.risk_level === "Critical"
                      ? "Immediate Review"
                      : row.risk_level === "High"
                      ? "High Priority"
                      : row.risk_level === "Medium"
                      ? "Monitor"
                      : "Low Risk"}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RiskTable;