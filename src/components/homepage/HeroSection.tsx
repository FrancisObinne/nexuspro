import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/button";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 text-white py-24 md:py-32 rounded-lg my-10 dark:bg-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Lead with Greater <br /> Impact
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Explore a platform designed for top-level African leaders.
        </p>
        <div className="mt-8">
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
          >
            <Link to="/membership">Explore Membership</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
