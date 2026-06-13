function SummaryCards({ summary }) {
  if (!summary) return null;

  const cards = [
    {
      title: "Total Accounts",
      value: summary.total_accounts,
      color: "from-blue-500 to-cyan-500",
      description: "Records Processed"
    },
    {
      title: "Critical Risk",
      value: summary.critical_accounts,
      color: "from-red-500 to-red-700",
      description: "Immediate Review Required"
    },
    {
      title: "High Risk",
      value: summary.high_accounts,
      color: "from-orange-500 to-orange-700",
      description: "Potential Fraud Activity"
    },
    {
      title: "Medium Risk",
      value: summary.medium_accounts,
      color: "from-yellow-500 to-amber-600",
      description: "Monitor Closely"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-slate-800
            bg-slate-900/70
            backdrop-blur-xl
            p-7
            transition-all
            duration-300
            hover:-translate-y-2
            hover:border-slate-700
            hover:shadow-2xl
          "
        >

          {/* Glow */}

          <div
            className={`
              absolute
              -top-10
              -right-10
              h-32
              w-32
              rounded-full
              bg-gradient-to-br
              ${card.color}
              opacity-10
              blur-3xl
            `}
          />

          {/* Header */}

          <div className="flex items-center justify-between">

            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              {card.title}
            </p>

            <div
              className={`
                h-3
                w-3
                rounded-full
                bg-gradient-to-r
                ${card.color}
              `}
            />

          </div>

          {/* Value */}

          <h2 className="mt-5 text-5xl font-black tracking-tight">

            {card.value?.toLocaleString()}

          </h2>

          {/* Footer */}

          <p className="mt-3 text-sm text-slate-500">

            {card.description}

          </p>

        </div>

      ))}

    </div>
  );
}

export default SummaryCards;