import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    
    await knex("products").del();

   
    await knex("products").insert([
        { name:"Nhoque quatro queijos",price:15 },
        { name:"Bolo de arroz",price:84 },
        { name:"Porcao de batas fritas",price:14 },
        { name:"Isca de frango",price:94 },
        { name:"Escondidinho de carne de sol",price:95 },
        { name:"Excutivo de frango",price:44 },
        { name:"Caldo de palmito",price:35 },
        { name:"Refrigerante 350ml",price:74 },
        
    ]);
};
