"use client"
import { useEffect } from 'react';
import * as THREE from 'three';
import { createStarField, hexagonGroup } from '../components/Shapes';

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
        // Lights
        const pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(5, 5, 5);
        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(pointLight, ambientLight);
        // Helpers
        // const lightHelper = new THREE.PointLightHelper(pointLight)
        // const gridHelper = new THREE.GridHelper(200, 50);
        // scene.add(lightHelper, gridHelper)

        const hexGroup = hexagonGroup()
        //scene.add(hexGroup)

        const starField = createStarField();

        // Add the stars to your scene
        starField.forEach((star) => {
            scene.add(star);
        });

        // Background
        // const spaceTexture = new THREE.TextureLoader().load('');
        // scene.background = spaceTexture;

        // Astronaught Cube
        const astronaughtImage = new THREE.TextureLoader().load('/images/astronaught.png');
        const astronaughtCube = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: astronaughtImage }));
        scene.add(astronaughtCube);

        const gasTexture = new THREE.TextureLoader().load('/images/Gas_Texture.jpeg');
        const normalTexture = new THREE.TextureLoader().load('/images/Gas_Texture.jpeg');

        const gasPlanet = new THREE.Mesh(
            new THREE.SphereGeometry(3, 32, 32),
            new THREE.MeshStandardMaterial({
                map: gasTexture,
                normalMap: normalTexture,
            })
        );

        scene.add(gasPlanet);

        gasPlanet.position.z = 30;
        gasPlanet.position.setX(-10);

        astronaughtCube.position.z = -5;
        astronaughtCube.position.x = 2;

        // Scroll Animation
        function moveCamera() {
            const t = document.body.getBoundingClientRect().top;
            gasPlanet.rotation.x += 0.05;
            gasPlanet.rotation.y += 0.075;
            gasPlanet.rotation.z += 0.05;

            astronaughtCube.rotation.y += 0.01;
            astronaughtCube.rotation.z += 0.01;

            camera.position.z = t * -0.01;
            camera.position.x = t * -0.0002;
            camera.rotation.y = t * -0.0002;
        }

        document.body.onscroll = moveCamera;
        moveCamera();

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            hexGroup.rotation.x += 0.01;
            hexGroup.rotation.y += 0.005;
            hexGroup.rotation.z += 0.01;

            gasPlanet.rotation.x += 0.005;

            starField.forEach((star) => {
                const { pulsation } = star.userData;

                // Update the pulsation effect
                pulsation.phaseOffset += 0.01; // Adjust the phase offset increment as needed
                const scale = 1 + Math.sin(pulsation.phaseOffset * pulsation.frequency) * pulsation.amplitude;
                star.scale.set(scale, scale, scale);
            });

            renderer.render(scene, camera);
        }
        
        animate();
    },[])

    return <canvas id="bg"></canvas>
}