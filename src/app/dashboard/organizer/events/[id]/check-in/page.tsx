"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  QrCode,
  ScanLine,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Keyboard,
  Camera,
  CameraOff,
  RefreshCw,
  User,
  Ticket,
  Clock,
  AlertCircle,
  Loader2,
  X,
  ChevronRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type ScanResult = {
  type: "success" | "error" | "already";
  ticketId: string;
  message: string;
  attendeeName?: string;
  ticketType?: string;
  timestamp: string;
};

type TicketLookup = {
  id: string;
  status: string;
  admissions_used: number;
  admission_limit: number;
  event_id: string;
  user_id: string;
  ticket_types: { name: string; price: number } | null;
  profiles: { full_name: string | null; avatar_url: string | null } | null;
  orders: { payment_status: string } | null;
};

// ─── QR Scanner Component ─────────────────────────────────────────────────────
function QRScanner({
  onScan,
  isActive,
}: {
  onScan: (code: string) => void;
  isActive: boolean;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<any>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  const startScanner = useCallback(async () => {
    if (!divRef.current || scannerRef.current) return;
    setIsStarting(true);
    setCameraError(null);

    try {
      // Dynamically import to avoid SSR issues
      const { Html5Qrcode } = await import("html5-qrcode");
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 280, height: 280 },
          aspectRatio: 1.0,
        },
        (decodedText: string) => {
          onScan(decodedText.trim());
        },
        () => {
          // Scan error — ignore (fires every frame when no QR detected)
        }
      );
    } catch (err: any) {
      setCameraError(err?.message || "Camera access denied or not available.");
      scannerRef.current = null;
    } finally {
      setIsStarting(false);
    }
  }, [onScan]);

  const stopScanner = useCallback(async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch {
        // ignore
      }
      scannerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      startScanner();
    } else {
      stopScanner();
    }
    return () => {
      stopScanner();
    };
  }, [isActive, startScanner, stopScanner]);

  return (
    <div className="relative flex flex-col items-center gap-4">
      {/* Camera viewport */}
      <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-zinc-950 shadow-2xl border border-zinc-700">
        {/* The html5-qrcode mounts a video element here */}
        <div id="qr-reader" className="w-full h-full" />

        {/* Scanning overlay — animated corners */}
        {isActive && !cameraError && !isStarting && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Corner marks */}
            <div className="absolute top-6 left-6 w-12 h-12 border-t-4 border-l-4 border-blue-400 rounded-tl-lg" />
            <div className="absolute top-6 right-6 w-12 h-12 border-t-4 border-r-4 border-blue-400 rounded-tr-lg" />
            <div className="absolute bottom-6 left-6 w-12 h-12 border-b-4 border-l-4 border-blue-400 rounded-bl-lg" />
            <div className="absolute bottom-6 right-6 w-12 h-12 border-b-4 border-r-4 border-blue-400 rounded-br-lg" />
            {/* Scan line */}
            <div className="absolute left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan-line top-1/2" />
          </div>
        )}

        {/* Loading state */}
        {isStarting && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/90 gap-3">
            <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
            <p className="text-sm text-zinc-300 font-medium">Starting camera…</p>
          </div>
        )}

        {/* Camera error */}
        {cameraError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/95 gap-4 p-6 text-center">
            <CameraOff className="w-12 h-12 text-red-400" />
            <div>
              <p className="text-sm font-bold text-red-400 mb-1">Camera Error</p>
              <p className="text-xs text-zinc-400">{cameraError}</p>
            </div>
            <button
              onClick={() => { scannerRef.current = null; startScanner(); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry
            </button>
          </div>
        )}

        {/* Inactive */}
        {!isActive && !cameraError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/95 gap-3">
            <Camera className="w-12 h-12 text-zinc-600" />
            <p className="text-sm text-zinc-500 font-medium">Camera paused</p>
          </div>
        )}
      </div>

      <p className="text-xs text-zinc-400 flex items-center gap-1.5">
        <ScanLine className="w-3.5 h-3.5 text-blue-400" />
        Point camera at a ticket QR code
      </p>

      <style>{`
        @keyframes scan-line {
          0%, 100% { top: 20%; }
          50% { top: 80%; }
        }
        .animate-scan-line {
          animation: scan-line 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// ─── Result Toast ─────────────────────────────────────────────────────────────
function ResultToast({
  result,
  onDismiss,
}: {
  result: ScanResult;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [result, onDismiss]);

  const styles = {
    success: "bg-emerald-950/90 border-emerald-600/60 text-emerald-100",
    error: "bg-red-950/90 border-red-600/60 text-red-100",
    already: "bg-amber-950/90 border-amber-600/60 text-amber-100",
  };

  const icons = {
    success: <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />,
    error: <XCircle className="w-6 h-6 text-red-400 shrink-0" />,
    already: <AlertCircle className="w-6 h-6 text-amber-400 shrink-0" />,
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-300 ${styles[result.type]}`}
    >
      {icons[result.type]}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm">{result.message}</p>
        {result.attendeeName && (
          <p className="text-xs opacity-80 mt-0.5 truncate">
            {result.attendeeName}
            {result.ticketType ? ` · ${result.ticketType}` : ""}
          </p>
        )}
        <p className="text-[10px] opacity-50 mt-1">{result.timestamp}</p>
      </div>
      <button onClick={onDismiss} className="p-1 rounded-lg opacity-60 hover:opacity-100 transition-opacity">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ─── History Item ─────────────────────────────────────────────────────────────
function HistoryItem({ result }: { result: ScanResult }) {
  const colors = {
    success: "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40",
    error: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/40",
    already: "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40",
  };
  const icons = {
    success: <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />,
    error: <XCircle className="w-3.5 h-3.5 shrink-0" />,
    already: <AlertCircle className="w-3.5 h-3.5 shrink-0" />,
  };

  return (
    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border text-xs font-medium ${colors[result.type]}`}>
      {icons[result.type]}
      <div className="flex-1 min-w-0">
        <p className="truncate font-semibold">{result.message}</p>
        {result.attendeeName && (
          <p className="truncate opacity-70 text-[10px] mt-0.5">{result.attendeeName}</p>
        )}
      </div>
      <span className="text-[10px] opacity-60 shrink-0">{result.timestamp}</span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function EventCheckInPage() {
  const params = useParams();
  const eventId = params.id as string;
  const router = useRouter();
  const supabase = createClient();

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Camera / manual toggle
  const [mode, setMode] = useState<"camera" | "manual">("camera");
  const [cameraActive, setCameraActive] = useState(true);

  // Manual entry
  const [manualCode, setManualCode] = useState("");
  const [manualLoading, setManualLoading] = useState(false);

  // Toast result
  const [latestResult, setLatestResult] = useState<ScanResult | null>(null);
  // History
  const [history, setHistory] = useState<ScanResult[]>([]);

  // Stats
  const [stats, setStats] = useState({ total: 0, checkedIn: 0 });

  // Debounce ref to avoid double-scanning
  const lastScannedRef = useRef<string>("");
  const processingRef = useRef(false);

  useEffect(() => {
    loadPage();
  }, [eventId]);

  const loadPage = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);

      const { data: eventData } = await supabase
        .from("events")
        .select("id, title, date, venue")
        .eq("id", eventId)
        .single();
      setEvent(eventData);

      await refreshStats();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refreshStats = async () => {
    const { data } = await supabase
      .from("tickets")
      .select("admissions_used, admission_limit")
      .eq("event_id", eventId)
      .neq("status", "cancelled");

    if (data) {
      const total = data.length;
      const checkedIn = (data as { admissions_used: number | null; admission_limit: number | null }[]).filter(
        (t) => (t.admissions_used || 0) > 0
      ).length;
      setStats({ total, checkedIn });
    }
  };

  const processTicketId = useCallback(
    async (rawCode: string, method: "qr" | "manual") => {
      const ticketId = rawCode.trim();
      if (!ticketId) return;

      // Prevent duplicate rapid scans
      if (processingRef.current || ticketId === lastScannedRef.current) return;
      processingRef.current = true;
      lastScannedRef.current = ticketId;

      // Reset last scanned after 3s so same code can be re-scanned
      setTimeout(() => {
        lastScannedRef.current = "";
      }, 3000);

      const timestamp = new Date().toLocaleTimeString("en-NG", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      try {
        // Look up ticket
        const { data: ticket, error } = await supabase
          .from("tickets")
          .select(`
            id,
            status,
            admissions_used,
            admission_limit,
            event_id,
            user_id,
            ticket_types ( name, price ),
            profiles ( full_name, avatar_url ),
            orders ( payment_status )
          `)
          .eq("id", ticketId)
          .single();

        if (error || !ticket) {
          const result: ScanResult = {
            type: "error",
            ticketId,
            message: "Invalid ticket — not found",
            timestamp,
          };
          setLatestResult(result);
          setHistory((h) => [result, ...h.slice(0, 49)]);
          return;
        }

        const t = ticket as TicketLookup;

        // Wrong event
        if (t.event_id !== eventId) {
          const result: ScanResult = {
            type: "error",
            ticketId,
            message: "Ticket is for a different event",
            timestamp,
          };
          setLatestResult(result);
          setHistory((h) => [result, ...h.slice(0, 49)]);
          return;
        }

        // Not paid
        if (t.orders?.payment_status !== "paid") {
          const result: ScanResult = {
            type: "error",
            ticketId,
            message: "Ticket payment not confirmed",
            attendeeName: t.profiles?.full_name || undefined,
            timestamp,
          };
          setLatestResult(result);
          setHistory((h) => [result, ...h.slice(0, 49)]);
          return;
        }

        // Cancelled
        if (t.status === "cancelled") {
          const result: ScanResult = {
            type: "error",
            ticketId,
            message: "Ticket has been cancelled",
            attendeeName: t.profiles?.full_name || undefined,
            timestamp,
          };
          setLatestResult(result);
          setHistory((h) => [result, ...h.slice(0, 49)]);
          return;
        }

        // Already checked in
        if ((t.admissions_used || 0) >= (t.admission_limit || 1)) {
          const result: ScanResult = {
            type: "already",
            ticketId,
            message: "Already checked in",
            attendeeName: t.profiles?.full_name || "Guest",
            ticketType: t.ticket_types?.name,
            timestamp,
          };
          setLatestResult(result);
          setHistory((h) => [result, ...h.slice(0, 49)]);
          return;
        }

        // ✅ Check in!
        const { error: updateError } = await supabase
          .from("tickets")
          .update({
            admissions_used: t.admission_limit || 1,
            checked_in_at: new Date().toISOString(),
            checked_in_by: currentUser?.id ?? null,
            checkin_method: method,
          })
          .eq("id", ticketId);

        if (updateError) {
          const result: ScanResult = {
            type: "error",
            ticketId,
            message: "Database error — try again",
            timestamp,
          };
          setLatestResult(result);
          setHistory((h) => [result, ...h.slice(0, 49)]);
          return;
        }

        const result: ScanResult = {
          type: "success",
          ticketId,
          message: "✓ Checked in successfully!",
          attendeeName: t.profiles?.full_name || "Guest Attendee",
          ticketType: t.ticket_types?.name,
          timestamp,
        };
        setLatestResult(result);
        setHistory((h) => [result, ...h.slice(0, 49)]);
        await refreshStats();
      } catch (err) {
        const result: ScanResult = {
          type: "error",
          ticketId,
          message: "Unexpected error occurred",
          timestamp,
        };
        setLatestResult(result);
        setHistory((h) => [result, ...h.slice(0, 49)]);
      } finally {
        processingRef.current = false;
      }
    },
    [supabase, eventId, currentUser]
  );

  const handleQRScan = useCallback(
    (code: string) => {
      processTicketId(code, "qr");
    },
    [processTicketId]
  );

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    setManualLoading(true);
    await processTicketId(manualCode, "manual");
    setManualCode("");
    setManualLoading(false);
  };

  const checkinPct = stats.total > 0 ? Math.round((stats.checkedIn / stats.total) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-blue-800 border-t-blue-400 animate-spin" />
          <p className="text-sm text-zinc-400 font-medium">Loading check-in…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-30 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800/60 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.push(`/dashboard/organizer/events/${eventId}`)}
          className="p-2 rounded-xl hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-bold text-white truncate flex items-center gap-2">
            <QrCode className="w-4 h-4 text-blue-400 shrink-0" />
            QR Check-In
          </h1>
          {event && (
            <p className="text-xs text-zinc-500 truncate mt-0.5">{event.title}</p>
          )}
        </div>

        {/* Live counter */}
        <div className="text-right shrink-0">
          <p className="text-lg font-black text-white tabular-nums">
            {stats.checkedIn}
            <span className="text-zinc-600 font-normal text-sm">/{stats.total}</span>
          </p>
          <p className="text-[10px] text-zinc-500">{checkinPct}% in</p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">

        {/* ── Progress Bar ── */}
        <div className="space-y-1.5">
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-700"
              style={{ width: `${checkinPct}%` }}
            />
          </div>
          <p className="text-xs text-zinc-500 text-right">
            {stats.total - stats.checkedIn} remaining
          </p>
        </div>

        {/* ── Mode Toggle ── */}
        <div className="flex rounded-xl bg-zinc-900 border border-zinc-800 p-1 gap-1">
          <button
            onClick={() => {
              setMode("camera");
              setCameraActive(true);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              mode === "camera"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Camera className="w-4 h-4" />
            Camera Scan
          </button>
          <button
            onClick={() => {
              setMode("manual");
              setCameraActive(false);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              mode === "manual"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Keyboard className="w-4 h-4" />
            Manual Entry
          </button>
        </div>

        {/* ── Camera Scanner ── */}
        {mode === "camera" && (
          <QRScanner onScan={handleQRScan} isActive={cameraActive} />
        )}

        {/* ── Manual Entry ── */}
        {mode === "manual" && (
          <div className="space-y-3">
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Keyboard className="w-4 h-4 text-blue-400" />
                <span>Enter ticket ID manually</span>
              </div>
              <form onSubmit={handleManualSubmit} className="space-y-3">
                <input
                  id="manual-ticket-input"
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Paste or type ticket ID…"
                  autoComplete="off"
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-600 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={!manualCode.trim() || manualLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/20"
                >
                  {manualLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  {manualLoading ? "Checking in…" : "Check In"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── Latest Result Toast ── */}
        {latestResult && (
          <ResultToast
            result={latestResult}
            onDismiss={() => setLatestResult(null)}
          />
        )}

        {/* ── Scan History ── */}
        {history.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Recent Scans
              </p>
              <button
                onClick={() => setHistory([])}
                className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1 scrollbar-hide">
              {history.map((r, i) => (
                <HistoryItem key={`${r.ticketId}-${i}`} result={r} />
              ))}
            </div>
          </div>
        )}

        {/* ── Stats Summary ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Total",
              value: stats.total,
              color: "text-zinc-300",
              bg: "bg-zinc-900",
            },
            {
              label: "Checked In",
              value: stats.checkedIn,
              color: "text-emerald-400",
              bg: "bg-emerald-950/30",
            },
            {
              label: "Remaining",
              value: stats.total - stats.checkedIn,
              color: "text-amber-400",
              bg: "bg-amber-950/30",
            },
          ].map((s) => (
            <div
              key={s.label}
              className={`${s.bg} border border-zinc-800 rounded-2xl p-3 text-center`}
            >
              <p className={`text-2xl font-black ${s.color} tabular-nums`}>{s.value}</p>
              <p className="text-[10px] text-zinc-600 mt-0.5 font-semibold uppercase tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Attendees Link ── */}
        <button
          onClick={() => router.push(`/dashboard/organizer/events/${eventId}/attendees`)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-blue-700/60 hover:bg-zinc-800/60 transition-all group text-sm"
        >
          <div className="flex items-center gap-2.5 text-zinc-400 group-hover:text-zinc-200">
            <User className="w-4 h-4" />
            <span className="font-medium">View full attendee list</span>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 transition-colors" />
        </button>

      </div>
    </div>
  );
}
