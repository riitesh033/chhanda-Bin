import { useState } from "react";
import {
  Loader2,
  Triangle,
  MousePointerClick,
  Info,
  X,
} from "lucide-react";

import axios from "axios";
import api from "../services/api";
import PatternVisualizer from "../components/PatternVisualizer";
import DistributionChart from "../components/DistributionChart";

interface PatternItem {
  pattern: string;
  length: number;
  rank: number;
  zero_based_rank: number;
  binary: string;
  decimal: number;
  laghu_count: number;
  guru_count: number;
}

interface PatternFilterResponse {
  n: number;
  guru_count: number;
  laghu_count: number;
  total_patterns: number;
  patterns: PatternItem[];
}

interface DistributionItem {
  guru_count: number;
  laghu_count: number;
  pattern_count: number;
}

interface MeruResponse {
  rows: number;
  meru: number[][];
}

interface DistributionResponse {
  n: number;
  total_patterns: number;
  distribution: DistributionItem[];
}

interface SelectedCell {
  row: number;
  column: number;
  value: number;
}

export default function MeruPage() {
  const [n, setN] = useState("6");

  const [meru, setMeru] =
    useState<MeruResponse | null>(null);

  const [distribution, setDistribution] =
    useState<DistributionResponse | null>(null);

  const [patterns, setPatterns] =
    useState<PatternFilterResponse | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [patternsLoading, setPatternsLoading] =
    useState(false);

  const [error, setError] = useState("");

  const [selectedCell, setSelectedCell] =
    useState<SelectedCell | null>(null);

  const [hoveredCell, setHoveredCell] =
    useState<SelectedCell | null>(null);

  /*
   * Generate Meru + distribution
   */
  const generateMeru = async () => {
    setError("");
    setMeru(null);
    setDistribution(null);
    setPatterns(null);
    setSelectedCell(null);
    setHoveredCell(null);

    const value = Number(n);

    if (!Number.isInteger(value) || value < 1) {
      setError(
        "Please enter a number greater than or equal to 1."
      );
      return;
    }

    if (value > 15) {
      setError(
        "Please use n ≤ 15 for the visualization."
      );
      return;
    }

    try {
      setLoading(true);

      const [
        meruResponse,
        distributionResponse,
      ] = await Promise.all([
        api.post<MeruResponse>(
          "/meru/generate",
          {
            rows: value + 1,
          }
        ),

        api.post<DistributionResponse>(
          "/meru/distribution",
          {
            n: value,
          }
        ),
      ]);

      setMeru(meruResponse.data);
      setDistribution(
        distributionResponse.data
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ||
            "Unable to generate Meru-Prastāra."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  /*
   * Generate patterns for selected
   * Meru coefficient C(n,k).
   */
  const loadPatterns = async (
    syllableCount: number,
    guruCount: number
  ) => {
    setError("");
    setPatterns(null);

    try {
      setPatternsLoading(true);

      const response =
        await api.post<PatternFilterResponse>(
          "/patterns/filter",
          {
            n: syllableCount,
            guru_count: guruCount,
          }
        );

      setPatterns(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ||
            "Unable to generate patterns."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setPatternsLoading(false);
    }
  };

  /*
   * Hover takes priority over selection.
   */
  const activeCell =
    hoveredCell || selectedCell;

  /*
   * Select Meru cell.
   */
  const selectCell = async (
    row: number,
    column: number,
    value: number
  ) => {
    setSelectedCell({
      row,
      column,
      value,
    });

    await loadPatterns(row, column);
  };

  /*
   * Check whether a cell is active.
   */
  const isCellActive = (
    row: number,
    column: number
  ) => {
    if (!activeCell) {
      return false;
    }

    return (
      activeCell.row === row &&
      activeCell.column === column
    );
  };

  /*
   * Check whether a row is active.
   */
  const isRowActive = (row: number) => {
    if (!activeCell) {
      return false;
    }

    return activeCell.row === row;
  };

  /*
   * Select distribution row.
   */
  const selectDistributionRow = async (
    guruCount: number
  ) => {
    if (!meru || !distribution) {
      return;
    }

    const row = distribution.n;

    if (
      row < 0 ||
      row >= meru.meru.length ||
      guruCount < 0 ||
      guruCount > row
    ) {
      return;
    }

    const value =
      meru.meru[row][guruCount];

    setSelectedCell({
      row,
      column: guruCount,
      value,
    });

    await loadPatterns(
      row,
      guruCount
    );
  };

  /*
   * Clear current selection.
   */
  const clearSelection = () => {
    setSelectedCell(null);
    setHoveredCell(null);
    setPatterns(null);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 text-ink dark:text-stone-100">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section>
        <p className="text-sm font-semibold uppercase tracking-widest text-maroon dark:text-gold">
          Combinatorics
        </p>

        <h1 className="mt-2 text-4xl font-bold text-ink dark:text-white">
          Meru-Prastāra
        </h1>

        <p className="mt-3 max-w-3xl leading-7 text-stone-600 dark:text-stone-300">
          Explore the triangular structure of
          binomial coefficients and its
          relationship with Laghu/Guru pattern
          enumeration.
        </p>
      </section>


      {/* =====================================================
          CONTROLS
      ===================================================== */}

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900">

        <div className="flex flex-col gap-4 md:flex-row md:items-end">

          <div className="flex-1">

            <label
              htmlFor="meru-n"
              className="block text-sm font-semibold text-ink dark:text-stone-100"
            >
              Number of syllable positions
            </label>

            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              Generate rows 0 through n of
              Meru-Prastāra.
            </p>

            <input
              id="meru-n"
              type="number"
              min="1"
              max="15"
              value={n}
              onChange={(event) =>
                setN(event.target.value)
              }
              className="mt-3 w-full rounded-xl border border-stone-300 bg-parchment px-4 py-3 text-lg text-ink outline-none transition focus:border-maroon focus:ring-2 focus:ring-maroon/20 dark:border-stone-600 dark:bg-stone-800 dark:text-white"
            />

          </div>

          <button
            type="button"
            onClick={generateMeru}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-maroon px-6 py-3 font-semibold text-white transition hover:bg-maroon/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              <Triangle size={18} />
            )}

            {loading
              ? "Generating..."
              : "Generate Meru"}
          </button>

        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </div>
        )}

      </section>


      {/* =====================================================
          MERU
      ===================================================== */}

      {meru && (
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900">

          <div className="mb-6">

            <h2 className="text-xl font-bold text-ink dark:text-white">
              Meru-Prastāra
            </h2>

            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Hover over a coefficient to inspect
              it. Click a cell to generate the
              corresponding Laghu/Guru patterns.
            </p>

          </div>

          <div className="overflow-x-auto">

            <div className="flex min-w-[600px] flex-col items-center gap-2 py-6">

              {meru.meru.map(
                (row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className={`
                      flex gap-2 rounded-2xl px-3 py-2
                      transition
                      ${
                        isRowActive(rowIndex)
                          ? "bg-gold/10 ring-1 ring-gold/30"
                          : ""
                      }
                    `}
                  >
                    {row.map(
                      (
                        value,
                        columnIndex
                      ) => {

                        const active =
                          isCellActive(
                            rowIndex,
                            columnIndex
                          );

                        const selected =
                          selectedCell?.row ===
                            rowIndex &&
                          selectedCell?.column ===
                            columnIndex;

                        return (
                          <button
                            key={columnIndex}
                            type="button"
                            onMouseEnter={() =>
                              setHoveredCell({
                                row: rowIndex,
                                column:
                                  columnIndex,
                                value,
                              })
                            }
                            onMouseLeave={() =>
                              setHoveredCell(
                                null
                              )
                            }
                            onClick={() =>
                              selectCell(
                                rowIndex,
                                columnIndex,
                                value
                              )
                            }
                            className={`
                              relative
                              flex h-12 w-12
                              items-center justify-center
                              rounded-xl
                              border
                              font-mono font-bold
                              transition-all duration-200
                              focus:outline-none
                              focus:ring-2
                              focus:ring-maroon/30

                              ${
                                active
                                  ? "scale-110 border-maroon bg-maroon text-white shadow-lg"
                                  : rowIndex ===
                                    meru.meru.length - 1
                                  ? "border-gold bg-gold/20 text-maroon hover:-translate-y-1 hover:shadow-md dark:bg-gold/10 dark:text-gold"
                                  : "border-stone-200 bg-stone-50 text-ink hover:-translate-y-1 hover:border-maroon/40 hover:shadow-md dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700"
                              }
                            `}
                            title={`C(${rowIndex}, ${columnIndex}) = ${value}`}
                          >
                            {value}

                            {selected && (
                              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-gold dark:border-stone-900" />
                            )}

                          </button>
                        );
                      }
                    )}
                  </div>
                )
              )}

            </div>

          </div>

          {!selectedCell && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-stone-500 dark:text-stone-400">
              <MousePointerClick
                size={16}
              />

              <span>
                Click any coefficient to
                inspect its combinatorial
                meaning and generate its
                patterns.
              </span>
            </div>
          )}

        </section>
      )}


      {/* =====================================================
          SELECTED CELL
      ===================================================== */}

      {activeCell && (
        <SelectedCellCard
          cell={activeCell}
          selected={Boolean(
            selectedCell
          )}
          onClear={clearSelection}
        />
      )}


      {/* =====================================================
          DISTRIBUTION
      ===================================================== */}

      {distribution && (
        <>

          {/* Summary */}

          <section className="grid gap-4 sm:grid-cols-3">

            <SummaryCard
              label="Positions"
              value={distribution.n}
            />

            <SummaryCard
              label="Total Patterns"
              value={
                distribution.total_patterns
              }
            />

            <SummaryCard
              label="Formula"
              value={`2^${distribution.n}`}
            />

          </section>


          {/* Distribution Table */}

          <DistributionTable
            distribution={
              distribution.distribution
            }
            selectedGuruCount={
              activeCell?.row ===
                distribution.n
                ? activeCell.column
                : null
            }
            onSelectGuruCount={
              selectDistributionRow
            }
          />


          {/* Distribution Chart */}

          <DistributionChart
            distribution={
              distribution.distribution
            }
            selectedGuruCount={
              activeCell?.row ===
                distribution.n
                ? activeCell.column
                : null
            }
            onSelectGuruCount={
              selectDistributionRow
            }
          />


          {/* Pattern Loading */}

          {patternsLoading && (
            <section className="flex items-center justify-center gap-3 rounded-2xl border border-stone-200 bg-white p-8 text-sm text-stone-500 shadow-sm dark:border-stone-700 dark:bg-stone-900 dark:text-stone-400">

              <Loader2
                size={18}
                className="animate-spin text-maroon dark:text-gold"
              />

              Generating patterns...

            </section>
          )}


          {/* Pattern Visualizer */}

          {patterns &&
            !patternsLoading && (
              <PatternVisualizer
                patterns={
                  patterns.patterns
                }
                n={patterns.n}
                guruCount={
                  patterns.guru_count
                }
              />
            )}


          {/* Explanation */}

          <section className="rounded-2xl bg-maroon p-6 text-white">

            <p className="text-sm font-semibold uppercase tracking-widest text-gold">
              Why this works
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              From Meru to pattern counting
            </h2>

            <div className="mt-5 space-y-3 text-sm leading-7 text-white/80">

              <p>
                For n syllable positions,
                every position can be either
                Laghu or Guru.
              </p>

              <p>
                Therefore the total number of
                patterns is:
              </p>

              <p className="text-center text-2xl font-bold text-gold">
                2ⁿ
              </p>

              <p>
                If exactly k positions are
                Guru, we choose those k
                positions from n positions.
              </p>

              <p className="text-center text-2xl font-bold text-gold">
                C(n,k) = n! / (k!(n-k)!)
              </p>

              <p>
                The values C(n,k) form the rows
                of the Meru-Prastāra/Pascal
                structure.
              </p>

            </div>

          </section>

        </>
      )}

    </div>
  );
}


/* =========================================================
   SELECTED CELL CARD
   ========================================================= */

function SelectedCellCard({
  cell,
  selected,
  onClear,
}: {
  cell: SelectedCell;
  selected: boolean;
  onClear: () => void;
}) {
  const guruCount = cell.column;

  const laghuCount =
    cell.row - cell.column;

  const illustrativePattern =
    "L".repeat(laghuCount) +
    "G".repeat(guruCount);

  return (
    <section className="rounded-2xl border border-gold/40 bg-gold/10 p-6 shadow-sm dark:bg-gold/5">

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-maroon text-white">
            <Info size={20} />
          </div>

          <div>

            <p className="text-xs font-semibold uppercase tracking-widest text-maroon dark:text-gold">
              {selected
                ? "Selected Meru Cell"
                : "Meru Cell"}
            </p>

            <h2 className="mt-1 text-xl font-bold text-ink dark:text-white">
              C({cell.row},{" "}
              {cell.column}) ={" "}
              {cell.value}
            </h2>

          </div>

        </div>

        {selected && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-lg p-2 text-stone-500 transition hover:bg-white hover:text-maroon dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-gold"
            title="Clear selection"
          >
            <X size={18} />
          </button>
        )}

      </div>


      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <DetailItem
          label="Guru positions"
          value={guruCount}
        />

        <DetailItem
          label="Laghu positions"
          value={laghuCount}
        />

        <DetailItem
          label="Pattern count"
          value={cell.value}
        />

        <DetailItem
          label="C(n,k)"
          value={`C(${cell.row}, ${cell.column})`}
        />

      </div>


      <div className="mt-5 rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900">

        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Illustrative L/G composition
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">

          {illustrativePattern
            .split("")
            .map(
              (symbol, index) => (
                <span
                  key={index}
                  className={`
                    flex h-8 w-8
                    items-center justify-center
                    rounded-lg
                    font-mono text-xs font-bold
                    ${
                      symbol === "G"
                        ? "bg-maroon text-white"
                        : "bg-stone-100 text-ink dark:bg-stone-700 dark:text-stone-100"
                    }
                  `}
                >
                  {symbol}
                </span>
              )
            )}

        </div>

        <p className="mt-3 text-xs text-stone-500 dark:text-stone-400">
          This is one illustrative composition.
          The coefficient represents the total
          number of distinct patterns having
          these Guru/Laghu counts.
        </p>

      </div>

    </section>
  );
}


/* =========================================================
   SUMMARY CARD
   ========================================================= */

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">

      <p className="text-sm text-stone-500 dark:text-stone-400">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-maroon dark:text-gold">
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   DETAIL ITEM
   ========================================================= */

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900">

      <p className="text-xs text-stone-500 dark:text-stone-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-maroon dark:text-gold">
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   DISTRIBUTION TABLE
   ========================================================= */

function DistributionTable({
  distribution,
  selectedGuruCount,
  onSelectGuruCount,
}: {
  distribution: DistributionItem[];
  selectedGuruCount: number | null;
  onSelectGuruCount: (
    guruCount: number
  ) => void;
}) {
  const total = distribution.reduce(
    (sum, current) =>
      sum + current.pattern_count,
    0
  );

  return (
    <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-700 dark:bg-stone-900">

      <div className="border-b border-stone-200 p-5 dark:border-stone-700">

        <h2 className="text-xl font-bold text-ink dark:text-white">
          Guru / Laghu Distribution
        </h2>

        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          C(n,k) gives the number of patterns
          containing exactly k Guru positions.
          Click a row to inspect those patterns.
        </p>

      </div>


      <div className="overflow-x-auto">

        <table className="w-full min-w-[650px] text-left text-sm">

          <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500 dark:bg-stone-800 dark:text-stone-400">

            <tr>

              <th className="px-5 py-3">
                Guru
              </th>

              <th className="px-5 py-3">
                Laghu
              </th>

              <th className="px-5 py-3">
                C(n,k)
              </th>

              <th className="px-5 py-3">
                Percentage
              </th>

            </tr>

          </thead>


          <tbody className="divide-y divide-stone-100 dark:divide-stone-700">

            {distribution.map(
              (item) => {

                const percentage =
                  total === 0
                    ? 0
                    : (item.pattern_count /
                        total) *
                      100;

                const active =
                  selectedGuruCount ===
                  item.guru_count;

                return (
                  <tr
                    key={
                      item.guru_count
                    }
                    onClick={() =>
                      onSelectGuruCount(
                        item.guru_count
                      )
                    }
                    className={`
                      cursor-pointer transition
                      ${
                        active
                          ? "bg-gold/20 dark:bg-gold/10"
                          : "hover:bg-stone-50 dark:hover:bg-stone-800"
                      }
                    `}
                  >

                    <td className="px-5 py-3 font-semibold text-ink dark:text-stone-100">
                      {item.guru_count}
                    </td>

                    <td className="px-5 py-3 text-stone-700 dark:text-stone-300">
                      {item.laghu_count}
                    </td>

                    <td className="px-5 py-3 font-mono font-bold text-maroon dark:text-gold">
                      {item.pattern_count}
                    </td>

                    <td className="px-5 py-3">

                      <div className="flex items-center gap-3">

                        <div className="h-2 w-32 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">

                          <div
                            className="h-full rounded-full bg-maroon transition-all dark:bg-gold"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />

                        </div>

                        <span className="text-xs text-stone-500 dark:text-stone-400">
                          {percentage.toFixed(
                            1
                          )}
                          %
                        </span>

                      </div>

                    </td>

                  </tr>
                );
              }
            )}

          </tbody>

        </table>

      </div>

    </section>
  );
}