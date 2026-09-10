import RootGrowthHero from "@/components/RootGrowthHero";
import Reveal from "@/components/Reveal";
import StaggerGroup from "@/components/StaggerGroup";
import QuoteButton from "@/components/QuoteButton";

export default function HomePage() {
  return (
    <>
      <RootGrowthHero />

      <Reveal as="section" className="problem">
        <div className="wrap problem-grid">
          <div>
            <div className="eyebrow" style={{ color: "var(--growth)" }}>
              The cost of doing nothing
            </div>
            <h2>Slope failure is a recurring, expensive emergency.</h2>
            <p>
              Highway authorities across the region are spending heavily on
              repair and annual upkeep — costs a self-sustaining, vegetated
              stabilization system is designed to remove almost entirely.
            </p>
          </div>
          <div className="problem-figs">
            <div className="fig"><div className="n">RM100M+</div><div className="t">typical repair cost, per failure location</div></div>
            <div className="fig"><div className="n">RM600M</div><div className="t">spent annually on slope maintenance</div></div>
            <div className="fig"><div className="n">17,605</div><div className="t">slopes identified as at-risk nationally</div></div>
            <div className="fig"><div className="n">0</div><div className="t">maintenance visits needed post-treatment</div></div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="monitor">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">North–South Expressway · KM261.95</div>
            <h2>35 days from bare cut slope to bound, vegetated ground.</h2>
          </div>
          <div className="timeline">
            {["Day 1", "Day 7", "Day 14", "Day 21", "Day 28", "Day 35"].map((d) => (
              <div className="tpoint" key={d}>
                <div className="dot"></div>
                <div className="day">{d}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 20 }}>
            <a className="btn-ghost" href="/projects">See all field validation case studies →</a>
          </p>
        </div>
      </Reveal>

      <Reveal as="section" className="sustain">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Why it stays fixed</div>
            <h2>Grown-in stability, not poured-in stability.</h2>
          </div>
          <StaggerGroup itemSelector=".sustain-card" className="sustain-grid">
            <div className="sustain-card">
              <div className="ic"></div>
              <h3>Self-fertilizing</h3>
              <p>The grout doubles as a nutrient source, so vegetation establishes and keeps reinforcing the soil on its own.</p>
            </div>
            <div className="sustain-card">
              <div className="ic" style={{ background: "var(--clay)" }}></div>
              <h3>Zero maintenance cycle</h3>
              <p>No repeat treatments or repair crews — the system is designed to hold without ongoing intervention.</p>
            </div>
            <div className="sustain-card">
              <div className="ic" style={{ background: "var(--moss)" }}></div>
              <h3>Waste-to-value</h3>
              <p>Made by fermenting vegetable waste, cutting landfill load while lowering the carbon footprint of slope repair.</p>
            </div>
          </StaggerGroup>
        </div>
      </Reveal>

      <Reveal as="section" className="cta-section">
        <div className="wrap">
          <h2>Have a slope that needs stabilizing?</h2>
          <p>Send us the location and slope size — our engineers will get back to you with a site assessment.</p>
          <div className="cta-buttons">
            <QuoteButton className="btn-whatsapp">💬 Chat on WhatsApp</QuoteButton>
            <a className="btn-outline-light" href="mailto:hello@vegegrout.com">Email us instead</a>
          </div>
        </div>
      </Reveal>
    </>
  );
}
