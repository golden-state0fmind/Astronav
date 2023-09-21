import * as THREE from 'three';

export const hexagonGroup = () => {
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
    
    return hexagonGroup
}

export const createStarField = () => {
    const starCount = 500; // Number of stars
    const stars = [];
    
    for (let i = 0; i < starCount; i++) {
        // Generate a random color for the star
        const hue = Math.random();
        const saturation = Math.random() * 0.5 + 0.5; // Adjust saturation for desired brightness
        const lightness = Math.random() * 0.5 + 0.5; // Adjust lightness for desired brightness
        const color = new THREE.Color().setHSL(hue, saturation, lightness);

        // Create a star-shaped geometry
        const geometry = new THREE.ShapeGeometry(createStarShape());
        const material = new THREE.MeshStandardMaterial({ color });
        const star = new THREE.Mesh(geometry, material);

        // Randomize star position within a certain range
        const x = THREE.MathUtils.randFloatSpread(100);
        const y = THREE.MathUtils.randFloatSpread(100);
        const z = THREE.MathUtils.randFloatSpread(100);

        star.position.set(x, y, z);

        // Add pulsation effect to each star using userData
        star.userData = {
            pulsation: {
                phaseOffset: Math.random() * Math.PI * 5, // Random phase offset for variation
                frequency: Math.random() * 1 + 2.3, // Random frequency (adjust as needed)
                amplitude: Math.random() * 0.6 + 1.2, // Random amplitude (adjust as needed)
            },
        };

        stars.push(star);
    }

    return stars;
};

const createStarShape = () => {
    // Create a star shape using a Path
    const starShape = new THREE.Shape();

    // Adjust the inner and outer radii to tighten the star
    const innerRadius = 0.01; // Adjust as needed
    const outerRadius = 0.1; // Adjust as needed

    starShape.moveTo(0, outerRadius);

    for (let i = 0; i < 10; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / 5;
        starShape.lineTo(Math.sin(angle) * radius, -Math.cos(angle) * radius);
    }

    starShape.closePath();

    return starShape;
};

