import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowLeftRight,
  Loader2,
} from "lucide-react";

import axios from "axios";
import api from "../services/api";

interface RankResult {
  pattern: string;
  length: number;
  binary: string;
  decimal: number;
  rank: number;
  zero_based_rank: number;
  laghu_count: number;
  guru_count: number;
}

interface UnrankResult {
  pattern: string;
  length: number;
  binary: string;
  decimal: number;
  rank: number;
  zero_based_rank: number;
  laghu_count: number;
  guru_count: number;
}

export default function RankPage() {
  const [pattern, setPattern] = useState("GGL");

  const [n, setN] = useState("3");
  const [rank, setRank] = useState("6");

  const [rankResult, setRankResult] =
    useState<RankResult | null>(null);

  const [unrankResult, setUnrankResult] =
    useState<UnrankResult | null>(null);

  const [loadingRank, setLoadingRank] =
    useState(false);

  const [loadingUnrank, setLoadingUnrank] =
    useState(false);

  const [error, setError] = useState("");

  const calculateRank = async () => {
    setError("");
    setRankResult(null);

    if (!pattern.trim()) {
      setError("Please enter a pattern.");
      return;
    }

    try {
      setLoadingRank(true);

      const response = await api.post<RankResult>(
        "/encoding/rank",
        {
          pattern,
        }
      );

      setRankResult(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ||
            "Unable to calculate rank."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoadingRank(false);
    }
  };

  const calculateUnrank = async () => {
    setError("");
    setUnrankResult(null);

    const length = Number(n);
    const position = Number(rank);

    if (
      !Number.isInteger(length) ||
      length < 0 ||
      length > 20
    ) {
      setError(
        "Pattern length must be an integer between 0 and 20."
      );
      return;
    }

    if (
      !Number.isInteger(position) ||
      position < 1
    ) {
      setError("Rank must be an integer starting from 1.");
      return;
    }

    try {
      setLoadingUnrank(true);

      const response =
        await api.post<UnrankResult>(
          "/encoding/unrank",
          {
            n: length,
            rank: position,
          }
        );

      setUnrankResult(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ||
            "Unable to calculate pattern."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoadingUnrank(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <section>
        <p className="text-sm font-semibold uppercase tracking-widest text-maroon">
          Indexing
        </p>

        <h1 className="mt-2 text-4xl font-bold text-ink">
          Rank / Unrank
        </h1>

        <p className="mt-3 max-w-2xl leading-7 text-stone-600">
          Convert a Laghu/Guru pattern into its Pingala
          rank, or reconstruct a pattern from its rank.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Rank */}
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-maroon text-white">
              <ArrowDown size={20} />
            </div>

            <div>
              <h2 className="font-bold text-ink">
                Pattern → Rank
              </h2>

              <p className="text-xs text-stone-500">
                Find the Pingala position of a pattern.
              </p>
            </div>
          </div>

          <label
            htmlFor="rank-pattern"
            className="mt-6 block text-sm font-semibold text-ink"
          >
            Pattern
          </label>

          <input
            id="rank-pattern"
            value={pattern}
            onChange={(event) =>
              setPattern(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                calculateRank();
              }
            }}
            placeholder="GGL"
            className="mt-2 w-full rounded-xl border border-stone-300 bg-parchment px-4 py-3 font-mono text-lg uppercase outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/20"
          />

          <button
            onClick={calculateRank}
            disabled={loadingRank}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-maroon px-5 py-3 font-semibold text-white hover:bg-maroon/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingRank && (
              <Loader2
                size={17}
                className="animate-spin"
              />
            )}

            Calculate Rank
          </button>

          {rankResult && (
            <ResultBox>
              <ResultLine
                label="Pattern"
                value={rankResult.pattern}
              />

              <ResultLine
                label="Binary"
                value={rankResult.binary}
              />

              <ResultLine
                label="Decimal"
                value={rankResult.decimal}
              />

              <ResultLine
                label="Zero-Based Rank"
                value={rankResult.zero_based_rank}
              />

              <ResultLine
                label="Rank"
                value={rankResult.rank}
              />

              <ResultLine
                label="Laghu"
                value={rankResult.laghu_count}
              />

              <ResultLine
                label="Guru"
                value={rankResult.guru_count}
              />
            </ResultBox>
          )}
        </section>

        {/* Unrank */}
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-ink">
              <ArrowUp size={20} />
            </div>

            <div>
              <h2 className="font-bold text-ink">
                Rank → Pattern
              </h2>

              <p className="text-xs text-stone-500">
                Reconstruct a pattern from its Pingala rank.
              </p>
            </div>
          </div>

          <label
            htmlFor="pattern-length"
            className="mt-6 block text-sm font-semibold text-ink"
          >
            Pattern Length
          </label>

          <input
            id="pattern-length"
            type="number"
            min="0"
            max="20"
            value={n}
            onChange={(event) =>
              setN(event.target.value)
            }
            className="mt-2 w-full rounded-xl border border-stone-300 bg-parchment px-4 py-3 outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/20"
          />

          <label
            htmlFor="pattern-rank"
            className="mt-4 block text-sm font-semibold text-ink"
          >
            Rank
          </label>

          <input
            id="pattern-rank"
            type="number"
            min="1"
            value={rank}
            onChange={(event) =>
              setRank(event.target.value)
            }
            className="mt-2 w-full rounded-xl border border-stone-300 bg-parchment px-4 py-3 outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/20"
          />

          <p className="mt-2 text-xs text-stone-500">
            Rank is 1-based. For length n, valid ranks are
            1 through 2ⁿ.
          </p>

          <button
            onClick={calculateUnrank}
            disabled={loadingUnrank}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 font-semibold text-ink hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingUnrank && (
              <Loader2
                size={17}
                className="animate-spin"
              />
            )}

            Calculate Pattern
          </button>

          {unrankResult && (
            <ResultBox>
              <ResultLine
                label="Pattern"
                value={unrankResult.pattern}
              />

              <ResultLine
                label="Binary"
                value={unrankResult.binary}
              />

              <ResultLine
                label="Decimal"
                value={unrankResult.decimal}
              />

              <ResultLine
                label="Zero-Based Rank"
                value={unrankResult.zero_based_rank}
              />

              <ResultLine
                label="Rank"
                value={unrankResult.rank}
              />

              <ResultLine
                label="Laghu"
                value={unrankResult.laghu_count}
              />

              <ResultLine
                label="Guru"
                value={unrankResult.guru_count}
              />
            </ResultBox>
          )}
        </section>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Explanation */}
      <section className="rounded-2xl bg-maroon p-6 text-white">
        <div className="flex items-center gap-3">
          <ArrowLeftRight
            size={22}
            className="text-gold"
          />

          <h2 className="text-xl font-bold">
            The computational relationship
          </h2>
        </div>

        <p className="mt-4 text-sm leading-7 text-white/75">
          Laghu is represented as 0 and Guru as 1. The
          binary representation provides the decimal value
          of the pattern, while Pingala ranking treats the
          first syllable as the least-significant position.
          Therefore the decimal value and Pingala rank can
          differ.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-black/20 p-4 text-center">
            <p className="text-xs text-white/60">
              Pattern
            </p>
            <p className="mt-1 font-mono text-lg">
              LGL
            </p>
          </div>

          <div className="rounded-xl bg-black/20 p-4 text-center">
            <p className="text-xs text-white/60">
              Binary
            </p>
            <p className="mt-1 font-mono text-lg">
              010
            </p>
          </div>

          <div className="rounded-xl bg-black/20 p-4 text-center">
            <p className="text-xs text-white/60">
              Rank
            </p>
            <p className="mt-1 font-mono text-lg">
              3
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ResultBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 rounded-xl bg-stone-50 p-4">
      {children}
    </div>
  );
}

function ResultLine({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-stone-200 py-2 last:border-0">
      <span className="text-sm text-stone-500">
        {label}
      </span>

      <span className="font-mono font-bold text-maroon">
        {value}
      </span>
    </div>
  );
}