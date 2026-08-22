import { useState } from "react";
import {
  Binary,
  Hash,
  Layers,
  ArrowDown,
  Equal,
  Info,
} from "lucide-react";

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

interface PatternVisualizerProps {
  patterns: PatternItem[];
  n: number;

  /*
   * Optional because Pattern Generator
   * displays all possible Guru counts.
   *
   * Meru-Prastāra passes a specific Guru count.
   */
  guruCount?: number;
}

export default function PatternVisualizer({
  patterns,
  n,
  guruCount,
}: PatternVisualizerProps) {
  const [selectedPattern, setSelectedPattern] =
    useState<PatternItem | null>(null);

  if (patterns.length === 0) {
    return (
      <section
        className="
          rounded-2xl
          border
          border-stone-200
          bg-white
          p-6
          shadow-sm
          transition-colors

          dark:border-stone-700
          dark:bg-stone-900
        "
      >
        <p className="text-sm text-stone-500 dark:text-stone-400">
          No patterns found.
        </p>
      </section>
    );
  }

  const isFiltered =
    guruCount !== undefined;

  return (
    <section
      className="
        rounded-2xl
        border
        border-stone-200
        bg-white
        p-6
        shadow-sm
        transition-colors

        dark:border-stone-700
        dark:bg-stone-900
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-maroon dark:text-gold">
            Pattern Visualizer
          </p>

          <h2 className="mt-1 text-2xl font-bold text-ink dark:text-stone-100">
            {patterns.length}{" "}
            {patterns.length === 1
              ? "pattern"
              : "patterns"}
          </h2>

          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Length {n}
            {" · "}
            {isFiltered
              ? `Exactly ${guruCount} Guru${
                  guruCount === 1 ? "" : "s"
                }`
              : "All Guru counts"}
          </p>
        </div>

        {/* =================================================
            COEFFICIENT / PATTERN SPACE
        ================================================= */}

        <div
          className="
            rounded-xl
            bg-gold/15
            px-4
            py-3

            dark:bg-gold/10
          "
        >
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {isFiltered
              ? "Binomial coefficient"
              : "Pattern space"}
          </p>

          <p className="font-mono text-lg font-bold text-maroon dark:text-gold">
            {isFiltered
              ? `C(${n},${guruCount}) = ${patterns.length}`
              : `2^${n} = ${patterns.length}`}
          </p>
        </div>
      </div>

      {/* =====================================================
          RANKING CONVENTION NOTICE
      ===================================================== */}

      <div
        className="
          mt-6
          rounded-xl
          border
          border-stone-200
          bg-stone-50
          p-4

          dark:border-stone-700
          dark:bg-stone-800
        "
      >
        <div className="flex items-start gap-3">
          <Info
            size={18}
            className="
              mt-0.5
              shrink-0
              text-maroon
              dark:text-gold
            "
          />

          <div>
            <p className="font-semibold text-ink dark:text-stone-100">
              Pingala ranking convention
            </p>

            <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-300">
              L = 0 and G = 1. The first syllable
              position is treated as the least-significant
              position when calculating the Pingala rank.
              The displayed binary string is shown in the
              normal left-to-right order of the pattern.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          PATTERN LIST
      ===================================================== */}

      <div className="mt-6 space-y-3">
        {patterns.map((item) => {
          const selected =
            selectedPattern?.pattern ===
            item.pattern;

          return (
            <button
              key={item.pattern}
              type="button"
              onClick={() =>
                setSelectedPattern(item)
              }
              className={`
                w-full
                rounded-xl
                border
                p-4
                text-left
                transition-all
                duration-150

                ${
                  selected
                    ? `
                      border-maroon
                      bg-maroon/5
                      shadow-md

                      dark:border-gold
                      dark:bg-maroon/20
                    `
                    : `
                      border-stone-200
                      bg-stone-50

                      hover:border-maroon/30
                      hover:bg-stone-100
                      hover:shadow-sm

                      dark:border-stone-700
                      dark:bg-stone-800
                      dark:hover:border-gold/40
                      dark:hover:bg-stone-700
                    `
                }
              `}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

                {/* =================================================
                    RANK
                ================================================= */}

                <div className="flex items-center gap-2 lg:w-20">
                  <Hash
                    size={16}
                    className="text-stone-400 dark:text-stone-500"
                  />

                  <span className="font-mono text-sm font-bold text-maroon dark:text-gold">
                    {item.rank}
                  </span>
                </div>

                {/* =================================================
                    L/G BLOCKS
                ================================================= */}

                <div className="flex flex-1 flex-wrap gap-1.5">
                  {item.pattern
                    .split("")
                    .map((symbol, index) => (
                      <span
                        key={index}
                        className={`
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-lg
                          font-mono
                          font-bold

                          ${
                            symbol === "G"
                              ? "bg-maroon text-white"
                              : `
                                bg-stone-200
                                text-ink

                                dark:bg-stone-700
                                dark:text-stone-100
                              `
                          }
                        `}
                      >
                        {symbol}
                      </span>
                    ))}
                </div>

                {/* =================================================
                    BINARY
                ================================================= */}

                <div className="flex items-center gap-2 lg:w-32">
                  <Binary
                    size={16}
                    className="text-stone-400 dark:text-stone-500"
                  />

                  <span className="font-mono text-sm text-ink dark:text-stone-200">
                    {item.binary}
                  </span>
                </div>

                {/* =================================================
                    DECIMAL
                ================================================= */}

                <div className="flex items-center gap-2 lg:w-28">
                  <Layers
                    size={16}
                    className="text-stone-400 dark:text-stone-500"
                  />

                  <span className="font-mono text-sm font-semibold text-maroon dark:text-gold">
                    {item.decimal}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* =====================================================
          SELECTED PATTERN
      ===================================================== */}

      {selectedPattern && (
        <BinaryVisualization
          pattern={selectedPattern}
          onClose={() =>
            setSelectedPattern(null)
          }
        />
      )}
    </section>
  );
}


/* =========================================================
   BINARY / PINGALA VISUALIZATION
========================================================= */

function BinaryVisualization({
  pattern,
  onClose,
}: {
  pattern: PatternItem;
  onClose: () => void;
}) {
  return (
    <div
      className="
        mt-8
        rounded-2xl
        border
        border-gold/40
        bg-gold/10
        p-4
        transition-colors

        dark:border-gold/30
        dark:bg-gold/5

        sm:p-6
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-maroon dark:text-gold">
            Pattern Analysis
          </p>

          <h3 className="mt-1 text-xl font-bold text-ink dark:text-stone-100 sm:text-2xl">
            Pattern #{pattern.rank}
          </h3>

          <p className="mt-1 font-mono text-sm text-stone-500 dark:text-stone-400">
            {pattern.pattern}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="
            shrink-0
            text-sm
            font-semibold
            text-maroon
            transition
            hover:underline

            dark:text-gold
          "
        >
          Clear
        </button>
      </div>

      {/* =====================================================
          L/G ROW
      ===================================================== */}

      <div className="mt-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Laghu / Guru positions
        </p>

        <div className="flex flex-wrap gap-2">
          {pattern.pattern
            .split("")
            .map((symbol, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-xs text-stone-400 dark:text-stone-500">
                  Position {index}
                </span>

                <div
                  className={`
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    font-mono
                    text-lg
                    font-bold

                    sm:h-14
                    sm:w-14
                    sm:text-xl

                    ${
                      symbol === "G"
                        ? "bg-maroon text-white"
                        : `
                          border
                          border-stone-200
                          bg-white
                          text-ink

                          dark:border-stone-600
                          dark:bg-stone-800
                          dark:text-stone-100
                        `
                    }
                  `}
                >
                  {symbol}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* =====================================================
          PINGALA WEIGHTS
      ===================================================== */}

      <div className="mt-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Pingala position weights
        </p>

        <div className="flex flex-wrap gap-2">
          {pattern.pattern
            .split("")
            .map((symbol, index) => {
              const weight =
                2 ** index;

              const contribution =
                symbol === "G"
                  ? weight
                  : 0;

              return (
                <div
                  key={index}
                  className="
                    rounded-xl
                    border
                    border-stone-200
                    bg-white
                    p-3
                    text-center

                    dark:border-stone-700
                    dark:bg-stone-800
                  "
                >
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Position {index}
                  </p>

                  <p className="mt-1 font-mono font-bold text-maroon dark:text-gold">
                    2^{index}
                  </p>

                  <p className="mt-1 font-mono text-sm text-ink dark:text-stone-200">
                    {weight}
                  </p>

                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                    {symbol === "G"
                      ? `+${contribution}`
                      : "+0"}
                  </p>
                </div>
              );
            })}
        </div>
      </div>

      {/* =====================================================
          ARROW
      ===================================================== */}

      <div className="my-6 flex items-center gap-3 text-stone-400 dark:text-stone-500">
        <ArrowDown size={20} />

        <span className="text-xs font-semibold uppercase tracking-wider">
          Binary representation
        </span>
      </div>

      {/* =====================================================
          BINARY ROW
      ===================================================== */}

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Displayed binary
        </p>

        <div className="flex flex-wrap gap-2">
          {pattern.binary
            .split("")
            .map((bit, index) => (
              <div
                key={index}
                className={`
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  font-mono
                  text-lg
                  font-bold

                  sm:h-14
                  sm:w-14
                  sm:text-xl

                  ${
                    bit === "1"
                      ? "bg-maroon text-white"
                      : `
                        border
                        border-stone-200
                        bg-white
                        text-ink

                        dark:border-stone-600
                        dark:bg-stone-800
                        dark:text-stone-100
                      `
                  }
                `}
              >
                {bit}
              </div>
            ))}
        </div>
      </div>

      {/* =====================================================
          DETAILS
      ===================================================== */}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">

        <BinaryDetail
          label="Pattern"
          value={pattern.pattern}
        />

        <BinaryDetail
          label="Binary"
          value={pattern.binary}
        />

        <BinaryDetail
          label="Binary decimal"
          value={pattern.decimal}
        />

        <BinaryDetail
          label="Pingala rank"
          value={pattern.rank}
        />

      </div>

      {/* =====================================================
          RANK DETAILS
      ===================================================== */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">

        <BinaryDetail
          label="Zero-based Pingala rank"
          value={pattern.zero_based_rank}
        />

        <BinaryDetail
          label="One-based Pingala rank"
          value={pattern.rank}
        />

      </div>

      {/* =====================================================
          MATHEMATICAL EXPLANATION
      ===================================================== */}

      <div
        className="
          mt-6
          rounded-xl
          border
          border-stone-200
          bg-white
          p-4
          transition-colors

          dark:border-stone-700
          dark:bg-stone-800

          sm:p-5
        "
      >
        <div className="flex items-center gap-2">
          <Equal
            size={18}
            className="text-maroon dark:text-gold"
          />

          <h4 className="font-semibold text-ink dark:text-stone-100">
            Encoding and ranking relationship
          </h4>
        </div>

        <div className="mt-4 space-y-3 overflow-x-auto font-mono text-sm text-ink dark:text-stone-200">

          <p>
            L = 0
          </p>

          <p>
            G = 1
          </p>

          <p>
            Pattern:{" "}
            {pattern.pattern}
          </p>

          <p>
            Binary:{" "}
            {pattern.binary}
          </p>

          <p>
            Binary decimal:{" "}
            {pattern.binary}₂ ={" "}
            {pattern.decimal}₁₀
          </p>

          <p>
            Pingala zero-based rank:{" "}
            {pattern.zero_based_rank}
          </p>

          <p>
            Pingala one-based rank:{" "}
            {pattern.rank}
          </p>

        </div>
      </div>

      {/* =====================================================
          IMPORTANT DISTINCTION
      ===================================================== */}

      <div
        className="
          mt-6
          rounded-xl
          border
          border-maroon/20
          bg-maroon/5
          p-4

          dark:border-gold/20
          dark:bg-gold/5

          sm:p-5
        "
      >
        <p className="text-sm font-semibold text-maroon dark:text-gold">
          Why can rank and decimal be different?
        </p>

        <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
          The displayed binary string follows the visual
          left-to-right order of the Laghu/Guru pattern.
          Pingala ranking, however, treats the first
          syllable position as the least-significant
          position. Therefore the Pingala rank and the
          ordinary binary decimal value are related
          representations, but they are not necessarily
          the same number.
        </p>

        <div className="mt-4 rounded-lg bg-white p-3 font-mono text-sm text-ink dark:bg-stone-900 dark:text-stone-200">
          <p>
            Pingala rank =
            1 + Σ(G-position × 2^position)
          </p>

          <p className="mt-2">
            Binary decimal =
            int(binary, 2)
          </p>
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   DETAIL CARD
========================================================= */

function BinaryDetail({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-stone-200
        bg-white
        p-4
        transition-colors

        dark:border-stone-700
        dark:bg-stone-800
      "
    >
      <p className="text-xs text-stone-500 dark:text-stone-400">
        {label}
      </p>

      <p className="mt-1 break-all font-mono text-lg font-bold text-maroon dark:text-gold">
        {value}
      </p>
    </div>
  );
}