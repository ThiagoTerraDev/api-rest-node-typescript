import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IMember } from "../../models";


export const getById = async (id: number): Promise<IMember | Error> => {
  try {
    const result = await Knex(ETableNames.member)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) return result;

    return new Error("Record not found");
  } catch (error) {
    console.log(error);
    return new Error("Error getting record");
  }
};
