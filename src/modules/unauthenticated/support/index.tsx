import React, { useState } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { Label } from "@/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { ArrowLeftIcon, HelpCircleIcon, SendIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/components/sonner";

const SupportTicketPage = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate a random ticket ID
    const randomTicketId = `TICK-${Math.floor(
      100000 + Math.random() * 900000
    )}`;
    setTicketId(randomTicketId);

    // In a real app, this would send the data to an API
    console.log("Support ticket submitted:", {
      subject,
      description,
      category,
      priority,
      email,
      ticketId: randomTicketId,
    });

    toast.success("Support ticket submitted successfully!");
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6">
          <Link
            to="/auth"
            className="inline-flex items-center text-sm text-green-600 hover:text-green-700"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Login
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <HelpCircleIcon className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Support Center</h1>
              <p className="text-sm text-gray-500">
                Submit a ticket and we&apos;ll get back to you soon
              </p>
            </div>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={category}
                      onValueChange={setCategory}
                      required
                    >
                      <SelectTrigger id="category" className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">
                          Technical Issue
                        </SelectItem>
                        <SelectItem value="billing">
                          Billing Question
                        </SelectItem>
                        <SelectItem value="account">Account Help</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={priority}
                      onValueChange={setPriority}
                      required
                    >
                      <SelectTrigger id="priority" className="mt-1">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of the issue"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide details about your issue"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="mt-1 h-32"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 w-full"
              >
                <SendIcon className="h-4 w-4 mr-2" />
                Submit Ticket
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <HelpCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Ticket Submitted!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for contacting support. We&apos;ve received your
                request and will respond shortly.
                <br />
                Your ticket ID is:{" "}
                <span className="font-medium">{ticketId}</span>
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="mr-2"
              >
                Submit Another Ticket
              </Button>
              <Link to="/auth">
                <Button>Return to Login</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportTicketPage;
