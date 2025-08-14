import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";
import { Button } from "@/components/button";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { profile } = useSelector((state: RootState) => state.profile);

  if (!user) {
    return (
      <p className="text-center mt-8">Please log in to view your profile.</p>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Card className="w-[450px]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>My Profile</CardTitle>
            <Button asChild variant="outline">
              <Link to="/edit-profile">Edit</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-semibold">Name:</p>
            <p>{profile?.name || user.email}</p>
          </div>
          <div>
            <p className="font-semibold">Bio:</p>
            <p className="text-muted-foreground">
              {profile?.bio || "No bio yet."}
            </p>
          </div>
          <div>
            <p className="font-semibold">Membership Tier:</p>
            <p className="capitalize">{profile?.membershipTier || "free"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
