"use client";

import { useState } from "react";
import Link from "next/link";

export default function LandingPageNavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8">

        {/* Logo */}
        <div className="flex lg:flex-1">
          <a className="-m-1.5 p-1.5">
            <img
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="h-8 w-auto"
            />
          </a>
        </div>

        {/* Mobile button */}
        <div className="flex lg:hidden">
          <button onClick={() => setOpen(true)} className="text-gray-200">
            <img
                  src="/icons/bars-solid-full.svg"
                  className="h-5 w-5 brightness-0 invert"
                />
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex lg:gap-x-12">
          <a href="#product" className="text-sm font-semibold text-white">Produkt</a>
          <a href="#features" className="text-sm font-semibold text-white">Funktionen</a>
          <a href="#how-it-works" className="text-sm font-semibold text-white">Wie es funktioniert</a>
        </div>

        {/* Login */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/auth/login" className="text-sm font-semibold text-white">
            Log in
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-gray-900 p-6 lg:hidden">
          <div className="flex justify-between">
            <img
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="h-8"
            />
            <button onClick={() => setOpen(false)}>
            <img
                  src="/icons/xmark-solid-full.svg"
                  className="h-5 w-5 brightness-0 invert"
                />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <a className="block text-white">Produkt</a>
            <a href="#features" className="block text-white">Funktionen</a>
            <Link href="/auth/login" className="block text-white">
              Log in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}