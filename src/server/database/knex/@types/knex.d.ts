import { ICity, IMember, IUser } from "../../models";


declare module "knex/types/tables" {
  interface Tables {
    city: ICity;
    member: IMember;
    user: IUser;
  }
}
