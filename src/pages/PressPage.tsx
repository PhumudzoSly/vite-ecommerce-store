import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Newspaper, ArrowRight, Download } from "lucide-react";

const news = [
  { date: "Oct 24, 2026", title: "Wamly Raises Series A to Expand Global Supply Network", category: "Corporate" },
  { date: "Sep 15, 2026", title: "New AI Integration Helps Users Find the Perfect Jewelry", category: "Product" },
  { date: "Aug 02, 2026", title: "Wamly Store Named Best Newcomer in E-Commerce Awards", category: "Awards" },
];

export function PressPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="lg:w-2/3 space-y-16">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-6">Press Center</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Read our latest updates, brand evolution, and announcements as we redefine 
              the future of online retail. 
            </p>
          </div>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Newspaper className="h-6 w-6 text-primary" />
              Latest News
            </h2>
            <div className="grid gap-6">
              {news.map((item, i) => (
                <Card key={i} className="group cursor-pointer hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm font-medium text-muted-foreground">{item.date}</span>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                      Read Article <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button variant="outline" className="w-full">View More News</Button>
          </section>
        </div>

        <div className="lg:w-1/3 space-y-8">
          <Card className="bg-muted/50 border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">Brand Assets</CardTitle>
              <p className="text-sm text-muted-foreground">
                Approved brand imagery and assets for use in news coverage. 
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-between pr-4 bg-background">
                Media Kit (PDF)
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between pr-4 bg-background">
                Logo Package (SVG/PNG)
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between pr-4 bg-background">
                Brand Guidelines
                <Download className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Media Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                For interview requests or additional information, please email our communications team:
              </p>
              <p className="font-semibold text-primary">press@wamly.store</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
