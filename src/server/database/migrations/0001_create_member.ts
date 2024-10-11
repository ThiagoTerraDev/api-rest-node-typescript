import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.member, table => { 
      table.bigIncrements("id").primary().index();
      table.string("fullName").index().notNullable();
      table.string("email").unique().notNullable();

      table
        .bigInteger("cityId")
        .index().notNullable()
        .references("id")
        .inTable(ETableNames.city)
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      table.comment("Table to store members");
    })
    .then(() => console.log(`# Created table ${ETableNames.member}`));
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.member)
    .then(() => 
      console.log(`# Dropped table ${ETableNames.member}`));
}
