import { StripePricingTable } from "./stripe-pricing-table";
import { Card, CardContent } from "@/components/ui/card";

export const PagePricing = () => {
  return (
    <section id="pricing" className="py-20">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
            Pricing
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Transparent pricing, no hidden fees. Choose the plan that's right
            for you.
          </p>
        </div>

        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <StripePricingTable />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
