import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../features/events/eventsSlice";
import { RootState, AppDispatch } from "../app/store";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/separator";
import { MapPin, CalendarDays } from "lucide-react";

const EventsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, status, error } = useSelector(
    (state: RootState) => state.events
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading state with Skeletons
  if (status === "loading") {
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>
          <Skeleton className="h-10 w-full md:w-1/3" />
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (status === "failed") {
    return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold dark:text-white">Upcoming Events</h2>
        <Input
          type="text"
          placeholder="Search Events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 mt-4 md:mt-0"
        />
      </div>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Card key={event.id} className="flex flex-col">
              <CardContent className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <CalendarDays size={16} className="mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <MapPin size={16} className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <CardTitle className="text-xl font-semibold dark:text-white">
                    {event.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
                    {event.description}
                  </p>
                </div>
                <div className="mt-6 flex flex-row items-center justify-between">
                  <Button
                    asChild
                    variant="link"
                    className="p-0 h-auto text-blue-600 dark:text-blue-400"
                  >
                    <Link to={`/events/${event.id}`}>Read More</Link>
                  </Button>
                  <Button asChild>
                    <Link to={`/events/${event.id}`}>Register Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No events found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
