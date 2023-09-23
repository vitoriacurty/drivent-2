import { ticketsController } from "@/controllers/tickets-controller"
import { Router } from "express"

const ticketsRouter = Router()

ticketsRouter.get("/types")
ticketsRouter.get("/", ticketsController.getTicket)
ticketsRouter.post("/")

export { ticketsRouter }