"use client";
import moon from "@/public/moon-fill.svg";
import sun from "@/public/sun.svg";
import { useTheme } from "next-themes";
import Image from "next/image";
import { HTMLAttributes, useEffect, useState } from "react";

type ThemeSwitcherProps = {} & HTMLAttributes<HTMLButtonElement>;

export default function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <></>;

  if (resolvedTheme === "light") {
    return (
      <button
        onClick={() => setTheme("dark")}
        className={`rounded-md border p-2 m-1 ${className}`}
      >
        <Image src={moon} alt="Dark Theme" />
      </button>
    );
  }
  return (
    <button
      onClick={() => setTheme("light")}
      className={`rounded-md border border-stone-500 p-2 m-1 ${className}`}
    >
      <Image src={sun} alt="Light Theme" />
    </button>
  );
}
