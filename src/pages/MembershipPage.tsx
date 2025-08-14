import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Button } from "@/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Separator } from "@/components/separator";
import { useToast } from "@/hooks";

// Define the form schema using Zod for validation
const membershipFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().min(1, { message: "Company name is required." }),
  title: z.string().min(1, { message: "Title is required." }),
  linkedInUrl: z
    .string()
    .url({ message: "Please enter a valid LinkedIn URL." }),
  professionalLevel: z
    .string()
    .min(1, { message: "Please select a professional level." }),
  reportingLevelsToCEO: z
    .string()
    .min(1, { message: "Please select a number." }),
  employeesReportToYou: z
    .string()
    .min(1, { message: "Please select a number." }),
  howYouHeard: z.string().min(1, { message: "This field is required." }),
});

const MembershipPage = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof membershipFormSchema>>({
    resolver: zodResolver(membershipFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      title: "",
      linkedInUrl: "",
      professionalLevel: "",
      reportingLevelsToCEO: "",
      employeesReportToYou: "",
      howYouHeard: "",
    },
  });

  const onSubmit = (values: z.infer<typeof membershipFormSchema>) => {
    console.log("Membership form submitted:", values);
    toast({
      title: "Application Submitted!",
      description:
        "Thank you for your interest. We will review your application shortly.",
    });
    form.reset();
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Hero Section */}
      <section className="text-center my-10">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-800 dark:text-white">
          Become a Member Today
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Aligned with our vision to foster communities of trust and
          empowerment, NexusPro is committed to creating a dynamic space where
          African leaders—both men and women—can thrive.
        </p>
        <div className="mt-8">
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
          >
            <Link to="#application-form">Apply For Membership</Link>
          </Button>
        </div>
      </section>

      <Separator className="my-10" />

      {/* Benefits Section */}
      <section className="my-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Benefits of being a member
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Access to a Powerful Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              Joining NexusPro provides you with access to a vast and
              influential network of senior executives from over 200 companies,
              including more than 50% from Fortune 500 companies.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Exclusive Events and Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              We curate luxurious Nexus-Suite–focused events in partnership with
              prestigious organizations, featuring renowned guest speakers who
              share insights on leadership excellence.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Visibility and Representation
              </CardTitle>
            </CardHeader>
            <CardContent>
              Become part of a movement dedicated to increasing the
              representation of African leaders in top positions, creating role
              models for future generations.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Professional Growth</CardTitle>
            </CardHeader>
            <CardContent>
              Our upcoming membership system will grant access to mentors,
              coaches, and exclusive benefits designed to enhance career
              journeys and personal development.
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-10" />

      {/* Application Form Section */}
      <section id="application-form" className="my-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Empower Your Leadership Journey Today
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Join our community of visionary leaders and innovators.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Apply For Membership</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your First Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your Last Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email Address"
                          {...field}
                        />
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
                        <Input placeholder="Company" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Designation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedInUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Profile Url</FormLabel>
                      <FormControl>
                        <Input placeholder="LinkedIn Profile" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="professionalLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is your professional level?</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a professional level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="NexusPro">
                            NexusPro Executive
                          </SelectItem>
                          <SelectItem value="vp-director">
                            VP / Director
                          </SelectItem>
                          <SelectItem value="senior-manager">
                            Senior Manager
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reportingLevelsToCEO"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        How many reporting levels are between you and the CEO?
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a number" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">0</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3+">3+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="employeesReportToYou"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How many employees report to you?</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a number" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-10">0-10</SelectItem>
                          <SelectItem value="11-50">11-50</SelectItem>
                          <SelectItem value="51-200">51-200</SelectItem>
                          <SelectItem value="201+">201+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="howYouHeard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How did you hear about NexusPro?</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Social media, friend, event"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Apply For Membership
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default MembershipPage;
