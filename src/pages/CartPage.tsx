import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartList } from "@/features/cart/components/cart-list";
import { useCart } from "@/features/cart";
import { AppLink } from "@/components/routing/AppLink";

export function CartPage() {
  const {
    items,
    totalItems,
    subtotal,
    clearCart,
    removeItem,
    updateItemQuantityByDelta,
  } = useCart();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Your cart
          </h1>
          <p className="mt-2 text-muted-foreground">
            {totalItems} item{totalItems === 1 ? "" : "s"} currently in your
            cart.
          </p>
        </div>

        {items.length > 0 && (
          <Button variant="outline" onClick={clearCart}>
            Clear cart
          </Button>
        )}
      </header>

      {items.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex min-h-72 flex-col items-center justify-center text-center">
            <ShoppingBag className="mb-4 h-10 w-10 text-muted-foreground" />
            <p className="text-lg font-semibold text-foreground">
              Your cart is empty
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add products from the catalog to start building your order.
            </p>
            <Button className="mt-6" asChild>
              <AppLink to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue shopping
              </AppLink>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <Card>
            <CardContent className="p-6">
              <CartList
                items={items}
                onUpdateQuantity={updateItemQuantityByDelta}
                onRemove={removeItem}
              />
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Order summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated later</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and final tax are calculated during checkout.
              </p>
              <div className="space-y-2">
                <Button className="w-full" asChild>
                  <AppLink to="/checkout">Proceed to checkout</AppLink>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <AppLink to="/products">Add more products</AppLink>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
