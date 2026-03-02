import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search, HelpCircle, FileText, ShoppingBag, Truck, RotateCcw, CreditCard } from "lucide-react";

const categories = [
  { icon: ShoppingBag, title: "Orders", count: "14 articles", desc: "Placing orders, tracking statuses, and modifying details." },
  { icon: Truck, title: "Shipping", count: "8 articles", desc: "Rates, delivery times, and international shipping info." },
  { icon: RotateCcw, title: "Returns", count: "12 articles", desc: "Policy, process, and status of your returned items." },
  { icon: CreditCard, title: "Payment", count: "6 articles", desc: "Managing credit cards, gift cards, and promo codes." }
];

export function HelpCenterPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-primary/5 py-24 border-b">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">How can we help?</h1>
          <div className="relative max-w-2xl mx-auto shadow-sm rounded-md bg-background">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              className="h-14 pl-12 pr-4 text-base border-muted-foreground/20" 
              placeholder="Search help articles..." 
            />
          </div>
        </div>
      </section>

      {/* Main categories */}
      <div className="container mx-auto px-4 max-w-6xl py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c, i) => (
            <Card key={i} className="group cursor-pointer hover:border-primary transition-all shadow-sm hover:shadow-md">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <c.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{c.title}</CardTitle>
                <div className="text-xs font-semibold text-primary uppercase tracking-wider">{c.count}</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular articles */}
        <section className="mt-24">
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
              "What to do if my item is damaged?"
            ].map((text, i) => (
              <Card key={i} className="cursor-pointer hover:bg-muted/50 transition-colors shadow-none">
                <CardContent className="p-4 flex items-center justify-between group">
                  <span className="font-medium text-sm">{text}</span>
                  <HelpCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
