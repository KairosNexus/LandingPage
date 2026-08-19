export function HeroSculptures() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="hero-haze hero-haze-left" />
      <div className="hero-haze hero-haze-right" />

      <div className="hero-sculpture hero-sculpture-left">
        <span className="hero-capsule hero-capsule-accent hero-capsule-one" />
        <span className="hero-capsule hero-capsule-light hero-capsule-two" />
        <span className="hero-capsule hero-capsule-light hero-capsule-three" />
      </div>

      <div className="hero-sculpture hero-sculpture-right">
        <span className="hero-capsule hero-capsule-accent hero-capsule-one" />
        <span className="hero-capsule hero-capsule-light hero-capsule-two" />
        <span className="hero-capsule hero-capsule-light hero-capsule-three" />
      </div>
    </div>
  );
}
