import { yupResolver } from "@hookform/resolvers/yup";
import { array, InferType, object, string } from "yup";

export const createRotaSchema = object({
  rotaName: string().required("Rota name is required"),
  description: string().required("Description is required"),
  startTime: string().required("Start time is required"),
  endTime: string().required("End time is required"),
  taskPublicIds: array(string()).required("Task is required"),
});

export type CreateRotaFormValues = InferType<typeof createRotaSchema> & {
  duration?: string;
};

export const createRotaRelsolver = yupResolver(createRotaSchema);

export const createRotaDefaultValues: CreateRotaFormValues = {
  rotaName: "",
  description: "",
  startTime: "",
  endTime: "",
  duration: "",
  taskPublicIds: [],
};
