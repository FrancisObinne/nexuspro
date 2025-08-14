import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";
import { Separator } from "@/components/separator";
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react";

const JobDetailsPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const job = useSelector((state: RootState) =>
    state.jobs.jobs.find((j) => j.id === jobId)
  );

  if (!job) {
    return (
      <div className="container mx-auto p-4 text-center mt-10">
        <h1 className="text-3xl font-bold dark:text-white mb-4">
          Job Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The job listing you are looking for does not exist or has been
          removed.
        </p>
        <Button asChild>
          <Link to="/jobs">Back to Job Listings</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {job.company}
          </p>
          <CardTitle className="text-3xl font-bold dark:text-white">
            {job.title}
          </CardTitle>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-base text-gray-500 dark:text-gray-400 mt-2">
            <div className="flex items-center">
              <MapPin size={18} className="mr-1" />
              {job.location}
            </div>
            <div className="flex items-center">
              <Briefcase size={18} className="mr-1" />
              {job.type}
            </div>
            <div className="flex items-center">
              <DollarSign size={18} className="mr-1" />
              {job.salary}
            </div>
            <div className="flex items-center">
              <Clock size={18} className="mr-1" />
              Posted {job.postedAgo}
            </div>
          </div>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>
          <h2 className="text-xl font-semibold dark:text-white mb-4">
            Job Description
          </h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {job.description}
          </p>

          <Button asChild size="lg" className="mt-8">
            <a href="#" target="_blank" rel="noopener noreferrer">
              Apply for this Job
            </a>
          </Button>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Button asChild variant="ghost">
          <Link to="/jobs">← Back to all jobs</Link>
        </Button>
      </div>
    </div>
  );
};

export default JobDetailsPage;
