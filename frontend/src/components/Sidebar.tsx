import { NavLink } from "react-router-dom";
import {
  Home,
  BookOpen,
  Binary,
  Grid3X3,
  Triangle,
  ArrowLeftRight,
} from "lucide-react";

const links = [
  {
    label: "Home",
    path: "/",
    icon: Home,
  },
  {
    label: "Learn",
    path: "/learn",
    icon: BookOpen,
  },
  {
    label: "Binary Encoder",
    path: "/encoder",
    icon: Binary,
  },
  {
    label: "Pattern Generator",
    path: "/patterns",
    icon: Grid3X3,
  },
  {
    label: "Meru-Prastāra",
    path: "/meru",
    icon: Triangle,
  },
  {
    label: "Rank / Unrank",
    path: "/rank",
    icon: ArrowLeftRight,
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({
  open,
  onClose,
}: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-16 z-40 h-[calc(100vh-4rem)]
          w-64 border-r border-stone-200
          bg-parchment p-4 text-ink
          transition-all duration-200

          md:static
          md:top-0
          md:z-auto
          md:h-[calc(100vh-4rem)]
          md:translate-x-0

          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="mb-4 px-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            Explore
          </p>
        </div>

        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3 rounded-lg px-3 py-2.5
                  text-sm font-medium transition

                  ${
                    isActive
                      ? "bg-maroon text-white"
                      : "text-stone-700 hover:bg-stone-200 dark:hover:bg-stone-800"
                  }
                  `
                }
              >
                <Icon size={18} />

                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-8 rounded-xl border border-gold/30 bg-gold/10 p-4">
          <p className="text-xs font-semibold text-maroon dark:text-gold">
            DID YOU KNOW?
          </p>

          <p className="mt-2 text-xs leading-5 text-stone-600">
            A sequence of n Laghu/Guru positions produces
            2ⁿ possible patterns.
          </p>
        </div>
      </aside>
    </>
  );
}