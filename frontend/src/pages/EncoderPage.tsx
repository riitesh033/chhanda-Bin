import { useState } from "react";
import {
  Binary,
  Calculator,
  CheckCircle2,
  Hash,
  Loader2,
  RefreshCw,
  ArrowDown,
} from "lucide-react";

import axios from "axios";
import api from "../services/api";

interface EncodingResult {
  pattern: string;
  length: number;
  binary: string;
  decimal: number;
  rank: number;
  zero_based_rank: number;
  laghu_count: number;
  guru_count: number;
}

export default function EncodingPage() {
  const [pattern, setPattern] = useState("");
  const [n, setN] = useState("4");
  const [rank, setRank] = useState("1");

  const [rankResult, setRankResult] =
    useState<EncodingResult | null>(null);

  const [unrankResult, setUnrankResult] =
    useState<EncodingResult | null>(null);

  const [rankLoading, setRankLoading] =
    useState(false);

  const [unrankLoading, setUnrankLoading] =
    useState(false);

  const [rankError, setRankError] =
    useState("");

  const [unrankError, setUnrankError] =
    useState("");

  /* =========================================================
     RANK
  ========================================================= */

  const calculateRank = async () => {
    setRankError("");
    setRankResult(null);

    const normalized = pattern
      .toUpperCase()
      .replace(/\s/g, "");

    if (!normalized) {
      setRankError(
        "Please enter a Laghu/Guru pattern."
      );
      return;
    }

    if (!/^[LG]+$/.test(normalized)) {
      setRankError(
        "Pattern can contain only L and G."
      );
      return;
    }

    try {
      setRankLoading(true);

      const response =
        await api.post<EncodingResult>(
          "/encoding/rank",
          {
            pattern: normalized,
          }
        );

      setRankResult(response.data);
      setPattern(normalized);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setRankError(
          error.response?.data?.detail ||
            "Unable to calculate pattern rank."
        );
      } else {
        setRankError("An unexpected error occurred.");
      }
    } finally {
      setRankLoading(false);
    }
  };

  /* =========================================================
     UNRANK
  ========================================================= */

  const calculateUnrank = async () => {
    setUnrankError("");
    setUnrankResult(null);

    const length = Number(n);
    const requestedRank = Number(rank);

    if (
      !Number.isInteger(length) ||
      length < 0 ||
      length > 20
    ) {
      setUnrankError(
        "Length must be an integer between 0 and 20."
      );
      return;
    }

    if (
      !Number.isInteger(requestedRank) ||
      requestedRank < 1
    ) {
      setUnrankError(
        "Rank must be a positive integer."
      );
      return;
    }

    const totalPatterns = 2 ** length;

    if (requestedRank > totalPatterns) {
      setUnrankError(
        `Rank must be between 1 and ${totalPatterns} for n=${length}.`
      );
      return;
    }

    try {
      setUnrankLoading(true);

      const response =
        await api.post<EncodingResult>(
          "/encoding/unrank",
          {
            n: length,
            rank: requestedRank,
          }
        );

      setUnrankResult(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setUnrankError(
          error.response?.data?.detail ||
            "Unable to decode rank."
        );
      } else {
        setUnrankError("An unexpected error occurred.");
      }
    } finally {
      setUnrankLoading(false);
    }
  };

  /* =========================================================
     RESET
  ========================================================= */

  const clearAll = () => {
    setPattern("");
    setN("4");
    setRank("1");

    setRankResult(null);
    setUnrankResult(null);

    setRankError("");
    setUnrankError("");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 text-ink dark:text-stone-100">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section>
        <p className="text-sm font-semibold uppercase tracking-widest text-maroon dark:text-gold">
          Pingala Encoding
        </p>

        <h1 className="mt-2 text-4xl font-bold text-ink dark:text-white">
          Rank &amp; Unrank
        </h1>

        <p className="mt-3 max-w-3xl leading-7 text-stone-600 dark:text-stone-300">
          Convert Laghu/Guru patterns into their
          Pingala rank and reconstruct a pattern
          from its rank.
        </p>
      </section>

      {/* =====================================================
          CONCEPT
      ===================================================== */}

      <section className="rounded-2xl border border-gold/40 bg-gold/10 p-6 dark:bg-gold/5">

        <p className="text-xs font-semibold uppercase tracking-widest text-maroon dark:text-gold">
          Encoding model
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">

          <ConceptCard
            icon={<CheckCircle2 size={20} />}
            label="Laghu"
            value="L = 0"
          />

          <ConceptCard
            icon={<Binary size={20} />}
            label="Guru"
            value="G = 1"
          />

          <ConceptCard
            icon={<Hash size={20} />}
            label="Rank"
            value="Zero-based + 1"
          />

        </div>

      </section>

      {/* =====================================================
          TWO OPERATIONS
      ===================================================== */}

      <div className="grid gap-8 lg:grid-cols-2">

        {/* ===================================================
            RANK
        =================================================== */}

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900">

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-maroon dark:text-gold">
              Forward operation
            </p>

            <h2 className="mt-2 text-2xl font-bold text-ink dark:text-white">
              Pattern → Rank
            </h2>

            <p className="mt-2 text-sm leading-6 text-stone-500 dark:text-stone-400">
              Enter a Laghu/Guru pattern to calculate
              its binary representation, decimal value,
              and Pingala rank.
            </p>
          </div>

          <label
            htmlFor="pattern"
            className="mt-6 block text-sm font-semibold text-ink dark:text-stone-100"
          >
            Laghu/Guru Pattern
          </label>

          <input
            id="pattern"
            type="text"
            value={pattern}
            onChange={(event) =>
              setPattern(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                calculateRank();
              }
            }}
            placeholder="Example: LGLG"
            className="mt-2 w-full rounded-xl border border-stone-300 bg-parchment px-4 py-3 font-mono text-lg uppercase tracking-widest text-ink outline-none transition focus:border-maroon focus:ring-2 focus:ring-maroon/20 dark:border-stone-600 dark:bg-stone-800 dark:text-white"
          />

          <button
            type="button"
            onClick={calculateRank}
            disabled={rankLoading}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-maroon px-5 py-3 font-semibold text-white transition hover:bg-maroon/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {rankLoading ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              <Calculator size={18} />
            )}

            {rankLoading
              ? "Calculating..."
              : "Calculate Rank"}
          </button>

          {rankError && (
            <ErrorMessage message={rankError} />
          )}

          {rankResult && (
            <EncodingResultCard
              result={rankResult}
              title="Rank Result"
            />
          )}

        </section>

        {/* ===================================================
            UNRANK
        =================================================== */}

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900">

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-maroon dark:text-gold">
              Reverse operation
            </p>

            <h2 className="mt-2 text-2xl font-bold text-ink dark:text-white">
              Rank → Pattern
            </h2>

            <p className="mt-2 text-sm leading-6 text-stone-500 dark:text-stone-400">
              Enter the number of syllable positions
              and a valid rank to reconstruct the
              corresponding pattern.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">

            <div>
              <label
                htmlFor="n"
                className="block text-sm font-semibold text-ink dark:text-stone-100"
              >
                Length
              </label>

              <input
                id="n"
                type="number"
                min="0"
                max="20"
                value={n}
                onChange={(event) =>
                  setN(event.target.value)
                }
                className="mt-2 w-full rounded-xl border border-stone-300 bg-parchment px-4 py-3 font-mono text-lg text-ink outline-none transition focus:border-maroon focus:ring-2 focus:ring-maroon/20 dark:border-stone-600 dark:bg-stone-800 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="rank"
                className="block text-sm font-semibold text-ink dark:text-stone-100"
              >
                One-based Rank
              </label>

              <input
                id="rank"
                type="number"
                min="1"
                value={rank}
                onChange={(event) =>
                  setRank(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    calculateUnrank();
                  }
                }}
                className="mt-2 w-full rounded-xl border border-stone-300 bg-parchment px-4 py-3 font-mono text-lg text-ink outline-none transition focus:border-maroon focus:ring-2 focus:ring-maroon/20 dark:border-stone-600 dark:bg-stone-800 dark:text-white"
              />
            </div>

          </div>

          <button
            type="button"
            onClick={calculateUnrank}
            disabled={unrankLoading}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-maroon px-5 py-3 font-semibold text-white transition hover:bg-maroon/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {unrankLoading ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              <RefreshCw size={18} />
            )}

            {unrankLoading
              ? "Decoding..."
              : "Generate Pattern"}
          </button>

          {unrankError && (
            <ErrorMessage message={unrankError} />
          )}

          {unrankResult && (
            <EncodingResultCard
              result={unrankResult}
              title="Unrank Result"
            />
          )}

        </section>

      </div>

      {/* =====================================================
          TRANSFORMATION
      ===================================================== */}

      {(rankResult || unrankResult) && (
        <section className="rounded-2xl bg-maroon p-6 text-white">

          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            Binary transformation
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Laghu/Guru ↔ Binary
          </h2>

          <div className="mt-6 flex flex-col items-center gap-4">

            <div className="flex flex-wrap justify-center gap-2">
              {(rankResult || unrankResult)!
                .pattern
                .split("")
                .map((symbol, index) => (
                  <span
                    key={index}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl font-mono text-lg font-bold ${
                      symbol === "G"
                        ? "bg-gold text-maroon"
                        : "bg-white/15 text-white"
                    }`}
                  >
                    {symbol}
                  </span>
                ))}
            </div>

            <ArrowDown size={22} />

            <div className="flex flex-wrap justify-center gap-2">
              {(rankResult || unrankResult)!
                .binary
                .split("")
                .map((bit, index) => (
                  <span
                    key={index}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl font-mono text-lg font-bold ${
                      bit === "1"
                        ? "bg-gold text-maroon"
                        : "bg-white/15 text-white"
                    }`}
                  >
                    {bit}
                  </span>
                ))}
            </div>

            <p className="font-mono text-lg text-gold">
              {(rankResult || unrankResult)!.binary}
              <sub>2</sub>
              {" = "}
              {(rankResult || unrankResult)!.decimal}
              <sub>10</sub>
            </p>

          </div>

        </section>
      )}

      {/* =====================================================
          CLEAR
      ===================================================== */}

      {(rankResult || unrankResult) && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={clearAll}
            className="rounded-xl border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-600 transition hover:border-maroon hover:text-maroon dark:border-stone-600 dark:text-stone-300 dark:hover:border-gold dark:hover:text-gold"
          >
            Clear Results
          </button>
        </div>
      )}

    </div>
  );
}


/* =========================================================
   CONCEPT CARD
========================================================= */

function ConceptCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gold/30 bg-white p-4 dark:bg-stone-900">

      <div className="text-maroon dark:text-gold">
        {icon}
      </div>

      <div>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          {label}
        </p>

        <p className="font-mono font-bold text-ink dark:text-stone-100">
          {value}
        </p>
      </div>

    </div>
  );
}


/* =========================================================
   RESULT CARD
========================================================= */

function EncodingResultCard({
  result,
  title,
}: {
  result: EncodingResult;
  title: string;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-gold/40 bg-gold/10 p-5 dark:bg-gold/5">

      <div className="flex items-center gap-2">
        <CheckCircle2
          size={18}
          className="text-maroon dark:text-gold"
        />

        <h3 className="font-bold text-ink dark:text-white">
          {title}
        </h3>
      </div>

      <div className="mt-5">

        <p className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Pattern
        </p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {result.pattern
            .split("")
            .map((symbol, index) => (
              <span
                key={index}
                className={`flex h-9 w-9 items-center justify-center rounded-lg font-mono font-bold ${
                  symbol === "G"
                    ? "bg-maroon text-white"
                    : "bg-stone-200 text-ink dark:bg-stone-700 dark:text-white"
                }`}
              >
                {symbol}
              </span>
            ))}
        </div>

      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">

        <ResultItem
          label="Binary"
          value={result.binary}
        />

        <ResultItem
          label="Decimal"
          value={result.decimal}
        />

        <ResultItem
          label="One-based Rank"
          value={result.rank}
        />

        <ResultItem
          label="Zero-based Rank"
          value={result.zero_based_rank}
        />

        <ResultItem
          label="Laghu Count"
          value={result.laghu_count}
        />

        <ResultItem
          label="Guru Count"
          value={result.guru_count}
        />

      </div>

    </div>
  );
}


/* =========================================================
   RESULT ITEM
========================================================= */

function ResultItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-3 dark:border-stone-700 dark:bg-stone-800">

      <p className="text-xs text-stone-500 dark:text-stone-400">
        {label}
      </p>

      <p className="mt-1 break-all font-mono font-bold text-maroon dark:text-gold">
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   ERROR
========================================================= */

function ErrorMessage({
  message,
}: {
  message: string;
}) {
  return (
    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
      {message}
    </div>
  );
}