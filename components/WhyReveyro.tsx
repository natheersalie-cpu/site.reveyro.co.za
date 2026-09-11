/**
 * "Why Reveyro" — three-card feature grid explaining the value prop.
 */
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export function WhyReveyro() {
  return (
    <section className="section">
      <div className="section-eyebrow">WHY REVEYRO</div>
            <h2>Built for teams who can&apos;t afford to find out later.</h2>
      <p className="lede">
        Access, approvals, and audit history live in one place — so
        nothing moves through your business without a trace.
      </p>
      <div className="grid3">
        <FeatureCard
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
            </svg>
          }
          title="Granular access control"
          description="Assign user types, fine-tune individual overrides, and know exactly who can touch what."
        />
        <FeatureCard
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          }
          title="Live audit trail"
          description="Every change is written to a history you can actually read, the moment it happens."
        />
        <FeatureCard
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M5 3h11l3 3v15H5z" />
              <path d="M9 9h6M9 13h6M9 17h4" />
            </svg>
          }
          title="Finance, unblocked"
          description="Invoices, quotes, and payments move through the same system your permissions already govern."
        />
      </div>
    </section>
  );
}