import Reveal from "@/components/Reveal";
import QuoteButton from "@/components/QuoteButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Field validation and commercial project history for the Vege-Grout system.",
};

const CASES = [
  { year: "2017", name: "OPUS Berhad", desc: "First commercial project — early market validation for the current system.", badge: "Shallow landslide", value: "RM 68,017.80" },
  { year: "2017–2020", name: "MF Construction", desc: "Follow-on installation contract during the detailed engineering design phase.", badge: "Installation", value: "RM 25,000.00" },
  { year: "2020", name: "Landasan Kapital Sdn. Bhd.", desc: "Second major commercial project, confirming repeatability outside the original pilot sites.", badge: "Shallow landslide", value: "RM 91,160.00" },
  { year: "In progress", name: "Simpang Pulai — JKR Cawangan Cerun", desc: "Deep-seated landslide project delivered in partnership with Geomapping Technology Sdn Bhd.", badge: "Deep-seated", value: "Active" },
  { year: "In progress", name: "Pasir Mas, Kelantan — JPS Kelantan", desc: "Deep-seated landslide project, part of the current Geomapping Technology partnership scope.", badge: "Deep-seated", value: "Active" },
];

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Field Validation</div>
          <h1>Real-world performance, at scale — not just lab data.</h1>
          <p className="lede">
            From a first shallow-landslide repair in 2017 to deep-seated slope
            projects today, Vege-Grout&apos;s field record spans multiple
            site conditions, soil types, and client organizations across
            Malaysia.
          </p>
          <div className="stat-strip">
            <div><div className="num">TRL 7</div><div className="lbl">system-prototype demonstrated in an operational environment</div></div>
            <div><div className="num">RM159K+</div><div className="lbl">in completed project sales &amp; services, 2017–2020</div></div>
            <div><div className="num">35 days</div><div className="lbl">from bare cut slope to bound, monitored, vegetated ground</div></div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="wrap">
          <div className="eyebrow">Featured Case Study</div>
          <div className="featured-case">
            <div>
              <span className="cc-loc" style={{ color: "var(--growth)" }}>
                North–South Expressway · KM261.95 South Bound, Section N5
              </span>
              <h3>Cut-slope failure, fully monitored through Day 35.</h3>
              <p>
                A phyllite rock slope with low organic content and low pH,
                following a cut-slope failure, was treated and tracked with
                close-up photo documentation at every monitoring interval from
                Day 1 through Day 35 — the same dataset used throughout our
                Technology page.
              </p>
            </div>
            <div>
              <div className="featured-timeline">
                {["Day 1", "Day 7", "Day 14", "Day 21", "Day 28", "Day 35"].map((d) => (
                  <div className="ftp" key={d}>
                    <div className="dot"></div>
                    <div className="day">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Reveal as="section" className="content-section alt">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Commercial Track Record</div>
            <h2>Sales &amp; services, project by project.</h2>
          </div>
          <div className="case-grid">
            {CASES.map((c) => (
              <div className="case-card" key={c.name}>
                <div>
                  <span className="cc-loc">{c.year}</span>
                  <h3>{c.name}</h3>
                  <p>{c.desc}</p>
                </div>
                <div><span className="cc-badge">{c.badge}</span></div>
                <div className="cc-value">{c.value}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="content-section">
        <div className="wrap content-grid-2">
          <div>
            <h2>Where it&apos;s been proven</h2>
            <p className="desc">
              Beyond commercial sites, lab-to-field validation work has run at
              UNITEN&apos;s own student parking lot and at KM22.2, Sg. Betis
              (Gua Musang–Simpang Pulai) — covering man-made cut slopes,
              natural slopes, and embankments across sand, silty sand, silt,
              and clayey silt.
            </p>
          </div>
          <div>
            <h2>Soil types validated</h2>
            <div className="badge-row">
              <span className="badge">Sand</span>
              <span className="badge">Silty Sand</span>
              <span className="badge">Silt</span>
              <span className="badge">Clayey Silt</span>
              <span className="badge">Soft Rock</span>
              <span className="badge">Phyllite</span>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="cta-section">
        <div className="wrap">
          <h2>Have a similar site to evaluate?</h2>
          <p>Send us the coordinates and slope condition — we&apos;ll tell you if it&apos;s a fit.</p>
          <div className="cta-buttons">
            <QuoteButton className="btn-whatsapp">💬 Talk to our engineers</QuoteButton>
            <a className="btn-outline-light" href="/partners">Explore partnership options →</a>
          </div>
        </div>
      </Reveal>
    </>
  );
}
