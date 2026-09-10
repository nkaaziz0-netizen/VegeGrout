import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabaseClient";

// Matches the `inquiries` table from the project documentation:
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   name TEXT NOT NULL,
//   company TEXT,
//   email TEXT,
//   phone TEXT,
//   message TEXT,
//   source TEXT,           -- 'contact_form' | 'whatsapp_click'
//   created_at TIMESTAMPTZ DEFAULT now()

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.name !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { name, location, size, message, source } = body as {
    name: string;
    location?: string;
    size?: string;
    message?: string;
    source?: string;
  };

  const supabase = getSupabaseClient();
  if (!supabase) {
    // No DB configured — don't fail the request; the WhatsApp handoff on
    // the client side is the primary conversion path regardless.
    console.warn(
      "[inquiries] Supabase not configured — lead not persisted:",
      { name, location }
    );
    return NextResponse.json({ ok: true, persisted: false });
  }

  const { error } = await supabase.from("inquiries").insert({
    name,
    message: [location ? `Location: ${location}` : null, size ? `Size: ${size} m²` : null, message]
      .filter(Boolean)
      .join(" | "),
    source: source || "contact_form",
  });

  if (error) {
    console.error("[inquiries] Supabase insert failed:", error.message);
    return NextResponse.json({ ok: false, persisted: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true, persisted: true });
}
