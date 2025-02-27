import { AppError } from "@/utils/AppError.js";
import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";

class ProductContoller {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query;
      const products = await knex<ProductRepository>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`)
        .orderBy("name");

      return response.json(products);
    } catch (error) {
      next(error);
    }
  }
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0, { message: "O preco deve ser maior que zero" }),
      });
      const { name, price } = bodySchema.parse(request.body);
      await knex<ProductRepository>("products").insert({ name, price });
      return response
        .status(201)
        .json({ message: "Produto cadastrado com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(request.params.id);

      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0),
      });
      const { name, price } = bodySchema.parse(request.body);
      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first();
      if (!product) {
        throw new AppError("Product not found");
      }

      await knex<ProductRepository>("products")
        .update({ name, price, updated_at: knex.fn.now() })
        .where({ id });
      return response.json({ message: "Actualizaado com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(request.params.id);

      //tratando para casos do id nao existir
      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first();

      if (!product) {
        throw new AppError("Product no found");
      }

      await knex<ProductRepository>("products").delete().where({ id });
      return response.json({ message: "Removido com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}

export { ProductContoller };
