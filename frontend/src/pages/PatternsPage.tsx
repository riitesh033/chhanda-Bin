import { useState } from "react";
import { Grid3X3, Loader2 } from "lucide-react";

import axios from "axios";
import api from "../services/api";
import PatternVisualizer from "../components/PatternVisualizer";

interface PatternDetail {
  index: number;
  rank: number;
  zero_based_rank: number;
  pattern: string;
  binary: string;
  decimal: number;
  laghu_count: number;
  guru_count: number;
}

interface PatternResponse {
  n: number;
  total_patterns: number;
  patterns: PatternDetail[];
}

export default function PatternsPage() {
  const [n, setN] = useState("4");

  const [data, setData] =
    useState<PatternResponse | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const generatePatterns = async () => {
    setError("");
    setData(null);

    const value = Number(n);

    if (!Number.isInteger(value) || value < 0) {
      setError(
        "Please enter a valid non-negative integer."
      );
      return;
    }

    if (value > 16) {
      setError(
        "Please use n ≤ 16 for the browser visualization."
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await api.post<PatternResponse>(
          "/patterns/generate",
          {
            n: value,
          }
        );

      setData(response.data);
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
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section>
        <p className="text-sm font-semibold uppercase tracking-widest text-maroon dark:text-gold">
          Combinatorial Generation
        </p>

        <h1 className="mt-2 text-4xl font-bold text-ink dark:text-stone-100">
          Pattern Generator
        </h1>

        <p className="mt-3 max-w-2xl leading-7 text-stone-600 dark:text-stone-400">
          Generate every possible Laghu/Guru pattern for a
          given number of syllable positions and explore
          their binary representation.
        </p>
      </section>

      {/* =====================================================
          CONTROLS
      ===================================================== */}

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900">

        <div className="flex flex-col gap-4 md:flex-row md:items-end">

          <div className="flex-1">

            <label
              htmlFor="pattern-n"
              className="block text-sm font-semibold text-ink dark:text-stone-100"
            >
              Number of syllable positions
            </label>

            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              Each position can be Laghu (L) or Guru (G).
              Total patterns = 2ⁿ.
            </p>

            <input
              id="pattern-n"
              type="number"
              min="0"
              max="16"
              value={n}
              onChange={(event) =>
                setN(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  generatePatterns();
                }
              }}
              className="
                mt-3 w-full rounded-xl
                border border-stone-300
                bg-parchment
                px-4 py-3
                text-lg text-ink
                outline-none
                transition
                placeholder:text-stone-400
                focus:border-maroon
                focus:ring-2
                focus:ring-maroon/20

                dark:border-stone-600
                dark:bg-stone-800
                dark:text-stone-100
                dark:focus:border-gold
                dark:focus:ring-gold/20
              "
            />

          </div>

          <button
            type="button"
            onClick={generatePatterns}
            disabled={loading}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-maroon
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-maroon/90
              disabled:cursor-not-allowed
              disabled:opacity-60

              dark:bg-gold
              dark:text-ink
              dark:hover:bg-gold/90
            "
          >

            {loading ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              <Grid3X3 size={18} />
            )}

            {loading
              ? "Generating..."
              : "Generate Patterns"}

          </button>

        </div>

        {/* Error */}

        {error && (
          <div
            className="
              mt-4
              rounded-xl
              border border-red-200
              bg-red-50
              px-4 py-3
              text-sm text-red-700

              dark:border-red-900
              dark:bg-red-950/40
              dark:text-red-300
            "
          >
            {error}
          </div>
        )}

      </section>

      {/* =====================================================
          RESULT SUMMARY
      ===================================================== */}

      {data && (
        <>

          <section className="grid gap-4 sm:grid-cols-3">

            {/* Positions */}

            <SummaryCard
              label="Syllable Positions"
              value={data.n}
              description="Number of binary positions"
            />

            {/* Total */}

            <SummaryCard
              label="Total Patterns"
              value={data.total_patterns}
              description={`2^${data.n} possible patterns`}
            />

            {/* Encoding */}

            <SummaryCard
              label="Encoding"
              value="L = 0"
              description="G = 1"
            />

          </section>

          {/* =================================================
              PATTERN VISUALIZER
          ================================================= */}

          <PatternVisualizer
            patterns={data.patterns.map((item) => ({
              ...item,
              length: data.n,
            }))}
            n={data.n}
          />

          {/* =================================================
              COMPLETE TABLE
          ================================================= */}

          <section
            className="
              overflow-hidden
              rounded-2xl
              border border-stone-200
              bg-white
              shadow-sm

              dark:border-stone-700
              dark:bg-stone-900
            "
          >

            <div
              className="
                border-b
                border-stone-200
                p-5

                dark:border-stone-700
              "
            >

              <h2 className="font-bold text-ink dark:text-stone-100">
                Generated Patterns
              </h2>

              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Complete computational representation of
                every Laghu/Guru combination.
              </p>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-left text-sm">

                <thead
                  className="
                    bg-stone-50
                    text-xs
                    uppercase
                    tracking-wider
                    text-stone-500

                    dark:bg-stone-800
                    dark:text-stone-400
                  "
                >

                  <tr>

                    <th className="px-5 py-3">
                      Index
                    </th>

                    <th className="px-5 py-3">
                      Rank
                    </th>

                    <th className="px-5 py-3">
                      Pattern
                    </th>

                    <th className="px-5 py-3">
                      Binary
                    </th>

                    <th className="px-5 py-3">
                      Decimal
                    </th>

                    <th className="px-5 py-3">
                      Laghu
                    </th>

                    <th className="px-5 py-3">
                      Guru
                    </th>

                  </tr>

                </thead>

                <tbody
                  className="
                    divide-y
                    divide-stone-100

                    dark:divide-stone-800
                  "
                >

                  {data.patterns.map((item) => (

                    <tr
                      key={item.index}
                      className="
                        transition
                        hover:bg-stone-50

                        dark:hover:bg-stone-800/70
                      "
                    >

                      {/* Index */}

                      <td
                        className="
                          px-5 py-3
                          text-stone-500
                          dark:text-stone-400
                        "
                      >
                        {item.index}
                      </td>

                      {/* Rank */}

                      <td
                        className="
                          px-5 py-3
                          font-mono
                          font-bold
                          text-maroon

                          dark:text-gold
                        "
                      >
                        {item.rank}
                      </td>

                      {/* Pattern */}

                      <td
                        className="
                          px-5 py-3
                          font-mono
                          font-bold
                          text-maroon

                          dark:text-gold
                        "
                      >
                        {item.pattern}
                      </td>

                      {/* Binary */}

                      <td
                        className="
                          px-5 py-3
                          font-mono
                          text-ink

                          dark:text-stone-200
                        "
                      >
                        {item.binary}
                      </td>

                      {/* Decimal */}

                      <td
                        className="
                          px-5 py-3
                          font-mono
                          text-ink

                          dark:text-stone-200
                        "
                      >
                        {item.decimal}
                      </td>

                      {/* Laghu */}

                      <td
                        className="
                          px-5 py-3
                          text-ink

                          dark:text-stone-200
                        "
                      >
                        {item.laghu_count}
                      </td>

                      {/* Guru */}

                      <td
                        className="
                          px-5 py-3
                          text-ink

                          dark:text-stone-200
                        "
                      >
                        {item.guru_count}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>

        </>
      )}

    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string | number;
  description: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border border-stone-200
        bg-white
        p-5
        shadow-sm

        dark:border-stone-700
        dark:bg-stone-900
      "
    >

      <p className="text-sm text-stone-500 dark:text-stone-400">
        {label}
      </p>

      <p
        className="
          mt-2
          text-3xl
          font-bold
          text-maroon

          dark:text-gold
        "
      >
        {value}
      </p>

      <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
        {description}
      </p>

    </div>
  );
}