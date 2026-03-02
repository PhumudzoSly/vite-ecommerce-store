import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const posts = [
  {
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=3000&auto=format&fit=crop",
    category: "Trends",
    title: "Top Tech Gadgets You Need in 2026",
    date: "Nov 02, 2026",
    user: "Alex Rivers",
  },
  {
    image:
      "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=3270&auto=format&fit=crop",
    category: "Style",
    title: "How to Build a Capsule Wardrobe",
    date: "Oct 28, 2026",
    user: "Maria Silva",
  },
  {
    image:
      "https://images.unsplash.com/photo-1515516089376-88db1e26e9c0?q=80&w=3270&auto=format&fit=crop",
    category: "Guides",
    title: "Choosing the Right Home Office Setup",
    date: "Oct 20, 2026",
    user: "David Chen",
  },
  {
    image:
      "https://images.unsplash.com/photo-1490481658393-51361c920e40?q=80&w=3270&auto=format&fit=crop",
    category: "Business",
    title: "Inside Our Design Process",
    date: "Oct 12, 2026",
    user: "Team Wamly",
  },
];

export function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-7xl">
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-7xl">
          The Wamly Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Everything from style guides to deep dives into the technology
          powering our platform.
        </p>
        <div className="flex w-full max-w-md items-center space-x-2 mt-8">
          <Input type="email" placeholder="Subscribe for updates" />
          <Button type="submit">Subscribe</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {posts.map((post, i) => (
          <article
            key={i}
            className="group cursor-pointer flex flex-col h-full bg-card rounded-2xl border overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <div className="aspect-[16/10] overflow-hidden bg-muted">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline">{post.category}</Badge>
                <span className="text-xs text-muted-foreground">
                  {post.date}
                </span>
              </div>
              <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors mb-4 line-clamp-2 italic">
                {post.title}
              </h3>
              <div className="mt-auto pt-6 border-t flex items-center text-sm font-medium">
                By <span className="text-primary ml-1">{post.user}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
