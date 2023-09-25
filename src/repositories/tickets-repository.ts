import { prisma } from '@/config';

export interface NewTicket {
  ticketTypeId: number;
  enrollmentId: number;
  status: 'RESERVED';
}

async function getTicketType() {
    return await prisma.ticketType.findMany();
}

async function getTicket(enrollmentId: number) {
    return await prisma.ticket.findFirst({
        where: { enrollmentId },
        include: {
            TicketType: true,
        },
    });
}

async function createTicket(tickets: NewTicket) {
    return await prisma.ticket.create({ data: tickets });
}

async function findTicketId(ticketId: number) {
    return prisma.ticket.findFirst({
        where: {
            id: ticketId
        },
        include: {
            Enrollment: true
        }
    })
}

export const ticketsRepository = { getTicket, getTicketType, createTicket, findTicketId };
