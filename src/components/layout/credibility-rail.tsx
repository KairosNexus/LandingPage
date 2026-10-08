import Image from "next/image";

const recognition = [
  { name: "Pava Center", logo: "/pava.png" },
  { name: "Howard University and PNC National Center for Entrepreneurship", logo: "/howard_pnc.png" },
  { name: "Spark Baltimore", logo: "/spark_baltimore.png" },
];

const featured = [
  { name: "TEDCO", logo: "/tedco.png" },
  { name: "Jobberman", logo: "/jobberman.png" },
  { name: "PluralCode", logo: "/pluralcode.png" },
];

const trustedBy = [
  { name: "iBraid", logo: "/ibraid.avif", className: "is-ibraid" },
  { name: "GFG Coaching", logo: "/gfg.png", className: "is-gfg" },
  { name: "Props", logo: "/props-logo-20261006.png" },
  { name: "Spark Baltimore Coworking", logo: "/spark_baltimore.png" },
];

export function TopCredibilityRail() {
  return (
    <section className="product-top-credibility" aria-label="Featured partners and backers">
      <p>Backed &amp; trusted by</p>
      <div>
        {featured.map((item) => (
          <span className="product-top-credibility-logo" key={item.name}>
            <Image src={item.logo} alt={item.name} width={160} height={56} priority />
          </span>
        ))}
      </div>
    </section>
  );
}

function MarqueeSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="product-credibility-marquee-set" aria-hidden={hidden || undefined}>
      {trustedBy.map((item) => (
        <div
          className={`product-credibility-marquee-logo ${item.className ?? ""}`}
          key={item.name}
        >
          <Image src={item.logo} alt={hidden ? "" : item.name} width={150} height={56} />
        </div>
      ))}
    </div>
  );
}

export function CredibilityRail() {
  return (
    <section className="product-credibility" aria-labelledby="product-credibility-title">
      <div className="product-credibility-inner">
        <p id="product-credibility-title" className="product-credibility-label">
          Backed, recognized &amp; trusted by
        </p>

        <div className="product-credibility-recognition">
          {recognition.map((item) => (
            <div className="product-credibility-logo" key={item.name}>
              <Image src={item.logo} alt={item.name} width={180} height={64} />
            </div>
          ))}
        </div>

        <div className="product-credibility-customers">
          <p>Customers &amp; strategic partners</p>
          <div className="product-credibility-marquee">
            <div className="product-credibility-marquee-track">
              <MarqueeSet />
              <MarqueeSet hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
