import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketsController } from '@/controllers/tickets-controller';
import { ticketsSchema } from '@/schemas/ticket-schema';
 
const ticketsRouter = Router();

ticketsRouter.get('/types', authenticateToken, ticketsController.getTicketType);
ticketsRouter.get('/', authenticateToken, ticketsController.getTicket);
ticketsRouter.post('/', authenticateToken, validateBody(ticketsSchema), ticketsController.createTicket);

export { ticketsRouter };
