import { Knex } from "../../knex";
import { IMember } from "../../models";
import { ETableNames } from "../../ETableNames";

export const create = async (member: Omit<IMember, "id">): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.city)
      .where("id", "=", member.cityId)
      .count<[{ count: number }]>("* as count");
    
    if (count === 0) {
      return new Error("City not found");
    }

    const [result] = await Knex(ETableNames.member).insert(member).returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Error creating record");
  } catch (error) {
    console.log(error);
    return new Error("Error creating record");
  }
};
