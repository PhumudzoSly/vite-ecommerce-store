import { Input } from "@/components/ui/input";
import {
  Search,
  HelpCircle,
  FileText,
  ShoppingBag,
  Truck,
  RotateCcw,
  CreditCard,
} from "lucide-react";

const categories = [
  {
    icon: ShoppingBag,
    title: "Orders",
    count: "14 articles",
    desc: "Placing orders, tracking statuses, and modifying details.",
  },
  {
    icon: Truck,
    title: "Shipping",
    count: "8 articles",
    desc: "Rates, delivery times, and international shipping info.",
  },
  {
    icon: RotateCcw,
    title: "Returns",
    count: "12 articles",
    desc: "Policy, process, and status of your returned items.",
  },
  {
    icon: CreditCard,
    title: "Payment",
    count: "6 articles",
    desc: "Managing credit cards, gift cards, and promo codes.",
  },
];

export function HelpCenterPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-primary pt-24 pb-32">
        <div className="container mx-auto px-4 max-w-4xl text-center text-primary-foreground space-y-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            How can we help?
          </h1>
          <div className="relative max-w-2xl mx-auto shadow-2xl rounded-2xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            <Input
              className="h-16 pl-16 pr-6 text-lg rounded-2xl border-none ring-0 text-foreground"
              placeholder="Search help articles..."
            />
          </div>
        </div>
      </section>

      {/* Main categories */}
      <div className="container mx-auto px-4 max-w-6xl -mt-16 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c, i) => (
            <div
              key={i}
              className="bg-card p-8 rounded-2xl border shadow-sm hover:border-primary transition-all cursor-pointer group"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">{c.title}</h3>
              <p className="text-xs font-semibold text-primary mb-3 uppercase tracking-wider">
                {c.count}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Popular articles */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Popular Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "How do I track my order?",
              "What is your return policy?",
              "Do you ship internationally?",
              "Can I change my shipping address?",
              "How to use a promo code?",
              "What to do if my item is damaged?",
            ].map((text, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border bg-card hover:bg-muted/50 cursor-pointer flex items-center justify-between group transition-colors"
              >
                <span className="font-medium">{text}</span>
                <HelpCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
