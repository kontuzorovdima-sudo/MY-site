let scene, camera, renderer, mesh;
let mouseX = 0, mouseY = 0;


function init() {
    // 1. Создаем сцену
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.1);

    // 2. Камера
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    // 3. Рендерер с низким разрешением для пиксель-арта
    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    const pixelRatio = 0.25; // Коэффициент пикселизации (чем меньше, тем крупнее пиксели)
    renderer.setSize(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio, false);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    const container = document.getElementById('canvas-container');
    if (container) container.appendChild(renderer.domElement);

    // 4. Геометрия (абстрактная готическая форма)
    const geometry = new THREE.IcosahedronGeometry(1, 0); // Лоу-поли сфера
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x8b0000, 
        wireframe: true,
        flatShading: true 
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 5. Свет
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 2);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x202020));

    // Слушатель мыши
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    });

    animate();
}
function animate() {
    requestAnimationFrame(animate);

    // Вращение и реакция на мышь
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.005;
    
    // Плавное следование за курсором
    mesh.rotation.y += mouseX * 0.05
    mesh.rotation.x += mouseY * 0.05;

    renderer.render(scene, camera);
}
init();

if (window.icosahedronRotationSpeed) {
    // Плавно уменьшаем скорость вращения до нуля
    let slowDown = setInterval(() => {
        window.icosahedronRotationSpeed *= 0.9;
        if (window.icosahedronRotationSpeed < 0.001) clearInterval(slowDown);
    }, 50);
}



