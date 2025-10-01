// NavbarWrapper.tsx (client component)
"use client";

import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const showNavbar = pathname !== "/portfolio";

  return showNavbar ? <Navbar /> : null;
}
