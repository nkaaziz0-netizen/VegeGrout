import Reveal from "@/components/Reveal";
import QuoteButton from "@/components/QuoteButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "The academic-industry team behind the Vege-Grout ground stabilization system.",
};

const HISTORY = [
  { year: "2009 – 2011", title: "Formulation research", desc: "Promising early findings on fermented vegetable-waste formulation, dosage ratios, and curing time." },
  { year: "2013", title: "Patent filed", desc: '"Soil and Rock Remediation Process and a Remedial Composition Modification using Vegetable Waste" — Application PI 2013701380.' },
  { year: "2013 – 2015", title: "Lab-scale proof of concept", desc: "Trials at UNITEN's own student parking lot and at KM22.2, Sg. Betis (Gua Musang–Simpang Pulai)." },
  { year: "2016", title: "Pilot-scale validation", desc: "Production enhancements and scale-up across multiple soil types, topographies, and slope conditions." },
  { year: "2017 – 2020", title: "Market traction", desc: "First paid commercial projects with OPUS Berhad, MF Construction, and Landasan Kapital Sdn. Bhd." },
  { year: "2020", title: "Patent granted", desc: "Grant Number MY-174566-A — the system moves from filed to fully protected IP." },
  { year: "Present", title: "TRL 7 — deep-seated projects underway", desc: "Active deployment on deep-seated landslide sites in partnership with Geomapping Technology Sdn. Bhd." },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">About Us</div>
          <h1>An academic-industry team, ten years into one problem.</h1>
          <p className="lede">
            Vege-Grout began as university research into bio-mediated soil
            improvement and has grown into a commercially deployed, patented
            system — built on a continuing partnership between UNITEN&apos;s
            research team and industry.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="wrap">
          <div className="team-grid">
            <div className="team-card">
              <div className="tc-avatar">RC</div>
              <span className="role">Project Lead · UNITEN</span>
              <h3>Prof. Madya Dr. Rohayu Che Omar</h3>
              <p>Leads the research team behind Vege-Grout&apos;s formulation, from the original 2009–2011 lab findings through to the current field-proven system and its granted patent.</p>
            </div>
            <div className="team-card">
              <div className="tc-avatar">GT</div>
              <span className="role">Industry Collaborator</span>
              <h3>Geomapping Technology Sdn. Bhd.</h3>
              <p>Commercial and technical partner handling bulk production, geotechnical design, and skilled installation crews for current deep-seated landslide projects.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="content-section alt">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Ten Years of R&amp;D</div>
            <h2>From lab formulation to field-proven system.</h2>
          </div>
          <div className="history-timeline">
            {HISTORY.map((h) => (
              <div className="history-item" key={h.year + h.title}>
                <span className="hy">{h.year}</span>
                <h4>{h.title}</h4>
                <p>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reveal as="section" className="content-section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">IP Portfolio</div>
            <h2>Protected at every layer of the system.</h2>
          </div>
          <div className="partner-perks">
            <div className="perk"><div className="n">1</div><div className="t">Granted patent — MY-174566-A, soil &amp; rock remediation process</div></div>
            <div className="perk"><div className="n">2</div><div className="t">Copyrights — production method statements and site investigation SOPs</div></div>
            <div className="perk"><div className="n">1</div><div className="t">Trademark covering the commercial VG3S system branding</div></div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="cta-section">
        <div className="wrap">
          <h2>Want to talk to the research team directly?</h2>
          <p>For academic collaboration, media, or technical due-diligence requests.</p>
          <div className="cta-buttons">
            <QuoteButton className="btn-whatsapp">💬 Get in touch</QuoteButton>
            <a className="btn-outline-light" href="/">Back to home →</a>
          </div>
        </div>
      </Reveal>
    </>
  );
}
