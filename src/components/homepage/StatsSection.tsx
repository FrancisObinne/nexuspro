import React from "react";
import { Card, CardContent } from "@/components/card";

const stats = [
  { value: "10+", label: "Events Hosted Annually" },
  { value: "50%", label: "working for Fortune 500 companies" },
  { value: "200+", label: "Companies Represented" },
  { value: "9 in 10", label: "of members say C Level advanced their careers" },
];

const StatsSection = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
          Join a curated network of leaders and innovators dedicated to making a
          meaningful impact.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-gray-100 dark:bg-gray-800 border-none shadow-md"
            >
              <CardContent className="p-6">
                <p className="text-4xl md:text-5xl font-extrabold text-blue-600">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base mt-2 text-gray-600 dark:text-gray-300">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
