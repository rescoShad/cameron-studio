import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const HelloWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1a2e",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "sans-serif",
          fontSize: 80,
          color: "#e94560",
          opacity,
        }}
      >
        Cameron Studio
      </h1>
    </AbsoluteFill>
  );
};
