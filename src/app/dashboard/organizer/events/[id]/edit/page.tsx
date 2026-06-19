"use client";

import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { toast } from "sonner";
import {
    AlertCircle,
    ArrowLeft,
    Briefcase,
    Calendar,
    CheckCircle,
    ChevronDown,
    Clock,
    DollarSign,
    Eye,
    Globe,
    GripVertical,
    HelpCircle,
    ImagePlus,
    Layers,
    Loader2,
    Lock,
    MapPin,
    Music,
    Palette,
    PartyPopper,
    Pause,
    Play,
    Plus,
    Send,
    Sparkles,
    Ticket,
    Trash2,
    Trophy,
    Type,
    Utensils,
    Users,
    Zap,
} from "lucide-react";


// ─── Types ────────────────────────────────────────────────────────────────────

type TicketTypeBlock = {
    id: string;
    name: string;
    description: string;
    price: string;
    quantity: string;
    admissionLimit: string;
    maxPerOrder: string;
};

type FormState = {
    title: string;
    slug: string;
    description: string;
    category: string;
    bannerUrl: string;           // set programmatically after upload; not a text input
    location: string;
    isLocationHidden: boolean;
    eventDate: string;
    eventTime: string;
    status: "draft" | "published";
    ticketSaleStart: string;
    ticketSaleEnd: string;
    ticket_types: TicketTypeBlock[];
};

const emptyBlock = (): TicketTypeBlock => ({
    id: crypto.randomUUID(),
    name: "",
    description: "",
    price: "",
    quantity: "",
    admissionLimit: "1",
    maxPerOrder: "10",
});

const initialForm: FormState = {
    title: "",
    slug: "",
    description: "",
    category: "",
    bannerUrl: "",
    location: "",
    isLocationHidden: false,
    eventDate: "",
    eventTime: "",
    status: "draft",
    ticketSaleStart: "",
    ticketSaleEnd: "",
    ticket_types: [emptyBlock()],
};

const CATEGORIES = [
    "Party",
    "Concert",
    "Seminar",
    "Workshop",
    "Dinner",
    "Awards Night",
    "Sports",
    "Exhibition",
    "Religious",
    "Networking",
    "Other",
];

const CATEGORY_ICONS: Record<string, any> = {
    "Party": PartyPopper,
    "Concert": Music,
    "Seminar": Briefcase,
    "Workshop": Briefcase,
    "Dinner": Utensils,
    "Sports": Trophy,
    "Exhibition": Palette,
    "Networking": Users,
    "Other": HelpCircle,
};

type TicketTypeDB = {
    id: string;
    name: string;
    description: string | null;
    price: number;
    quantity: number;
    admission_limit: number;
    max_per_order: number;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function EditEventPage() {

    const router = useRouter();
    const params = useParams();
    const eventId = params.id as string;

    const supabase = createClient();
    const bannerInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [uploadingBanner, setUploadingBanner] = useState(false);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    
    // Fetch Existing event details 
    useEffect(() => {
        console.log("eventId:", eventId);

        if (!eventId) return;

        loadEvent();
    }, [eventId]);

    const loadEvent = async () => {
        try {
            const { data: event, error: eventError } = await supabase
                .from("events")
                .select("*")
                .eq("id", eventId)
                .single();

            if (eventError) throw eventError;

            const { data: tickets, error: ticketError } = await supabase
                .from("ticket_types")
                .select("*")
                .eq("event_id", eventId);

            if (ticketError) throw ticketError;

            const typedTickets = tickets as TicketTypeDB[];

            setForm({
                title: event.title || "",
                slug: event.slug || "",
                description: event.description || "",
                category: event.category || "",
                bannerUrl: event.banner_url || "",
                location: event.location || "",
                isLocationHidden: event.is_location_hidden || false,

                eventDate: event.event_date
                    ? new Date(event.event_date).toISOString().split("T")[0]
                    : "",

                eventTime: event.event_date
                    ? new Date(event.event_date)
                        .toTimeString()
                        .slice(0, 5)
                    : "",

                status: event.status || "draft",

                ticketSaleStart: event.ticket_sale_start
                    ? new Date(event.ticket_sale_start)
                        .toISOString()
                        .slice(0, 16)
                    : "",

                ticketSaleEnd: event.ticket_sale_end
                    ? new Date(event.ticket_sale_end)
                        .toISOString()
                        .slice(0, 16)
                    : "",

                ticket_types: typedTickets.map(ticket => ({
                    id: ticket.id,
                    name: ticket.name,
                    description: ticket.description || "",
                    price: String(ticket.price),
                    quantity: String(ticket.quantity),
                    admissionLimit: String(ticket.admission_limit),
                    maxPerOrder: String(ticket.max_per_order),
                })),
            });

            setBannerPreview(event.banner_url);

            // populate form
        } catch (error) {
            toast.error("Failed to load event");
        }
    };

    // ── Form state ─────────────────────────────────────────────────────────────

    const [form, setForm] = useState<FormState>(initialForm);

    const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const setTicketField = (id: string, key: keyof TicketTypeBlock, value: string) => {
        setForm(prev => ({
            ...prev,
            ticket_types: prev.ticket_types.map(tt =>
                tt.id === id ? { ...tt, [key]: value } : tt
            ),
        }));
    };

    const addTicketType = () =>
        setForm(prev => ({ ...prev, ticket_types: [...prev.ticket_types, emptyBlock()] }));

    const removeTicketType = (id: string) =>
        setForm(prev => ({
            ...prev,
            ticket_types: prev.ticket_types.length > 1
                ? prev.ticket_types.filter(tt => tt.id !== id)
                : prev.ticket_types,
        }));

    // ── Auto-slug ──────────────────────────────────────────────────────────────

    const generateSlug = () => {
        const slug = form.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "_")
            .replace(/^_+|_+$/g, "");
        setField("slug", slug);
    };

    // ── Banner upload ──────────────────────────────────────────────────────────

    const handleBannerUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Guard: image files only
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file.");
            return;
        }

        setUploadingBanner(true);

        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) throw new Error("You must be logged in.");

            // Build a unique path: event-banners/{userId}/{timestamp}_{filename}
            const ext = file.name.split(".").pop() || "jpg";
            const path = `event-banners/${user.id}/${Date.now()}_${crypto.randomUUID()}.${ext}`;

            const { error: uploadError } = await supabase.storage
                .from("event-banners")
                .upload(path, file, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (uploadError) throw uploadError;

            // Public URL — bucket must be public or use a signed URL in production
            const { data: publicData } = supabase.storage
                .from("event-banners")
                .getPublicUrl(path);

            const publicUrl = publicData.publicUrl;

            setField("bannerUrl", publicUrl);

            // Local preview (revocable object URL so we don't leak data across renders)
            const objectUrl = URL.createObjectURL(file);
            setBannerPreview(objectUrl);

            toast.success("Banner uploaded!");
        } catch (err: any) {
            toast.error(err.message || "Banner upload failed.");
            setBannerPreview(null);
        } finally {
            setUploadingBanner(false);
            // Reset the input so re-selecting the same file fires onChange again
            if (bannerInputRef.current) bannerInputRef.current.value = "";
        }
    };

    // ── Sections ───────────────────────────────────────────────────────────────

    const sections = [
        { id: 1, label: "Event Details", icon: Type, color: "violet" },
        { id: 2, label: "Ticket Configuration", icon: Ticket, color: "indigo" },
        { id: 3, label: "Publish", icon: Send, color: "emerald" },
    ];

    // ── Helpers for ticket blocks ───────────────────────────────────────────────

    const activeTickets = form.ticket_types;

    // ── Validation ─────────────────────────────────────────────────────────────

    const validate = (): string[] => {
        const errors: string[] = [];

        if (!form.title.trim()) errors.push("Event title is required.");
        if (!form.slug.trim()) errors.push("Slug is required — generate it from the title.");
        if (!form.location.trim()) errors.push("Venue / location is required.");
        if (!form.eventDate) errors.push("Event date is required.");
        if (!form.eventTime) errors.push("Event time is required.");

        if (form.ticketSaleStart || form.ticketSaleEnd) {
            if (!form.ticketSaleStart)
                errors.push("Ticket sale start date is required when sale dates are set.");
            if (!form.ticketSaleEnd)
                errors.push("Ticket sale end date is required when sale dates are set.");

            if (form.ticketSaleStart && form.ticketSaleEnd) {
                const saleStart = new Date(form.ticketSaleStart);
                const saleEnd = new Date(form.ticketSaleEnd);
                if (saleStart >= saleEnd)
                    errors.push("Ticket sale start must be before ticket sale end.");
            }
        }

        if (form.eventDate && form.eventTime) {
            const eventDateTime = new Date(`${form.eventDate}T${form.eventTime}`);

            if (form.ticketSaleEnd) {
                const saleEnd = new Date(form.ticketSaleEnd);
                if (saleEnd >= eventDateTime)
                    errors.push("Ticket sale end must be before the event start date and time.");
            }
        }

        activeTickets.forEach((tt, i) => {
            const label = tt.name.trim() ? `"${tt.name}"` : `Ticket #${i + 1}`;
            if (!tt.name.trim()) errors.push(`${label}: name is required.`);
            if (!tt.price || Number(tt.price) <= 0) errors.push(`${label}: price must be greater than 0.`);
            if (!tt.quantity || Number(tt.quantity) <= 0) errors.push(`${label}: quantity must be at least 1.`);
            if (!tt.admissionLimit || Number(tt.admissionLimit) < 1)
                errors.push(`${label}: admission limit must be at least 1.`);
        });

        return errors;
    };

    // ── Submit ─────────────────────────────────────────────────────────────────

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const errors = validate();
        if (errors.length > 0) {
            toast.error(errors[0]);
            return;
        }

        setLoading(true);

        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) throw new Error("You must be logged in as an organizer.");

            const eventDateTime = new Date(`${form.eventDate}T${form.eventTime}`);

            // ── 1. Insert the event ───────────────────────────────────────────────────
            const eventInsertPayload = {
                organizer_id: user.id,
                title: form.title.trim(),
                slug: form.slug.trim(),
                description: form.description.trim() || null,
                category: form.category || null,
                banner_url: form.bannerUrl.trim() || null,
                location: form.location.trim(),
                is_location_hidden: form.isLocationHidden,
                event_date: eventDateTime.toISOString(),
                ticket_sale_start: form.ticketSaleStart
                    ? new Date(form.ticketSaleStart).toISOString()
                    : null,
                ticket_sale_end: form.ticketSaleEnd
                    ? new Date(form.ticketSaleEnd).toISOString()
                    : null,
                status: form.status,
            };

            const { data: events, error: eventError } = await supabase
                .from("events")
                .update(eventInsertPayload)
                .eq("id", eventId)
                .select("id")
                .single();

            if (eventError || !events) {
                throw eventError || new Error("Event update returned no data.");
            }

            // Delete existing ticket types
            const { error: deleteError } = await supabase
                .from("ticket_types")
                .delete()
                .eq("event_id", eventId);

            if (deleteError) throw deleteError;

            // Insert updated ticket types
            const ttRows = activeTickets.map(tt => ({
                event_id: eventId,
                name: tt.name.trim(),
                description: tt.description.trim() || null,
                price: Number(tt.price),
                quantity: Number(tt.quantity),
                admission_limit: Number(tt.admissionLimit),
                max_per_order: Number(tt.maxPerOrder) || 10,
                is_active: true,
            }));

            const { error: ttError } = await supabase
                .from("ticket_types")
                .insert(ttRows);

            if (ttError) throw ttError;

            toast.success("Event updated successfully!");
            router.push("/dashboard/organizer");
            router.refresh();

        } catch (err: any) {
            toast.error(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    // ── Render helpers ──────────────────────────────────────────────────────────

    const labelClass =
        "text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2 block flex items-center gap-1.5";

    const inputClass =
        "w-full rounded-xl border-2 border-zinc-200 dark:border-zinc-800 " +
        "bg-white dark:bg-zinc-900/80 " +
        "px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 " +
        "placeholder:text-zinc-400 " +
        "focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 " +
        "transition-all duration-200 " +
        "hover:border-zinc-300 dark:hover:border-zinc-700";

    const cardClass =
        "rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 " +
        "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm " +
        "shadow-lg shadow-zinc-100/50 dark:shadow-black/20 " +
        "hover:shadow-xl transition-all duration-300";

    // Get category icon
    const CategoryIcon = form.category ? CATEGORY_ICONS[form.category] || HelpCircle : HelpCircle;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* ── Page Header with Breadcrumb ─────────────────────────────────────── */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-all duration-200"
                    >
                        <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span>Back to Dashboard</span>
                    </button>
                    <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <span>Organizer Studio</span>
                        <ChevronDown className="w-3 h-3 rotate-270" />
                        <span className="text-zinc-700 dark:text-zinc-300 font-medium">Edit Event</span>
                    </div>
                </div>

                {/* Progress indicator */}
                <div className="hidden sm:flex items-center gap-2">
                    {sections.map((section, idx) => (
                        <div key={section.id} className="flex items-center">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${idx === 0 ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30' :
                                'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                                }`}>
                                {idx + 1}
                            </div>
                            {idx < sections.length - 1 && (
                                <div className="w-8 h-px bg-zinc-200 dark:bg-zinc-700 mx-1" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* ═══════════════════════════════════════════════════
            SECTION 1 ─ Event Details
        ═══════════════════════════════════════════════════ */}
                <section className="relative">
                    <div className={cardClass}>
                        {/* Decorative gradient bar */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 rounded-t-2xl" />

                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
                                    <Type className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
                                        Event Details
                                    </h3>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                        Tell the world about your amazing event
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                {/* Left Column */}
                                <div className="space-y-5">
                                    {/* Event Title */}
                                    <div>
                                        <label className={labelClass} htmlFor="title">
                                            <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                                            Event Title
                                        </label>
                                        <input
                                            id="title"
                                            type="text"
                                            value={form.title}
                                            onChange={e => setField("title", e.target.value)}
                                            onBlur={generateSlug}
                                            onFocus={() => setFocusedField('title')}
                                            className={`${inputClass} ${focusedField === 'title' ? 'border-violet-500 ring-2 ring-violet-500/20' : ''}`}
                                            placeholder="e.g., Euphoria Soiree 2026"
                                        />
                                        <p className="text-[11px] text-zinc-400 mt-1.5">
                                            A catchy title helps attendees find your event
                                        </p>
                                    </div>

                                    {/* Slug */}
                                    <div>
                                        <label className={labelClass} htmlFor="slug">
                                            <Globe className="w-3.5 h-3.5 text-violet-500" />
                                            URL Slug
                                        </label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-mono">
                                                    /events/
                                                </span>
                                                <input
                                                    id="slug"
                                                    type="text"
                                                    value={form.slug}
                                                    onChange={e => setField("slug", e.target.value)}
                                                    className={`${inputClass} pl-20 font-mono text-sm`}
                                                    placeholder="your_event_slug"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={generateSlug}
                                                className="shrink-0 px-4 rounded-xl text-sm font-semibold text-violet-600 border-2 border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-all duration-200 hover:scale-105"
                                            >
                                                Generate
                                            </button>
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className={labelClass} htmlFor="category">
                                            <CategoryIcon className="w-3.5 h-3.5 text-violet-500" />
                                            Category
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="category"
                                                value={form.category}
                                                onChange={e => setField("category", e.target.value)}
                                                className={`${inputClass} appearance-none cursor-pointer`}
                                            >
                                                <option value="">Select a category...</option>
                                                {CATEGORIES.map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Event Date & Time */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className={labelClass} htmlFor="eventDate">
                                                <Calendar className="w-3.5 h-3.5 text-violet-500" />
                                                Event Date
                                            </label>
                                            <input
                                                id="eventDate"
                                                type="date"
                                                value={form.eventDate}
                                                onChange={e => setField("eventDate", e.target.value)}
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClass} htmlFor="eventTime">
                                                <Clock className="w-3.5 h-3.5 text-violet-500" />
                                                Start Time
                                            </label>
                                            <input
                                                id="eventTime"
                                                type="time"
                                                value={form.eventTime}
                                                onChange={e => setField("eventTime", e.target.value)}
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-5">
                                    {/* Banner Upload */}
                                    <div>
                                        <label className={labelClass} htmlFor="bannerFile">
                                            <ImagePlus className="w-3.5 h-3.5 text-violet-500" />
                                            Banner Image
                                        </label>

                                        {/* Hidden file input */}
                                        <input
                                            id="bannerFile"
                                            ref={bannerInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleBannerUpload}
                                            className="hidden"
                                        />

                                        {bannerPreview || form.bannerUrl ? (
                                            /* ── Preview state ─────────────────────────────────────────── */
                                            <div className="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={bannerPreview || form.bannerUrl}
                                                    alt="Banner preview"
                                                    className="w-full h-48 object-cover"
                                                />
                                                {/* Gradient overlay for text readability */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                                {/* "Change" button — bottom right */}
                                                <div className="absolute bottom-3 right-3 flex gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setBannerPreview(null);
                                                            setField("bannerUrl", "");
                                                        }}
                                                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 backdrop-blur-sm transition-colors shadow-md"
                                                    >
                                                        Change
                                                    </button>
                                                </div>
                                                {/* Uploading overlay */}
                                                {uploadingBanner && (
                                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                        <div className="flex flex-col items-center gap-2">
                                                            <Loader2 className="w-6 h-6 animate-spin text-white" />
                                                            <span className="text-xs text-white font-semibold">
                                                                Uploading…
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            /* ── Empty / picker state ─────────────────────────────────── */
                                            <button
                                                type="button"
                                                onClick={() => bannerInputRef.current?.click()}
                                                disabled={uploadingBanner}
                                                className={`${inputClass} flex items-center justify-center gap-3 cursor-pointer hover:border-violet-400 dark:hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/20 transition-all ${uploadingBanner ? "opacity-50 cursor-not-allowed" : ""}`}
                                            >
                                                {uploadingBanner ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin text-violet-500" />
                                                        <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">
                                                            Uploading…
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ImagePlus className="w-5 h-5 text-zinc-400" />
                                                        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                                            Click to upload banner image
                                                        </span>
                                                    </>
                                                )}
                                            </button>
                                        )}

                                        <p className="text-[11px] text-zinc-400 mt-2">
                                            Recommended size: 1200 × 600 px · JPG or PNG
                                        </p>
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className={labelClass} htmlFor="location">
                                            <MapPin className="w-3.5 h-3.5 text-violet-500" />
                                            Venue / Location
                                        </label>
                                        <input
                                            id="location"
                                            type="text"
                                            value={form.location}
                                            onChange={e => setField("location", e.target.value)}
                                            className={inputClass}
                                            placeholder="e.g., Black Panorama Lounge, Ikeja"
                                        />
                                        <label className="flex items-center gap-2 mt-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={form.isLocationHidden}
                                                onChange={e => setField("isLocationHidden", e.target.checked)}
                                                className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-600 text-violet-600 focus:ring-violet-500 focus:ring-offset-0"
                                            />
                                            <span className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors flex items-center gap-1">
                                                <Lock className="w-3 h-3" />
                                                Hide exact venue — reveal only after purchase
                                            </span>
                                        </label>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className={labelClass} htmlFor="description">
                                            <HelpCircle className="w-3.5 h-3.5 text-violet-500" />
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            rows={4}
                                            value={form.description}
                                            onChange={e => setField("description", e.target.value)}
                                            className={`${inputClass} resize-none`}
                                            placeholder="Tell attendees what this event is about, what to expect, and any special instructions..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════════════════
            SECTION 2 ─ Ticket Configuration
        ═══════════════════════════════════════════════════ */}
                <section className="relative">
                    <div className={cardClass}>
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-rose-500 rounded-t-2xl" />

                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                                    <Ticket className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
                                        Ticket Configuration
                                    </h3>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                        Create flexible pricing tiers for your attendees
                                    </p>
                                </div>
                            </div>

                            {/* Ticket type blocks */}
                            <div className="space-y-4">
                                {activeTickets.map((tt, index) => (
                                    <div
                                        key={tt.id}
                                        className="relative rounded-xl border border-indigo-200 dark:border-indigo-800/30 bg-gradient-to-br from-white to-indigo-50/30 dark:from-zinc-900 dark:to-indigo-950/20 p-5 transition-all duration-200 hover:shadow-md"
                                    >
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-indigo-200/50 dark:border-indigo-800/30">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 text-white text-xs font-bold shadow-md">
                                                    {index + 1}
                                                </div>
                                                <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">
                                                    {tt.name.trim() || `Ticket Type ${index + 1}`}
                                                </span>
                                                {tt.price && Number(tt.price) > 0 && (
                                                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                                                        ₦{Number(tt.price).toFixed(2)}
                                                    </span>
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeTicketType(tt.id)}
                                                disabled={activeTickets.length === 1}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                Remove
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {/* Name */}
                                            <div>
                                                <label className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1.5 block">
                                                    Ticket Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={tt.name}
                                                    onChange={e => setTicketField(tt.id, "name", e.target.value)}
                                                    className={inputClass}
                                                    placeholder="e.g., VIP, Early Bird, Group"
                                                />
                                            </div>

                                            {/* Price */}
                                            <div>
                                                <label className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1.5 block">
                                                    <span className="flex items-center gap-1">
                                                        <DollarSign className="w-3 h-3" />
                                                        Price *
                                                    </span>
                                                </label>
                                                <input
                                                    type="number"
                                                    inputMode="decimal"
                                                    min="0"
                                                    step="0.01"
                                                    value={tt.price}
                                                    onChange={e => setTicketField(tt.id, "price", e.target.value)}
                                                    className={inputClass}
                                                    placeholder="0.00"
                                                />
                                            </div>

                                            {/* Quantity */}
                                            <div>
                                                <label className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1.5 block">
                                                    <span className="flex items-center gap-1">
                                                        <Users className="w-3 h-3" />
                                                        Total Quantity *
                                                    </span>
                                                </label>
                                                <input
                                                    type="number"
                                                    inputMode="numeric"
                                                    min="1"
                                                    value={tt.quantity}
                                                    onChange={e => setTicketField(tt.id, "quantity", e.target.value)}
                                                    className={inputClass}
                                                    placeholder="Available tickets"
                                                />
                                            </div>

                                            {/* Admission Limit */}
                                            <div>
                                                <label className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1.5 block">
                                                    Admission Limit *
                                                </label>
                                                <input
                                                    type="number"
                                                    inputMode="numeric"
                                                    min="1"
                                                    value={tt.admissionLimit}
                                                    onChange={e => setTicketField(tt.id, "admissionLimit", e.target.value)}
                                                    className={inputClass}
                                                    placeholder="People per QR"
                                                />
                                                <p className="text-[10px] text-zinc-400 mt-1">
                                                    <CheckCircle className="w-2.5 h-2.5 inline mr-0.5" />
                                                    {tt.admissionLimit || "1"} per QR code
                                                </p>
                                            </div>

                                            {/* Max Per Order */}
                                            <div>
                                                <label className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1.5 block">
                                                    Max Per Order
                                                </label>
                                                <input
                                                    type="number"
                                                    inputMode="numeric"
                                                    min="1"
                                                    value={tt.maxPerOrder}
                                                    onChange={e => setTicketField(tt.id, "maxPerOrder", e.target.value)}
                                                    className={inputClass}
                                                    placeholder="10"
                                                />
                                            </div>

                                            {/* Description */}
                                            <div className="md:col-span-2 lg:col-span-3">
                                                <label className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1.5 block">
                                                    Description
                                                </label>
                                                <textarea
                                                    rows={1}
                                                    value={tt.description}
                                                    onChange={e => setTicketField(tt.id, "description", e.target.value)}
                                                    className={`${inputClass} resize-none`}
                                                    placeholder="Extra info shown on the ticket page (e.g., includes drink, early access, etc.)"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add Ticket Type button */}
                            <button
                                type="button"
                                onClick={addTicketType}
                                className="mt-5 flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold text-indigo-600 border-2 border-dashed border-indigo-300 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 hover:border-indigo-400 transition-all duration-200 group"
                            >
                                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                                Add Another Ticket Type
                            </button>
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════════════════
            SECTION 3 ─ Publish
        ═══════════════════════════════════════════════════ */}
                <section className="relative">
                    <div className={cardClass}>
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-t-2xl" />

                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                                    <Send className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
                                        Event Publishing
                                    </h3>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                        Choose visibility and sale timeline for your event
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Status Selection */}
                                <div className="space-y-3">
                                    <label className={labelClass}>
                                        <Eye className="w-3.5 h-3.5 text-emerald-500" />
                                        Visibility Status
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setField("status", "draft")}
                                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${form.status === "draft"
                                                ? "border-zinc-400 bg-zinc-100 dark:bg-zinc-800 shadow-md"
                                                : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                                                }`}
                                        >
                                            <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                                                <Lock className="w-4 h-4 text-zinc-500" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">Draft</p>
                                                <p className="text-[10px] text-zinc-400">Hidden from public</p>
                                            </div>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setField("status", "published")}
                                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${form.status === "published"
                                                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 shadow-md shadow-emerald-500/20"
                                                : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                                                }`}
                                        >
                                            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                                <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">Published</p>
                                                <p className="text-[10px] text-zinc-400">Visible to everyone</p>
                                            </div>
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg p-2">
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        {form.status === "published"
                                            ? "Event will be visible on the public events page immediately."
                                            : "Only you can see this event — perfect for work in progress."}
                                    </div>
                                </div>

                                {/* Ticket Sale Dates */}
                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClass} htmlFor="saleStart">
                                            <Zap className="w-3.5 h-3.5 text-emerald-500" />
                                            Ticket Sale Starts
                                            <span className="ml-1 font-normal text-zinc-400">(optional)</span>
                                        </label>
                                        <input
                                            id="saleStart"
                                            type="datetime-local"
                                            value={form.ticketSaleStart}
                                            onChange={e => setField("ticketSaleStart", e.target.value)}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass} htmlFor="saleEnd">
                                            <Clock className="w-3.5 h-3.5 text-emerald-500" />
                                            Ticket Sale Ends
                                            <span className="ml-1 font-normal text-zinc-400">(optional)</span>
                                        </label>
                                        <input
                                            id="saleEnd"
                                            type="datetime-local"
                                            value={form.ticketSaleEnd}
                                            onChange={e => setField("ticketSaleEnd", e.target.value)}
                                            className={inputClass}
                                        />
                                    </div>
                                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                                        Leave blank for unlimited sale period until event starts.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* ── Submit Actions ──────────────────────────────────────────────────── */}
                <div className="flex items-center justify-end gap-3 pt-3 pb-3 sticky bottom-4 bg-gradient-to-t from-zinc-50/95 to-transparent dark:from-zinc-950/95 backdrop-blur-sm -mx-4 px-4 py-4 rounded-t-2xl rounded-4xl">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2.5 rounded-xl text-sm font-semibold text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading || activeTickets.length === 0}
                        className="relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 hover:from-violet-700 hover:via-indigo-700 hover:to-blue-700 text-white text-sm font-bold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving Changes...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                {form.status === "published" ? "Save Changes" : "Save as Draft"}
                            </>
                        )}
                    </button>
                </div>

            </form>
        </div>
    );
}