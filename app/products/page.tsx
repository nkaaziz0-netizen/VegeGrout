import Reveal from "@/components/Reveal";
import StaggerGroup from "@/components/StaggerGroup";
import QuoteButton from "@/components/QuoteButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products & Services",
  description:
    "The integrated Vege-Grout system: bio-grout, COLUFNAS geotextile, installation, and lab verification.",
};

const PRODUCTS = [
  {
    num: "01 · Material",
    title: "Vege-Grout Bio-Grout",
    desc: "An injectable, self-sustaining grout fermented from vegetable waste, dosed by treatment-grid area and delivered via subsurface injection and surface spray.",
    points: [
      "Dosage rate: 3.7 L/m² across the marked treatment grid",
      "Delivered via 40mm PVC injection piping, 0.5–1m depth",
      "Doubles as a fertilizer base once vegetation establishes",
    ],
  },
  {
    num: "02 · Material",
    title: "COLUFNAS Geotextile",
    desc: "A coir-based natural-fibre erosion control matting, laid directly over the treated surface and combined with hydroseeding for immediate surface protection.",
    points: [
      "Single-layer matting aligned to the 1m × 1m treatment grid",
      "Hydroseeded with seed mix, fertilizer, and mulch",
      "Made from vegetable waste — part of the same low-carbon system",
    ],
  },
  {
    num: "03 · Service",
    title: "Site Installation",
    desc: "A trained crew executes the full 5-stage SOP on site: clearing, resistivity survey, grout injection, and matting/seeding — start to finish.",
    points: [
      "Electrical resistivity survey to locate groundwater and injection points",
      "Full installation typically completed within a defined site window",
      "Before/after photo documentation at every stage",
    ],
  },
  {
    num: "04 · Service",
    title: "Monitoring & Lab Verification",
    desc: "Disturbed and undisturbed soil sampling, tested to BS 1377, confirms strength and permeability gains — with monitoring continuing through Day 35 and beyond.",
    points: [
      "Field monitoring at Day 1, 7, 14, 21, 28, and 35",
      "Lab testing benchmarked to BS 1377 Parts 1, 2, 5, 7",
      "SEM/XRD/XRF mineralogy available on request",
    ],
  },
];

export default function ProductsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Products &amp; Services</div>
          <h1>One integrated system — grout, geotextile, installation, and verification.</h1>
          <p className="lede">
            Vege-Grout is sold as a bundled system, not a standalone
            material: the bio-grout, the natural-fibre geotextile, the
            installation crew, and the lab verification all ship together, so
            the result is engineered from the ground up rather than assembled
            from separate vendors.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="wrap">
          <StaggerGroup itemSelector=".product-card" className="product-grid">
            {PRODUCTS.map((p) => (
              <div className="product-card" key={p.title}>
                <span className="pc-num">{p.num}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <ul>
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <div className="divider"></div>

      <Reveal as="section" className="content-section alt">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Why the bundle, not the parts</div>
            <h2>Comparable performance, a fraction of the lifetime cost.</h2>
          </div>
          <div className="partner-perks">
            <div className="perk"><div className="n">46%</div><div className="t">lower initial capital cost vs. conventional grout, on a 100m × 100m comparison basis</div></div>
            <div className="perk"><div className="n">~1000%</div><div className="t">savings on maintenance — the system is designed to need none</div></div>
            <div className="perk"><div className="n">4-in-1</div><div className="t">material, geotextile, installation, and verification bundled as one scope</div></div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="cta-section">
        <div className="wrap">
          <h2>Ready to scope a treatment area?</h2>
          <p>Tell us the slope size and soil type — we&apos;ll size the grid, dosage, and crew.</p>
          <div className="cta-buttons">
            <QuoteButton className="btn-whatsapp">💬 Get a quote</QuoteButton>
            <a className="btn-outline-light" href="/projects">See it in the field →</a>
          </div>
        </div>
      </Reveal>
    </>
  );
}
