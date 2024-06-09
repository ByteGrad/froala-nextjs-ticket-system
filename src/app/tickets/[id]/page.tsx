import { froalaOptions } from "@/app/support/page";
import FroalaEditorComponent from "@/components/froala-editor";
import FroalaEditorView from "@/components/froala-editor-view";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

export default async function TicketPage({ params }) {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return (
    <main className="flex flex-col min-h-screen items-center pt-24 relative bg-zinc-200">
      <div className="bg-zinc-800 h-[300px] w-full absolute top-0 z-[0]" />

      <h1 className="text-4xl font-bold text-white mb-8 relative">
        Ticket: {ticket?.subject}
      </h1>

      <section className="bg-white shadow-lg px-8 py-6 w-[820px] min-h-[500px] rounded flex flex-col relative">
        <FroalaEditorView model={ticket?.content} />

        <div className="h-[1px] w-full bg-black/10 my-5" />

        <h2 className="text-xl font-medium">
          Write response to {ticket?.email}
        </h2>

        <form className="flex flex-col gap-y-2 mt-3 flex-1">
          <FroalaEditorComponent tag="textarea" config={froalaOptions} />

          <Button className="mt-auto">Submit</Button>
        </form>
      </section>
    </main>
  );
}
