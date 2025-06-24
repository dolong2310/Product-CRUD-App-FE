import Link from "next/link";
import { ModeToggle } from "../ModeToggle";
import HeaderAction from "./HeaderAction";
import { twMerge } from "tailwind-merge";

const navRoutes = [
  { href: "/", label: "Home", customClassName: "text-2xl font-bold" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
];

const Header = () => {
  return (
    <header className="container flex items-center justify-between py-4">
      <nav>
        <ul className="flex items-center">
          {navRoutes.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                className={twMerge("py-2 px-4", route.customClassName)}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <HeaderAction />
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
