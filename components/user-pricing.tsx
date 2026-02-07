"use client";

import React, { useEffect, useState } from "react";
import { ApiResponse } from "@/lib/types";
import { Check } from "lucide-react";

interface StripePrice {
  id: string;
  unit_amount: number;
  currency: string;
  interval: string;
}

interface StripeProduct {
  id: string;
  name: string;
  description: string;
  prices: StripePrice[];
}

export function UserPricing() {
  const [pricing, setPricing] = useState<StripeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<"month" | "year">("month");

  useEffect(() => {
    async function fetchPricing() {
      try {
        const response = await fetch("/api/user-pricing");
        const json: ApiResponse<StripeProduct[]> = await response.json();
        if (json.success && json.data) {
          setPricing(json.data);
        } else {
          setError(json.message || "Failed to load pricing");
        }
      } catch {
        setError("An error occurred while fetching pricing.");
      } finally {
        setLoading(false);
      }
    }

    fetchPricing();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-muted-foreground animate-pulse text-lg font-medium">
          Curating your plans...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <div className="bg-destructive/10 text-destructive p-4 rounded-full mb-4">
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold tracking-tight">
          Oops! Something went wrong
        </h3>
        <p className="text-muted-foreground mt-2 max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-primary text-secondary rounded-lg hover:opacity-90 transition-all font-semibold"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Pick Your Perfect Plan
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Scale your business with our flexible pricing models. No hidden fees,
          just pure value.
        </p>

        <div className="flex items-center justify-center mt-8 space-x-4">
          <span
            className={`text-sm font-medium ${billingCycle === "month" ? "text-foreground" : "text-muted-foreground"}`}
          >
            Monthly
          </span>
          <button
            onClick={() =>
              setBillingCycle(billingCycle === "month" ? "year" : "month")
            }
            className="relative w-14 h-7 bg-muted rounded-full p-1 transition-colors hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <div
              className={`w-5 h-5 bg-primary rounded-full transition-transform duration-200 ease-in-out ${billingCycle === "year" ? "translate-x-[28px]" : "translate-x-0"}`}
            />
          </button>
          <span
            className={`text-sm font-medium ${billingCycle === "year" ? "text-foreground" : "text-muted-foreground"}`}
          >
            Yearly{" "}
            <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full ml-1">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricing.map((product) => {
          const price =
            product.prices.find((p) => p.interval === billingCycle) ||
            product.prices[0];
          const isPro = product.name.toLowerCase() === "pro";

          return (
            <div
              key={product.id}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                isPro
                  ? "border-primary shadow-xl bg-gradient-to-b from-primary/[0.03] to-background"
                  : "border-border bg-card"
              }`}
            >
              {isPro && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-primary text-secondary text-xs font-black uppercase tracking-widest rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold capitalize">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mt-2 min-h-[3rem] line-clamp-2">
                  {product.description ||
                    `Unlock core features with the ${product.name} plan.`}
                </p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-black">
                  ${price ? (price.unit_amount / 100).toFixed(2) : "0"}
                </span>
                <span className="text-muted-foreground font-medium">
                  /{billingCycle}
                </span>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {[
                  "Unlimited Projects",
                  "Premium Support",
                  "Advanced Analytics",
                  "Custom Domains",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary p-1 rounded-full">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-4 rounded-2xl font-bold transition-all transform active:scale-[0.98] ${
                  isPro
                    ? "bg-primary text-secondary shadow-lg shadow-primary/25 hover:opacity-90"
                    : "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                }`}
              >
                {isPro ? "Go Pro Now" : `Select ${product.name}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
