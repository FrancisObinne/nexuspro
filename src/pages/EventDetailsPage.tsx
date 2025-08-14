import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";
import { useToast } from "@/hooks";
import { fetchEvents } from "@/features/events/eventsSlice";
// import { useToast } from "@/components/use-toast";

const EventDetailsPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const { toast } = useToast();

  const isRsvped = event?.rsvps?.includes(user?.uid);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) return;
      try {
        const eventRef = doc(db, "events", eventId);
        const eventSnap = await getDoc(eventRef);
        if (eventSnap.exists()) {
          setEvent({ id: eventSnap.id, ...eventSnap.data() });
        } else {
          toast({
            title: "Event not found",
            description: "The event you are looking for does not exist.",
            variant: "destructive",
          });
          navigate("/events");
        }
      } catch (error) {
        toast({
          title: "Error fetching event",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId, navigate, toast]);

  const handleRsvp = async () => {
    if (!user) {
      toast({
        title: "Please log in to RSVP",
        variant: "destructive",
      });
      return;
    }
    setRsvpLoading(true);
    try {
      const eventRef = doc(db, "events", eventId!);
      await updateDoc(eventRef, {
        rsvps: isRsvped ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });
      setEvent((prevEvent: any) => ({
        ...prevEvent,
        rsvps: isRsvped
          ? prevEvent.rsvps.filter((uid: string) => uid !== user.uid)
          : [...(prevEvent.rsvps || []), user.uid],
      }));
      toast({
        title: isRsvped ? "RSVP Canceled" : "RSVP Successful",
        description: isRsvped
          ? "You have successfully canceled your RSVP."
          : "You have successfully RSVPed for this event!",
      });
      // We can refetch the events list here to update the count
      dispatch(fetchEvents());
    } catch (error) {
      toast({
        title: "RSVP Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRsvpLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Loading event details...</p>;
  }

  if (!event) {
    return null; // The toast and navigate will handle this
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Date: {event.date}</p>
          <p className="text-muted-foreground">Location: {event.location}</p>
          <p className="text-lg">{event.description}</p>
          <p className="font-semibold">
            Attendees: {event.rsvps ? event.rsvps.length : 0}
          </p>
          <Button onClick={handleRsvp} disabled={rsvpLoading}>
            {rsvpLoading ? "Loading..." : isRsvped ? "Cancel RSVP" : "RSVP Now"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetailsPage;
