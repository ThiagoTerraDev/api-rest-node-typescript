import { Knex } from "../../knex";
import { IUser } from "../../models";
import { ETableNames } from "../../ETableNames";
import { PasswordCrypto } from "../../../shared/services";


export const create = async (user: Omit<IUser, "id">): Promise<number | Error> => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(user.password);

    const [result] = await Knex(ETableNames.user).insert({ ...user, password: hashedPassword }).returning("id");

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
