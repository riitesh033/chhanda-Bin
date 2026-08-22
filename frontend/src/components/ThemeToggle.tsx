import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((value) => !value)}
      className="
        flex h-10 w-10 items-center justify-center
        rounded-xl
        border border-stone-200
        bg-white
        text-ink
        transition
        hover:bg-stone-100
        dark:border-stone-700
        dark:bg-stone-900
        dark:text-stone-100
        dark:hover:bg-stone-800
      "
      aria-label={
        dark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
    >
      {dark ? (
        <Sun size={19} />
      ) : (
        <Moon size={19} />
      )}
    </button>
  );
}