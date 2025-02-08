import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Lock } from "lucide-react";

const RATE_LIMIT_MINUTES = 5;
const MAX_ATTEMPTS = 3;
const MIN_PASSWORD_LENGTH = 8;

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockExpiry, setBlockExpiry] = useState<Date | null>(null);

  useEffect(() => {
    // Check for existing rate limit in localStorage
    const stored = localStorage.getItem("loginBlock");
    if (stored) {
      const { expiry, attempts } = JSON.parse(stored);
      if (new Date(expiry) > new Date()) {
        setIsBlocked(true);
        setBlockExpiry(new Date(expiry));
        setAttempts(attempts);
      } else {
        localStorage.removeItem("loginBlock");
      }
    }
  }, []);

  const validateInput = () => {
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
      );
      return false;
    }
    return true;
  };

  const handleRateLimit = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts >= MAX_ATTEMPTS) {
      const expiry = new Date(Date.now() + RATE_LIMIT_MINUTES * 60 * 1000);
      setIsBlocked(true);
      setBlockExpiry(expiry);
      localStorage.setItem(
        "loginBlock",
        JSON.stringify({
          expiry: expiry.toISOString(),
          attempts: newAttempts,
        })
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isBlocked && blockExpiry && blockExpiry > new Date()) {
      const minutesLeft = Math.ceil(
        (blockExpiry.getTime() - Date.now()) / (60 * 1000)
      );
      setError(
        `Too many login attempts. Please try again in ${minutesLeft} minutes.`
      );
      return;
    }

    if (!validateInput()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (signInError) {
        handleRateLimit();
        throw signInError;
      }

      // Verify session
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        throw new Error("Session validation failed");
      }

      // Reset attempts on successful login
      localStorage.removeItem("loginBlock");
      setAttempts(0);

      navigate("/admin");
    } catch (err) {
      console.error("Auth error:", err);
      setError(
        err instanceof Error ? err.message : "Invalid email or password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
            <Lock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div
              className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative"
              role="alert"
            >
              <p className="font-medium">{error}</p>
              {isBlocked && blockExpiry && (
                <p className="text-sm mt-1">
                  Account locked until {blockExpiry.toLocaleTimeString()}
                </p>
              )}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || isBlocked}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : isBlocked ? (
                "Account Locked"
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
