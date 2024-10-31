import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUser } from "../../models";


export const getByEmail = async (email: string): Promise<IUser | Error> => {
  try {
    const result = await Knex(ETableNames.user)
      .select("*")
      .where("email", "=", email)
      .first();

    if (result) return result;

    return new Error("Record not found");
  } catch (error) {
    console.log(error);
    return new Error("Error getting record");
  }
};
