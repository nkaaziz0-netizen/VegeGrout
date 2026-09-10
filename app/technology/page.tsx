import Reveal from "@/components/Reveal";
import InjectionBloomProcess from "@/components/InjectionBloomProcess";
import QuoteButton from "@/components/QuoteButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Technology",
  description:
    "How MICP and bio-mineralization stabilize soil — mechanism, lab data, and installation SOP.",
};

export default function TechnologyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">The Science</div>
          <h1>How MICP &amp; bio-mineralization turn loose soil into bound ground.</h1>
          <p className="lede">
            Vege-Grout works through Microbially Induced Calcite Precipitation
            (MICP) — a naturally occurring bacterial process, here driven by
            fermented vegetable waste, that grows mineral bonds between soil
            particles instead of coating them in synthetic cement.
          </p>
          <div className="stat-strip">
            <div><div className="num">pH 8.0</div><div className="lbl">optimum pH to induce calcite precipitation</div></div>
            <div><div className="num">L. mesenteroides</div><div className="lbl">active bacterial culture identified in Vege-Grout</div></div>
            <div><div className="num">10 yrs</div><div className="lbl">of formulation and field R&amp;D behind the current mix</div></div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="wrap content-grid-2">
          <div>
            <h2>The mechanism</h2>
            <p className="desc">
              Fermented vegetable waste is cultured to encourage bacteria —
              identified as <em>Leuconostoc mesenteroides</em> — that raise
              the local pH toward the 8.0 threshold at which calcite
              precipitates between soil grains. That mineral precipitate is
              what binds particles together: the same basic chemistry behind
              natural sandstone formation, compressed into weeks instead of
              geological time.
            </p>
            <p className="desc">
              During monitored fermentation, pH, temperature, and ammonia
              (NH₄) levels are tracked throughout the process — by day 95 of
              a monitored fermentation cycle, pH reached 6, continuing to
              trend toward the calcite-inducing range as curing progresses
              on-site.
            </p>
            <div className="badge-row">
              <span className="badge">BS 1377 : Parts 1, 2, 5, 7</span>
              <span className="badge">Eurocode 7</span>
              <span className="badge">BS ISO 1920-3:2019</span>
            </div>
          </div>
          <table className="spec-table">
            <tbody>
              <tr><th>VG Dosage</th><th>Cohesion (kN/m²)</th><th>Friction Angle</th><th>Permeability (m/s)</th></tr>
              <tr><td>0% (control)</td><td>15</td><td>26°</td><td>3.36×10⁻⁶</td></tr>
              <tr><td>15.0%</td><td>38</td><td>28°</td><td>1.10×10⁻⁶</td></tr>
              <tr><td>20.0%</td><td>53</td><td>31°</td><td>5.70×10⁻⁷</td></tr>
              <tr><td>22.5%</td><td>61</td><td>38°</td><td>2.99×10⁻⁷</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="divider"></div>

      <section className="process content-section alt">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">The 5-Stage Installation SOP</div>
            <h2>Coverage spreads the way the grout itself does.</h2>
            <p className="desc">
              Every stage below follows the site&apos;s own written Standard
              Operating Procedure, in sequence, from first inspection to
              lab-verified result.
            </p>
          </div>
          <InjectionBloomProcess />
        </div>
      </section>

      <section className="content-section">
        <div className="wrap content-grid-2">
          <div>
            <h2>Verified at the microscale</h2>
            <p className="desc">
              Scanning Electron Microscope (SEM) imaging is used alongside
              XRD and XRF mineralogy analysis to confirm that treated soil
              particles are physically bonded by precipitated mineral
              structure — not simply coated or glued, but chemically fused at
              the grain boundary.
            </p>
            <p className="desc">
              Testing spans both basic classification (particle size,
              Atterberg limits, specific gravity) and engineering performance
              (consolidation, permeability, triaxial shear strength), all
              benchmarked against BS 1377 and Eurocode 7.
            </p>
          </div>
          <table className="spec-table">
            <tbody>
              <tr><th>Property</th><th>Test Method</th><th>Standard</th></tr>
              <tr><td>Particle Size Distribution</td><td>Sieve Analysis</td><td>BS1377-2:1990 Cl. 9.3</td></tr>
              <tr><td>Atterberg Limit</td><td>Casagrande Method</td><td>BS1377-2:1990 Cl. 4.2–4.3</td></tr>
              <tr><td>Specific Gravity</td><td>Density Bottle</td><td>BS1377-2:1990 Cl. 8.3</td></tr>
              <tr><td>Settlement Rate</td><td>Consolidation</td><td>BS1377-5:1990 Cl. 3.5</td></tr>
              <tr><td>Permeability</td><td>Falling Head</td><td>BS1377-5:1990 Cl. 6.8</td></tr>
              <tr><td>Shear Strength</td><td>Triaxial</td><td>BS1377-7:1990 Cl. 5.5</td></tr>
              <tr><td>Mineralogy / Microstructure</td><td>SEM, XRD, XRF</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <Reveal as="section" className="cta-section">
        <div className="wrap">
          <h2>Want the full lab report for a specific soil type?</h2>
          <p>We can walk your engineering team through the data for sand, silty sand, silt, or clayey silt.</p>
          <div className="cta-buttons">
            <QuoteButton className="btn-whatsapp">💬 Talk to our engineers</QuoteButton>
            <a className="btn-outline-light" href="/products">See the full system →</a>
          </div>
        </div>
      </Reveal>
    </>
  );
}
