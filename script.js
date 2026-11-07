/**
 * NEXA IOT — INTERACTIVE HARDWARE ENGINE (VANILLA JAVASCRIPT)
 * 3D Tilt Physics, Real-Time Sensor Simulators, Waveform Canvas, & Relay Actuators
 */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {
        initScrollProgress();
        initScrollReveal();
        initMagneticElements();
        init3DTilt();
        initHeroHardwareBurst();
        initLiveTelemetrySim();
        initVibrationWaveform();
        initRelayToggle();
        initMobileDrawer();
    });

    /* --------------------------------------------------------------------------
       1. Scroll Progress Bar
       -------------------------------------------------------------------------- */
    function initScrollProgress() {
        const bar = document.getElementById("scrollProgress");
        if (!bar) return;

        window.addEventListener("scroll", () => {
            const top = window.scrollY || document.documentElement.scrollTop;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const pct = total > 0 ? (top / total) * 100 : 0;
            bar.style.width = `${pct}%`;
        }, { passive: true });
    }

    /* --------------------------------------------------------------------------
       2. IntersectionObserver: Reveal on Scroll
       -------------------------------------------------------------------------- */
    function initScrollReveal() {
        const reveals = document.querySelectorAll(".reveal-on-scroll");
        if (!reveals.length) return;

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px"
        });

        reveals.forEach(el => observer.observe(el));
    }

    /* --------------------------------------------------------------------------
       3. Magnetic Hover Button Interaction
       -------------------------------------------------------------------------- */
    function initMagneticElements() {
        if (window.matchMedia("(hover: none)").matches) return;

        const magnets = document.querySelectorAll(".magnetic-element");

        magnets.forEach(el => {
            el.addEventListener("mousemove", (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px) scale(1.03)`;
            });

            el.addEventListener("mouseleave", () => {
                el.style.transform = "translate(0px, 0px) scale(1)";
                el.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
            });

            el.addEventListener("mouseenter", () => {
                el.style.transition = "none";
            });
        });
    }

    /* --------------------------------------------------------------------------
       4. Pure 3D Tilt Effect on Hardware Chassis & Cards
       -------------------------------------------------------------------------- */
    function init3DTilt() {
        if (window.matchMedia("(hover: none)").matches) return;

        const cards = document.querySelectorAll(".tilt-element");

        cards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
                const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

                // Limit tilt to 6.5 degrees for subtle Apple-grade elegance
                const rotX = -y * 6.5;
                const rotY = x * 6.5;

                card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(4px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
                card.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
            });

            card.addEventListener("mouseenter", () => {
                card.style.transition = "transform 0.1s ease-out";
            });
        });
    }

    /* --------------------------------------------------------------------------
       5. Hero Hardware Burst Button (Interactive Ping Simulation)
       -------------------------------------------------------------------------- */
    function initHeroHardwareBurst() {
        const burstBtn = document.getElementById("triggerPingBurst");
        const countEl = document.getElementById("hudPacketsCount");
        const pingStatus = document.getElementById("hudPingStatus");

        if (!burstBtn || !countEl) return;

        let total = 14820;

        burstBtn.addEventListener("click", () => {
            total += Math.floor(Math.random() * 25) + 15;
            countEl.textContent = total.toLocaleString("id-ID");

            const ping = (Math.random() * 0.08 + 0.12).toFixed(2);
            pingStatus.textContent = `${ping}ms • BURST TERKIRIM!`;
            pingStatus.style.color = "#00FF87";

            burstBtn.textContent = "Mengirim...";
            burstBtn.style.background = "#00FF87";
            burstBtn.style.color = "#000";

            setTimeout(() => {
                burstBtn.textContent = "Kirim Sinyal Telemetri";
                burstBtn.style.background = "";
                burstBtn.style.color = "";
                pingStatus.textContent = `${ping}ms • AKTIF`;
            }, 700);
        });
    }

    /* --------------------------------------------------------------------------
       6. Live Telemetry Sensor Simulator (DHT22 Temp & Humidity Fluctuation)
       -------------------------------------------------------------------------- */
    function initLiveTelemetrySim() {
        const tempEl = document.getElementById("liveTempVal");
        const humidEl = document.getElementById("liveHumidVal");
        const tempBar = document.getElementById("tempBarFill");
        const humidBar = document.getElementById("humidBarFill");
        const clockEl = document.getElementById("consoleClock");

        if (!tempEl || !humidEl) return;

        let baseTemp = 28.4;
        let baseHumid = 64;

        function tickData() {
            // Small natural micro-fluctuations
            const deltaTemp = (Math.random() * 0.6 - 0.3);
            baseTemp = Math.min(32, Math.max(25, baseTemp + deltaTemp));

            const deltaHumid = Math.floor(Math.random() * 3 - 1);
            baseHumid = Math.min(80, Math.max(50, baseHumid + deltaHumid));

            tempEl.textContent = baseTemp.toFixed(1);
            humidEl.textContent = baseHumid;

            // Update progress bar percentages
            const tempPct = ((baseTemp - 15) / 25) * 100;
            tempBar.style.width = `${Math.min(100, Math.max(10, tempPct))}%`;
            humidBar.style.width = `${baseHumid}%`;

            // Update Jakarta WIB Clock
            if (clockEl) {
                const now = new Date();
                const formatter = new Intl.DateTimeFormat("id-ID", {
                    timeZone: "Asia/Jakarta",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false
                });
                clockEl.textContent = `${formatter.format(now)} WIB`;
            }
        }

        tickData();
        setInterval(tickData, 2000);
    }

    /* --------------------------------------------------------------------------
       7. Live Accelerometer Vibration Waveform (HTML5 Canvas)
       -------------------------------------------------------------------------- */
    function initVibrationWaveform() {
        const canvas = document.getElementById("waveformCanvas");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let step = 0;

        function renderWave() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#00FF87";

            const h = canvas.height / 2;
            const w = canvas.width;

            for (let x = 0; x < w; x++) {
                // Multi-frequency wave formula simulating mechanical motor hum
                const y = h +
                    Math.sin((x + step) * 0.05) * 12 +
                    Math.sin((x - step) * 0.12) * 6 +
                    (Math.random() * 2 - 1);

                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }

            ctx.stroke();

            // Shadow glow
            ctx.shadowColor = "#00FF87";
            ctx.shadowBlur = 8;

            step += 2;
            requestAnimationFrame(renderWave);
        }

        renderWave();
    }

    /* --------------------------------------------------------------------------
       8. Interactive Relay Actuator Toggle Switch
       -------------------------------------------------------------------------- */
    function initRelayToggle() {
        const toggleBtn = document.getElementById("relayToggleBtn");
        const bulb = document.getElementById("relayBulb");
        const statusText = document.getElementById("relayStatusText");

        if (!toggleBtn || !bulb) return;

        let isOn = false;

        toggleBtn.addEventListener("click", () => {
            isOn = !isOn;

            if (isOn) {
                toggleBtn.classList.add("on");
                bulb.classList.add("active");
                statusText.textContent = "STATUS: ON (TERTUTUP - 220V AKTIF)";
                statusText.style.color = "#00FF87";
            } else {
                toggleBtn.classList.remove("on");
                bulb.classList.remove("active");
                statusText.textContent = "STATUS: OFF (TERBUKA)";
                statusText.style.color = "";
            }
        });
    }

    /* --------------------------------------------------------------------------
       9. Mobile Navigation Drawer
       -------------------------------------------------------------------------- */
    function initMobileDrawer() {
        const trigger = document.getElementById("mobileMenuTrigger");
        const drawer = document.getElementById("mobileDrawer");
        const links = document.querySelectorAll(".drawer-link");

        if (!trigger || !drawer) return;

        function toggleDrawer() {
            const active = drawer.classList.contains("active");
            if (active) {
                drawer.classList.remove("active");
                document.body.style.overflow = "";
            } else {
                drawer.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        }

        trigger.addEventListener("click", toggleDrawer);

        links.forEach(l => {
            l.addEventListener("click", () => {
                drawer.classList.remove("active");
                document.body.style.overflow = "";
            });
        });
    }

})();