import {
  ImageUtils,
  Math as ThreeMath,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Raycaster,
  Scene,
  SphereBufferGeometry,
  Sprite,
  SpriteMaterial,
  Texture,
  TextureLoader,
  Vector3,
  WebGLRenderer
} from 'three';

var camera, scene, renderer;

var isUserInteracting = false,
  onMouseDownMouseX = 0, onMouseDownMouseY = 0,
  lon = 0, onMouseDownLon = 0,
  lat = 0, onMouseDownLat = 0,
  phi = 0, theta = 0;

const panoramas = [
  'assets/images/entrance.jpg',
  'assets/images/kitchen.jpg',
  'assets/images/bedroom.jpg',
  'assets/images/bathroom.jpg',
];
let panoramaIndex = 0;

initCube();
init();
animate();

function initCube() {

  camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  // camera.position.z = 400;

  scene = new Scene();

  var texture = new TextureLoader().load( 'assets/images/crate.gif' );

  const crateMaterial = new SpriteMaterial({ map: texture });
  const crateSprite = new Sprite(crateMaterial);
  crateSprite.position.set(175, 0, -300);
  crateSprite.scale.set(50, 50, 1.0);
  crateSprite.name = 'crate-sprite';
  scene.add(crateSprite);


  // add some text
  const textSprite = makeTextSprite(' Por aquí se va ');
  textSprite.position.set(200, 15, -300);
  textSprite.name = 'text-sprite';
  scene.add(textSprite);
}

function init() {

  var container, mesh;

  container = document.getElementById('container');

  // camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
  camera.target = new Vector3(0, 0, 0);

  // scene = new Scene();

  var geometry = new SphereBufferGeometry(500, 60, 40);
  // var geometry = new SphereBufferGeometry(5000, 600, 400);
  // invert the geometry on the x-axis so that all of the faces point inward
  geometry.scale(-1, 1, 1);

  var material = new MeshBasicMaterial({
    map: new TextureLoader().load(panoramas[panoramaIndex])
  });

  mesh = new Mesh(geometry, material);
  mesh.name = 'panorama';

  scene.add(mesh);

  renderer = new WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.addEventListener('mousedown', onPointerStart, false);
  document.addEventListener('mousemove', onPointerMove, false);
  document.addEventListener('mouseup', onPointerUp, false);

  document.addEventListener('wheel', onDocumentMouseWheel, false);

  document.addEventListener('touchstart', onPointerStart, false);
  document.addEventListener('touchmove', onPointerMove, false);
  document.addEventListener('touchend', onPointerUp, false);

  //

  document.addEventListener('dragover', function (event) {

    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';

  }, false);

  document.addEventListener('dragenter', function () {

    document.body.style.opacity = 0.5;

  }, false);

  document.addEventListener('dragleave', function () {

    document.body.style.opacity = 1;

  }, false);

  document.addEventListener('drop', function (event) {

    event.preventDefault();

    var reader = new FileReader();
    reader.addEventListener('load', function (event) {

      material.map.image.src = event.target.result;
      material.map.needsUpdate = true;

    }, false);
    reader.readAsDataURL(event.dataTransfer.files[0]);

    document.body.style.opacity = 1;

  }, false);

  document.onkeyup = function(event){
    panoramaIndex = (panoramaIndex + 1) % panoramas.length
    material.map = ImageUtils.loadTexture(panoramas[panoramaIndex])
  }

  //

  window.addEventListener('resize', onWindowResize, false);

}

function makeTextSprite( message, parameters ) {
  if ( parameters === undefined ) parameters = {};

  var fontface = parameters.hasOwnProperty("fontface") ?
    parameters["fontface"] : "Arial";

  var fontsize = parameters.hasOwnProperty("fontsize") ?
    parameters["fontsize"] : 18;

  var borderThickness = parameters.hasOwnProperty("borderThickness") ?
    parameters["borderThickness"] : 4;

  var borderColor = parameters.hasOwnProperty("borderColor") ?
    parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };

  var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
    parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.font = "Bold " + fontsize + "px " + fontface;

  // get size data (height depends only on font size)
  var metrics = context.measureText( message );
  var textWidth = metrics.width;

  // background color
  context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
    + backgroundColor.b + "," + backgroundColor.a + ")";
  // border color
  context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
    + borderColor.b + "," + borderColor.a + ")";

  context.lineWidth = borderThickness;
  roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
  // 1.4 is extra height factor for text below baseline: g,j,p,q.

  // text color
  context.fillStyle = "rgba(0, 0, 0, 1.0)";

  context.fillText( message, borderThickness, fontsize + borderThickness);

  // canvas contents will be used for a texture
  var texture = new Texture(canvas)
  texture.needsUpdate = true;

  var spriteMaterial = new SpriteMaterial(
    { map: texture, useScreenCoordinates: false } );
  var sprite = new Sprite( spriteMaterial );
  sprite.scale.set(100,50,1.0);
  return sprite;
}

// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.lineTo(x+w-r, y);
  ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r);
  ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h);
  ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r);
  ctx.quadraticCurveTo(x, y, x+r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function onPointerStart(event) {

  isUserInteracting = true;

  var clientX = event.clientX || event.touches[0].clientX;
  var clientY = event.clientY || event.touches[0].clientY;

  onMouseDownMouseX = clientX;
  onMouseDownMouseY = clientY;

  onMouseDownLon = lon;
  onMouseDownLat = lat;

}

function onPointerMove(event) {
  if (isUserInteracting === true) {
    var clientX = event.clientX || event.touches[0].clientX;
    var clientY = event.clientY || event.touches[0].clientY;

    lon = (onMouseDownMouseX - clientX) * 0.1 + onMouseDownLon;
    lat = (clientY - onMouseDownMouseY) * 0.1 + onMouseDownLat;
  }

  // detect intersections
  const mouseX = ( event.clientX / window.innerWidth ) * 2 - 1;
  const mouseY = -( event.clientY / window.innerHeight ) * 2 + 1;

  var vector = new Vector3( mouseX, mouseY, 1 );
  vector.unproject(camera );
  var ray = new Raycaster( camera.position, vector.sub( camera.position ).normalize() );
  // create an array containing all objects in the scene with which the ray intersects
  var intersects = ray.intersectObjects( scene.children );

  for(var i = 0; i < intersects.length; i++) {
    if (intersects[i].object.name === 'crate-sprite') {
      console.log('Detected');
    }
  }
}

function onPointerUp() {

  isUserInteracting = false;

}

function onDocumentMouseWheel(event) {

  var fov = camera.fov + event.deltaY * 0.05;

  camera.fov = ThreeMath.clamp(fov, 10, 75);

  camera.updateProjectionMatrix();

}

function animate() {

  requestAnimationFrame(animate);
  update();

}

function update() {

  if (isUserInteracting === false) {

    lon += 0.1;

  }

  lat = Math.max(-85, Math.min(85, lat));
  phi = ThreeMath.degToRad(90 - lat);
  theta = ThreeMath.degToRad(lon);

  camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
  camera.target.y = 500 * Math.cos(phi);
  camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);

  camera.lookAt(camera.target);

  /*
  // distortion
  camera.position.copy( camera.target ).negate();
  */

  renderer.render(scene, camera);

}

