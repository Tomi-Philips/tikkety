"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  GripVertical,
  Plus,
  Trash2,
  Pause,
  Play,
  DollarSign,
  Users,
  Ticket,
  AlertCircle,
  Loader2,
  ChevronDown,
  Sparkles,
  Layers,
  CheckCircle,
  Clock,
  Globe,
  Eye,
  Lock,
  ArrowLeft,
  ImagePlus,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

type TT = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  sold: number;
  admission_limit: number;
  max_per_order: number;
  is_active: boolean;
  sale_start: string | null;
  sale_end: string | null;
};

type Props = {
  eventId: string;
  initialTypes: TT[];
  eventSlug: string;
  initialBannerUrl: string | null;
  embedded?: boolean;
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function remaining(tt: TT) {
  return tt.quantity - (tt.sold || 0);
}

function soldPct(tt: TT) {
  return tt.quantity > 0 ? Math.round(((tt.sold || 0) / tt.quantity) * 100) : 0;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function TicketTypesManager({ eventId, initialTypes, eventSlug, initialBannerUrl, embedded = false }: Props) {
  const router = useRouter();
  const supabase = createClient();

  const [tickets, setTickets] = useState<TT[]>(initialTypes);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const bannerRef = useRef<HTMLInputElement>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  // Kick off a local refresh when router.refresh() is called by the parent (page wrapper)
  const refresh = useCallback(() => {
    router.refresh();
  }, [router]);

  // ── Toggle active ──────────────────────────────────────────────────────────

  const toggleActive = async (tt: TT) => {
    const prev = tickets;
    setTickets(prev => prev.map(t => t.id === tt.id ? { ...t, is_active: !t.is_active } : t));

    const { error } = await supabase
      .from("ticket_types")
      .update({ is_active: !tt.is_active })
      .eq("id", tt.id);

    if (error) {
      setTickets(prev);
      toast.error("Failed to update status.");
    } else {
      toast.success(tt.is_active ? "Ticket type paused" : "Ticket type activated");
      refresh();
    }
  };

  // ── Edit form state ───────────────────────────────────────────────────────

  const [editForm, setEditForm] = useState<Record<string, Partial<TT>>>({});

  const startEdit = (tt: TT) => {
    setEditingId(tt.id);
    setEditForm({
      [tt.id]: {
        name: tt.name,
        description: tt.description ?? "",
        price: tt.price,
        quantity: tt.quantity,
        admission_limit: tt.admission_limit,
        max_per_order: tt.max_per_order,
      }
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const ef = (id: string) =>
    (editForm as Record<string, { name: string; description: string; price: number; quantity: number; admission_limit: number; max_per_order: number }>)[id] || { name: "", description: "", price: 0, quantity: 0, admission_limit: 1, max_per_order: 10 };

  const saveEdit = async (tt: TT) => {
    const f = ef(tt.id);
    if (!f.name.trim()) { toast.error("Ticket name is required."); return; }
    if (f.price <= 0) { toast.error("Price must be greater than 0."); return; }
    if (f.quantity <= 0) { toast.error("Quantity must be at least 1."); return; }
    if (f.admission_limit < 1) { toast.error("Admission limit must be at least 1."); return; }

    if (f.quantity < (tt.sold || 0)) {
      toast.error(`Quantity (${f.quantity}) is below already-sold count (${tt.sold}).`);
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from("ticket_types")
        .update({
          name: f.name.trim(),
          description: f.description.trim() || null,
          price: f.price,
          quantity: f.quantity,
          admission_limit: f.admission_limit,
          max_per_order: f.max_per_order,
        })
        .eq("id", tt.id);

      if (error) throw error;

      toast.success(`"${f.name.trim()}" updated`);
      setEditingId(null);
      setEditForm({});
      refresh();
    } catch (err: any) {
      toast.error(err.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  // ── Add new ticket type ─────────────────────────────────────────────────────

  const [newTT, setNewTT] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    admissionLimit: "1",
    maxPerOrder: "10",
  });

  const addTicketType = async () => {
    if (!newTT.name.trim()) { toast.error("Ticket name is required."); return; }
    const price = Number(newTT.price);
    if (isNaN(price) || price <= 0) { toast.error("Price must be greater than 0."); return; }
    const quantity = Number(newTT.quantity);
    if (isNaN(quantity) || quantity < 1) { toast.error("Quantity must be at least 1."); return; }

    setSaving(true);
    try {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out. Check your Supabase RLS policies for ticket_types.")), 15000)
      );

      const insertPromise = supabase.from("ticket_types").insert({
        event_id: eventId,
        name: newTT.name.trim(),
        description: newTT.description.trim() || null,
        price,
        quantity,
        admission_limit: Number(newTT.admissionLimit) || 1,
        max_per_order: Number(newTT.maxPerOrder) || 10,
        is_active: true,
      });

      const { error } = await Promise.race([insertPromise, timeout]) as Awaited<typeof insertPromise>;

      if (error) {
        const detail = [error.message, error.hint, error.details ? `(${error.details})` : null]
          .filter(Boolean).join(" — ");
        throw new Error(detail || "Insert failed");
      }

      toast.success(`"${newTT.name.trim()}" added`);
      setNewTT({ name: "", description: "", price: "", quantity: "", admissionLimit: "1", maxPerOrder: "10" });
      refresh();
    } catch (err: any) {
      console.error("[TicketTypesManager] addTicketType error:", err);
      toast.error(err.message || "Failed to add ticket type.");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const confirmDelete = (tt: TT) => {
    const willDelete = confirm(
      `Delete "${tt.name}"?\n\nThis will remove the ticket type and ORPHAN its existing tickets. Do this only if no tickets have been sold.\n\nSold: ${tt.sold || 0} / ${tt.quantity}`
    );
    if (!willDelete) return;

    setDeletingId(tt.id);
    supabase.from("ticket_types").delete().eq("id", tt.id).then(({ error }: { error: any }) => {
      if (error) {
        toast.error("Delete failed.");
      } else {
        toast.success(`"${tt.name}" deleted`);
        refresh();
      }
      setDeletingId(null);
    });
  };

  // ── Banner upload (event-level, shown in the preview card) ─────────────────

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingId("banner");
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in.");

      const ext = file.name.split(".").pop() || "jpg";
      const path = `event-banners/${user.id}/${Date.now()}_${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("event-banners")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage.from("event-banners").getPublicUrl(path);

      // Update event row
      const { error } = await supabase.from("events").update({ banner_url: pub.publicUrl }).eq("id", eventId);
      if (error) throw error;

      setBannerPreview(URL.createObjectURL(file));
      toast.success("Banner updated!");
      refresh();
    } catch (err: any) {
      toast.error(err.message || "Banner upload failed.");
    } finally {
      setUploadingId(null);
      if (bannerRef.current) bannerRef.current.value = "";
    }
  };

  // ── Render shortcuts ───────────────────────────────────────────────────────

  const labelCls = "text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 block";

  const inputCls = "w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/80 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-violet-500/30 focus:border-violet-500";

  return (
    <div className="space-y-6 animate-in fade-in duration-400">

      {/* ── Event Header ─────────────────────────────────────────────────────── */}
      {!embedded && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/dashboard/organizer")}
              className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">Manage Event</span>
          </div>

          <button
            onClick={() => window.open(`/events/${eventSlug}`, "_blank")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-violet-600 border border-violet-200 dark:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/20 transition-colors"
          >
            <Eye className="w-3 h-3" />
            Preview
          </button>
        </div>
      )}

      {/* ── Banner ───────────────────────────────────────────────────────────── */}
      {!embedded && (
        <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 h-40 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {bannerPreview || initialBannerUrl ? (
            <img src={bannerPreview || initialBannerUrl || ""} alt="Event Banner" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-zinc-400">
              <ImagePlus className="w-8 h-8" />
              <span className="text-xs">No banner yet</span>
            </div>
          )}

          <input
            ref={bannerRef}
            type="file"
            accept="image/*"
            onChange={handleBannerUpload}
            className="hidden"
            id="banner-upload"
          />

          <label
            htmlFor="banner-upload"
            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 cursor-pointer hover:bg-white dark:hover:bg-zinc-800 backdrop-blur-sm shadow-md transition-colors"
          >
            {uploadingId === "banner" ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                Uploading…
              </>
            ) : (
              <>
                <ImagePlus className="w-3 h-3" />
                Update Banner
              </>
            )}
          </label>
        </div>
      )}

      {/* ── Ticket Types ─────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-violet-500" />
          <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-200">Ticket Types</h3>
          <span className="text-xs text-zinc-400">({tickets.length})</span>
        </div>

        {tickets.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-10 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <Ticket className="w-10 h-10 text-zinc-300 dark:text-zinc-700" />
            <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">No ticket types yet</p>
            <p className="text-xs text-zinc-400">Add your first ticket type below.</p>
          </div>
        )}

        {tickets.map(tt => {
          const isEditing = editingId === tt.id;
          const rem = remaining(tt);
          const pct = soldPct(tt);
          const soldOut = rem <= 0;
          const lowStock = pct >= 70 && !soldOut;

          return (
            <div
              key={tt.id}
              className={`rounded-2xl border p-5 transition-all duration-200 ${soldOut
                ? "border-emerald-600/90 bg-emerald-50/60 dark:bg-emerald-950/20 dark:border-emerald-700/60"
                : tt.is_active
                  ? "border-violet-200/70 dark:border-violet-800/40 bg-gradient-to-br from-violet-50/40 to-white dark:from-zinc-900 dark:to-violet-950/15"
                  : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40"
                }`}
            >
              {/* ── Card header ─────────────────────────────────────────────────── */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <GripVertical className="w-4 h-4 text-zinc-300 dark:text-zinc-600" />
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Ticket
                  </span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-100">
                    {tt.name}
                  </span>
                  {tt.sold > 0 && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                      {tt.sold} sold
                    </span>
                  )}
                  {soldOut && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                      Sold Out
                    </span>
                  )}
                  {lowStock && !soldOut && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                      Low Stock
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Active / Paused toggle */}
                  <button
                    type="button"
                    onClick={() => toggleActive(tt)}
                    title={tt.is_active ? "Pause ticket" : "Activate ticket"}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${tt.is_active
                      ? "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-950/50"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                      }`}
                  >
                    {tt.is_active ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                    {tt.is_active ? "Active" : "Paused"}
                  </button>

                  {/* Edit button */}
                  <button
                    type="button"
                    onClick={() => isEditing ? cancelEdit() : startEdit(tt)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${isEditing
                      ? "bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                      : "bg-violet-100 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 hover:bg-violet-200 dark:hover:bg-violet-950/50"
                      }`}
                  >
                    {isEditing ? "Cancel" : "Edit"}
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => confirmDelete(tt)}
                    disabled={deletingId === tt.id || (tt.sold || 0) > 0}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title={tt.sold > 0 ? "Cannot delete — tickets sold" : "Delete ticket type"}
                  >
                    {deletingId === tt.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* ── Progress bar ─────────────────────────────────────────────────── */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1.5">
                  <span>Sold: {tt.sold || 0} / {tt.quantity}</span>
                  <span>{rem} remaining — ₦{(tt.price * rem).toLocaleString()} revenue potential</span>
                </div>
                <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${soldOut
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                      : lowStock
                        ? "bg-gradient-to-r from-amber-500 to-orange-500"
                        : "bg-gradient-to-r from-violet-500 to-indigo-500"
                      }`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
              </div>

              {/* ── Edit form ────────────────────────────────────────────────────── */}
              {isEditing && (
                <div className="mt-4 rounded-xl border border-violet-200 dark:border-violet-800/40 bg-violet-50/50 dark:bg-violet-950/20 p-4 animate-in fade-in slide-in-from-top-2">
                  <p className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-3">
                    Edit Ticket Type
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className={labelCls}>Name *</label>
                      <input
                        type="text"
                        value={ef(tt.id).name}
                        onChange={e => setEditForm(prev => ({ ...prev, [tt.id]: { ...ef(tt.id), name: e.target.value } }))}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Price *</label>
                      <input
                        type="number"
                        inputMode="decimal"
                        step="0.01"
                        min="0"
                        value={ef(tt.id).price}
                        onChange={e => setEditForm(prev => ({ ...prev, [tt.id]: { ...ef(tt.id), price: Number(e.target.value) } }))}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Total Quantity *</label>
                      <input
                        type="number"
                        inputMode="numeric"
                        min={(tt.sold || 0)}
                        value={ef(tt.id).quantity}
                        onChange={e => setEditForm(prev => ({ ...prev, [tt.id]: { ...ef(tt.id), quantity: Number(e.target.value) } }))}
                        className={inputCls}
                      />
                      <p className="text-[10px] text-zinc-400 mt-1">
                        Min: {tt.sold || 0} already sold
                      </p>
                    </div>
                    <div>
                      <label className={labelCls}>Admission Limit *</label>
                      <input
                        type="number"
                        inputMode="numeric"
                        min="1"
                        value={ef(tt.id).admission_limit}
                        onChange={e => setEditForm(prev => ({ ...prev, [tt.id]: { ...ef(tt.id), admission_limit: Number(e.target.value) } }))}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Max Per Order</label>
                      <input
                        type="number"
                        inputMode="numeric"
                        min="1"
                        value={ef(tt.id).max_per_order}
                        onChange={e => setEditForm(prev => ({ ...prev, [tt.id]: { ...ef(tt.id), max_per_order: Number(e.target.value) } }))}
                        className={inputCls}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className={labelCls}>Description</label>
                      <textarea
                        rows={1}
                        value={ef(tt.id).description}
                        onChange={e => setEditForm(prev => ({ ...prev, [tt.id]: { ...ef(tt.id), description: e.target.value } }))}
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-violet-200/50 dark:border-violet-800/30">
                    <button
                      type="button"
                      onClick={() => saveEdit(tt)}
                      disabled={saving}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-violet-600 text-white hover:bg-violet-700 transition-colors disabled:opacity-50"
                    >
                      {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Add new ticket type ───────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-dashed border-violet-300 dark:border-violet-700/60 bg-violet-50/30 dark:bg-violet-950/10 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Plus className="w-4 h-4 text-violet-500" />
          <span className="text-sm font-bold text-violet-700 dark:text-violet-300">Add Ticket Type</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className={labelCls}>Name *</label>
            <input
              type="text"
              value={newTT.name}
              onChange={e => setNewTT(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. VIP, Table for 5"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Price *</label>
            <input
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0"
              value={newTT.price}
              onChange={e => setNewTT(prev => ({ ...prev, price: e.target.value }))}
              placeholder="0.00"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Quantity *</label>
            <input
              type="number"
              inputMode="numeric"
              min="1"
              value={newTT.quantity}
              onChange={e => setNewTT(prev => ({ ...prev, quantity: e.target.value }))}
              placeholder="e.g. 100"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Admission Limit *</label>
            <input
              type="number"
              inputMode="numeric"
              min="1"
              value={newTT.admissionLimit}
              onChange={e => setNewTT(prev => ({ ...prev, admissionLimit: e.target.value }))}
              placeholder="1"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Max Per Order</label>
            <input
              type="number"
              inputMode="numeric"
              min="1"
              value={newTT.maxPerOrder}
              onChange={e => setNewTT(prev => ({ ...prev, maxPerOrder: e.target.value }))}
              placeholder="10"
              className={inputCls}
            />
          </div>
          <div className="md:col-span-3">
            <label className={labelCls}>Description</label>
            <textarea
              rows={1}
              value={newTT.description}
              onChange={e => setNewTT(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Details about this ticket type..."
              className={`${inputCls} resize-none`}
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={addTicketType}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-500/25 disabled:opacity-50 transition-all"
          >
            {saving ? "Adding…" : "Add Ticket Type"}
          </button>
        </div>
      </div>

      {/* ── Sales summary ────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 grad bg-zinc-50/60 dark:bg-zinc-900/50 p-5 text-sm">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-violet-500" />
          <span className="font-bold text-zinc-800 dark:text-zinc-100">Sales Overview</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Revenue */}
          <div>
            <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Revenue Potential</p>
            <p className="text-lg font-black bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              ₦{tickets.reduce((sum, tt) => sum + tt.price * tt.sold, 0).toLocaleString()}
            </p>
          </div>
          {/* Total sold */}
          <div>
            <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Tickets Sold</p>
            <p className="text-lg font-bold text-violet-600 dark:text-violet-400">
              {tickets.reduce((s, tt) => s + (tt.sold || 0), 0)}
            </p>
          </div>
          {/* Total capacity */}
          <div>
            <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Total Capacity</p>
            <p className="text-lg font-bold text-zinc-700 dark:text-zinc-200">
              {tickets.reduce((s, tt) => s + tt.quantity, 0)}
            </p>
          </div>
          {/* Active */}
          <div>
            <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Ticket Types</p>
            <p className="text-lg font-bold text-zinc-700 dark:text-zinc-200">{tickets.length}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
