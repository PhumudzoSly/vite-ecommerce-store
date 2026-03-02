import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On all orders over $50",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% protected transactions",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We're here when you need us",
  },
];

export function FeatureStrip() {
  return (
    <section
      className="border-y border-border bg-muted/20"
      aria-label="Store features"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex items-center gap-4 px-6 py-6 md:py-8"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
