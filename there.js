let scene, camera, renderer, mesh;
let mouseX = 0, mouseY = 0;

function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.1);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    const pixelRatio = 0.25;
    renderer.setSize(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio, false);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    const container = document.getElementById('canvas-container');
    if (container) container.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1, 0);
    
    // ГЛАВНОЕ ИЗМЕНЕНИЕ: MeshBasicMaterial вместо MeshPhongMaterial
    const material = new THREE.MeshBasicMaterial({ 
        color: 0xff0000,
        wireframe: true
    });
    
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Свет можно удалить, но оставим для совместимости
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 2);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    });

    // Поддержка touch для мобильных
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouseX = (e.touches[0].clientX / window.innerWidth) - 0.5;
            mouseY = (e.touches[0].clientY / window.innerHeight) - 0.5;
        }
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.005;
    mesh.rotation.y += mouseX * 0.05;
    mesh.rotation.x += mouseY * 0.05;
    renderer.render(scene, camera);
}

init();

if (window.icosahedronRotationSpeed) {
    let slowDown = setInterval(() => {
        window.icosahedronRotationSpeed *= 0.9;
        if (window.icosahedronRotationSpeed < 0.001) clearInterval(slowDown);
    }, 50);
}