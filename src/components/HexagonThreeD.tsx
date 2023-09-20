"use client"
import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const HexagonThreeD = () => {
    useEffect(() => {
        // Create a scene
        const scene = new THREE.Scene();
        // Create a camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        // Create a renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Define the hexagon's shape (vertices)
        const hexagonShape = new THREE.Shape();
        hexagonShape.moveTo(1, 0);
        for (let i = 1; i <= 6; i++) {
            const angle = (Math.PI / 3) * i;
            hexagonShape.lineTo(Math.cos(angle), Math.sin(angle));
        }

        // Define the settings for extrusion
        const extrudeSettings = {
            amount: 1, // Extrusion depth (adjust as needed)
            bevelEnabled: false, // Disable bevel for a flat extrusion
        };
        // Create a geometry for the extruded hexagon
        const hexagonGeometry = new THREE.ExtrudeGeometry(hexagonShape, extrudeSettings);
        // Create a fog tint material for the sides
        const fogTintMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, fog: true }); // Adjust the fog color as needed
        
        // Create a material array with transparent materials for the front and back and the fog tint material for the sides
        const materials = [
            new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.2, side: THREE.FrontSide }), // Transparent front side
            new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.1, side: THREE.BackSide }), // Transparent back side
            fogTintMaterial,
        ];

        // Create a group to hold the extruded hexagons
        const hexagonGroup = new THREE.Group();

        // Define the number of hexagons and their arrangement
        const numRows = 2; // Number of rows of hexagons
        const numCols = 2; // Number of hexagons in each row
        const hexagonSpacing = 1.2; // Spacing between hexagons
        const pulsationVariables: { hexagon: THREE.Mesh<THREE.ExtrudeGeometry, THREE.MeshBasicMaterial[], THREE.Object3DEventMap>; pulsation: number; }[] = [];

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const hexagon = new THREE.Mesh(hexagonGeometry, materials);
                hexagon.position.x = col * (hexagonSpacing * 1.5);
                hexagon.position.y = row * (hexagonSpacing * 1.73);
                if (col % 2 !== 0) {
                    hexagon.position.y += hexagonSpacing * 0.865;
                }
                hexagonGroup.add(hexagon);
                // Create a pulsation variable for each hexagon and initialize it
                pulsationVariables.push({
                    hexagon,
                    pulsation: 0,
                });
            }
        }
        // Add the hexagon group to the scene
        scene.add(hexagonGroup);

        // Create a warm ambient light
        const pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(5, 5, 5);
        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(pointLight, ambientLight);

        // Helpers
        // const lightHelper = new THREE.PointLightHelper(pointLight)
        // const gridHelper = new THREE.GridHelper(200, 50);
        // scene.add(lightHelper, gridHelper)

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        camera.position.set(0, 4, 8);
        controls.update();

        const honeyDripGroup = new THREE.Group();
        const honeyDripSpacing = 30;

        function addHoneyDrip() {
            // Create a group to hold the teardrops
            const teardropGroup = new THREE.Group();

            // Define parameters for the teardrop
            const teardropRadius = 0.05; // Radius of the teardrop
            const teardropHeight = 0.2;  // Height of the teardrop
            const teardropRadialSegments = 8; // Segments for the circular base

            // Create a spherical top
            const sphereGeometry = new THREE.SphereGeometry(teardropRadius, teardropRadialSegments, 6);
            const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffaa00 });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

            // Create a conical bottom
            const coneGeometry = new THREE.ConeGeometry(teardropRadius, teardropHeight, teardropRadialSegments);
            const coneMaterial = new THREE.MeshStandardMaterial({ color: 0xffaa00 });
            const cone = new THREE.Mesh(coneGeometry, coneMaterial);

            // Position the cone geometry so that it connects to the spherical top
            cone.position.y = -teardropHeight / 2;

            const material = new THREE.MeshStandardMaterial({ color: 0xffaa00 }); // Honey drip color
            const drip = new THREE.Mesh(coneGeometry, material);

            const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(honeyDripSpacing)); // Adjust the spread range as needed
            drip.position.set(x, y, z);
            honeyDripGroup.add(drip);
        }

        Array(500).fill(0).forEach(addHoneyDrip);
        scene.add(honeyDripGroup);


        // Create an animation function
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            // Rotate shape
            honeyDripGroup.rotation.x += 0.001;
            honeyDripGroup.rotation.y += 0.002;
            honeyDripGroup.rotation.z += 0.001;

            // Update the pulsation variables and apply the pulsation animation to each hexagon
            pulsationVariables.forEach((pulsationVar) => {
                const { hexagon } = pulsationVar;
                // Update the pulsation variable with a sine wave for pulsation effect
                pulsationVar.pulsation = Math.sin(performance.now() * 0.002) * 0.1 + 1; // Adjust the frequency and amplitude as needed
                // Apply pulsation scale to the individual hexagon
                hexagon.scale.set(pulsationVar.pulsation, pulsationVar.pulsation, 1);
            });

            renderer.render(scene, camera);
        };
        // Call the animation function
        animate();

        // Handle window resize
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    return <canvas id="bg"></canvas>;
};