"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ApiResponse, User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/user-info");
        const data: ApiResponse<User> = await response.json();
        if (isMounted && data.data) {
          setUser(data.data);
        }
      } catch {
        if (isMounted) setUser(null);
      }
    };
    fetchUserInfo();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const sendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok || !data.success) {
        toast.error(data.message || "Failed to send OTP");
      } else {
        toast.success(data.message || "OTP sent successfully");
        setStep("otp");
        setCountdown(30);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data: ApiResponse<{ token: string }> = await response.json();

      if (!response.ok || !data.success) {
        toast.error(data.message || "Invalid OTP");
      } else {
        router.push("/dashboard");
        toast.success(data.message || "Logged in successfully");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <div className="flex h-8 w-8 items-center justify-center border border-black">
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
            </div>
            <span className="text-xl">Zallyy</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Empowering builders to ship faster.
          </p>
        </div>
        {user && (
          <Button onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </Button>
        )}
        {step === "email" && (
          <Card>
            <CardHeader>
              <CardTitle>Sign up or Log in</CardTitle>
              <CardDescription>
                Enter your email below to sign up or login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={sendOTP}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <Button type="submit">Send OTP</Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        )}
        {step === "otp" && (
          <Card>
            <CardHeader>
              <CardTitle>Sign up or Log in</CardTitle>
              <CardDescription>
                OTP sent to <span className="text-lg font-bold">{email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={verifyOTP}>
                <FieldGroup>
                  <Field>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor="otp">OTP</FieldLabel>
                      <a
                        href="/login"
                        className="text-sm underline-offset-4 hover:underline"
                      >
                        Edit Email?
                      </a>
                    </div>
                    <Input
                      id="otp"
                      type="text"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <Button type="submit">Submit</Button>
                  </Field>
                  <div className="text-center text-sm">
                    Didn&apos;t receive the code?{" "}
                    <button
                      type="button"
                      onClick={(e) => sendOTP(e)}
                      disabled={countdown > 0}
                      className={cn(
                        "font-medium underline underline-offset-4 hover:text-primary",
                        countdown > 0 && "cursor-not-allowed opacity-50",
                      )}
                    >
                      {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                    </button>
                  </div>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
