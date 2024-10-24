import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IMember } from "../../models";


export const getAll = async (page: number, limit: number, filter: string): Promise<IMember[] | Error> => {
  try {
    const result = await Knex(ETableNames.member)
      .select("*")
      .where("fullName", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log(error);
    return new Error("Error getting records");
  }
};
