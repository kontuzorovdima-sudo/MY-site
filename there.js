let scene, camera, renderer, mesh;

function init() {
    scene = new THREE.Scene();
    // Убираем туман - он может скрывать объект на мобильных
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio); // ВАЖНО для мобильных
    renderer.setSize(window.innerWidth, window.innerHeight); // Убираем множитель 0.25
    const container = document.getElementById('canvas-container');
    if (container) container.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1, 0);
    
    // Используем самый простой материал
    const material = new THREE.MeshBasicMaterial({ 
        color: 0xff0000,
        wireframe: true
    });
    
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}

init();