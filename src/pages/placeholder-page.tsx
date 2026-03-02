import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <Button
        variant="ghost"
        className="mb-8"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {description}
        </p>

        <div className="grid gap-8 pt-10 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6 text-card-foreground shadow">
            <h3 className="text-lg font-semibold mb-2 italic text-primary">
              Demo Notice
            </h3>
            <p className="text-sm text-muted-foreground">
              This is a demonstration page for the{" "}
              <span className="font-bold">{title}</span> section of the Wamly
              Store. Real content would typically include mission statements,
              contact forms, or dynamic data fetched from a CMS.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-6 text-card-foreground shadow">
            <h3 className="text-lg font-semibold mb-2 italic text-primary">
              Quick Stats
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Established: 2026</li>
              <li>• Location: Digital World</li>
              <li>• Support: 24/7</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
