import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function RiskChart({ summary }) {
  if (!summary) return null;

  const data = [
    {
      name: "Critical",
      value: summary.critical_accounts,
    },
    {
      name: "High",
      value: summary.high_accounts,
    },
    {
      name: "Medium",
      value: summary.medium_accounts,
    },
    {
      name: "Low",
      value: summary.low_accounts,
    },
  ];

  const COLORS = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
  ];

  const total =
    data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/70
        backdrop-blur-xl
        p-6
      "
    >

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          Risk Distribution
        </h2>

        <p className="text-slate-400 mt-1">
          Account classification across analyzed records
        </p>

      </div>

      {/* Chart */}

      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              innerRadius={85}
              outerRadius={120}
              paddingAngle={4}
              dataKey="value"
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-4 mt-4">

        {data.map((item, index) => (

          <div
            key={item.name}
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-slate-800
              bg-slate-950/40
              p-3
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <span className="text-slate-300">
                {item.name}
              </span>

            </div>

            <div className="font-semibold">
              {item.value}
            </div>

          </div>

        ))}

      </div>

      {/* Total */}

      <div
        className="
          mt-5
          rounded-2xl
          border
          border-slate-800
          bg-slate-950/40
          p-4
          text-center
        "
      >

        <p className="text-slate-400 text-sm">
          Total Accounts
        </p>

        <h3 className="text-3xl font-bold mt-1">
          {total.toLocaleString()}
        </h3>

      </div>

    </div>
  );
}

export default RiskChart;