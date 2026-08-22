import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface DistributionItem {
  guru_count: number;
  laghu_count: number;
  pattern_count: number;
}

interface ChartDataItem {
  guru: number;
  laghu: number;
  patterns: number;
}

interface DistributionChartProps {
  distribution: DistributionItem[];
  selectedGuruCount?: number | null;
  onSelectGuruCount?: (
    guruCount: number
  ) => void | Promise<void>;
}

export default function DistributionChart({
  distribution,
  selectedGuruCount = null,
  onSelectGuruCount,
}: DistributionChartProps) {
  const data: ChartDataItem[] = distribution.map(
    (item) => ({
      guru: item.guru_count,
      laghu: item.laghu_count,
      patterns: item.pattern_count,
    })
  );

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-maroon dark:text-gold">
          Distribution
        </p>

        <h2 className="mt-1 text-2xl font-bold text-ink dark:text-stone-100">
          Guru Count Distribution
        </h2>

        <p className="mt-1 max-w-2xl text-sm leading-6 text-stone-500 dark:text-stone-400">
          Each bar represents C(n,k), the number
          of patterns containing exactly k Guru
          syllables.
        </p>
      </div>

      {/* Chart */}
      <div className="h-[360px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 25,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-stone-200 dark:stroke-stone-700"
            />

            <XAxis
              dataKey="guru"
              allowDecimals={false}
              tick={{
                fill: "currentColor",
                fontSize: 12,
              }}
              stroke="currentColor"
              label={{
                value: "Guru count",
                position: "insideBottom",
                offset: -15,
                fill: "currentColor",
              }}
              className="text-stone-600 dark:text-stone-300"
            />

            <YAxis
              allowDecimals={false}
              tick={{
                fill: "currentColor",
                fontSize: 12,
              }}
              stroke="currentColor"
              label={{
                value: "Patterns",
                angle: -90,
                position: "insideLeft",
                fill: "currentColor",
              }}
              className="text-stone-600 dark:text-stone-300"
            />

            <Tooltip
              cursor={{
                fill: "rgba(120, 53, 15, 0.08)",
              }}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid",
                backgroundColor:
                  "var(--tooltip-bg, white)",
              }}
              formatter={(value) => [
                value,
                "Patterns",
              ]}
              labelFormatter={(label) =>
                `Guru count: ${label}`
              }
            />

            <Bar
              dataKey="patterns"
              name="Patterns"
              radius={[6, 6, 0, 0]}
              cursor={
                onSelectGuruCount
                  ? "pointer"
                  : "default"
              }
              onClick={(_, index) => {
                if (!onSelectGuruCount) {
                  return;
                }

                if (
                  typeof index !== "number" ||
                  index < 0 ||
                  index >= data.length
                ) {
                  return;
                }

                const guruCount =
                  data[index].guru;

                onSelectGuruCount(
                  guruCount
                );
              }}
            >
              {data.map((entry) => {
                const isSelected =
                  selectedGuruCount ===
                  entry.guru;

                return (
                  <Cell
                    key={`cell-${entry.guru}`}
                    className={
                      isSelected
                        ? "fill-maroon dark:fill-gold"
                        : "fill-gold dark:fill-maroon"
                    }
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Selected information */}
      {selectedGuruCount !== null &&
        selectedGuruCount !== undefined && (
          <div className="mt-5 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-center dark:bg-gold/5">
            <p className="text-sm text-stone-600 dark:text-stone-300">
              Selected Guru count
            </p>

            <p className="mt-1 text-xl font-bold text-maroon dark:text-gold">
              {selectedGuruCount}
            </p>

            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              Click another bar to change the
              selection.
            </p>
          </div>
        )}

      {/* Footer */}
      <div className="mt-4 text-center text-xs text-stone-500 dark:text-stone-400">
        Click a bar to inspect the corresponding
        Laghu/Guru patterns.
      </div>
    </section>
  );
}