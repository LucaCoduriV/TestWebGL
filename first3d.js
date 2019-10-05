let Mouse = {
    x: 0,
    y: 0,
    click: false
}
let keyboard = {
    up: false,
    down: false,
    left: false,
    right: false,
    esc: false
}
document.addEventListener("mousedown", event => {
    Mouse.click = true;
});
document.addEventListener("mouseup", event => {
    Mouse.click = false;
});

document.addEventListener("mousemove", event => {
    Mouse.x = event.screenX - window.innerWidth / 2;
    Mouse.y = event.screenY - window.innerHeight / 2;
});
document.addEventListener("keydown", event => {
    if (event.key === "w") {
        keyboard.up = true;
    }
    if (event.key === "s") {
        keyboard.down = true;
    }
    if (event.key === "a") {
        keyboard.left = true;
    }
    if (event.key === "d") {
        keyboard.right = true;
    }
    if (event.key === "esc") {
        keyboard.right = true;
    }
});
document.addEventListener("keyup", event => {
    if (event.key === "w") {
        keyboard.up = false;
    }
    if (event.key === "s") {
        keyboard.down = false;
    }
    if (event.key === "a") {
        keyboard.left = false;
    }
    if (event.key === "d") {
        keyboard.right = false;
    }
    if (event.key === "esc") {
        keyboard.right = false;
    }
});


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.PointerLockControls(camera);
controls.lock();

let geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(geometry, material);


var geometry2 = new THREE.PlaneGeometry( 100, 100, 0,);
var material = new THREE.MeshToonMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry2, material );
plane.rotation.x = 90 * Math.PI/180;




var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
//var light = new THREE.AmbientLight( 0x404040 ); // soft white light


cube.position.y = 1;

scene.add( plane );
//scene.add( light );
scene.add( directionalLight );
scene.add(cube);



camera.position.z = 10;
camera.position.y = 1;


function update() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    if (keyboard.up === true) {
        controls.moveForward(0.1);
    }
    if (keyboard.down === true) {
        controls.moveForward(-0.1);
    }
    if (keyboard.left === true) {
        controls.moveRight(-0.1);
    }
    if (keyboard.right === true) {
        controls.moveRight(0.1);
    }
    if (keyboard.esc === true) {
        controls.unlock();
    }
    if(Mouse.click === true){
        controls.lock();
    }
    //camera.lookAt(Mouse.x * 0.2,-Mouse.y * 0.2,0);
}


function animate() {
    update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();