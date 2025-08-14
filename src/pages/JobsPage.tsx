import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../features/jobs/jobsSlice";
import { RootState, AppDispatch } from "../app/store";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Separator } from "@/components/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react";

const JobsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, status, error } = useSelector((state: RootState) => state.jobs);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchJobs());
    }
  }, [status, dispatch]);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading state with Skeletons
  if (status === "loading") {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold dark:text-white mb-2">
          Start doing work that matters
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          At NexusPro, we share Nexus-Suite job opportunities in collaboration
          with our partners.
        </p>
        <Input
          placeholder="Search Jobs..."
          className="w-full md:w-1/3"
          disabled
        />
        <Separator className="my-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-10 w-full mt-4" />
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
      <h1 className="text-4xl font-bold dark:text-white mb-2">
        Start doing work that matters
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        At NexusPro, we share Nexus-Suite job opportunities in collaboration
        with our partners.
      </p>
      <Input
        type="text"
        placeholder="Search Jobs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full md:w-1/3"
      />
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle className="text-xl font-bold dark:text-white">
                  {job.title}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400">
                  {job.company}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Briefcase size={16} className="mr-1" />
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <DollarSign size={16} className="mr-1" />
                    {job.salary}
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    Posted {job.postedAgo}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {job.description}
                </p>
                <Button asChild>
                  <Link to={`/jobs/${job.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No jobs found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
