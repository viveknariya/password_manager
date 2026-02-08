"use client";
import { cn } from "@/lib/utils";
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
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/store";

export function UserInfoForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [user, setUser] = useAtom(userAtom);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const saveUserInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName }),
      });

      const data: ApiResponse<User> = await response.json();

      if (!response.ok || !data.success) {
        // Handle error
        toast.error(data.message || "Failed to save user info");
      } else {
        if (data.data) {
          setUser(data.data);
        }
        toast.success(data.message || "User info saved successfully");
      }
    } catch {
      toast.error("An error occurred while saving user info");
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadUserInfo = async () => {
      try {
        const response = await fetch("/api/user-info");
        const data: ApiResponse<User> = await response.json();

        if (isMounted && data.data) {
          setFirstName(data.data.first_name || "");
          setLastName(data.data.last_name || "");
        }
      } catch {
        // Error handling if needed
      }
    };

    loadUserInfo();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Enter your user information below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => saveUserInfo(e)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Field>
              <Field>
                <Button type="submit">Submit</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
