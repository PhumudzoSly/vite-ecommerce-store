import { ShoppingBag, Mail, Twitter, Instagram, Github } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "Deals & Offers", href: "/deals" },
    { label: "New Arrivals", href: "/new" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Returns", href: "/returns" },
    { label: "Track Order", href: "/track" },
    { label: "Contact Us", href: "/contact" },
  ],
};

const socialLinks = [
  { label: "Twitter", href: "#", icon: Twitter },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "GitHub", href: "#", icon: Github },
  { label: "Newsletter", href: "#", icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a
              href="/"
              className="flex items-center gap-2 group"
              aria-label="Wamly home"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground group-hover:opacity-90 transition-opacity">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Wamly
              </span>
            </a>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Your go-to destination for quality products at great prices. Shop
              smarter, live better.
            </p>
            {/* Social links */}
            <div className="mt-5 flex items-center gap-2">
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

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold text-foreground">
                {section}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Stay in the loop
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Get new products and deals delivered to your inbox.
              </p>
            </div>
            <form
              className="flex gap-2 w-full sm:w-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 sm:w-52 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring transition-all"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Wamly. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
