import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Twitter,
  Instagram,
  Github,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const socialLinks = [
  { label: "Twitter", href: "#", icon: Twitter },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "GitHub", href: "#", icon: Github },
  { label: "Newsletter", href: "#", icon: Mail },
];

export function ContactUsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We would love to hear from you. Our team is always here to help with
          any questions or feedback.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-addr">Email Address</Label>
                    <Input
                      id="email-addr"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    className="min-h-[150px]"
                  />
                </div>
                <div>
                  <Button size="lg" className="ml-auto w-full px-12">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl">Get in touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex gap-4">
                <div className="h-10 w-10 flex shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-muted-foreground">
                    support@wamly.store
                  </p>
                  <p className="text-sm text-muted-foreground underline cursor-pointer hover:text-primary">
                    Send an email anytime
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 flex shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    +1 (555) 000-0000
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Mon-Fri from 9am to 6pm
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 flex shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Office</p>
                  <p className="text-sm text-muted-foreground">
                    123 E-commerce Way
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Suite 101, Digital City
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t">
                <h3 className="font-semibold mb-4">Social Media</h3>
                <div className="flex gap-3 items-center justify-center">
                  {/* Social placeholders */}
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
                      aria-label={label}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
