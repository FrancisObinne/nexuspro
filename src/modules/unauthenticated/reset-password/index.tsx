import React, { useState } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Link } from "react-router-dom";
import { LockIcon } from "lucide-react";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log("Password reset requested for:", email);
    // In a real app, you would send a request to your API
  };

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <div className="w-full max-w-md mx-auto my-auto p-6">
        {/* Header with logo */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-10 h-10 bg-green-600 rounded-md flex items-center justify-center">
            <LockIcon className="w-5 h-5 text-white" />
          </div>
          <div className="flex space-x-4 text-sm">
            <Link to="/support" className="text-gray-500 hover:text-gray-700">
              Help
            </Link>
            <Link to="/support" className="text-gray-500 hover:text-gray-700">
              Contact
            </Link>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6">
          {!isSubmitted ? (
            <>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <h1 className="text-xl font-semibold">Reset Password</h1>
              </div>
              <p className="text-gray-500 text-sm mb-6">
                Enter your email address and we&apos;ll send you instructions to
                reset your password.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Reset Password
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Link
                  to="/auth"
                  className="text-sm text-green-600 hover:underline"
                >
                  Back to Login
                </Link>
              </div>
              <div className="mt-3 text-center">
                <Link
                  to="/support"
                  className="text-xs text-gray-500 hover:underline"
                >
                  Need help? Contact Support
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <h2 className="text-xl font-semibold mb-4">Check Your Email</h2>
              <p className="text-gray-500 mb-4">
                For your security, the password reset link will expire in 24
                hours. Please check your spam folder if you don&apos;t see the
                email.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 bg-green-600 hover:bg-green-700"
              >
                Back
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6 text-xs text-gray-400">
          <span>© 2025. All rights reserved.</span>
          <div className="flex space-x-4">
            <Link to="#" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
