"use server";

import prisma from "@/lib/db";

export async function createTicket(
  email: string,
  subject: string,
  content: string
) {
  await prisma.ticket.create({
    data: {
      email: email,
      subject: subject,
      content: content,
    },
  });
}
