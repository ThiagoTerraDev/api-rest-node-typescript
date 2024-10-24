import * as create from "./Create";
import * as getById from "./GetById";
import * as deleteById from "./DeleteById";
import * as getAll from "./GetAll";
import * as count from "./Count";
import * as updateById from "./UpdateById";


export const MembersProvider = {
  ...create,
  ...getById,
  ...deleteById,
  ...getAll,
  ...count,
  ...updateById,
};
