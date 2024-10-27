import * as create from "./Create";
import * as getById from "./GetById";
import * as deleteById from "./DeleteById";
import * as getAll from "./GetAll";
import * as updateById from "./UpdateById";


export const MembersController = {
  ...create,
  ...getById,
  ...deleteById,
  ...getAll,
  ...updateById,
};
