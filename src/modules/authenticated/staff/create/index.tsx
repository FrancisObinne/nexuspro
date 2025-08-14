// import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { ArrowLeft, UserPlus } from "lucide-react";

import { Button } from "@/components/button";
import { ControlledInput } from "@/components/controlled-input";
import { ControlledSelect } from "@/components/controlled-select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";

import { useGetRoles } from "@/hooks/queries/roles";
import { useCreateStaff } from "@/hooks";

import {
  createStaffDefaultValues,
  CreateStaffFormType,
  createStaffResolver,
} from "@/validations";
import { CreateStaffPayload } from "@/types";
import StaffAddressFields from "@/components/staff/StaffAddressFields";
import NextOfKinFields from "@/components/staff/NextOfKinFields";
import React from "react";
import { useTitle } from "@/hooks/useTitle";

const CreateStaff = () => {
  const navigate = useNavigate();
  const { roleInventory } = useGetRoles();
  const { createStaffMuate, creatingStaff } = useCreateStaff();

  const { updateTitle } = useTitle();

  React.useEffect(() => {
    updateTitle("staff");
  }, []);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const form = useForm<CreateStaffFormType>({
    mode: "onChange",
    resolver: createStaffResolver,
    defaultValues: createStaffDefaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "nextOfKins",
  });

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const onSubmit: SubmitHandler<CreateStaffFormType> = (data) => {
    const selectedRole = roleInventory?.find(
      (role) => role.publicId === data.roleId
    );
    const isAdmin = selectedRole?.name.toLowerCase() === "admin";

    const payload: CreateStaffPayload = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      roleId: data.roleId,
      department: data.department,
      phoneNumber: data.phoneNumber,
      status: isAdmin ? "ACTIVE" : "INACTIVE",
      profilePicture:
        previewImage || "https://source.unsplash.com/random/200x200/?portrait",
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
        gender: kin.gender,
        relationship: kin.relationship,
        emails: kin.emails,
        phoneNumbers: kin.phoneNumbers,
        address: {
          street: kin.address.street,
          city: kin.address.city,
          state: kin.address.state,
          postalCode: kin.address.postalCode,
          country: kin.address.country,
          apartmentNumber: kin.address.apartmentNumber,
          buildingName: kin.address.buildingName,
        },
      })),
    };

    createStaffMuate(payload, {
      onSuccess: () => {
        toast.success("Staff created successfully!");
        navigate("/staff");
      },
      onError: () => {
        toast.error("Failed to create staff.");
      },
    });
  };

  return (
    <div className="w-full h-full overflow-y-scroll">
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => navigate("/staff")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Create Staff</h1>
      </div>

      <div className="flex justify-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 py-6 bg-white shadow rounded-lg p-6"
        >
          {/* Avatar Upload */}
          <div className="flex flex-col items-center mb-4">
            <div
              className="h-24 w-24 cursor-pointer group"
              onClick={handleImageClick}
            >
              <Avatar className="h-24 w-24 border-2 border-dashed border-gray-300 group-hover:border-primary">
                {previewImage ? (
                  <AvatarImage src={previewImage} alt="Preview" />
                ) : (
                  <AvatarFallback className="bg-muted">
                    <UserPlus className="h-12 w-12 text-gray-400" />
                  </AvatarFallback>
                )}
              </Avatar>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <span className="text-sm text-gray-500 mt-2">
              Click to upload profile picture
            </span>
          </div>

          {/* Main Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
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
            <ControlledSelect
              control={form.control}
              name="roleId"
              label="Role"
              required
              options={(roleInventory || []).map((role) => ({
                label: role.name,
                value: role.publicId,
              }))}
            />
            <ControlledInput
              control={form.control}
              name="email"
              label="Email"
              required
            />
            {/* <ControlledSelect
              control={form.control}
              name="status"
              label="Status"
              required
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
                { label: "Away", value: "away" },
              ]}
            /> */}
            <ControlledInput
              control={form.control}
              name="phoneNumber"
              label="Phone Number"
              required
            />
            <ControlledInput
              control={form.control}
              name="department"
              label="Department"
              required
            />
          </div>

          <StaffAddressFields control={form.control} />
          <NextOfKinFields
            control={form.control}
            fields={fields}
            append={append}
            remove={remove}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={creatingStaff}>
              Add Staff Member
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStaff;
