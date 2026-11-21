import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { ShoppingCart, Package, Clock, RefreshCw } from "lucide-react";

const CustomerPortal = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [warehouseId, setWarehouseId] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [placingProductId, setPlacingProductId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [productRes, warehouseRes, orderRes] = await Promise.all([
        axios.get("/api/inventory/products"),
        axios.get("/api/warehouses"),
        axios.get("/api/orders/sales"),
      ]);
      setProducts(productRes.data);
      setWarehouses(warehouseRes.data);
      setOrders(orderRes.data);
      setWarehouseId(
        (current) => current || String(warehouseRes.data[0]?.id || ""),
      );
    } catch (error) {
      setMessageType("error");
      setMessage(
        error.response?.data?.message || "Unable to load the customer portal.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const placeOrder = async (product) => {
    const quantity = Number(quantities[product.id] || 1);
    if (!Number.isInteger(quantity) || quantity < 1 || !warehouseId) {
      setMessageType("error");
      setMessage("Select a dispatch location and enter a valid quantity.");
      return;
    }
    if (!user?.username?.trim()) {
      setMessageType("error");
      setMessage("Customer information is missing. Please log in again.");
      return;
    }
    setPlacingProductId(product.id);
    setMessage("");
    try {
      const response = await axios.post("/api/orders/sales", {
        customerName: user?.username,
        warehouseId: Number(warehouseId),
        items: [{ productId: product.id, quantity }],
      });
      const order = response.data;
      setMessageType("success");
      setMessage(
        `Order #${order.id} placed successfully for ${product.name}. Total: ${money(order.totalAmount)}. You can track it in My Order History.`,
      );
      setQuantities((current) => ({ ...current, [product.id]: 1 }));
      try {
        const orderRes = await axios.get("/api/orders/sales");
        setOrders(orderRes.data);
      } catch {
        setMessage(
          `Order #${order.id} was placed successfully, but order history could not refresh. Use Refresh to reload it.`,
        );
      }
    } catch (error) {
      setMessageType("error");
      setMessage(
        error.response?.data?.message ||
          "Could not place the order. Please try again.",
      );
    } finally {
      setPlacingProductId(null);
    }
  };

  const money = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(Number(value || 0));

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-400 font-bold">
            RIMS Customer Portal
          </p>
          <h1 className="text-3xl font-extrabold text-white mt-2">
            Welcome, {user?.username}
          </h1>
          <p className="text-slate-400 mt-1">
            Browse the catalogue, place orders, and track your purchases.
          </p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {message && (
        <div
          role={messageType === "error" ? "alert" : "status"}
          className={`rounded-xl border p-3 text-sm ${messageType === "error" ? "border-rose-500/30 bg-rose-500/10 text-rose-300" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"}`}
        >
          {message}
        </div>
      )}

      <section className="glass-card rounded-3xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-brand-400" />
          <h2 className="text-xl font-bold text-white">Product Catalogue</h2>
        </div>
        <div className="max-w-sm">
          <label className="block text-xs text-slate-400 mb-2">
            Dispatch location
          </label>
          <select
            value={warehouseId}
            onChange={(e) => setWarehouseId(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
          >
            {warehouses.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <p className="text-slate-400">Loading catalogue…</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map((product) => (
              <article
                key={product.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3"
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-xs text-brand-400">{product.sku}</p>
                    <h3 className="font-semibold text-white mt-1">
                      {product.name}
                    </h3>
                  </div>
                  <Package className="w-5 h-5 text-slate-500 shrink-0" />
                </div>
                <p className="text-sm text-slate-400 min-h-10">
                  {product.description || product.category || "Retail product"}
                </p>
                <p className="text-lg font-bold text-white">
                  {money(product.price)}
                </p>
                <div className="flex gap-2">
                  <input
                    aria-label={`Quantity for ${product.name}`}
                    type="number"
                    min="1"
                    max="100000000"
                    step="1"
                    required
                    value={quantities[product.id] || 1}
                    onChange={(e) =>
                      setQuantities((current) => ({
                        ...current,
                        [product.id]: e.target.value,
                      }))
                    }
                    className="w-20 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                  />
                  <button
                    onClick={() => placeOrder(product)}
                    disabled={!warehouseId || placingProductId !== null}
                    className="flex-1 rounded-xl bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {placingProductId === product.id
                      ? "Placing…"
                      : "Place order"}
                  </button>
                </div>
              </article>
            ))}
            {!products.length && (
              <p className="text-slate-500">
                No products are currently listed.
              </p>
            )}
          </div>
        )}
      </section>

      <section className="glass-card rounded-3xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand-400" />
          <h2 className="text-xl font-bold text-white">My Order History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Date</th>
                <th className="p-3">Location</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="p-3 font-semibold">#{order.id}</td>
                  <td className="p-3">
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="p-3">{order.warehouse?.name || "—"}</td>
                  <td className="p-3">{money(order.totalAmount)}</td>
                  <td className="p-3">
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
              {!orders.length && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-slate-500">
                    You have not placed any orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CustomerPortal;
