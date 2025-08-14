import React from "react";
import { Button } from "@/components/button";
import { useCreateServiceUsers } from "@/hooks";
// import { useGetRoles } from "@/hooks/queries/roles";
import {
  createServiceUserDefaultValues,
  CreateServiceUserFormType,
  createServiceUserResolver,
} from "@/validations";
import { ArrowLeft, SeparatorHorizontalIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ControlledInput } from "@/components/controlled-input";
import { ControlledSelect } from "@/components/controlled-select";
import NextOfKinFields from "@/components/service-users/NextOfKinFields";
import { ServiceUserPayload } from "@/types";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTitle } from "@/hooks/useTitle";

const CreateServiceUser = () => {
  const { updateTitle } = useTitle();

  React.useEffect(() => {
    updateTitle("Service User");
  }, []);
  const navigate = useNavigate();

  const { createServiceUserMutate, creatingServiceUser } =
    useCreateServiceUsers();

  const form = useForm<CreateServiceUserFormType>({
    mode: "onChange",
    resolver: createServiceUserResolver,
    defaultValues: createServiceUserDefaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "nextOfKins",
  });

  const onSubmit: SubmitHandler<CreateServiceUserFormType> = (data) => {
    const payload: ServiceUserPayload = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      rating: data.rating,
      lasNumber: data.lasNumber,
      aboutServiceUser: data.aboutServiceUser,
      dateOfBirth: data.dateOfBirth,
      phoneNumber: data.phoneNumber,
      doorCode: data.doorCode,
      emergencyContact: data.emergencyContact,
      medicalHistory: data.medicalHistory,
      nhsNumber: data.nhsNumber,
      religion: data.religion,
      riskAssessment: data.riskAssessment,
      address: {
        street: data.address.street,
        city: data.address.city,
        state: data.address.state,
        postalCode: data.address.postalCode,
        country: data.address.country,
        apartmentNumber: data.address.apartmentNumber,
        buildingName: data.address.buildingName,
      },
      nextOfKins: data.nextOfKins.map((kin) => ({
        firstName: kin.firstName,
        lastName: kin.lastName,
        emails: kin.emails,
        phoneNumbers: kin.phoneNumbers,
        gender: kin.gender,
        relationship: kin.relationship,
      })),
    };

    createServiceUserMutate(payload, {
      onSuccess: () => {
        toast.success("Service user created successfully!");
        navigate("/service-users");
      },
      onError: () => {
        toast.error("Failed to create service user.");
      },
    });
  };

  return (
    <div className="w-full min-h-screen px-4 py-6 overflow-y-auto">
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => navigate("/service-users")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Create Service User</h1>
      </div>

      <div className="flex justify-center">
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("Validation errors:", errors);
          })}
          className="w-full space-y-6 py-6 bg-white shadow rounded-lg p-6"
        >
          <h3 className="text-lg font-bold text-gray-800 pb-2 mb-4 border-b border-gray-200">
            General Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <ControlledInput
              control={form.control}
              name="firstName"
              label="Firstname"
              required
            />
            <ControlledInput
              control={form.control}
              name="lastName"
              label="Lastname"
              required
            />

            <ControlledInput
              control={form.control}
              name="phoneNumber"
              label="Phone Number"
              required
            />

            <ControlledInput
              control={form.control}
              name="email"
              label="Email"
              required
            />

            <ControlledSelect
              control={form.control}
              name="rating"
              label="Rating"
              required
              options={[
                {
                  label: (
                    <div className="flex gap-1 items-center">
                      <div className="h-4 w-4 bg-red-700 rounded-full"></div>
                      <p>HIGH</p>
                    </div>
                  ),
                  value: "HIGH",
                },
                {
                  label: (
                    <div className="flex gap-1 items-center">
                      <div className="h-4 w-4 bg-amber-600 rounded-full"></div>
                      <p>MEDIUM</p>
                    </div>
                  ),
                  value: "MEDIUM",
                },
                {
                  label: (
                    <div className="flex gap-1 items-center">
                      <div className="h-4 w-4 bg-green-600 rounded-full"></div>
                      <p>LOW</p>
                    </div>
                  ),
                  value: "LOW",
                },
              ]}
            />

            <ControlledInput
              control={form.control}
              name="address.street"
              label="Street"
              required
            />

            <ControlledInput
              control={form.control}
              name="aboutServiceUser"
              label="About Service User"
              required
            />

            <ControlledInput
              control={form.control}
              name="dateOfBirth"
              label="Date of Birth"
              required
              type="date"
            />

            <ControlledInput
              control={form.control}
              name="doorCode"
              label="Door Code"
              required
            />

            <ControlledInput
              control={form.control}
              name="lasNumber"
              label="LAS Number"
              required
            />

            <ControlledInput
              control={form.control}
              name="nhsNumber"
              label="NHS Number"
              required
            />

            <ControlledInput
              control={form.control}
              name="medicalHistory"
              label="Medical History"
              required
            />

            <ControlledInput
              control={form.control}
              name="religion"
              label="Religion"
              required
            />

            <ControlledInput
              control={form.control}
              name="riskAssessment"
              label="Risk Assessment"
              required
            />

            <ControlledInput
              control={form.control}
              name="emergencyContact"
              label="Emergency Contact"
              required
            />

            <ControlledInput
              control={form.control}
              name="address.apartmentNumber"
              label="Apartment Number"
              required
            />
            <ControlledInput
              control={form.control}
              name="address.city"
              label="City"
              required
            />
            <ControlledInput
              control={form.control}
              name="address.state"
              label="State"
              required
            />
            <ControlledInput
              control={form.control}
              name="address.postalCode"
              label="Postal Code"
              required
            />
            <ControlledInput
              control={form.control}
              name="address.country"
              label="Country"
              required
            />
            <ControlledInput
              control={form.control}
              name="address.buildingName"
              label="Building Name"
              required
            />
          </div>

          <SeparatorHorizontalIcon className="my-8" />

          {/* <div className="w-full">
            <h2 className="text-lg font-semibold mb-2">Next of Kins</h2>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mb-4 rounded w-full"
              >
                <ControlledInput
                  control={form.control}
                  name={`nextOfKins.${index}.firstName`}
                  label="First Name"
                  required
                />
                <ControlledInput
                  control={form.control}
                  name={`nextOfKins.${index}.lastName`}
                  label="Last Name"
                  required
                />
                <ControlledInput
                  control={form.control}
                  name={`nextOfKins.${index}.relationship`}
                  label="Relationship"
                  required
                />
                <ControlledInput
                  control={form.control}
                  name={`nextOfKins.${index}.gender`}
                  label="Gender"
                  required
                />
                <ControlledInput
                  control={form.control}
                  name={`nextOfKins.${index}.emails.0`}
                  label="Email"
                  required
                />
                <ControlledInput
                  control={form.control}
                  name={`nextOfKins.${index}.phoneNumbers.0`}
                  label="Phone Number"
                  required
                />

                {fields.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    variant="destructive"
                    size="sm"
                    // className="absolute top-4 right-4"
                    className="w-2/4"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove Next of Kin
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              onClick={() =>
                append({
                  firstName: "",
                  lastName: "",
                  emails: [""],
                  phoneNumbers: [""],
                  gender: "",
                  relationship: "",
                  // address: {
                  //   street: "",
                  //   city: "",
                  //   state: "",
                  //   postalCode: "",
                  //   country: "",
                  //   apartmentNumber: "",
                  //   buildingName: "",
                  // },
                })
              }
              variant="outline"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Next of Kin
            </Button>
          </div> */}

          <NextOfKinFields
            control={form.control}
            fields={fields}
            append={append}
            remove={remove}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={creatingServiceUser}>
              Add Service User
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServiceUser;
