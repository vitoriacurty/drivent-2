import { TicketStatus } from '@prisma/client';
import { notFoundError } from '@/errors';
import { enrollmentRepository } from '@/repositories';
import { ticketsRepository } from '@/repositories/tickets-repository';

async function getTicketType() {
    const ticketTypes = await ticketsRepository.getTicketType();
    if (!ticketTypes) throw notFoundError();

    return ticketTypes;
}

async function getTicket(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();

    const result = await ticketsRepository.getTicket(enrollment.id);
    if (!result) throw notFoundError();

    return result;
}

async function createTicket(userId: number, ticketTypeId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();

    await ticketsRepository.createTicket({
        ticketTypeId: ticketTypeId,
        enrollmentId: enrollment.id,
        status: TicketStatus.RESERVED,
    });

    const result = await ticketsRepository.getTicket(enrollment.id);
    return result;
}

export const ticketsServices = { getTicket, getTicketType, createTicket };
