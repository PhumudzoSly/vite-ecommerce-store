import { Button } from "@/components/ui/button";
import { Users, Globe, Target, Briefcase } from "lucide-react";

export function AboutUsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <section className="relative py-24 overflow-hidden bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6">
              Redefining your online shopping experience.
            </h1>
            <p className="text-xl opacity-90 leading-relaxed mb-8">
              At Wamly, we believe that quality products shouldn't come with a premium price tag. 
              We're building a marketplace where transparency and customer satisfaction are at the heart of everything we do.
            </p>
            <Button size="lg" variant="secondary" className="px-8">
              Learn More
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-foreground/5 skew-x-12 transform translate-x-20" />
      </section>

      {/* Mission & Stats */}
      <section className="py-24 container mx-auto px-4 max-w-7xl border-b">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We started with a simple idea: make great design accessible to everyone. Today, Wamly 
              serves thousands of customers across the globe, providing a curated selection of 
              electronics, jewelry, and fashion that standard retailers often overcharge for.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <p className="text-3xl font-bold text-primary">50k+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-1">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">24/7</p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-1">Global Support</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-2xl bg-muted overflow-hidden relative group">
              <div className="absolute inset-0 flex items-center justify-center p-8 bg-primary/5 group-hover:bg-primary/10 transition-colors">
                <Globe className="h-12 w-12 text-primary opacity-40" />
              </div>
            </div>
            <div className="aspect-square rounded-2xl bg-muted overflow-hidden mt-12 relative group">
              <div className="absolute inset-0 flex items-center justify-center p-8 bg-primary/5 group-hover:bg-primary/10 transition-colors">
                <Users className="h-12 w-12 text-primary opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Core Values</h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            These principles guide us every day in building the best store for you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: Target, 
              title: "Customer Obsession", 
              desc: "We start with the customer and work backwards. Your satisfaction is our only metric." 
            },
            { 
              icon: Briefcase, 
              title: "Operational Excellence", 
              desc: "We strive for perfection in shipping, handling, and product quality control." 
            },
            { 
              icon: Globe, 
              title: "Global Reach", 
              desc: "Connecting high-quality suppliers with conscious consumers across all borders." 
            }
          ].map((v, i) => (
            <div key={i} className="p-8 rounded-2xl border bg-card hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-6">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{v.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
