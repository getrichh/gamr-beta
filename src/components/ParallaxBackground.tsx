"use client";

import Tilt from "react-parallax-tilt";

export default function ParallaxBackground() {
    return (
        <Tilt
            tiltReverse
            glareEnable={false}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            className="absolute inset-0 z-0 overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
        >
            <div
                style={{
                    backgroundImage: "url('/images/base2.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100%",
                    opacity: 0.2,
                    transform: "translateZ(-20px) scale(1.1)",
                }}
            />
        </Tilt>
    );
}