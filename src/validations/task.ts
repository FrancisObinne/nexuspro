import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const createTaskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  serviceUserPublicId: yup.string().required("Service user is required"),
  taskCategoryPublicId: yup.string().required("Task Category is required"),
});

export type CreateTaskFormValues = yup.InferType<typeof createTaskSchema> & {
  duration?: string;
};

export const createTaskResolver = yupResolver(createTaskSchema);

export const createTaskDefaultValues: CreateTaskFormValues = {
  title: "",
  description: "",
  startTime: "",
  endTime: "",
  serviceUserPublicId: "",
  taskCategoryPublicId: "",
  duration: "",
};
