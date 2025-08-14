import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";
import { Avatar, AvatarFallback } from "@/components/avatar";

const teamMembers = [
  {
    name: "Esther Kinuthia",
    title: "Co-Founder and CEO",
    bio: "Esther Kinuthia is the Founder and CEO of C-Level, leading with passion and vision. Since January 11th, 2020, she has steered the community, delivering high-impact events that inspire and connect leaders.",
    bioSections: [
      {
        title: "Global Tech Leader",
        description:
          "With a career spanning Google, Meta, Oracle, TikTok, and Workday, Esther brings a wealth of global tech expertise to C-Level. Her experience leading multi-million-dollar programs and market expansion initiatives equips her with the insight and network to connect leaders, drive innovation, and create transformative opportunities for the community.",
      },
      {
        title: "Triple Degree Holder",
        description:
          "Esther Kinuthia holds a Master's in Entrepreneurship & Innovation from HEC Paris, one of the world's top 10 business schools. She also earned a Master's in Digital Marketing Strategy from Trinity Business School in Ireland (ranked #1 in Europe) and a Bachelor's in Commerce from Strathmore University in Kenya. She was also recently accepted into Stanford University.",
      },
    ],
  },
];

const LeadershipTeam = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Meet Our Leadership Team
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Get to know the visionary leaders driving our mission and shaping
            our community's future.
          </p>
        </div>

        {teamMembers.map((member, index) => (
          <Card
            key={index}
            className="flex flex-col md:flex-row items-center md:items-start p-8 shadow-lg"
          >
            <div className="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left mb-6 md:mb-0">
              <Avatar className="h-32 w-32 md:h-48 md:w-48">
                <AvatarFallback className="text-5xl bg-blue-100 text-blue-600">
                  EK
                </AvatarFallback>
              </Avatar>
              <div className="mt-4">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {member.title}
                </p>
              </div>
            </div>

            <div className="md:w-2/3 md:pl-8">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {member.bio}
              </p>
              {member.bioSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-4">
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                    {section.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default LeadershipTeam;
