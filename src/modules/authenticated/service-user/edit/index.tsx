import React from "react";
import { Button } from "@/components/button";
import Loader from "@/components/loader";
import {
  useGetServiceUserById,
  useUpdateServiceUser,
} from "@/hooks/queries/service-user";
import { EditServiceUserPayload } from "@/types";
import {
  EditServiceUserFormType,
  editServiceUserDefaultValues,
  editServiceUserResolver,
} from "@/validations/service-user";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { ControlledInput } from "@/components/controlled-input";
import { ControlledSelect } from "@/components/controlled-select";
import { ArrowLeft } from "lucide-react";
import { useTitle } from "@/hooks/useTitle";

const EditServiceUser = () => {
  const { serviceUserId } = useParams<{ serviceUserId: string }>();
  const { isPending, serviceUser } = useGetServiceUserById(serviceUserId);
  const { mutate: updateServiceUser, isPending: isUpdatingServiceUser } =
    useUpdateServiceUser();
  const navigate = useNavigate();

  const { updateTitle } = useTitle();

  React.useEffect(() => {
    updateTitle("Service User");
  }, []);

  const form = useForm<EditServiceUserFormType>({
    mode: "onChange",
    resolver: editServiceUserResolver,
    defaultValues: editServiceUserDefaultValues,
  });

  useEffect(() => {
    if (serviceUser) {
      const formattedServiceUser = {
        ...serviceUser.data,
        dateOfBirth: serviceUser.data.dateOfBirth
          ? new Date(serviceUser.data.dateOfBirth).toISOString().split("T")[0]
          : "",
        nextOfKins: serviceUser.data.nextOfKins.map((kin) => ({
          ...kin,
          emails: kin.emails && kin.emails.length > 0 ? kin.emails[0] : "",
          phoneNumbers:
            kin.phoneNumbers && kin.phoneNumbers.length > 0
              ? kin.phoneNumbers[0]
              : "",
        })),
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      form.reset(formattedServiceUser);
    }
  }, [serviceUser, form]);

  const onSubmit: SubmitHandler<EditServiceUserFormType> = (data) => {
    const payload: EditServiceUserPayload = {
      email: data.email,
      serviceUserPublicId: serviceUserId,
      firstName: data.firstName,
      lastName: data.lastName,
      address: {
        street: data.address.street,
        city: data.address.city,
        state: data.address.state,
        postalCode: data.address.postalCode,
        country: data.address.country,
        apartmentNumber: data.address.apartmentNumber,
        buildingName: data.address.buildingName,
      },
      phoneNumber: data.phoneNumber,
      rating: data.rating,
      lasNumber: data.lasNumber,
      nhsNumber: data.nhsNumber,
      doorCode: data.doorCode,
      religion: data.religion,
      medicalHistory: data.medicalHistory,
      emergencyContact: data.emergencyContact,
      contactNumber: data.contactNumber,
      aboutServiceUser: data.aboutServiceUser,
      riskAssessment: data.riskAssessment,
      dateOfBirth: data.dateOfBirth,
    };

    updateServiceUser(
      { id: serviceUserId, payload },
      {
        onSuccess: () => {
          toast.success("Service User updated successfully!");
          navigate("/service-users");
        },
      }
    );
  };

  if (isPending) {
    return <Loader text="Loading Service User data..." />;
  }

  if (!serviceUser) {
    return (
      <div className="p-6 text-center text-gray-600">
        Service User not found.
        <div className="mt-4">
          <Button onClick={() => navigate("/service-users")}>
            <ArrowLeft size={16} className="mr-2" /> Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full ">
      <div className="mb-6 flex items-center justify-between">
        <Button onClick={() => navigate(`/service-users`)}>
          <ArrowLeft size={16} className="mr-2" /> Back
        </Button>
      </div>
      <h3 className="text-lg font-semibold border-b pb-2 mb-4">Edit User</h3>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log("Validation errors:", errors);
        })}
        className="w-full space-y-6 py-6 bg-white shadow rounded-lg p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ControlledInput
            control={form.control}
            name="firstName"
            label="Firstname"
            required
          />
          <ControlledInput
            control={form.control}
            name="lastName"
            label="LastName"
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
          <ControlledInput
            control={form.control}
            name="contactNumber"
            label="Contact Number"
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
            placeholder="e.g., 123 Main St"
          />

          <ControlledInput
            control={form.control}
            name="address.apartmentNumber"
            label="Apartment Number"
            placeholder="e.g., Apt 4B"
          />

          <ControlledInput
            control={form.control}
            name="address.buildingName"
            label="Building Name"
            placeholder="e.g., Central Plaza"
          />

          <ControlledInput
            control={form.control}
            name="address.city"
            label="City"
            required
            placeholder="e.g., Lagos"
          />

          <ControlledInput
            control={form.control}
            name="address.state"
            label="State"
            required
            placeholder="e.g., FCT"
          />

          <ControlledInput
            control={form.control}
            name="address.postalCode"
            label="Postal Code"
            required
            placeholder="e.g., 900001"
          />

          <ControlledInput
            control={form.control}
            name="address.country"
            label="Country"
            required
            placeholder="e.g., Nigeria"
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
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/service-users")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isUpdatingServiceUser}>
            {isUpdatingServiceUser ? "Updating..." : "Update Service User"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditServiceUser;
