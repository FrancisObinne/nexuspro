import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { createJob } from "../features/jobs/jobsSlice";
// import { AppDispatch } from "../app/store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { Button } from "@/components/button";
import { useToast } from "../hooks";
import { AppDispatch } from "../app/store";
import { createJob } from "../features/jobs/jobsSlice";

const jobFormSchema = z.object({
  title: z.string().min(1, "Title is required."),
  company: z.string().min(1, "Company is required."),
  location: z.string().min(1, "Location is required."),
  type: z.string().min(1, "Type is required."),
  salary: z.string().min(1, "Salary is required."),
  description: z.string().min(1, "Description is required."),
});

const CreateJobForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      type: "",
      salary: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof jobFormSchema>) => {
    try {
      await dispatch(createJob(values)).unwrap();
      toast({
        title: "Job Created!",
        description: `A new job for ${values.company} has been added.`,
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error creating job",
        description: "Something went wrong while creating the job.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Chief Marketing Officer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Global Ventures" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Remote or New York, NY"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Full Time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 200k - 250k" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a detailed job description..."
                  {...field}
                  rows={6}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Job Listing</Button>
      </form>
    </Form>
  );
};

export default CreateJobForm;
