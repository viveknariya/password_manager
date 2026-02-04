"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";
import { ApiResponse } from "@/lib/types";

export function UserBillingForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);

  const handleManageBilling = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
      });

      const data: ApiResponse<{ url: string }> = await response.json();

      if (data.success && data.data?.url) {
        window.location.href = data.data.url;
      } else {
        alert(data.message || "Failed to create billing portal session");
      }
    } catch (error) {
      console.error("Error creating billing portal session:", error);
      alert("An error occurred while trying to access the billing portal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Billing Management</CardTitle>
          <CardDescription>
            Manage your subscription, payment methods, and billing history
            through our secure customer portal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Click the button below to access your Stripe customer portal.
              You'll be redirected to a secure page where you can update your
              plan or payment details.
            </p>
            <Button
              onClick={handleManageBilling}
              className="w-fit gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating Session...
                </>
              ) : (
                <>
                  Open Customer Portal
                  <ExternalLink className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
