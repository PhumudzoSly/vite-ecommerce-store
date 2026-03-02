import type { CartItem } from "@/features/cart";
import type { OrderTotals } from "./utils";

export interface ReceiptData {
  orderId: number;
  userId: number;
  placedAt: string;
  customerName: string;
  email: string;
  address: string;
  items: CartItem[];
  totals: OrderTotals;
  authToken?: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function money(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function generateReceiptHtml(data: ReceiptData): string {
  const rows = data.items
    .map(
      (item) => `
      <tr>
        <td>${escapeHtml(item.title)}</td>
        <td>${item.quantity}</td>
        <td>${money(item.price)}</td>
        <td>${money(item.price * item.quantity)}</td>
      </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Wamly Receipt #${data.orderId}</title>
    <style>
      body { font-family: Arial, sans-serif; color: #101828; margin: 0; background: #f8fafc; }
      .page { max-width: 900px; margin: 40px auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
      .head { padding: 28px 32px; background: #111827; color: #fff; display: flex; justify-content: space-between; gap: 24px; }
      .head h1 { margin: 0; font-size: 20px; letter-spacing: 0.4px; }
      .meta { font-size: 13px; line-height: 1.7; }
      .section { padding: 24px 32px; }
      .section h2 { margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.8px; color: #475467; }
      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; font-size: 14px; }
      table { width: 100%; border-collapse: collapse; font-size: 14px; }
      th, td { border-bottom: 1px solid #e2e8f0; text-align: left; padding: 10px 8px; }
      th { background: #f8fafc; color: #475467; font-size: 12px; text-transform: uppercase; letter-spacing: 0.4px; }
      .totals { margin-top: 16px; margin-left: auto; width: 320px; font-size: 14px; }
      .totals .row { display: flex; justify-content: space-between; padding: 6px 0; }
      .totals .total { font-size: 16px; font-weight: 700; border-top: 1px solid #d0d5dd; margin-top: 8px; padding-top: 10px; }
      .footer { padding: 18px 32px 28px; color: #667085; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="head">
        <div>
          <h1>Wamly Receipt</h1>
          <div class="meta">Order #${data.orderId}<br/>Placed ${new Date(data.placedAt).toLocaleString()}</div>
        </div>
        <div class="meta">
          User ID: ${data.userId}<br/>
          ${data.authToken ? `Auth token: ${escapeHtml(data.authToken)}` : "Auth token: not requested"}
        </div>
      </div>
      <div class="section">
        <h2>Customer</h2>
        <div class="grid">
          <div><strong>Name:</strong> ${escapeHtml(data.customerName)}</div>
          <div><strong>Email:</strong> ${escapeHtml(data.email)}</div>
          <div style="grid-column: 1 / -1;"><strong>Address:</strong> ${escapeHtml(data.address)}</div>
        </div>
      </div>
      <div class="section">
        <h2>Items</h2>
        <table>
          <thead>
            <tr><th>Product</th><th>Qty</th><th>Unit</th><th>Line total</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <div class="totals">
          <div class="row"><span>Subtotal</span><span>${money(data.totals.subtotal)}</span></div>
          ${
            data.totals.discount > 0
              ? `<div class="row"><span>Discount</span><span>-${money(data.totals.discount)}</span></div>`
              : ""
          }
          <div class="row"><span>Shipping</span><span>${money(data.totals.shipping)}</span></div>
          <div class="row"><span>Tax</span><span>${money(data.totals.tax)}</span></div>
          <div class="row total"><span>Total</span><span>${money(data.totals.total)}</span></div>
        </div>
      </div>
      <div class="footer">Thank you for shopping with Wamly.</div>
    </div>
  </body>
</html>`;
}

export function downloadReceiptHtml(data: ReceiptData) {
  const html = generateReceiptHtml(data);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `wamly-receipt-${data.orderId}.html`;
  link.click();
  URL.revokeObjectURL(url);
}

export function printReceipt(data: ReceiptData) {
  const popup = window.open("", "_blank", "width=980,height=780");

  if (!popup) {
    throw new Error("Could not open print window. Please allow popups.");
  }

  popup.document.write(generateReceiptHtml(data));
  popup.document.close();
  popup.focus();
  popup.print();
}
