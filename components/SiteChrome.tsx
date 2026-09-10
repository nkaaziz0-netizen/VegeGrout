"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OPEN_QUOTE_EVENT, OPEN_AUTH_EVENT } from "@/lib/events";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "60123456789";

const NAV_ITEMS = [
  { href: "/technology", label: "Technology" },
  { href: "/products", label: "Products" },
  { href: "/projects", label: "Case Studies" },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
];

type User = { name: string; email: string };

export default function SiteChrome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // keep body classes in sync so the CSS in globals.css (written for the
  // vanilla-JS body-class toggling pattern) keeps working unchanged
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);
  useEffect(() => {
    document.body.classList.toggle("modal-open", quoteOpen);
  }, [quoteOpen]);
  useEffect(() => {
    document.body.classList.toggle("auth-open", authOpen);
    if (authOpen) setAuthView("login");
  }, [authOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setQuoteOpen(false);
        setMenuOpen(false);
        setAuthOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // let any page/component open these modals via a plain DOM event —
  // see lib/events.ts
  useEffect(() => {
    function onOpenQuote() { setMenuOpen(false); setQuoteOpen(true); }
    function onOpenAuth() { setMenuOpen(false); setAuthOpen(true); }
    window.addEventListener(OPEN_QUOTE_EVENT, onOpenQuote);
    window.addEventListener(OPEN_AUTH_EVENT, onOpenAuth);
    return () => {
      window.removeEventListener(OPEN_QUOTE_EVENT, onOpenQuote);
      window.removeEventListener(OPEN_AUTH_EVENT, onOpenAuth);
    };
  }, []);

  function openQuote() {
    setMenuOpen(false);
    setQuoteOpen(true);
  }
  function openAuth() {
    setMenuOpen(false);
    setAuthOpen(true);
  }

  async function handleQuoteSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const location = String(form.get("location") || "");
    const size = String(form.get("size") || "");
    const message = String(form.get("message") || "");

    // fire-and-forget: log the lead server-side, don't block the WhatsApp handoff on it
    fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        location,
        size,
        message,
        source: "contact_form",
      }),
    }).catch(() => {
      /* non-fatal — WhatsApp handoff below is the primary conversion path */
    });

    const text =
      `Hi, I'm ${name}. I'd like a site assessment for a slope at ${location}` +
      (size ? ` (approx. ${size} m²)` : "") +
      (message ? `. Notes: ${message}` : ".");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
    setQuoteOpen(false);
  }

  function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const errorEl = document.getElementById("loginError");
    if (!validEmail || password.length < 6) {
      errorEl?.classList.add("show");
      return;
    }
    errorEl?.classList.remove("show");
    setUser({ name: email.split("@")[0], email });
    setAuthOpen(false);
  }

  function handleSignupSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const errorEl = document.getElementById("signupError");
    if (!name || !validEmail || password.length < 6 || password !== confirm) {
      errorEl?.classList.add("show");
      return;
    }
    errorEl?.classList.remove("show");
    setUser({ name, email });
    setAuthOpen(false);
  }

  return (
    <>
      {/* ---------- header ---------- */}
      <header>
        <div className="nav">
          <Link className="logo" href="/">
            <span className="logo-mark" />
            VEGE·GROUT
          </Link>

          <div className="nav-center">
            <nav className="navlinks">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="nav-right">
            <a className="nav-cta" href="#" onClick={(e) => { e.preventDefault(); openQuote(); }}>
              Get a Quote →
            </a>
            <div className="nav-actions">
              <div className={`account-wrap ${dropdownOpen ? "open" : ""}`} style={{ display: user ? "flex" : "none" }}>
                <div
                  className="account-chip"
                  style={{ display: user ? "flex" : "none" }}
                  onClick={() => setDropdownOpen((v) => !v)}
                >
                  <span className="account-avatar">
                    {user?.name.trim().slice(0, 1).toUpperCase() || "?"}
                  </span>
                  <span className="account-name">{user?.name}</span>
                  <span className="account-caret">▾</span>
                </div>
                <div className="account-dropdown">
                  <div className="ad-email">{user?.email}</div>
                  <button onClick={() => { setUser(null); setDropdownOpen(false); }}>
                    Log out
                  </button>
                </div>
              </div>
              <button
                className="menu-btn"
                aria-label="Open menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span className="bars">
                  <span></span><span></span><span></span>
                </span>
                Menu
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- full-screen overlay menu ---------- */}
      <div className="overlay-menu">
        <button className="overlay-close" onClick={() => setMenuOpen(false)}>
          Close ✕
        </button>
        <nav>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          {!user && (
            <a href="#" id="authTrigger" onClick={(e) => { e.preventDefault(); openAuth(); }}>
              Log In
            </a>
          )}
        </nav>
        <div className="overlay-foot">
          <span>Kajang, Selangor, MY</span>
          <span>hello@vegegrout.com</span>
        </div>
      </div>

      {/* ---------- quote request modal ---------- */}
      <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setQuoteOpen(false); }}>
        <div className="modal">
          <button className="modal-close" onClick={() => setQuoteOpen(false)}>✕</button>
          <h3>Request a site assessment</h3>
          <p className="sub">Tell us about the slope — we&apos;ll open WhatsApp with your details filled in.</p>
          <form onSubmit={handleQuoteSubmit}>
            <div className="field"><label>Name</label><input name="name" type="text" required /></div>
            <div className="field"><label>Location / slope</label><input name="location" type="text" required /></div>
            <div className="field"><label>Approx. slope size (m²)</label><input name="size" type="text" /></div>
            <div className="field"><label>Message</label><textarea name="message" rows={3}></textarea></div>
            <button type="submit" className="btn-whatsapp">💬 Send via WhatsApp</button>
          </form>
        </div>
      </div>

      {/* ---------- login / signup modal ---------- */}
      <div className="auth-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setAuthOpen(false); }}>
        <div className="auth-modal">
          <button className="modal-close" onClick={() => setAuthOpen(false)}>✕</button>

          {authView === "login" ? (
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <div className="auth-eyebrow">Client Access</div>
              <h3>Log in to your account</h3>
              <p className="sub">For clients tracking an active or completed slope treatment.</p>
              <div className="auth-error" id="loginError">
                Enter a valid email and a password of at least 6 characters.
              </div>
              <div className="field"><label>Email</label><input name="email" type="email" required /></div>
              <div className="field"><label>Password</label><input name="password" type="password" required /></div>
              <button type="submit" className="btn-submit">Log In</button>
              <div className="auth-switch">
                Don&apos;t have an account?{" "}
                <button type="button" onClick={() => setAuthView("signup")}>Sign up</button>
              </div>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleSignupSubmit}>
              <div className="auth-eyebrow">Client Access</div>
              <h3>Create an account</h3>
              <p className="sub">Get project updates and monitoring reports for your treated site.</p>
              <div className="auth-error" id="signupError">
                Please fill in all fields — passwords must match and be at least 6 characters.
              </div>
              <div className="field"><label>Full name</label><input name="name" type="text" required /></div>
              <div className="field"><label>Email</label><input name="email" type="email" required /></div>
              <div className="field-row">
                <div className="field"><label>Password</label><input name="password" type="password" required /></div>
                <div className="field"><label>Confirm</label><input name="confirm" type="password" required /></div>
              </div>
              <button type="submit" className="btn-submit">Create Account</button>
              <div className="auth-switch">
                Already have an account?{" "}
                <button type="button" onClick={() => setAuthView("login")}>Log in</button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ---------- floating WhatsApp button ---------- */}
      <a
        className="float-wa"
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        💬
      </a>
    </>
  );
}
