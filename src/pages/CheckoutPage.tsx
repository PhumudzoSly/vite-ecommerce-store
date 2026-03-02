import { useEffect, useMemo, useState } from "react";
import { AlertCircle, ArrowLeft, CheckCircle2, User } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/features/cart";
import {
  CheckoutForm,
  OrderSummary,
  calculateOrderTotals,
  downloadReceiptHtml,
  printReceipt,
  useCreateFakeStoreCart,
  useFakeStoreLogin,
  useFakeStoreUsers,
  type CheckoutFormValues,
  type ReceiptData,
} from "@/features/checkout";

export function CheckoutPage() {
  const { items, clearCart } = useCart();
  const usersQuery = useFakeStoreUsers();
  const createCartMutation = useCreateFakeStoreCart();
  const loginMutation = useFakeStoreLogin();

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [authEnabled, setAuthEnabled] = useState(true);
  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscountCode, setAppliedDiscountCode] = useState<string | null>(null);
  const [discountRate, setDiscountRate] = useState(0);
  const [checkoutResult, setCheckoutResult] = useState<ReceiptData | null>(null);

  useEffect(() => {
    if (!usersQuery.data?.length || selectedUserId !== null) {
      return;
    }

    setSelectedUserId(usersQuery.data[0].id);
  }, [selectedUserId, usersQuery.data]);

  const selectedUser = useMemo(
    () => usersQuery.data?.find((user) => user.id === selectedUserId) ?? null,
    [usersQuery.data, selectedUserId],
  );

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setAuthUsername(selectedUser.username);
    setAuthPassword(selectedUser.password);
  }, [selectedUser]);

  const checkoutDefaults = useMemo<Partial<CheckoutFormValues> | undefined>(() => {
    if (!selectedUser) {
      return undefined;
    }

    return {
      firstName: selectedUser.name.firstname,
      lastName: selectedUser.name.lastname,
      email: selectedUser.email,
      address: `${selectedUser.address.number} ${selectedUser.address.street}`,
      city: selectedUser.address.city,
      postalCode: selectedUser.address.zipcode,
      saveInfo: true,
    };
  }, [selectedUser]);

  const isSubmitting = createCartMutation.isPending || loginMutation.isPending;
  const totals = useMemo(() => calculateOrderTotals(items, discountRate), [items, discountRate]);

  const handleDiscountCodeChange = (value: string) => {
    setDiscountCode(value);

    if (appliedDiscountCode && value.trim().toUpperCase() !== appliedDiscountCode) {
      setAppliedDiscountCode(null);
      setDiscountRate(0);
    }
  };

  const applyDiscountCode = () => {
    const code = discountCode.trim().toUpperCase();

    if (code === "WAMLY10") {
      setAppliedDiscountCode(code);
      setDiscountRate(0.1);
      toast.success("WAMLY10 applied. 10% discount added.");
      return;
    }

    setAppliedDiscountCode(null);
    setDiscountRate(0);
    toast.error("Invalid discount code. Try WAMLY10.");
  };

  const removeDiscountCode = () => {
    setAppliedDiscountCode(null);
    setDiscountRate(0);
    toast.success("Discount removed.");
  };

  const submitCheckout = async (values: CheckoutFormValues) => {
    if (!items.length) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!selectedUserId) {
      toast.error("Select a customer profile before placing the order.");
      return;
    }

    try {
      let authToken: string | undefined;

      if (authEnabled) {
        if (!authUsername.trim() || !authPassword.trim()) {
          toast.error("Username and password are required for auth login.");
          return;
        }

        const loginResponse = await loginMutation.mutateAsync({
          username: authUsername.trim(),
          password: authPassword.trim(),
        });

        authToken = loginResponse.token;
      }

      const createdCart = await createCartMutation.mutateAsync({
        userId: selectedUserId,
        date: new Date().toISOString(),
        products: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });

      setCheckoutResult({
        orderId: createdCart.id,
        userId: selectedUserId,
        placedAt: createdCart.date,
        customerName: `${values.firstName} ${values.lastName}`,
        email: values.email,
        address: `${values.address}, ${values.city} ${values.postalCode}`,
        items: items.map((item) => ({ ...item })),
        totals,
        authToken,
      });

      clearCart();
      toast.success(`Order placed successfully. Confirmation #${createdCart.id}.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to place order.");
    }
  };

  if (checkoutResult) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="space-y-5 p-8">
            <div className="flex items-center gap-3 text-primary">
              <CheckCircle2 className="h-6 w-6" />
              <h1 className="text-2xl font-bold text-foreground">Checkout complete</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Your order has been confirmed with reference{" "}
              <span className="font-semibold text-foreground">#{checkoutResult.orderId}</span>.
            </p>
            <div className="grid gap-2 rounded-lg border border-border/70 bg-muted/30 p-4 text-sm">
              <p>User ID: {checkoutResult.userId}</p>
              <p>Placed at: {new Date(checkoutResult.placedAt).toLocaleString()}</p>
              <p>Total paid: ${checkoutResult.totals.total.toFixed(2)}</p>
              {checkoutResult.authToken && (
                <p className="break-all">Auth token: {checkoutResult.authToken}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/products">Continue shopping</Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  downloadReceiptHtml(checkoutResult);
                }}
              >
                Download receipt
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  try {
                    printReceipt(checkoutResult);
                  } catch (error) {
                    toast.error(error instanceof Error ? error.message : "Could not print receipt.");
                  }
                }}
              >
                Print invoice
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <Card className="border-dashed">
          <CardContent className="flex min-h-72 flex-col items-center justify-center text-center">
            <AlertCircle className="mb-4 h-8 w-8 text-muted-foreground" />
            <h1 className="text-2xl font-bold text-foreground">Checkout needs items</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Add products to your cart first, then return to checkout.
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" asChild>
                <Link to="/cart">Back to cart</Link>
              </Button>
              <Button asChild>
                <Link to="/products">Browse products</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Checkout</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Finalize your order with secure shipping and payment details.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/cart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to cart
          </Link>
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Customer profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select user</Label>
                <Select
                  value={selectedUserId ? String(selectedUserId) : ""}
                  onValueChange={(value) => setSelectedUserId(Number(value))}
                  disabled={usersQuery.isLoading || !usersQuery.data?.length}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {usersQuery.data?.map((user) => (
                      <SelectItem key={user.id} value={String(user.id)}>
                        {user.name.firstname} {user.name.lastname} ({user.username})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedUser && (
                <div className="rounded-md border border-border/70 bg-muted/30 p-3 text-sm text-muted-foreground">
                  {selectedUser.address.number} {selectedUser.address.street}, {selectedUser.address.city},{" "}
                  {selectedUser.address.zipcode}
                </div>
              )}

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={authEnabled}
                  onCheckedChange={(checked) => setAuthEnabled(checked === true)}
                />
                <Label>Verify account before placing order</Label>
              </div>

              {authEnabled && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <Input
                      value={authUsername}
                      onChange={(event) => setAuthUsername(event.target.value)}
                      placeholder="johnd"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input
                      value={authPassword}
                      onChange={(event) => setAuthPassword(event.target.value)}
                      placeholder="m38rmF$"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping and payment</CardTitle>
            </CardHeader>
            <CardContent>
              <CheckoutForm
                onSubmit={submitCheckout}
                isSubmitting={isSubmitting}
                defaultValues={checkoutDefaults}
              />
            </CardContent>
          </Card>
        </div>

        <OrderSummary
          items={items}
          discountCode={discountCode}
          discountRate={discountRate}
          onDiscountCodeChange={handleDiscountCodeChange}
          onApplyDiscount={applyDiscountCode}
          onRemoveDiscount={removeDiscountCode}
          appliedDiscountCode={appliedDiscountCode}
        />
      </div>
    </div>
  );
}
