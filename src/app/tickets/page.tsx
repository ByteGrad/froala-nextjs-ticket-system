import prisma from "@/lib/db";
import Link from "next/link";

export default async function TicketsPage() {
  const tickets = await prisma.ticket.findMany();

  return (
    <main className="flex flex-col min-h-screen items-center pt-24 relative bg-zinc-200">
      <div className="bg-zinc-800 h-[300px] w-full absolute top-0" />

      <h1 className="text-4xl font-bold text-white mb-8 relative">Tickets</h1>

      <ul className="bg-white shadow-lg px-8 py-6 w-[820px] min-h-[500px] rounded flex flex-col relative">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="flex flex-col mb-4">
            <Link href={`/tickets/${ticket.id}`} className="underline">
              {ticket.subject}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
