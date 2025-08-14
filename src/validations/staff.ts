import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { InferType } from "yup";

export const createStaffSchema = yup.object({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  roleId: yup.string().required(),
  profilePicture: yup.string().optional(),
  department: yup.string().required(),
  phoneNumber: yup.string().required(),
  status: yup.string(),
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
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        emails: yup
          .array()
          .of(yup.string().email())
          .required("At least one email is required"),
        phoneNumbers: yup
          .array()
          .of(yup.string())
          .required("At least one phone number is required"),
        gender: yup.string().required("Gender is required"),
        relationship: yup.string().required("Relationship is required"),
        address: yup.object({
          street: yup.string().required("Street is required"),
          city: yup.string().required("City is required"),
          state: yup.string().required("State is required"),
          postalCode: yup.string().required("Postal code is required"),
          country: yup.string().required("Country is required"),
          apartmentNumber: yup
            .string()
            .required("Apartment number is required"),
          buildingName: yup.string().required("Building name is required"),
        }),
      })
    )
    .required(),
});

export type CreateStaffFormType = InferType<typeof createStaffSchema>;

export const createStaffResolver = yupResolver(createStaffSchema);

export const createStaffDefaultValues: yup.InferType<typeof createStaffSchema> =
  {
    email: "",
    firstName: "",
    lastName: "",
    roleId: "",
    profilePicture: "",
    department: "",
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
    nextOfKins: [
      {
        firstName: "",
        lastName: "",
        emails: [""],
        phoneNumbers: [""],
        gender: "",
        relationship: "",
        address: {
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          apartmentNumber: "",
          buildingName: "",
        },
      },
    ],
  };
