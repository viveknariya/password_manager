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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/store";

export function UserInfoForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [, setUser] = useAtom(userAtom);
  const router = useRouter();

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
        window.alert(data.message || "Failed to save user info");
      } else {
        window.alert(data.message || "User info saved successfully");
      }
    } catch (error) {
      console.error("Error saving user info:", error);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await fetch("/api/user-info");
      const data: ApiResponse<User> = await response.json();

      if (!response.ok || !data.success || !data.data) {
        console.log(data.message);
      }
      if (data.data) {
        setFirstName(data.data.first_name || "");
        setLastName(data.data.last_name || "");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
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
