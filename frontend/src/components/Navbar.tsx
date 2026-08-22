import { Link } from "react-router-dom";
import { BookOpen, Menu } from "lucide-react";

import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({
  onMenuClick,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-parchment/95 text-ink backdrop-blur transition-colors duration-200">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-ink transition hover:bg-stone-200 md:hidden"
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-maroon text-white">
              <BookOpen size={20} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-ink">
                Chhanda-Bin
              </h1>

              <p className="hidden text-[10px] text-stone-500 sm:block">
                Pingala × Computation
              </p>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/learn"
            className="text-sm font-medium text-stone-700 transition hover:text-maroon dark:hover:text-gold"
          >
            Learn
          </Link>

          <Link
            to="/encoder"
            className="text-sm font-medium text-stone-700 transition hover:text-maroon dark:hover:text-gold"
          >
            Tools
          </Link>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}