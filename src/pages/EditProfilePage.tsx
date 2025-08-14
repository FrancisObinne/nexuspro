import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { setProfile, setLoading } from "../features/profile/profileSlice";
import { RootState } from "../app/store";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Textarea } from "@/components/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";
import { useToast } from "@/hooks";
// import { useToast } from "@/components/use-toast";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { profile, status } = useSelector((state: RootState) => state.profile);
  const { toast } = useToast();

  const [name, setName] = useState(profile?.name || "");
  const [bio, setBio] = useState(profile?.bio || "");

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setBio(profile.bio);
    }
  }, [profile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    dispatch(setLoading());

    const updatedProfile = {
      ...profile,
      uid: user.uid,
      name,
      bio,
    };

    try {
      await setDoc(doc(db, "profiles", user.uid), updatedProfile);
      dispatch(setProfile(updatedProfile));
      toast({ title: "Profile updated successfully!" });
      navigate("/profile");
    } catch (error) {
      toast({ title: "Failed to update profile.", variant: "destructive" });
    }
  };

  if (!user)
    return (
      <p className="text-center mt-8">Please log in to edit your profile.</p>
    );

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-center">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfilePage;
