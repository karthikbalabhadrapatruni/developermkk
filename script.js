document.addEventListener('DOMContentLoaded', () => {
    // 1. Hero Section - Three.js Particle Background
    const heroCanvas = document.getElementById('hero-canvas');
    let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;

    if (heroCanvas) {
        initThreeJS();
        animateThreeJS();

        window.addEventListener('resize', onWindowResize, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
    }

    function initThreeJS() {
        // Scene
        scene = new THREE.Scene();

        // Camera
        camera = new THREE.PerspectiveCamera(75, heroCanvas.clientWidth / heroCanvas.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(heroCanvas.clientWidth, heroCanvas.clientHeight);

        // Particles
        const particleCount = 2000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3); // For colored particles
        const color = new THREE.Color();

        for (let i = 0; i < particleCount; i++) {
            // Position particles randomly in a cube
            positions[i * 3 + 0] = (Math.random() * 2 - 1) * 10; // x
            positions[i * 3 + 1] = (Math.random() * 2 - 1) * 10; // y
            positions[i * 3 + 2] = (Math.random() * 2 - 1) * 10; // z

            // Random color
            color.setHSL(Math.random(), 0.7, 0.5); // Hue, Saturation, Lightness
            colors[i * 3 + 0] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.08,
            vertexColors: true, // Use colors from geometry
            transparent: true,
            opacity: 0.8
        });

        particles = new THREE.Points(geometry, material);
        scene.add(particles);
    }

    function animateThreeJS() {
        requestAnimationFrame(animateThreeJS);

        // Subtle rotation
        if (particles) {
            particles.rotation.x += 0.0005;
            particles.rotation.y += 0.0007;

            // Make particles slowly follow mouse
            particles.rotation.x += (mouseY * 0.00005 - particles.rotation.x) * 0.05;
            particles.rotation.y += (mouseX * 0.00005 - particles.rotation.y) * 0.05;
        }

        renderer.render(scene, camera);
    }

    function onWindowResize() {
        camera.aspect = heroCanvas.clientWidth / heroCanvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(heroCanvas.clientWidth, heroCanvas.clientHeight);
    }

    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - window.innerWidth / 2);
        mouseY = (event.clientY - window.innerHeight / 2);
    }


    // 2. Skills Section - D3.js Force-Directed Graph
    const skillsData = {
        nodes: [
            { id: "FrontEnd", group: 1, type: "category", size: 35, color: "#007BFF" },
            { id: "BackEnd", group: 2, type: "category", size: 35, color: "#FFA500" }, // Orange
            { id: "Database", group: 3, type: "category", size: 35, color: "#28A745" }, // Green
            { id: "Tools", group: 4, type: "category", size: 35, color: "#FFC107" }, // Yellow
            { id: "HTML", group: 1, type: "skill", size: 18, color: "#66b3ff" },
            { id: "CSS", group: 1, type: "skill", size: 18, color: "#66b3ff" },
            { id: "Javascript", group: 1, type: "skill", size: 18, color: "#66b3ff" },
            { id: "Typescript", group: 1, type: "skill", size: 18, color: "#66b3ff" },
            { id: "Angular", group: 1, type: "skill", size: 18, color: "#66b3ff" },
            { id: "ReactJs", group: 1, type: "skill", size: 18, color: "#66b3ff" },
            { id: "NextJs", group: 1, type: "skill", size: 18, color: "#66b3ff" },
            { id: "SCSS", group: 1, type: "skill", size: 18, color: "#66b3ff" },
            { id: "NodeJs", group: 2, type: "skill", size: 18, color: "#ffcc80" },
            { id: "ExpressJs", group: 2, type: "skill", size: 18, color: "#ffcc80" },
            { id: "NestJs", group: 2, type: "skill", size: 18, color: "#ffcc80" },
            { id: "Python", group: 2, type: "skill", size: 18, color: "#ffcc80" },
            { id: "MongoDb", group: 3, type: "skill", size: 18, color: "#80ff80" },
            { id: "MySQL", group: 3, type: "skill", size: 18, color: "#80ff80" },
            { id: "Git", group: 4, type: "skill", size: 18, color: "#ffe066" },
            { id: "Jira", group: 4, type: "skill", size: 18, color: "#ffe066" },
            { id: "Instana", group: 4, type: "skill", size: 18, color: "#ffe066" },
            { id: "MongoDb Atlas", group: 4, type: "skill", size: 18, color: "#ffe066" },
            { id: "AWS S3", group: 4, type: "skill", size: 18, color: "#ffe066" },
            { id: "Unity 3D", group: 4, type: "skill", size: 18, color: "#ffe066" },
            { id: "Strapi", group: 4, type: "skill", size: 18, color: "#ffe066" },
            { id: "Contentful", group: 4, type: "skill", size: 18, color: "#ffe066" }
        ],
        links: [
            { source: "FrontEnd", target: "HTML" },
            { source: "FrontEnd", target: "CSS" },
            { source: "FrontEnd", target: "Javascript" },
            { source: "FrontEnd", target: "Typescript" },
            { source: "FrontEnd", target: "Angular" },
            { source: "FrontEnd", target: "ReactJs" },
            { source: "FrontEnd", target: "NextJs" },
            { source: "FrontEnd", target: "SCSS" },
            { source: "BackEnd", target: "NodeJs" },
            { source: "BackEnd", target: "ExpressJs" },
            { source: "BackEnd", target: "NestJs" },
            { source: "BackEnd", target: "Python" },
            { source: "Database", target: "MongoDb" },
            { source: "Database", target: "MySQL" },
            { source: "Tools", target: "Git" },
            { source: "Tools", target: "Jira" },
            { source: "Tools", target: "Instana" },
            { source: "Tools", target: "MongoDb Atlas" },
            { source: "Tools", target: "AWS S3" },
            { source: "Tools", target: "Unity 3D" },
            { source: "Tools", target: "Strapi" },
            { source: "Tools", target: "Contentful" }
        ]
    }; // All skills listed here are from resume.

    const skillVizContainer = d3.select("#d3-skills-visualization");
    if (!skillVizContainer.empty()) {
        const parentWidth = skillVizContainer.node().clientWidth;
        const parentHeight = skillVizContainer.node().clientHeight;

        const svg = skillVizContainer.append("svg")
            .attr("viewBox", `0 0 ${parentWidth} ${parentHeight}`); // Use viewBox for responsiveness

        const simulation = d3.forceSimulation(skillsData.nodes)
            .force("link", d3.forceLink(skillsData.links).id(d => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-500))
            .force("center", d3.forceCenter(parentWidth / 2, parentHeight / 2))
            .force("collide", d3.forceCollide().radius(d => d.size + 5)); // Add padding

        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.4)
            .selectAll("line")
            .data(skillsData.links)
            .join("line")
            .attr("stroke-width", 1);

        const node = svg.append("g")
            .selectAll("circle")
            .data(skillsData.nodes)
            .join("circle")
            .attr("r", d => d.size)
            .attr("fill", d => d.color)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        const label = svg.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(skillsData.nodes)
            .enter().append("text")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .text(d => d.id)
            .style("font-size", d => (d.type === "category" ? "14px" : "10px"))
            .attr("pointer-events", "none");

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            label
                .attr("x", d => d.x)
                .attr("y", d => d.y);
        });

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        // Handle responsiveness for D3
        window.addEventListener('resize', () => {
            const newWidth = skillVizContainer.node().clientWidth;
            const newHeight = skillVizContainer.node().clientHeight;
            svg.attr("viewBox", `0 0 ${newWidth} ${newHeight}`);
            simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2)).alpha(0.3).restart();
        });

         // GSAP integration for the skills visualization
        ScrollTrigger.create({
            trigger: "#skills",
            start: "top center", // When the top of the section hits the center of the viewport
            onEnter: () => {
                // Animate nodes on enter
                gsap.from(node.nodes(), {
                    duration: 1.5,
                    scale: 0,
                    ease: "elastic.out(1, 0.5)",
                    stagger: 0.05,
                    opacity: 0,
                    onComplete: () => simulation.alphaTarget(0).stop() // Stop simulation after animation
                });
                // Animate links on enter
                gsap.from(link.nodes(), {
                    duration: 1.5,
                    drawSVG: "0%", // Requires GSAP DrawSVGPlugin if you want line drawing animation
                    stagger: 0.01,
                    ease: "power2.out",
                    opacity: 0
                });
                 gsap.from(label.nodes(), {
                    duration: 1.5,
                    opacity: 0,
                    y: 20,
                    ease: "power2.out",
                    stagger: 0.05
                });
                simulation.alphaTarget(0.3).restart(); // Restart simulation for initial arrangement
            },
            once: true // Play animation only once
        });
    }

    // 3. GSAP ScrollTrigger for section animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate individual job/education/project cards on scroll
    gsap.utils.toArray('.job-card, .project-card, .education-card').forEach(card => {
        gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%", // Animation starts when 85% of card is in view
                    toggleActions: "play none none none", // Play once, no reverse/reset
                    // markers: true // Uncomment for debugging during development
                }
            }
        );
    });

    // Fade-in animation for sections (About, Skills parent container, Contact)
    gsap.utils.toArray('.gsap-fade-in').forEach(section => {
        gsap.fromTo(section,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none",
                    // markers: true
                }
            }
        );
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            gsap.to(window, { duration: 1, scrollTo: targetId, ease: "power2.inOut" });
        });
    });

    // Navbar background change on scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Typing effect for tagline (enhanced with GSAP if desired, but simple example here)
    const taglineElement = document.querySelector('.tagline');
    if (taglineElement) {
        const text = "Full Stack Developer | Crafting seamless web experiences with MEAN/MERN";
        let index = 0;
        gsap.to(taglineElement, { opacity: 1, duration: 1, delay: 0.5 }); // Fade in tagline container first

        function typeWriter() {
            if (index < text.length) {
                taglineElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 40); // Adjust typing speed
            }
        }
        // Start typing after initial hero content appears and tagline fades in
        setTimeout(() => {
            taglineElement.textContent = ''; // Clear initial text to start typing
            typeWriter();
        }, 1500); // Start after hero content and tagline container animate
    }
});
