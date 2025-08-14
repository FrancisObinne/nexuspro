import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import Loader from "@/components/loader";
import { useSignin } from "@/hooks";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useSignin({
    email: formdata.email,
    password: formdata.password,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen w-full">
      {/* Green side panel */}
      <div className="hidden md:flex md:w-2/5 bg-green-600 flex-col justify-center items-center text-white p-10 relative">
        <div className="max-w-md">
          <h1 className="text-3xl font-semibold mb-2">Welcome Back</h1>
          <p className="text-green-100">Login to access your account</p>
        </div>
        <div className="absolute bottom-4 left-4 text-xs text-green-200">
          © 2025
        </div>
      </div>

      {/* Login form */}
      <div className="w-full md:w-3/5 flex justify-center items-center p-4 md:p-10">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold">Log In</h2>
            <p className="text-gray-500 text-sm">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formdata.email}
                onChange={(e) =>
                  setFormData({ ...formdata, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formdata.password}
                  onChange={(e) =>
                    setFormData({ ...formdata, password: e.target.value })
                  }
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/auth/reset-password"
                className="text-sm text-green-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Log In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/auth/support"
              className="text-sm text-gray-500 hover:underline"
            >
              Need help? Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
