import Reveal from "@/components/Reveal";
import QuoteButton from "@/components/QuoteButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner & Distributor Portal",
  description: "Distributorship and licensing model for the Vege-Grout ground stabilization system.",
};

export default function PartnersPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Partner &amp; Distributor Portal</div>
          <h1>A distributorship model built for regional scale.</h1>
          <p className="lede">
            Vege-Grout is commercialized through a distributorship/OEM model
            across Malaysia and regional markets — production and
            installation handled locally, with UNITEN providing ongoing
            technical assistance and advisory.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">How the partnership works</div>
            <h2>Production, installation, and maintenance stay local — the R&amp;D backbone doesn&apos;t.</h2>
          </div>
          <div className="model-flow">
            <div className="model-node">
              <div className="mn-icon"></div>
              <h4>UNITEN</h4>
              <p>R&amp;D, formulation IP, yearly technical assistance &amp; advisory</p>
            </div>
            <div className="model-arrow">→</div>
            <div className="model-node">
              <div className="mn-icon" style={{ background: "var(--clay)" }}></div>
              <h4>Distributor / OEM Partner</h4>
              <p>e.g. Geomapping Technology Sdn Bhd — production, geotechnical design, skilled contractors</p>
            </div>
            <div className="model-arrow">→</div>
            <div className="model-node">
              <div className="mn-icon" style={{ background: "var(--growth)" }}></div>
              <h4>Client Site</h4>
              <p>Installation, monitoring, and maintenance-free operation</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <Reveal as="section" className="content-section alt">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Commercial Terms (Indicative)</div>
            <h2>Built to be margin-positive from year one.</h2>
          </div>
          <div className="partner-perks">
            <div className="perk"><div className="n">RM220/m²</div><div className="t">indicative all-in production cost per treated square meter</div></div>
            <div className="perk"><div className="n">RM300/m²</div><div className="t">indicative domestic sale price per square meter</div></div>
            <div className="perk"><div className="n">RM600/m²</div><div className="t">indicative export price per square meter, regional markets</div></div>
          </div>
          <p className="desc" style={{ marginTop: 28 }}>
            Production turnaround is typically under 30 days per batch, with
            geotechnical design and skilled installation crews provided as
            part of the distributor scope — the same model currently running
            with Geomapping Technology Sdn Bhd across Simpang Pulai and Pasir
            Mas, Kelantan.
          </p>
        </div>
      </Reveal>

      <section className="content-section">
        <div className="wrap content-grid-2">
          <div>
            <h2>Long-term sustainability plan</h2>
            <p className="desc">
              Mid-term: collaboration agreements with farmers&apos;
              associations for vegetable-waste supply, alongside
              service-level agreements with utilities and infrastructure
              agencies.
            </p>
            <p className="desc">
              Long-term: an in-house bacteria culture method — already
              earmarked for its own IP filing — to scale Vege-Grout production
              independent of external supply, with the same base culture
              explored as a coating material beyond slope stabilization.
            </p>
          </div>
          <div>
            <h2>What a distributor gets</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ padding: "10px 0", borderTop: "1px solid var(--line)" }}>Licensed access to a patented, granted formulation (MY-174566-A)</li>
              <li style={{ padding: "10px 0", borderTop: "1px solid var(--line)" }}>Yearly technical assistance &amp; advisory from the originating R&amp;D team</li>
              <li style={{ padding: "10px 0", borderTop: "1px solid var(--line)" }}>A bundled system (material + geotextile + SOP) rather than a raw formula</li>
              <li style={{ padding: "10px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>A growing reference project list to support tender submissions</li>
            </ul>
          </div>
        </div>
      </section>

      <Reveal as="section" className="cta-section">
        <div className="wrap">
          <h2>Interested in a distributor or licensing conversation?</h2>
          <p>Tell us your target market and scale — we&apos;ll follow up with commercial terms.</p>
          <div className="cta-buttons">
            <QuoteButton className="btn-whatsapp">💬 Start a partner conversation</QuoteButton>
            <a className="btn-outline-light" href="/about">Meet the team →</a>
          </div>
        </div>
      </Reveal>
    </>
  );
}
