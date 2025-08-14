import React from "react";
import { Card, CardHeader, CardContent } from "@/components/card";
import { Avatar, AvatarFallback } from "@/components/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Emily Johnson",
    title: "VP of Marketing, Stellar Innovations Co.",
    quote:
      "Joining Clevel has empowered me with a supportive network of women leaders, inspiring growth and innovation in my professional journey.",
    avatar: "EJ",
  },
  {
    name: "Jane Smith",
    title: "Director of Operations, Apex Builders Inc.",
    quote:
      "Clevel has provided me with incredible mentorship, networking opportunities, and resources that have significantly advanced my career and leadership skills.",
    avatar: "JS",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-12">
          What our Members have to say about their experience at Clevel
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative p-6 text-left shadow-lg">
              <div className="absolute top-4 right-4 text-gray-200 dark:text-gray-700">
                <Quote size={48} />
              </div>
              <CardContent className="p-0">
                <p className="text-gray-700 dark:text-gray-300 italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
