import React, { useState, useEffect } from "react";
import { Button } from "@/components/button";
import { Link } from "react-router-dom";
import { RefreshCwIcon, ArrowLeftIcon, MailIcon } from "lucide-react";
// import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/input-otp";
import { toast } from "@/components/sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/input-otp";

const EmailVerificationPage = () => {
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [email] = useState("user@example.com");

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const resendCode = () => {
    // In a real app, this would call an API to resend the code
    setTimeLeft(300); // Reset timer to 5 minutes
    setCode(""); // Clear the input
    toast.success("Verification code resent to your email");
  };

  const verifyCode = () => {
    // In a real app, this would validate the code with an API call
    if (code.length === 6) {
      toast.success("Email verified successfully!");
      // Redirect to dashboard or another page after success
    } else {
      toast.error("Please enter the complete verification code");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <img
          src="/lovable-uploads/95c24f44-1412-4d69-9ba0-81b01a25d8cd.png"
          alt="Logo"
          className="w-10 h-10"
        />
      </div>
      <div className="absolute top-4 right-4">
        <span className="text-sm text-gray-500">English</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <MailIcon className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="text-2xl font-semibold text-center">
            Check your email
          </h1>
          <p className="text-gray-500 text-center mt-2">
            We sent a verification code to
            <br />
            {email}
          </p>
        </div>

        <div className="mb-6">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(value) => setCode(value)}
          >
            <InputOTPGroup className="gap-2 justify-center">
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="w-12 h-12 text-2xl border-gray-300"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="text-center text-sm text-gray-500 mb-6">
          <p>Code expires in: {formatTime(timeLeft)}</p>
          <button
            onClick={resendCode}
            className="flex items-center justify-center mx-auto mt-2 text-green-600 hover:underline"
          >
            <RefreshCwIcon className="h-3 w-3 mr-1" />
            Didn&apos;t receive the code? Resend Code
          </button>
        </div>

        <Button
          onClick={verifyCode}
          className="w-full bg-green-600 hover:bg-green-700 mb-4"
        >
          Verify Code
        </Button>

        <div className="text-center">
          <Link
            to="/auth/support"
            className="text-sm text-gray-500 hover:underline"
          >
            Need help? Contact Support
          </Link>
        </div>
      </div>

      <div className="mt-4">
        <Link
          to="/auth"
          className="flex items-center text-sm text-gray-600 hover:underline"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
