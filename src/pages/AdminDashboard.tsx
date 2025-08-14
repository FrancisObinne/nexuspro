import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { Button } from "@/components/button";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { fetchEvents } from "../features/events/eventsSlice";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/separator";
import { useToast } from "@/hooks";
import UserManagement from "../components/UserManagement";
import CreateJobForm from "@/components/CreateJobForm";

const AdminDashboard = () => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const eventsCollection = collection(db, "events");
      await addDoc(eventsCollection, {
        title,
        description,
        date,
        location,
        organizer: profile?.name || "Admin",
        rsvpCount: 0,
      });
      toast({ title: "Event created successfully!" });
      dispatch(fetchEvents()); // Refetch events to update the list
      // Clear form fields
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
    } catch (error) {
      toast({ title: "Failed to create event.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!profile?.isAdmin) {
    return (
      <p className="text-center mt-8 text-red-500">
        Access Denied: You do not have administrator privileges.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <Separator className="mb-6" />

      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Event"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="max-w-4xl mx-auto mb-8">
        <CardHeader>
          <CardTitle>Create New Job Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateJobForm />
        </CardContent>
      </Card>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <UserManagement />
        </CardContent>
      </Card>

      {/* We can add a User Management section here later */}
    </div>
  );
};

export default AdminDashboard;
