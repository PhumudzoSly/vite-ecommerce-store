import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactUsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We'd love to hear from you. Our team is always here to help with any questions or feedback.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="Your message..." className="min-h-[150px]" />
              </div>
              <Button size="lg" className="w-full md:w-auto px-12">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl border bg-card p-8 shadow-sm h-full">
            <h2 className="text-2xl font-bold mb-8">Get in touch</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="h-10 w-10 flex shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-muted-foreground">support@wamly.store</p>
                  <p className="text-sm text-muted-foreground underline cursor-pointer hover:text-primary">Send an email anytime</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 flex shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 000-0000</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri from 9am to 6pm</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 flex shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Office</p>
                  <p className="text-sm text-muted-foreground">123 E-commerce Way</p>
                  <p className="text-sm text-muted-foreground">Suite 101, Digital City</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t">
              <h3 className="font-semibold mb-4">Social Media</h3>
              <div className="flex gap-3">
                {/* Social placeholders */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
