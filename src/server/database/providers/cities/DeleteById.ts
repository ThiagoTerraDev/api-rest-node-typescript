import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.city)
      .where("id", "=", id)
      .del();

    if (result > 0) return;

    return new Error("Error deleting record");

  } catch (error) {
    console.log(error);
    return new Error("Error deleting record");
  }
};
