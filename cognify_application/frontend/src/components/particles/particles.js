import { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    return (
        <>
            {init && (
                <Particles
                    id="tsparticles"
                    particlesLoaded={particlesLoaded}
                    options={{
                        background: {
                            color: {
                                value: "#fff",
                            },
                        },
                        fpsLimit: 120,
                        interactivity: {
                            events: {
                                onHover: {
                                    enable: true,
                                    mode: "repulse",
                                },
                                onClick: {
                                    enable: true,
                                    mode: "repulse",
                                },
                                resize: true,
                            },
                            modes: {
                                grab: {
                                    distance: 400,
                                    links: {
                                        opacity: 1,
                                    },
                                },
                                bubble: {
                                    distance: 400,
                                    size: 40,
                                    duration: 2,
                                    opacity: 8,
                                    speed: 3,
                                },
                                repulse: {
                                    distance: 119.88,
                                    duration: 0.4,
                                },
                                push: {
                                    quantity: 4,
                                },
                                remove: {
                                    quantity: 2,
                                },
                            },
                        },
                        particles: {
                            number: {
                                value: 160,
                                density: {
                                    enable: true,
                                    area: 500,
                                },
                            },
                            color: {
                                value: "#000000",
                            },
                            shape: {
                                type: "triangle",
                                stroke: {
                                    width: 0,
                                    color: "#000000",
                                },
                            },
                            rotate: {
                                value: { min: 0, max: 360 },
                                random: { enable: true, minimumValue: 0 },
                                animation: {
                                    enable: true,
                                    speed: 10,
                                    sync: false,
                                },
                            },
                            opacity: {
                                value: 0.5,
                                random: false,
                                animation: {
                                    enable: false,
                                    speed: 1,
                                    minimumValue: 0.1,
                                    sync: false,
                                },
                            },
                            size: {
                                value: { min: 1, max: 4.5 },
                                random: {
                                    enable: true,
                                    minimumValue: 1,
                                },
                                animation: {
                                    enable: true,
                                    speed: 4,
                                    minimumValue: 1,
                                    sync: false,
                                },
                            },

                            links: {
                                enable: true,
                                distance: 180,
                                color: "#b3b3b3",
                                opacity: 0.5,
                                width: 1.5783,
                            },
                            move: {
                                enable: true,
                                speed: 3,
                                direction: "none",
                                random: true,
                                straight: false,
                                outModes: {
                                    default: "out",
                                },
                            },
                        },
                        detectRetina: true,
                    }}
                />
            )}
        </>
    );
};

export default ParticlesComponent;
