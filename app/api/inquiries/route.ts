import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabaseClient";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
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
    console.warn("[inquiries] Supabase not configured — lead not persisted:", { name, location });
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