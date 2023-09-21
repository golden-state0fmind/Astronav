
"use client"
import { useEffect } from 'react';
import * as THREE from 'three';

export const SpaceLake = () => {
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('canvas-container')?.appendChild(renderer.domElement);

        const geometry = new THREE.PlaneGeometry(2, 2); // Use a plane geometry for a static image

        // Load your static image as a texture
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('/images/Space_Background.png');
        const material = new THREE.MeshBasicMaterial({ map: texture });

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        camera.position.z = 5;

        // Handle scroll events to zoom in/out
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const zoomFactor = 1 + scrollY * 0.001; // Adjust the factor as needed
            camera.position.z = 5 / zoomFactor;
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-1]">
            <div id="canvas-container" className="w-full h-full"></div>
        </div>
    );
};