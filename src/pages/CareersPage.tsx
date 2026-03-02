import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Clock, Search, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

const jobs = [
  {
    title: "Senior Frontend Engineer",
    dept: "Engineering",
    type: "Full-time",
    location: "Remote",
    salary: "$140k - $180k",
  },
  {
    title: "Product Designer",
    dept: "Design",
    type: "Full-time",
    location: "Remote",
    salary: "$120k - $160k",
  },
  {
    title: "Backend Developer (Go)",
    dept: "Engineering",
    type: "Full-time",
    location: "Remote",
    salary: "$130k - $170k",
  },
  {
    title: "Growth Marketing Manager",
    dept: "Marketing",
    type: "Full-time",
    location: "Digital City",
    salary: "$100k - $140k",
  },
  {
    title: "Customer Success Lead",
    dept: "Support",
    type: "Full-time",
    location: "Hybrid",
    salary: "$80k - $110k",
  },
];

export function CareersPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <Badge className="mb-6 px-4 py-1" variant="outline">
            Hiring Worldwide 🌍
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-7xl mb-6">
            Help us build the{" "}
            <span className="text-primary italic">future</span> of commerce.
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            At Wamly, we're a remote-first team of polyglots, designers, and
            creative minds working to make quality products accessible to
            everyone.
          </p>
          <div className="flex justify-center gap-4 mt-10">
            <Button size="lg" className="px-8 py-6 text-lg">
              See Open Roles
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
              Our Benefits
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Briefcase,
              title: "Remote-First",
              desc: "Work from wherever you feel most inspired and productive.",
            },
            {
              icon: MapPin,
              title: "Learning Budget",
              desc: "Annual stipend for courses, books, and conferences.",
            },
            {
              icon: Clock,
              title: "Flexible Hours",
              desc: "As long as you get your work done, you own your schedule.",
            },
            {
              icon: Send,
              title: "Real Impact",
              desc: "See your code and designs used by thousands daily.",
            },
          ].map((b, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 space-y-4"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <b.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg leading-tight">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Jobs */}
      <section className="py-24 container mx-auto px-4 max-w-5xl border-t">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Open Positions
            </h2>
            <p className="text-muted-foreground">
              Find the role that's right for you.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-10" placeholder="Search roles..." />
          </div>
        </div>

        <div className="grid gap-4">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl border bg-card hover:border-primary transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {job.title}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1 font-medium text-foreground/80">
                    {job.dept}
                  </span>
                  <span className="flex items-center gap-1">
                    📍 {job.location}
                  </span>
                  <span className="flex items-center gap-1">🕒 {job.type}</span>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-6">
                <p className="text-sm font-semibold tabular-nums text-primary/80">
                  {job.salary}
                </p>
                <Button
                  variant="ghost"
                  className="group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
