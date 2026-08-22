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
    <header
      className="
        sticky top-0 z-50
        border-b border-stone-200
        bg-parchment/95
        text-ink
        backdrop-blur
        transition-colors duration-200

        dark:border-stone-700
        dark:bg-stone-950/95
        dark:text-stone-100
      "
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-8">

        {/* =====================================================
            LEFT SIDE
        ===================================================== */}

        <div className="flex items-center gap-3">

          {/* Mobile menu button */}

          <button
            type="button"
            onClick={onMenuClick}
            className="
              rounded-lg p-2
              text-ink
              transition

              hover:bg-stone-200
              hover:text-maroon

              dark:text-stone-100
              dark:hover:bg-stone-800
              dark:hover:text-gold

              md:hidden
            "
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>


          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-2"
          >

            {/* Logo icon */}

            <div
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-lg
                bg-maroon
                text-white
              "
            >
              <BookOpen size={20} />
            </div>


            {/* Logo text */}

            <div>

              <h1
                className="
                  text-lg font-bold tracking-tight
                  text-ink

                  dark:text-white
                "
              >
                Chhanda-Bin
              </h1>

              <p
                className="
                  hidden
                  text-[10px]
                  text-stone-500

                  dark:text-stone-400

                  sm:block
                "
              >
                Pingala × Computation
              </p>

            </div>

          </Link>

        </div>


        {/* =====================================================
            RIGHT SIDE NAVIGATION
        ===================================================== */}

        <nav className="hidden items-center gap-6 md:flex">

          {/* Learn */}

          <Link
            to="/learn"
            className="
              text-sm font-medium
              text-stone-700
              transition

              hover:text-maroon

              dark:text-stone-300
              dark:hover:text-gold
            "
          >
            Learn
          </Link>


          {/* Tools */}

          <Link
            to="/encoder"
            className="
              text-sm font-medium
              text-stone-700
              transition

              hover:text-maroon

              dark:text-stone-300
              dark:hover:text-gold
            "
          >
            Tools
          </Link>


          {/* Theme toggle */}

          <ThemeToggle />

        </nav>

      </div>
    </header>
  );
}