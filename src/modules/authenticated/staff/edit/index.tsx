import React from "react";
import { Button } from "@/components/button";
import Loader from "@/components/loader";
import { useEditStaff, useGetStaffById } from "@/hooks";
import { ArrowLeft, UserPlus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { createStaffResolver, CreateStaffFormType } from "@/validations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { ControlledInput } from "@/components/controlled-input";
import { ControlledSelect } from "@/components/controlled-select";
import StaffAddressFields from "@/components/staff/StaffAddressFields";
import NextOfKinFields from "@/components/staff/NextOfKinFields";
import { useGetRoles } from "@/hooks/queries/roles";
import { CreateStaffPayload } from "@/types";
import { useTitle } from "@/hooks/useTitle";

const EditStaff = () => {
  const { publicId } = useParams<{ publicId: string }>();
  const { data, isPending, error } = useGetStaffById(publicId);
  const { roleInventory } = useGetRoles();
  const { editStaff, editingStaff } = useEditStaff();
  const navigate = useNavigate();

  const { updateTitle } = useTitle();

  React.useEffect(() => {
    updateTitle("Staff");
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<CreateStaffFormType>({
    resolver: createStaffResolver,
    defaultValues: {},
  });

  const { reset, control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "nextOfKins",
  });

  useEffect(() => {
    if (data?.data) {
      const staff = data.data;
      reset({
        email: staff.email || "",
        firstName: staff.firstName || "",
        lastName: staff.lastName || "",
        roleId: staff.roleId || "",
        status: staff.status?.toLowerCase() || "active",
        phoneNumber: staff.phoneNumber || "",
        department: staff.department || "",
        profilePicture: staff.profilePicture || "",
        address: {
          street: staff.address?.street || "",
          city: staff.address?.city || "",
          state: staff.address?.state || "",
          postalCode: staff.address?.postalCode || "",
          country: staff.address?.country || "",
          apartmentNumber: staff.address?.apartmentNumber || "",
          buildingName: staff.address?.buildingName || "",
        },
        nextOfKins: staff.nextOfKins || [],
      });
      setPreviewImage(staff.profilePicture || null);
    }
  }, [data, reset]);

  const onSubmit = (formData: CreateStaffFormType) => {
    const payload: CreateStaffPayload = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      roleId: formData.roleId,
      department: formData.department,
      phoneNumber: formData.phoneNumber,
      status: formData.status,
      profilePicture:
        previewImage ||
        formData.profilePicture ||
        "https://source.unsplash.com/random/200x200/?portrait",
      address: {
        street: formData.address.street,
        city: formData.address.city,
        state: formData.address.state,
        postalCode: formData.address.postalCode,
        country: formData.address.country,
        apartmentNumber: formData.address.apartmentNumber,
        buildingName: formData.address.buildingName,
      },
      nextOfKins: formData.nextOfKins.map((kin) => ({
        firstName: kin.firstName || "",
        lastName: kin.lastName || "",
        gender: kin.gender || "",
        relationship: kin.relationship || "",
        emails: kin.emails || [],
        phoneNumbers: kin.phoneNumbers || [],
        address: {
          street: kin.address?.street || "",
          city: kin.address?.city || "",
          state: kin.address?.state || "",
          postalCode: kin.address?.postalCode || "",
          country: kin.address?.country || "",
          apartmentNumber: kin.address?.apartmentNumber || "",
          buildingName: kin.address?.buildingName || "",
        },
      })),
    };

    editStaff(
      { staffId: publicId!, data: payload },
      {
        onSuccess: () => {
          toast.success("Staff updated successfully!");
          navigate("/staff");
        },
        onError: () => {
          toast.error("Failed to update staff.");
        },
      }
    );
  };

  if (isPending) return <Loader />;
  if (error || !data?.data) return <div>Failed to fetch staff</div>;

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => navigate("/staff")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Edit Staff</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-6 py-6 bg-white shadow rounded-lg p-6"
      >
        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-4">
          <div
            className="h-24 w-24 cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
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
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setPreviewImage(URL.createObjectURL(file));
              }}
              accept="image/*"
              className="hidden"
            />
          </div>
          <span className="text-sm text-gray-500 mt-2">
            Click to upload profile picture
          </span>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <ControlledInput
            control={control}
            name="firstName"
            label="First Name"
            required
          />
          <ControlledInput
            control={control}
            name="lastName"
            label="Last Name"
            required
          />
          <ControlledSelect
            control={control}
            name="roleId"
            label="Role"
            required
            options={(roleInventory || []).map((role) => ({
              label: role.name,
              value: role.publicId,
            }))}
          />
          <ControlledInput
            control={control}
            name="email"
            label="Email"
            required
          />
          <ControlledSelect
            control={control}
            name="status"
            label="Status"
            required
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
              { label: "Away", value: "away" },
            ]}
          />
          <ControlledInput
            control={control}
            name="phoneNumber"
            label="Phone Number"
            required
          />
          <ControlledInput
            control={control}
            name="department"
            label="Department"
            required
          />
        </div>

        <StaffAddressFields control={control} />
        <NextOfKinFields
          control={control}
          fields={fields}
          append={append}
          remove={remove}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={editingStaff}>
            Update Staff
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditStaff;
