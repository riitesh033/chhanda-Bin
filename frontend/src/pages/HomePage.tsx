import {
  ArrowRight,
  Binary,
  BookOpen,
  Calculator,
  GitBranch,
  Grid3X3,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 text-ink dark:text-stone-100">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden rounded-3xl bg-maroon px-6 py-12 text-white shadow-xl sm:px-10 md:px-14 md:py-16">

        {/* Decorative background */}

        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">

          {/* Hero text */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-gold">

              <Sparkles size={16} />

              Computational Sanskrit Prosody

            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Chhanda-Bin
            </h1>

            <p className="mt-4 text-xl font-medium text-white/90 sm:text-2xl">
              Explore Chhanda through computation.
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/70 sm:text-base">
              Chhanda-Bin transforms Laghu/Guru patterns
              into binary representations and connects
              classical Sanskrit prosody with pattern
              generation, ranking, combinatorics, and
              Meru-Prastāra.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <a
                href="/encoder"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 font-semibold text-ink transition hover:bg-gold/90"
              >
                Try the Encoder

                <ArrowRight size={18} />
              </a>

              <a
                href="/learn"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
              >
                Learn the Concepts

                <BookOpen size={18} />
              </a>

            </div>

          </div>


          {/* Hero visualization */}

          <div className="hidden lg:block">

            <BinaryHero />

          </div>

        </div>

      </section>


      {/* =====================================================
          CORE IDEA
      ===================================================== */}

      <section>

        <SectionHeading
          eyebrow="The Core Idea"
          title="A classical pattern becomes a computational object"
          description="The two metrical states Laghu and Guru create a natural binary representation."
        />

        <div className="mt-7 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900 md:p-8">

          <div className="grid gap-5 md:grid-cols-5 md:items-center">

            <FlowCard
              label="Laghu"
              value="L"
              subvalue="0"
            />

            <FlowArrow />

            <FlowCard
              label="Guru"
              value="G"
              subvalue="1"
            />

            <FlowArrow />

            <FlowCard
              label="Binary"
              value="01"
              subvalue="Computable"
            />

          </div>

          <div className="mt-8 rounded-xl bg-stone-50 p-5 text-center dark:bg-stone-800">

            <p className="font-mono text-lg font-bold text-maroon dark:text-gold">
              LGGL → 0110₂ → 6₁₀
            </p>

            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
              One pattern can be represented, ranked,
              analysed, and reconstructed computationally.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section>

        <SectionHeading
          eyebrow="Interactive Tools"
          title="Explore the computational system"
          description="Each module focuses on a different part of the relationship between prosody and computation."
        />

        <div className="mt-7 grid gap-5 sm:grid-cols-2">

          <FeatureCard
            icon={<Binary size={22} />}
            title="Binary Encoder"
            description="Convert any Laghu/Guru sequence into its binary and decimal representation."
            href="/encoder"
            action="Open Encoder"
          />

          <FeatureCard
            icon={<Grid3X3 size={22} />}
            title="Pattern Generator"
            description="Generate every possible Laghu/Guru pattern for a chosen number of positions."
            href="/patterns"
            action="Generate Patterns"
          />

          <FeatureCard
            icon={<Calculator size={22} />}
            title="Rank / Unrank"
            description="Move between a pattern and its numerical position in the generated ordering."
            href="/rank"
            action="Explore Ranking"
          />

          <FeatureCard
            icon={<GitBranch size={22} />}
            title="Meru-Prastāra"
            description="Explore binomial coefficients and their connection to counting patterns with a fixed number of Gurus."
            href="/meru"
            action="Explore Meru"
          />

        </div>

      </section>


      {/* =====================================================
          WORKFLOW
      ===================================================== */}

      <section>

        <SectionHeading
          eyebrow="How Chhanda-Bin Works"
          title="From syllables to combinatorics"
          description="The project connects several computational ideas into one workflow."
        />

        <div className="mt-7 grid gap-4 md:grid-cols-5">

          <WorkflowStep
            number="01"
            title="Pattern"
            value="LGGL"
          />

          <WorkflowStep
            number="02"
            title="Encoding"
            value="0110"
          />

          <WorkflowStep
            number="03"
            title="Decimal"
            value="6"
          />

          <WorkflowStep
            number="04"
            title="Rank"
            value="7"
          />

          <WorkflowStep
            number="05"
            title="Count"
            value="C(n,k)"
          />

        </div>

      </section>


      {/* =====================================================
          COMBINATORICS
      ===================================================== */}

      <section className="rounded-3xl bg-stone-900 p-7 text-white dark:bg-stone-950 md:p-10">

        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-gold">
              The Mathematical Connection
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Counting patterns with Meru-Prastāra
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/65">
              For n positions, every position can independently
              be Laghu or Guru. Therefore there are 2ⁿ total
              patterns.
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-8 text-white/65">
              If exactly k positions must be Guru, we choose
              those k positions from n positions.
            </p>

            <div className="mt-6 rounded-xl bg-white/5 p-5 text-center font-mono text-2xl font-bold text-gold">
              C(n,k) = n! / (k!(n-k)!)
            </div>

            <div className="mt-6">
              <a
                href="/meru"
                className="inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-ink transition hover:bg-gold/90"
              >
                Explore the Mathematics

                <ArrowRight size={17} />
              </a>
            </div>

          </div>


          {/* Mini Meru */}

          <MiniMeru />

        </div>

      </section>


      {/* =====================================================
          LEARN CTA
      ===================================================== */}

      <section className="rounded-2xl border border-gold/40 bg-gold/10 p-7 dark:bg-gold/5 md:p-9">

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-maroon dark:text-gold">
              Start Learning
            </p>

            <h2 className="mt-2 text-2xl font-bold text-ink dark:text-white">
              Understand the idea behind the tools
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-stone-600 dark:text-stone-300">
              Learn how Laghu/Guru patterns, binary encoding,
              Prastāra, ranking, and Meru-Prastāra connect
              together.
            </p>

          </div>

          <a
            href="/learn"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-maroon px-6 py-3 font-semibold text-white transition hover:bg-maroon/90 dark:bg-gold dark:text-ink dark:hover:bg-gold/90"
          >
            Open Learn

            <ArrowRight size={18} />
          </a>

        </div>

      </section>

    </div>
  );
}


/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>

      <p className="text-sm font-semibold uppercase tracking-widest text-maroon dark:text-gold">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-bold text-ink dark:text-white md:text-3xl">
        {title}
      </h2>

      <p className="mt-2 max-w-3xl text-sm leading-7 text-stone-500 dark:text-stone-400">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   BINARY HERO
========================================================= */

function BinaryHero() {
  const pattern = "LGGL";
  const binary = "0110";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">

      <p className="text-xs font-semibold uppercase tracking-widest text-gold">
        Pattern → Binary
      </p>

      <div className="mt-6 space-y-5">

        <BinaryRow
          label="Pattern"
          values={pattern.split("")}
        />

        <div className="flex justify-center text-white/30">
          ↓
        </div>

        <BinaryRow
          label="Binary"
          values={binary.split("")}
          binary
        />

      </div>

      <div className="mt-6 rounded-xl bg-black/20 p-4 text-center font-mono text-sm">
        0110₂ = 6₁₀
      </div>

    </div>
  );
}


/* =========================================================
   BINARY ROW
========================================================= */

function BinaryRow({
  label,
  values,
  binary = false,
}: {
  label: string;
  values: string[];
  binary?: boolean;
}) {
  return (
    <div>

      <p className="mb-2 text-xs text-white/50">
        {label}
      </p>

      <div className="flex gap-2">

        {values.map((value, index) => (
          <div
            key={index}
            className={`flex h-12 w-12 items-center justify-center rounded-xl font-mono font-bold ${
              binary
                ? value === "1"
                  ? "bg-gold text-ink"
                  : "bg-white/10 text-white"
                : value === "G"
                  ? "bg-gold text-ink"
                  : "bg-white/10 text-white"
            }`}
          >
            {value}
          </div>
        ))}

      </div>

    </div>
  );
}


/* =========================================================
   FLOW CARD
========================================================= */

function FlowCard({
  label,
  value,
  subvalue,
}: {
  label: string;
  value: string;
  subvalue: string;
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 p-5 text-center dark:border-stone-700 dark:bg-stone-800">

      <p className="text-xs text-stone-500 dark:text-stone-400">
        {label}
      </p>

      <p className="mt-2 font-mono text-2xl font-bold text-maroon dark:text-gold">
        {value}
      </p>

      <p className="mt-1 text-xs text-stone-400 dark:text-stone-500">
        {subvalue}
      </p>

    </div>
  );
}


/* =========================================================
   FLOW ARROW
========================================================= */

function FlowArrow() {
  return (
    <div className="hidden justify-center text-stone-400 md:flex">
      →
    </div>
  );
}


/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({
  icon,
  title,
  description,
  href,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <a
      href={href}
      className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-maroon/30 hover:shadow-lg dark:border-stone-700 dark:bg-stone-900 dark:hover:border-gold/40"
    >

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-maroon text-white dark:bg-gold dark:text-ink">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold text-ink group-hover:text-maroon dark:text-white dark:group-hover:text-gold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-stone-500 dark:text-stone-400">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-maroon dark:text-gold">
        {action}

        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>

    </a>
  );
}


/* =========================================================
   WORKFLOW STEP
========================================================= */

function WorkflowStep({
  number,
  title,
  value,
}: {
  number: string;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">

      <p className="text-xs font-bold text-maroon dark:text-gold">
        {number}
      </p>

      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        {title}
      </p>

      <p className="mt-2 font-mono text-xl font-bold text-ink dark:text-white">
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   MINI MERU
========================================================= */

function MiniMeru() {
  const rows = [
    [1],
    [1, 1],
    [1, 2, 1],
    [1, 3, 3, 1],
    [1, 4, 6, 4, 1],
  ];

  return (
    <div className="rounded-3xl bg-white/5 p-6">

      <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/40">
        Meru-Prastāra
      </p>

      <div className="mt-6 space-y-2">

        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center gap-2"
          >
            {row.map((value, index) => (
              <div
                key={index}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 font-mono text-sm font-bold text-white"
              >
                {value}
              </div>
            ))}
          </div>
        ))}

      </div>

    </div>
  );
}