import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { InferType } from "yup";

export const createServiceUserSchema = yup.object({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  aboutServiceUser: yup.string().required("About service user  is required"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  doorCode: yup
    .string()
    .transform((value) => value?.toUpperCase())
    .matches(
      /^[CUMBERLAND]{4}$/,
      "Door code must be 4 uppercase letters from CUMBERLAND"
    )
    .required("Door code is required"),
  emergencyContact: yup.string().required("Emergency contact is required"),
  lasNumber: yup
    .string()
    .matches(/^\d+$/, "Las number must contain only digits")
    .min(3, "Las number must be at least 3 digits")
    .max(5, "Las number must be at most 5 digits")
    .required("Las number is required"),
  medicalHistory: yup.string().required("Medical history is required"),
  nhsNumber: yup.string().min(10).max(10).required("NHS number is required"),
  rating: yup
    .string()
    .oneOf(["HIGH", "MEDIUM", "LOW"])
    .required("Rating is required"),
  religion: yup.string().required("Religion is required"),
  riskAssessment: yup.boolean(),
  phoneNumber: yup.string().required(),
  address: yup.object({
    street: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    postalCode: yup.string().required(),
    country: yup.string().required(),
    apartmentNumber: yup.string().required(),
    buildingName: yup.string().required(),
  }),
  nextOfKins: yup
    .array()
    .of(
      yup.object({
        publicId: yup.string().optional(),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        emails: yup.array().of(yup.string().email()).required(),
        phoneNumbers: yup.array().of(yup.string()).required(),
        gender: yup.string().required(),
        relationship: yup.string().required(),
      })
    )
    .required(),
});

export const editServiceUserSchema = yup.object({
  email: yup.string().email().required(),
  serviceUserPublicId: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  address: yup.object({
    street: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    postalCode: yup.string().required(),
    country: yup.string().required(),
    apartmentNumber: yup.string().required(),
    buildingName: yup.string().required(),
  }),
  phoneNumber: yup.string().required(),
  rating: yup
    .string()
    .oneOf(["HIGH", "MEDIUM", "LOW"])
    .required("Rating is required"),
  lasNumber: yup
    .string()
    .matches(/^\d+$/, "Las number must contain only digits")
    .min(3, "Las number must be at least 3 digits")
    .max(5, "Las number must be at most 5 digits")
    .required("Las number is required"),
  nhsNumber: yup.string().min(10).max(10).required("NHS number is required"),
  doorCode: yup
    .string()
    .transform((value) => value?.toUpperCase())
    .matches(
      /^[CUMBERLAND]{4}$/,
      "Door code must be 4 uppercase letters from CUMBERLAND"
    )
    .required("Door code is required"),
  religion: yup.string().required("Religion is required"),
  medicalHistory: yup.string().required("Medical history is required"),
  emergencyContact: yup.string().required("Emergency contact is required"),
  contactNumber: yup.string().required(),
  aboutServiceUser: yup.string().required("About service user  is required"),
  riskAssessment: yup.boolean(),
  dateOfBirth: yup.string().required("Date of birth is required"),
});

export type CreateServiceUserFormType = InferType<
  typeof createServiceUserSchema
>;

export type EditServiceUserFormType = InferType<typeof editServiceUserSchema>;

export const createServiceUserResolver = yupResolver(createServiceUserSchema);

export const editServiceUserResolver = yupResolver(editServiceUserSchema);

export const createServiceUserDefaultValues: yup.InferType<
  typeof createServiceUserSchema
> = {
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  address: {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    apartmentNumber: "",
    buildingName: "",
  },
  aboutServiceUser: "",
  dateOfBirth: "",
  doorCode: "",
  emergencyContact: "",
  lasNumber: "",
  medicalHistory: "",
  nhsNumber: "",
  rating: "LOW",
  religion: "",
  riskAssessment: false,
  nextOfKins: [
    {
      firstName: "",
      lastName: "",
      emails: [""],
      phoneNumbers: [""],
      gender: "",
      relationship: "",
    },
  ],
};

export const editServiceUserDefaultValues: yup.InferType<
  typeof editServiceUserSchema
> = {
  email: "",
  serviceUserPublicId: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  address: {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    apartmentNumber: "",
    buildingName: "",
  },
  aboutServiceUser: "",
  dateOfBirth: "",
  doorCode: "",
  emergencyContact: "",
  lasNumber: "",
  medicalHistory: "",
  nhsNumber: "",
  rating: "LOW",
  religion: "",
  riskAssessment: false,
  contactNumber: "",
};
