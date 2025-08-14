import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InferType } from "yup";

export const createCategorySchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
});

export type CreateCategoryFormType = InferType<
  typeof createCategorySchema
>;

export const createCategoryResolver = yupResolver(createCategorySchema);

export const createCategoryDefaultValues: yup.InferType<
  typeof createCategorySchema
> = {
    description: "",
    name: "",
}