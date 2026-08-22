interface StatCardProps {
  label: string;
  value: string | number;
  description: string;
}

export default function StatCard({
  label,
  value,
  description,
}: StatCardProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-stone-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-md

        dark:border-stone-700
        dark:bg-stone-900
        dark:shadow-black/20
      "
    >
      <p className="text-sm text-stone-500 dark:text-stone-400">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-maroon dark:text-gold">
        {value}
      </p>

      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
        {description}
      </p>
    </div>
  );
}