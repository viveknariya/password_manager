"use client";

import React from "react";
import { useEffect } from "react";

export const StripePricingTable = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return React.createElement("stripe-pricing-table", {
    "pricing-table-id": "prctbl_1SrrYfSPVFnxFNoi0Ev10KRm",
    "publishable-key":
      "pk_test_51SohrhSPVFnxFNoi4NN7Hvp6VoKniPT2W4dpvtg891yvU5IfxJAx54i4QkjedJSrpClkCUUbLxtPxKDr4fORSOzc00N3zmLMSz",
  });
};
