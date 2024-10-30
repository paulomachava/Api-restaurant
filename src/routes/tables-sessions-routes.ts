import { Router } from "express";
import { TableSessionsController } from "@/controllers/tables-sessions-controller";

const tablesSessionsRoutes = Router()
const tableSessionsController = new TableSessionsController()


tablesSessionsRoutes.post("/",tableSessionsController.create)
tablesSessionsRoutes.get("/",tableSessionsController.index)
tablesSessionsRoutes.patch("/:id",tableSessionsController.update)



export {tablesSessionsRoutes}