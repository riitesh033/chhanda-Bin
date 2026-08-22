import {
  BookOpen,
  Binary,
  Calculator,
  GitBranch,
  Grid3X3,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 text-ink dark:text-stone-100">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section>
        <p className="text-sm font-semibold uppercase tracking-widest text-maroon dark:text-gold">
          Learn Chhanda-Bin
        </p>

        <h1 className="mt-2 text-4xl font-bold text-ink dark:text-white">
          From Sanskrit Prosody to Computation
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600 dark:text-stone-300">
          Chhanda-Bin explores an important computational
          connection between classical Laghu/Guru patterns,
          binary numbers, combinatorics, and Meru-Prastāra.
        </p>
      </section>


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900 md:p-8">

        <div className="flex items-start gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-maroon text-white">
            <BookOpen size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-ink dark:text-white">
              What is Chhanda?
            </h2>

            <p className="mt-3 leading-8 text-stone-600 dark:text-stone-300">
              Chhanda, or Sanskrit prosody, is the study of
              poetic metre. A metre can be described by the
              sequence of light and heavy syllables occurring
              in a verse.
            </p>

            <p className="mt-3 leading-8 text-stone-600 dark:text-stone-300">
              In computational terms, these two states can be
              represented using two symbols: Laghu and Guru.
              This creates a natural connection with binary
              representation.
            </p>
          </div>

        </div>

      </section>


      {/* =====================================================
          LAGHU / GURU
      ===================================================== */}

      <section>

        <SectionHeading
          icon={<Grid3X3 size={21} />}
          title="1. Laghu and Guru"
          subtitle="The two fundamental states of a metrical position."
        />

        <div className="mt-5 grid gap-5 md:grid-cols-2">

          <ConceptCard
            title="Laghu"
            symbol="L"
            value="0"
            description="Laghu represents a light syllable. In Chhanda-Bin, it is computationally represented as binary 0."
            light
          />

          <ConceptCard
            title="Guru"
            symbol="G"
            value="1"
            description="Guru represents a heavy syllable. In Chhanda-Bin, it is computationally represented as binary 1."
          />

        </div>

      </section>


      {/* =====================================================
          BINARY ENCODING
      ===================================================== */}

      <section>

        <SectionHeading
          icon={<Binary size={21} />}
          title="2. Binary Representation"
          subtitle="Every Laghu/Guru sequence can be interpreted as a binary number."
        />

        <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900">

          <div className="grid gap-6 md:grid-cols-3">

            <Step
              number="01"
              title="Start with the pattern"
              value="LGLG"
            />

            <Step
              number="02"
              title="Replace L and G"
              value="0101"
            />

            <Step
              number="03"
              title="Convert to decimal"
              value="5"
            />

          </div>

          <div className="mt-7 rounded-xl bg-stone-50 p-5 text-center dark:bg-stone-800">

            <p className="font-mono text-lg font-bold text-maroon dark:text-gold">
              LGLG → 0101₂ → 5₁₀
            </p>

            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
              L = 0 and G = 1
            </p>

          </div>

          <div className="mt-5 flex justify-end">
            <LinkButton
              href="/encoder"
              label="Try the Encoder"
            />
          </div>

        </div>

      </section>


      {/* =====================================================
          PRĀSTĀRA
      ===================================================== */}

      <section>

        <SectionHeading
          icon={<GitBranch size={21} />}
          title="3. Pingala's Prastāra"
          subtitle="Systematically generating all possible Laghu/Guru patterns."
        />

        <div className="mt-5 rounded-2xl bg-maroon p-6 text-white md:p-8">

          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Example
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            Patterns of length 3
          </h3>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">

            {[
              "LLL",
              "LLG",
              "LGL",
              "LGG",
              "GLL",
              "GLG",
              "GGL",
              "GGG",
            ].map((pattern) => (
              <div
                key={pattern}
                className="rounded-xl bg-white/10 p-3 text-center font-mono font-bold"
              >
                {pattern}
              </div>
            ))}

          </div>

          <p className="mt-6 text-sm leading-7 text-white/75">
            There are two choices at every position: Laghu or
            Guru. Therefore, for n positions, the complete
            pattern space contains 2ⁿ possibilities.
          </p>

          <div className="mt-5 text-center text-2xl font-bold text-gold">
            Total patterns = 2ⁿ
          </div>

          <div className="mt-6 flex justify-end">
            <LinkButton
              href="/patterns"
              label="Generate Patterns"
              dark
            />
          </div>

        </div>

      </section>


      {/* =====================================================
          RANK / UNRANK
      ===================================================== */}

      <section>

        <SectionHeading
          icon={<Calculator size={21} />}
          title="4. Rank and Unrank"
          subtitle="Convert between a pattern and its numerical position."
        />

        <div className="mt-5 grid gap-5 md:grid-cols-2">

          <ExplanationCard
            title="Rank"
            description="Rank converts a Laghu/Guru pattern into its position in the generated ordering."
            example="GGL → 110₂ → 6"
            direction="Pattern → Rank"
          />

          <ExplanationCard
            title="Unrank"
            description="Unrank performs the reverse operation: given a length and rank, reconstruct the corresponding pattern."
            example="Rank 6 → GGL"
            direction="Rank → Pattern"
          />

        </div>

        <div className="mt-5 flex justify-end">
          <LinkButton
            href="/rank"
            label="Try Rank / Unrank"
          />
        </div>

      </section>


      {/* =====================================================
          MERU
      ===================================================== */}

      <section>

        <SectionHeading
          icon={<Grid3X3 size={21} />}
          title="5. Meru-Prastāra"
          subtitle="The triangular arrangement of binomial coefficients."
        />

        <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900">

          <p className="leading-8 text-stone-600 dark:text-stone-300">
            Meru-Prastāra is a triangular numerical structure
            whose entries correspond to binomial coefficients.
            The value
          </p>

          <div className="my-6 text-center font-mono text-2xl font-bold text-maroon dark:text-gold">
            C(n,k)
          </div>

          <p className="leading-8 text-stone-600 dark:text-stone-300">
            tells us how many patterns of length n contain
            exactly k Guru positions.
          </p>

          <div className="mt-6 overflow-x-auto">

            <div className="min-w-[500px] space-y-2 text-center font-mono">

              <MeruRow values={[1]} />

              <MeruRow values={[1, 1]} />

              <MeruRow values={[1, 2, 1]} />

              <MeruRow values={[1, 3, 3, 1]} />

              <MeruRow values={[1, 4, 6, 4, 1]} />

            </div>

          </div>

          <div className="mt-6 rounded-xl bg-stone-50 p-5 dark:bg-stone-800">

            <p className="text-center font-mono text-lg font-bold text-maroon dark:text-gold">
              C(4,2) = 6
            </p>

            <p className="mt-2 text-center text-sm text-stone-500 dark:text-stone-400">
              There are exactly six length-4 patterns containing
              two Guru positions.
            </p>

          </div>

          <div className="mt-5 flex justify-end">
            <LinkButton
              href="/meru"
              label="Explore Meru-Prastāra"
            />
          </div>

        </div>

      </section>


      {/* =====================================================
          KEY INSIGHT
      ===================================================== */}

      <section className="rounded-2xl border border-gold/40 bg-gold/10 p-6 dark:bg-gold/5 md:p-8">

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-maroon text-white">
            <Lightbulb size={22} />
          </div>

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-maroon dark:text-gold">
              Key Computational Insight
            </p>

            <h2 className="mt-2 text-2xl font-bold text-ink dark:text-white">
              Chhanda becomes a binary combinatorial system
            </h2>

            <div className="mt-5 space-y-3 text-sm leading-7 text-stone-600 dark:text-stone-300">

              <p>
                <strong>Laghu</strong> can be represented as
                0.
              </p>

              <p>
                <strong>Guru</strong> can be represented as
                1.
              </p>

              <p>
                Therefore, every metrical pattern corresponds
                to a binary string.
              </p>

              <p>
                Binary strings can be ranked, unranked,
                counted, generated, and analysed using
                standard computational techniques.
              </p>

              <p>
                When the number of Guru positions is fixed,
                the problem becomes a binomial coefficient
                problem represented by Meru-Prastāra.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          QUICK NAVIGATION
      ===================================================== */}

      <section>

        <h2 className="text-xl font-bold text-ink dark:text-white">
          Explore the interactive tools
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <QuickLink
            href="/encoder"
            title="Encoder"
            description="Convert L/G to binary."
          />

          <QuickLink
            href="/patterns"
            title="Patterns"
            description="Generate all patterns."
          />

          <QuickLink
            href="/rank"
            title="Rank / Unrank"
            description="Convert patterns and ranks."
          />

          <QuickLink
            href="/meru"
            title="Meru"
            description="Explore binomial coefficients."
          />

        </div>

      </section>

    </div>
  );
}


/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-maroon text-white dark:bg-gold dark:text-ink">
        {icon}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-ink dark:text-white">
          {title}
        </h2>

        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          {subtitle}
        </p>
      </div>

    </div>
  );
}


/* =========================================================
   CONCEPT CARD
========================================================= */

function ConceptCard({
  title,
  symbol,
  value,
  description,
  light = false,
}: {
  title: string;
  symbol: string;
  value: string;
  description: string;
  light?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-stone-500 dark:text-stone-400">
            {title}
          </p>

          <p className="mt-1 text-3xl font-bold text-maroon dark:text-gold">
            {symbol}
          </p>

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl font-mono text-2xl font-bold ${
            light
              ? "bg-stone-100 text-ink dark:bg-stone-800 dark:text-stone-100"
              : "bg-maroon text-white"
          }`}
        >
          {value}
        </div>

      </div>

      <p className="mt-5 text-sm leading-7 text-stone-600 dark:text-stone-300">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   STEP
========================================================= */

function Step({
  number,
  title,
  value,
}: {
  number: string;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-stone-50 p-5 dark:bg-stone-800">

      <p className="text-xs font-bold text-maroon dark:text-gold">
        {number}
      </p>

      <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
        {title}
      </p>

      <p className="mt-3 font-mono text-2xl font-bold text-ink dark:text-white">
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   EXPLANATION CARD
========================================================= */

function ExplanationCard({
  title,
  description,
  example,
  direction,
}: {
  title: string;
  description: string;
  example: string;
  direction: string;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900">

      <p className="text-sm font-semibold uppercase tracking-wider text-maroon dark:text-gold">
        {direction}
      </p>

      <h3 className="mt-2 text-xl font-bold text-ink dark:text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
        {description}
      </p>

      <div className="mt-5 rounded-xl bg-stone-50 p-4 text-center font-mono font-bold text-maroon dark:bg-stone-800 dark:text-gold">
        {example}
      </div>

    </div>
  );
}


/* =========================================================
   MERU ROW
========================================================= */

function MeruRow({
  values,
}: {
  values: number[];
}) {
  return (
    <div className="flex justify-center gap-2">

      {values.map((value, index) => (
        <div
          key={index}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 font-bold text-ink dark:bg-stone-800 dark:text-stone-100"
        >
          {value}
        </div>
      ))}

    </div>
  );
}


/* =========================================================
   LINK BUTTON
========================================================= */

function LinkButton({
  href,
  label,
  dark = false,
}: {
  href: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
        dark
          ? "bg-white text-maroon hover:bg-stone-100"
          : "bg-maroon text-white hover:bg-maroon/90 dark:bg-gold dark:text-ink dark:hover:bg-gold/90"
      }`}
    >
      {label}

      <ArrowRight size={16} />
    </a>
  );
}


/* =========================================================
   QUICK LINK
========================================================= */

function QuickLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-maroon/30 hover:shadow-md dark:border-stone-700 dark:bg-stone-900 dark:hover:border-gold/40"
    >
      <h3 className="font-bold text-ink group-hover:text-maroon dark:text-white dark:group-hover:text-gold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
        {description}
      </p>
    </a>
  );
}