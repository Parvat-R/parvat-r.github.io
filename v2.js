// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('starsBg') });

var renderColor = 0xFAC9B8;
var sphereColor = 0xDB8A74;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(renderColor, 1)
// Lighting
const ambientLight = new THREE.AmbientLight(0x555555);
scene.add(ambientLight);

// Variables for mouse and scroll interaction
let mouseX = 0, mouseY = 0;
let scrollY = 0;

// Star class
class Star {
    constructor() {
        const geometry = new THREE.SphereGeometry(0.8, 32, 32);
        this.material = new THREE.MeshBasicMaterial({ color: sphereColor });
        this.mesh = new THREE.Mesh(geometry, this.material);

        this.reset();
        scene.add(this.mesh);
    }

    reset() {
        this.mesh.position.x = Number(Math.random() - 0.5) * Math.random() * window.innerWidth;
        this.mesh.position.y = Number(Math.random() - 0.5) * Math.random() * window.innerHeight;
        this.mesh.position.z = Math.random() * 300;

        this.velocityX = (Math.random() - 0.5) * 0.05;
        this.velocityY = (Math.random() - 0.5) * 0.05;
        this.velocityZ = (Math.random() - 0.5) * 0.1;
    }

    update() {
        this.mesh.position.x += this.velocityX + (mouseX * 0.0005);
        this.mesh.position.y += this.velocityY + (mouseY * 0.0005);
        this.mesh.position.z += this.velocityZ * ( Math.abs(scrollY) * Math.random() );

        if (Math.abs(this.mesh.position.x) > window.innerWidth/4 || Math.abs(this.mesh.position.y) > window.innerHeight/4 || this.mesh.position.z > 300 || this.mesh.position.z < -100) {
            this.reset();
        }

        // Update color based on scroll position
        // const colorValue = (Math.abs(document.body.getBoundingClientRect().top * 0.05) % 255) / 255;
        // console.log(colorValue);
        // this.material.color.setHSL(spher, 1.0, 0.5);
    }
}

// Generate stars
const stars = [];
for (let i = 0; i < 300; i++) {
    stars.push(new Star());
}

// Camera positioning
camera.position.z = 300;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update stars
    stars.forEach(star => star.update());
    x = Math.pow(Math.abs(scrollY + 0.001), 1.05) * 0.05;
    if (scrollY > 0) {
        scrollY -= x;
    } else if ( scrollY < 0) {
        scrollY += x;
    } 

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Handle mouse movement
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2);
    mouseY = -(event.clientY - window.innerHeight / 2);
});

// Handle scroll movement
document.addEventListener('wheel', (event) => {
    scrollY += event.deltaY * 0.5;
});
