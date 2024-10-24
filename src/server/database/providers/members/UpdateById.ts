import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IMember } from "../../models";


export const updateById = async (id: number, member: Omit<IMember, "id">): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.city)
      .where("id", "=", member.cityId)
      .count<[{ count: number }]>("* as count");
    
    if (count === 0) {
      return new Error("City not found");
    }

    const result = await Knex(ETableNames.member)
      .update(member)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Error updating record");
  } catch (error) {
    console.log(error);
    return new Error("Error updating record");
  }
};
