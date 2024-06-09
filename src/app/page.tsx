import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center pt-24 relative bg-zinc-200">
      <Link href="/support" className="underline">
        Get support here
      </Link>
    </main>
  );
}
