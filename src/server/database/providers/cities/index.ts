import * as create from "./Create";
import * as deleteById from "./DeleteById";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as updateById from "./UpdateById";
import * as count from "./Count";

export const CitiesProvider = {
  ...create, 
  ...deleteById,
  ...getAll, 
  ...getById, 
  ...updateById,
  ...count,
};
