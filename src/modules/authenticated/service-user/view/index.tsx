import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetServiceUserById } from "@/hooks";
import Loader from "@/components/loader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/card";
import { Button } from "@/components/button";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/badge";
import { Separator } from "@/components/separator";
import { useTitle } from "@/hooks/useTitle";

const ViewServiceUser = () => {
  const { serviceUserId } = useParams<{ serviceUserId: string }>();
  const navigate = useNavigate();

  const { updateTitle } = useTitle();

  React.useEffect(() => {
    updateTitle("Service User");
  }, []);

  const { serviceUser, isPending } = useGetServiceUserById(serviceUserId);

  if (isPending) {
    return <Loader text="Loading Service User Profile..." />;
  }

  if (!serviceUser) {
    return (
      <div className="p-6 text-center text-gray-600">
        Service User not found.
        <div className="mt-4">
          <Button onClick={() => navigate("/service-users")}>
            <ArrowLeft size={16} className="mr-2" /> Service User List
          </Button>
        </div>
      </div>
    );
  }

  const getRagBadge = (rating: string) => {
    if (rating === "HIGH") {
      return <Badge className="bg-red-700 text-white">HIGH</Badge>;
    } else if (rating === "MEDIUM") {
      return <Badge className="bg-amber-600 text-white">MEDIUM</Badge>;
    } else {
      return <Badge className="bg-green-600 text-white">LOW</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "ACTIVE") {
      return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
    } else if (status === "INACTIVE") {
      return (
        <Badge className="bg-amber-500 hover:bg-amber-600">Inactive</Badge>
      );
    } else {
      return (
        <Badge
          variant="outline"
          className="bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          Away
        </Badge>
      );
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <Button onClick={() => navigate("/service-users")}>
          <ArrowLeft size={16} className="mr-2" /> Back
        </Button>
        <Button
          onClick={() => navigate(`/service-users/${serviceUserId}/edit`)}
          variant="outline"
        >
          Edit Profile
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-4">
            {serviceUser.data.firstName} {serviceUser.data.lastName}
            {getRagBadge(serviceUser.data.rating)}
            {getStatusBadge(serviceUser.data.status)}
          </CardTitle>
          <CardDescription className="text-lg">
            Service User Profile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h3 className="text-xl font-semibold mb-3 border-b pb-2">
              User Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p>
                <strong>Email:</strong> {serviceUser.data.email}
              </p>
              <p>
                <strong>Phone Number:</strong>{" "}
                {serviceUser.data.phoneNumber || "N/A"}
              </p>
              <p>
                <strong>Date of Birth:</strong> {serviceUser.data.dateOfBirth}
              </p>
              <p>
                <strong>NHS Number:</strong> {serviceUser.data.nhsNumber}
              </p>
              <p>
                <strong>LAS Number:</strong> {serviceUser.data.lasNumber}
              </p>
              <p>
                <strong>Door Code:</strong> {serviceUser.data.doorCode}
              </p>
              <p>
                <strong>Religion:</strong> {serviceUser.data.religion}
              </p>
              <p>
                <strong>Emergency Contact:</strong>{" "}
                {serviceUser.data.emergencyContact}
              </p>
            </div>
          </section>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-gray-700">
                {serviceUser.data.address.street && (
                  <div>
                    <p className="font-semibold text-sm text-gray-500">
                      Street
                    </p>
                    <p className="text-base">
                      {serviceUser.data.address.street}
                    </p>
                  </div>
                )}
                {serviceUser.data.address.apartmentNumber && (
                  <div>
                    <p className="font-semibold text-sm text-gray-500">
                      Apartment Number
                    </p>
                    <p className="text-base">
                      {serviceUser.data.address.apartmentNumber}
                    </p>
                  </div>
                )}
                {serviceUser.data.address.buildingName && (
                  <div>
                    <p className="font-semibold text-sm text-gray-500">
                      Building Name
                    </p>
                    <p className="text-base">
                      {serviceUser.data.address.buildingName}
                    </p>
                  </div>
                )}
                {serviceUser.data.address.city && (
                  <div>
                    <p className="font-semibold text-sm text-gray-500">City</p>
                    <p className="text-base">{serviceUser.data.address.city}</p>
                  </div>
                )}
                {serviceUser.data.address.state && (
                  <div>
                    <p className="font-semibold text-sm text-gray-500">State</p>
                    <p className="text-base">
                      {serviceUser.data.address.state}
                    </p>
                  </div>
                )}
                {serviceUser.data.address.postalCode && (
                  <div>
                    <p className="font-semibold text-sm text-gray-500">
                      Postal Code
                    </p>
                    <p className="text-base">
                      {serviceUser.data.address.postalCode}
                    </p>
                  </div>
                )}
                {serviceUser.data.address.country && (
                  <div>
                    <p className="font-semibold text-sm text-gray-500">
                      Country
                    </p>
                    <p className="text-base">
                      {serviceUser.data.address.country}
                    </p>
                  </div>
                )}
              </div>
              <Separator />
              <div>
                <p className="font-semibold text-sm text-gray-500 mb-1">
                  Full Address
                </p>
                <p className="text-base leading-relaxed">
                  {serviceUser.data.address.street}
                  {serviceUser.data.address.apartmentNumber &&
                    `, Apt ${serviceUser.data.address.apartmentNumber}`}
                  {serviceUser.data.address.buildingName &&
                    `, ${serviceUser.data.address.buildingName}`}
                  <br />
                  {serviceUser.data.address.city},{" "}
                  {serviceUser.data.address.state}{" "}
                  {serviceUser.data.address.postalCode}
                  <br />
                  {serviceUser.data.address.country}
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Next of Kin Information ({serviceUser.data.nextOfKins.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {serviceUser.data.nextOfKins.map((kin, index) => (
                <div key={kin.publicId || index}>
                  {index > 0 && <Separator className="mb-8" />}
                  <h4 className="text-xl font-semibold mb-4 text-gray-800">
                    Next of Kin {index + 1}: {kin.firstName} {kin.lastName}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-gray-700">
                    {kin.relationship && (
                      <div>
                        <p className="font-semibold text-sm text-gray-500">
                          Relationship
                        </p>
                        <p className="text-base">{kin.relationship}</p>
                      </div>
                    )}
                    {kin.gender && (
                      <div>
                        <p className="font-semibold text-sm text-gray-500">
                          Gender
                        </p>
                        <p className="text-base">{kin.gender}</p>
                      </div>
                    )}
                    {kin.emails && kin.emails.length > 0 && (
                      <div>
                        <p className="font-semibold text-sm text-gray-500">
                          Email(s)
                        </p>
                        <p className="text-base">
                          {kin.emails.join(", ") || "N/A"}
                        </p>
                      </div>
                    )}
                    {kin.phoneNumbers && kin.phoneNumbers.length > 0 && (
                      <div>
                        <p className="font-semibold text-sm text-gray-500">
                          Phone Number(s)
                        </p>
                        <p className="text-base">
                          {kin.phoneNumbers.join(", ") || "N/A"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <section>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold mb-3 border-b pb-2">
                  Medical
                </h3>
                <p className="font-semibold">Medical History:</p>
                <p className="pl-4">
                  {serviceUser.data.medicalHistory ||
                    "No medical history provided."}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 border-b pb-2">
                  About
                </h3>
                <p className="font-semibold">About Service User:</p>
              </div>
              <p>
                <strong>Risk Assessment Completed:</strong>
                {serviceUser.data.riskAssessment ? "Yes" : "No"}
              </p>
            </div>
          </section>
          <Separator />
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewServiceUser;
