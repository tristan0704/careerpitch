"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
      
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          {/* MOBILE BUTTON */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
            >
              <span className="absolute -inset-0.5"></span>

              {!mobileOpen ? (
                <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>

          {/* LEFT */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
                alt="Logo"
              />
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link href="/home" className="rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white">
                  Dashboard
                </Link>
                <Link href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                  Interviews
                </Link>
                <Link href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                  Lernen
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            
            {/* NOTIFICATION */}
            <button className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
              <span className="absolute -inset-1.5"></span>
              <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14.857 17.082a23.848..." strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* PROFILE */}
            <div className="relative ml-3">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <span className="absolute -inset-1.5"></span>
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                  alt=""
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline outline-white/10">
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">
                    Profil
                  </Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">
                    Einstellungen
                  </Link>
                  <Link href="/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">
                    Abmelden
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="block sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <Link href="/home" className="block rounded-md bg-gray-950/50 px-3 py-2 text-base font-medium text-white">
              Dashboard
            </Link>
            <Link href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">
              Interviews
            </Link>
            <Link href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">
              Lernen
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}