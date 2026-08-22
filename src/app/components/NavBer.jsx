"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { Bars, Xmark, Briefcase } from "@gravity-ui/icons";
import { useSession, signOut } from "@/lib/auth-client";
 
const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // মোবাইল মেনু খুললে স্ক্রল ব্লক করার জন্য
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  // সাইন আউট হ্যান্ডলার
  const handleSignOut = async () => {
    closeMenu();
    await signOut();
  };

  return (
    <>
      {/* ১. ফুল-উইড্থ স্টিকি নেভবার (কোনো উপরের গ্যাপ নেই) */}
      <header className="sticky top-0 z-50 w-full border-b border-black/10 dark:border-white/10 !bg-white/80 dark:!bg-black/80 backdrop-blur-md">
        {/* ২. ভেতরের কনটেইনার এবং বাড়তি হাইট (h-20) */}
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* লোগো */}
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 dark:bg-blue-500 transition-transform duration-300 group-hover:-rotate-6">
              <Briefcase width={20} height={20} className="text-white" />
            </span>
            <span className="text-xl font-bold tracking-tight text-black dark:text-white">
              Hire<span className="text-blue-600 dark:text-blue-500">Loop</span>
            </span>
          </Link>

          {/* ডেস্কটপ নেভিগেশন লিংকস */}
          <div className="hidden items-center gap-1 rounded-full bg-black/5 dark:bg-white/10 p-1.5 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white dark:bg-white/20 text-black dark:text-white shadow-sm"
                      : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ডেস্কটপ Auth বাটন্স */}
          <div className="hidden items-center gap-4 md:flex">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-black/80 dark:text-white/80">
                  {user?.name}
                </span>
                <Button
                  onPress={handleSignOut}
                  variant="bordered"
                  radius="full"
                  className="border-black/20 dark:border-white/20 text-black dark:text-white font-medium px-5"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/signup"
                  className="text-sm font-semibold text-black/60 dark:text-white/60 transition-colors hover:text-black dark:hover:text-white px-2"
                >
                  SignUp
                </Link>
                <Button
                  as={Link}
                  href="/sign-up"
                  radius="full"
                  className="!bg-blue-600 dark:!bg-blue-500 !text-white font-semibold px-6 py-2.5 transition-transform duration-300 hover:scale-105 hover:!bg-blue-700 dark:hover:!bg-blue-600"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menus toggle*/}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-black/70 dark:text-white/70 transition-colors hover:bg-black/5 dark:hover:bg-white/10 md:hidden"
          >
            <Bars width={24} height={24} />
          </button>
        </nav>
      </header>

      {/* মোবাইল ফুল-স্ক্রিন ওভারলে মেনু */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col !bg-white dark:!bg-black transition-all duration-300 ease-out md:hidden ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 pointer-events-none opacity-0"
        }`}
      >
        {/* মোবাইল হেডার (উচ্চতা সমান রাখা হয়েছে) */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-black/10 dark:border-white/10">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 dark:bg-blue-500">
              <Briefcase width={20} height={20} className="text-white" />
            </span>
            <span className="text-xl font-bold tracking-tight text-black dark:text-white">
              hire<span className="text-blue-600 dark:text-blue-500">loop</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-black/70 dark:text-white/70 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          >
            <Xmark width={24} height={24} />
          </button>
        </div>

        {/* মোবাইল লিংকস */}
        <div className="flex flex-1 flex-col items-start justify-center gap-4 px-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              style={{ transitionDelay: isOpen ? `${i * 70 + 100}ms` : "0ms" }}
              className={`text-3xl font-bold text-black dark:text-white transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-500 ${
                isOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* মোবাইল বাটন অ্যাকশন */}
        <div className="flex flex-col gap-3 border-t border-black/10 dark:border-white/10 p-6">
          {user ? (
            <>
              <span className="text-base font-semibold text-black dark:text-white px-1">
                {user?.name}
              </span>
              <Button
                onPress={handleSignOut}
                variant="bordered"
                radius="full"
                className="w-full py-3.5 text-base font-medium border-black/20 dark:border-white/20 text-black dark:text-white"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/auth/signup"
                onClick={closeMenu}
                className="rounded-full py-3 text-center text-base font-semibold text-black/70 dark:text-white/70 ring-1 ring-black/10 dark:ring-white/10 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
              >
                SignUp
              </Link>
              <Button
                as={Link}
                href="/sign-up"
                onPress={closeMenu}
                radius="full"
                className="!bg-blue-600 dark:!bg-blue-500 !text-white font-semibold py-3.5 text-base"
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}