import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  spring,
  spring as springFn,
  useVideoConfig,
} from "remotion";

const COLORS = {
  primary: "#2563eb",
  primaryDark: "#1d4ed8",
  primaryLight: "#eff6ff",
  dark: "#020617",
  gray: "#475569",
  white: "#ffffff",
  accent: "#1a1a2e",
};

const FADE_DURATION = 15;

function FadeIn({ children, startAt, durationInFrames = FADE_DURATION }: { children: React.ReactNode; startAt: number; durationInFrames?: number }) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - startAt, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <div style={{ opacity }}>{children}</div>;
}

function SlideUp({ children, startAt }: { children: React.ReactNode; startAt: number }) {
  const frame = useCurrentFrame();
  const progress = springFn({
    frame: frame - startAt,
    fps: 30,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });
  const translateY = interpolate(progress, [0, 1], [40, 0]);
  const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.5, 1]);
  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {children}
    </div>
  );
}

function LogoReveal() {
  const frame = useCurrentFrame();
  const scale = spring({
    frame,
    fps: 30,
    config: { damping: 10, mass: 0.8, stiffness: 120 },
  });
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 30,
          background: COLORS.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          boxShadow: "0 20px 40px -8px rgba(37,99,235,0.3)",
        }}
      >
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={COLORS.white} strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </div>
      <h1
        style={{
          fontFamily: "sans-serif",
          fontSize: 64,
          fontWeight: 800,
          color: COLORS.white,
          margin: 0,
          letterSpacing: "-0.03em",
        }}
      >
        ReiSearch
      </h1>
    </div>
  );
}

function Headline() {
  const frame = useCurrentFrame();
  const startAt = 0;
  const progress = springFn({
    frame: frame - startAt,
    fps: 30,
    config: { damping: 14, mass: 0.4, stiffness: 100 },
  });
  const translateY = interpolate(progress, [0, 1], [30, 0]);
  const opacity = interpolate(progress, [0, 0.4, 1], [0, 0.6, 1]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "0 40px",
      }}
    >
      <h1
        style={{
          fontFamily: "sans-serif",
          fontSize: 52,
          fontWeight: 800,
          color: COLORS.white,
          margin: 0,
          textAlign: "center",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        Welcome to the Future
        <br />
        of Real Estate
      </h1>
      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: 20,
          color: "rgba(255,255,255,0.7)",
          marginTop: 20,
          textAlign: "center",
          opacity: interpolate(progress, [0.5, 1], [0, 1]),
        }}
      >
        AI-powered deal analysis at your fingertips
      </p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  delay: number;
}) {
  const frame = useCurrentFrame();
  const progress = springFn({
    frame: frame - delay,
    fps: 30,
    config: { damping: 14, mass: 0.5, stiffness: 100 },
  });
  const translateX = interpolate(progress, [0, 1], [60, 0]);
  const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.5, 1]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: 16,
        padding: "16px 20px",
        margin: "0 32px 12px 32px",
        border: "1px solid rgba(255,255,255,0.15)",
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      <div
        style={{
          fontSize: 28,
          width: 44,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.15)",
          borderRadius: 12,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "sans-serif", fontSize: 18, fontWeight: 700, color: COLORS.white }}>
          {title}
        </div>
        <div style={{ fontFamily: "sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>
          {description}
        </div>
      </div>
    </div>
  );
}

function FeaturesGrid() {
  const features = [
    { icon: "📊", title: "AI Comps", description: "Instant property comps & analysis" },
    { icon: "🏠", title: "Deal Pipeline", description: "Track deals from lead to close" },
    { icon: "🔄", title: "Marketplace", description: "Connect with buyers & sellers" },
    { icon: "📈", title: "Underwriting", description: "Multi-exit deal modeling" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <h2
        style={{
          fontFamily: "sans-serif",
          fontSize: 28,
          fontWeight: 800,
          color: COLORS.white,
          margin: "0 32px 24px 32px",
          letterSpacing: "-0.02em",
        }}
      >
        Everything you need
      </h2>
      {features.map((f, i) => (
        <FeatureCard key={f.title} {...f} delay={i * 6} />
      ))}
    </div>
  );
}

function CTA() {
  const frame = useCurrentFrame();
  const scale = springFn({
    frame,
    fps: 30,
    config: { damping: 8, mass: 0.6, stiffness: 150 },
  });
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "0 40px",
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          background: COLORS.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </div>
      <h2
        style={{
          fontFamily: "sans-serif",
          fontSize: 36,
          fontWeight: 800,
          color: COLORS.white,
          margin: 0,
          textAlign: "center",
          letterSpacing: "-0.02em",
          opacity,
        }}
      >
        Start Analyzing Deals Today
      </h2>
      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: 16,
          color: "rgba(255,255,255,0.6)",
          marginTop: 12,
          opacity,
        }}
      >
        reisearch.com
      </p>
      <div
        style={{
          marginTop: 24,
          padding: "14px 32px",
          borderRadius: 14,
          background: COLORS.white,
          color: COLORS.primary,
          fontFamily: "sans-serif",
          fontSize: 18,
          fontWeight: 700,
          opacity: interpolate(frame, [8, 15], [0, 1]),
          transform: `scale(${interpolate(frame, [8, 18], [0.8, 1])})`,
          boxShadow: "0 8px 24px rgba(37,99,235,0.3)",
        }}
      >
        Get Started Free
      </div>
    </div>
  );
}

export const WelcomeToReiSearch: React.FC = () => {
  const frame = useCurrentFrame();

  // Background gradient animation
  const gradientShift = interpolate(frame, [0, 180], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, 
          ${COLORS.accent} 0%, 
          ${COLORS.primaryDark} 50%, 
          ${COLORS.primary} 100%)`,
      }}
    >
      {/* Animated background particles */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.15,
          background: `radial-gradient(circle at ${30 + gradientShift * 20}% ${40 + gradientShift * 10}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
        }}
      />

      {/* Beat 1: Logo reveal (0-2s) */}
      <Sequence from={0} durationInFrames={60}>
        <LogoReveal />
      </Sequence>

      {/* Beat 2: Welcome headline (2-5s) */}
      <Sequence from={60} durationInFrames={90}>
        <Headline />
      </Sequence>

      {/* Beat 3: Feature cards (5-10s) */}
      <Sequence from={150} durationInFrames={150}>
        <FeaturesGrid />
      </Sequence>

      {/* Beat 4: CTA (10-15s) */}
      <Sequence from={300} durationInFrames={150}>
        <CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
