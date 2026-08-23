"use client";

import AmbientImage from "./AmbientImage";

type AmbientLayerProps = {
  particles: readonly string[];
};

export default function AmbientLayer({
  particles,
}: AmbientLayerProps) {
 
    return (
    <div className="fixed inset-0 pointer-events-none z-30">

      {/* Gold Dust */}
      {particles[0] && (
        <AmbientImage
          src={particles[0]}
          animation="drift"
          priority
          className="object-cover opacity-20"
        />
      )}

      {/* Sparkles */}
      {particles[1] && (
        <AmbientImage
          src={particles[1]}
          animation="twinkle"
          priority
          className="object-cover opacity-40 mix-blend-screen"
        />
      )}

      {/* Light Rays / Bokeh */}
      {particles[2] && (
        <AmbientImage
          src={particles[2]}
          animation="pulse"
          priority
          className="object-cover opacity-12 mix-blend-screen"
        />
      )}

      {/* Petals / Smoke / Stars */}
      {particles[3] && (
        <AmbientImage
          src={particles[3]}
          animation="float"
          priority
          className="object-cover opacity-18"
        />
      )}

    </div>
  );
}