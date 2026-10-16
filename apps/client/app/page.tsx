"use client";

import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-md flex-col gap-16 items-center justify-between py-32 px-16 sm:items-start">
        <Button href="/game" className="w-full text-center">
          Partie à plusieurs
        </Button>
        <Button href="/numbers" className="w-full text-center">
          Juste un nombre
        </Button>
        <Button href="/words" className="w-full text-center">
          Juste un mot
        </Button>
      </main>
    </div>
  );
}
