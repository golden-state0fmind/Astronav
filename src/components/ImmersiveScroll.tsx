"use client"
import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const ImmersiveScroll = () => {
    useEffect(() => {
        // Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        // Create a renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.setZ(30);
        camera.position.setX(-3);

        renderer.render(scene, camera);

        const sideLength = 1; // Adjust the size of the hexagon as needed
        const geometry = new THREE.CircleGeometry(sideLength, 6); // Use CircleGeometry with 6 segments to create a hexagon
        const material = new THREE.MeshStandardMaterial({ color: 0xFFD700 });
        const hexagon = new THREE.Mesh(geometry, material);

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

        //scene.add(hexagon);

        // Lights
        const pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(5, 5, 5);

        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(pointLight, ambientLight);

        // Helpers
        // const lightHelper = new THREE.PointLightHelper(pointLight)
        // const gridHelper = new THREE.GridHelper(200, 50);
        // scene.add(lightHelper, gridHelper)

        const controls = new OrbitControls(camera, renderer.domElement);

        function addHexagon() {
            const sideLength = 1; // Adjust the size of the hexagon as needed
            const geometry = new THREE.CircleGeometry(sideLength, 6); // Use CircleGeometry with 6 segments to create a hexagon
            const material = new THREE.MeshStandardMaterial({ color: 0xFFD700 });
            const hexagon = new THREE.Mesh(geometry, material);

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
            const fogTintMaterial = new THREE.MeshBasicMaterial({ color: 0xFFD700, fog: true }); // Adjust the fog color as needed

            // Create a material array with transparent materials for the front and back and the fog tint material for the sides
            const materials = [
                new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.2, side: THREE.FrontSide }), // Transparent front side
                new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.3, side: THREE.BackSide }), // Transparent back side
                fogTintMaterial,
            ];

            // Create a group to hold the extruded hexagons
            const hexagonGroup = new THREE.Group();

            // Define the number of hexagons and their arrangement
            const numRows = 4; // Number of rows of hexagons
            const numCols = 4; // Number of hexagons in each row
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
            //scene.add(hexagonGroup);

            const [x, y, z] = Array(3)
                .fill(0)
                .map(() => THREE.MathUtils.randFloatSpread(100));

            hexagonGroup.position.set(x, y, z);
            scene.add(hexagonGroup);
        }

        Array(200).fill(0).forEach(addHexagon);

        // Background
        const spaceTexture = new THREE.TextureLoader().load('');
        scene.background = spaceTexture;

        // Honeycomb Cube
        const honeyTexture = new THREE.TextureLoader().load('/images/Honey.png');
        const honey = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: honeyTexture }));
        scene.add(honey);

        // Bee
        const bumbleBee = new THREE.TextureLoader().load('/images/Honey.png');
        const normalTexture = new THREE.TextureLoader().load('/images/Honey.png');

        const bee = new THREE.Mesh(
            new THREE.SphereGeometry(3, 32, 32),
            new THREE.MeshStandardMaterial({
                map: bumbleBee,
                normalMap: normalTexture,
            })
        );

        scene.add(bee);

        bee.position.z = 30;
        bee.position.setX(-10);

        honey.position.z = -5;
        honey.position.x = 2;

        // Scroll Animation

        function moveCamera() {
            const t = document.body.getBoundingClientRect().top;
            bee.rotation.x += 0.05;
            bee.rotation.y += 0.075;
            bee.rotation.z += 0.05;

            honey.rotation.y += 0.01;
            honey.rotation.z += 0.01;

            camera.position.z = t * -0.01;
            camera.position.x = t * -0.0002;
            camera.rotation.y = t * -0.0002;
        }

        document.body.onscroll = moveCamera;
        moveCamera();

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            hexagon.rotation.x += 0.01;
            hexagon.rotation.y += 0.005;
            hexagon.rotation.z += 0.01;

            bee.rotation.x += 0.005;

            renderer.render(scene, camera);
        }

        animate();
    },[])

    return <canvas id="bg"></canvas>
}