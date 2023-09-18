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

        const controls = new OrbitControls(camera, renderer.domElement);
        //controls.update() must be called after any manual changes to the camera's transform
        camera.position.set(0, 4, 8);
        controls.update();
        // Create an animation function
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            // Rotate shape
            // hexagonGroup.rotation.z += 0.005;
            
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

    return <div id="canvas-container" />;
};