import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, ArrowRight, Download } from "lucide-react";

const news = [
  {
    date: "Oct 24, 2026",
    title: "Wamly Raises Series A to Expand Global Supply Network",
    category: "Corporate",
  },
  {
    date: "Sep 15, 2026",
    title: "New AI Integration Helps Users Find the Perfect Jewelry",
    category: "Product",
  },
  {
    date: "Aug 02, 2026",
    title: "Wamly Store Named Best Newcomer in E-Commerce Awards",
    category: "Awards",
  },
];

export function PressPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="lg:w-2/3 space-y-16">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-6">
              Press Center
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Read our latest updates, brand evolution, and announcements as we
              redefine the future of online retail.
            </p>
          </div>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Newspaper className="h-6 w-6 text-primary" />
              Latest News
            </h2>
            <div className="grid gap-6">
              {news.map((item, i) => (
                <div
                  key={i}
                  className="group p-8 rounded-2xl border bg-card hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      {item.date}
                    </span>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                    Read Article <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full h-12">
              View More News
            </Button>
          </section>
        </div>

        <div className="lg:w-1/3 space-y-8">
          <div className="p-8 rounded-2xl border bg-muted/50 space-y-6">
            <h2 className="text-xl font-bold">Brand Assets</h2>
            <p className="text-sm text-muted-foreground">
              Approved brand imagery and assets for use in news coverage.
            </p>
            <div className="space-y-3">
              <Button
                variant="secondary"
                className="w-full justify-between pr-4"
              >
                Media Kit (PDF)
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-between pr-4"
              >
                Logo Package (SVG/PNG)
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-between pr-4"
              >
                Brand Guidelines
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-8 rounded-2xl border space-y-4">
            <h2 className="text-xl font-bold">Media Inquiries</h2>
            <p className="text-sm text-muted-foreground">
              For interview requests or additional information, please email our
              communications team:
            </p>
            <p className="font-bold text-primary">press@wamly.store</p>
          </div>
        </div>
      </div>
    </div>
  );
}
