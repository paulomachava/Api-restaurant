import { ProductContoller } from "@/controllers/produts-controllers.js";
import { Router } from "express";

const productsRoutes = Router();
const productsController = new ProductContoller();

productsRoutes.get("/", productsController.index);
productsRoutes.post("/", productsController.create);
productsRoutes.put("/:id",productsController.update)
productsRoutes.delete("/:id",productsController.remove)

export { productsRoutes };
