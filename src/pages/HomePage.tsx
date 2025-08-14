import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/button";
import HeroSection from "@/components/homepage/HeroSection";
import StatsSection from "@/components/homepage/StatsSection";
import LeadershipTeam from "@/components/homepage/LeadershipTeam";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import FAQSection from "@/components/homepage/FAQSection";

const HomePage = () => {
  return (
    <div className="space-y-16">
      <HeroSection />

      {/* Partners Section (Placeholder) */}
      <section className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          Our Trusted Partners
        </p>
        <p className="text-xl font-bold text-gray-800 dark:text-white mt-2">
          The Brands We Work With And Believe In Us
        </p>
        {/* Placeholder for logos */}
        <div className="flex justify-center items-center space-x-8 mt-6">
          <div className="h-12 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-12 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-12 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-12 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Empowering African Leaders to Break Boundaries Together
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Aligned with our vision to foster communities of trust and
              empowerment, NexusPro is dedicated to cultivating a dynamic space
              where leaders—both men and women—can excel. Moving beyond
              conventional networking, we serve as a catalyst for tangible
              growth in both personal and professional spheres. NexusPro offers a
              platform for authentic exchange of experiences, insights, and
              solutions, driving innovation and pushing boundaries to achieve
              lasting impact together.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-blue-600">Vision</h3>
              <p className="text-gray-600 dark:text-gray-400">
                To build the world’s largest and most influential network of
                African leaders.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-600">Mission</h3>
              <p className="text-gray-600 dark:text-gray-400">
                To empower Africa’s NexusPro leaders—both men and women—by
                connecting them with global peers, fostering growth, and driving
                sustainable economic impact worldwide through exclusive, high
                caliber programs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-600">What We Do</h3>
              <p className="text-gray-600 dark:text-gray-400">
                At NexusPro Kenya, we curate luxurious C-Suite–focused events in
                partnership with premier venues and EABL, delivering
                unparalleled experiences for executives. Each event features a
                distinguished guest of honour sharing insights on breaking
                barriers in leadership. Moving forward, we’re introducing a
                membership login system, granting members access to world-class
                mentors, coaches, and exclusive benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      <section className="text-center py-16 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Empower Your Leadership Journey Today
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Join NexusPro and connect with influential African women leaders.
        </p>
        <div className="mt-6 space-x-4">
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 transition-colors"
          >
            <Link to="/membership">Explore Membership</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
          >
            <Link to="/coaching">Explore Coaching</Link>
          </Button>
        </div>
      </section>

      <LeadershipTeam />

      <TestimonialsSection />

      <FAQSection />
    </div>
  );
};

export default HomePage;
