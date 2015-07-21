'use strict';

// Famous dependencies
var famous = require('famous');

var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');
var Camera = famous.components.Camera;


var DOMElement = famous.domRenderables.DOMElement;
var Gravity3D = famous.physics.Gravity3D;
var MountPoint = famous.components.MountPoint;
var PhysicsEngine = famous.physics.PhysicsEngine;
var Position = famous.components.Position;
var Size = famous.components.Size;
var Sphere = famous.physics.Sphere;
var Vec3 = famous.math.Vec3;
// var Mesh = require('famous/webgl-renderables/Mesh')

// Boilerplate code to make your life easier
FamousEngine.init();
var scene = FamousEngine.createScene();
// Initialize with a scene; then, add a 'node' to the scene root


var box = scene.addChild();


// var mesh = new Mesh(node);
// mesh.setGeometry('Sphere');


new DOMElement(box, {
  tagName: 'div'
}).setAttribute('class', 'red');

box.setSizeMode('absolute', 'absolute', 'absolute')
  .setAbsoluteSize(100, 100)
  .setAlign(0.5, 0.5)
  .setMountPoint(0.5, 0.5);

var spinnerBox = box.addComponent({
  onMount: function(time) {
    console.log('mount time ' + time);
  },
  onUpdate: function(time) {
    // console.log('time ' + time);
    box.setRotation(0, time / 1000, 0);
    // box.setRotation(0, time / 1000, time / 2000);
    box.requestUpdateOnNextTick(spinnerBox);
  }
});


var logo = box.addChild();

// Create an [image] DOM element providing the logo 'node' with the 'src' path
new DOMElement(logo, {
  tagName: 'img'
})
  .setAttribute('src', './images/berzerk2.png');

// // Chainable API
logo
// Set size mode to 'absolute' to use absolute pixel values: (width 250px, height 250px)
.setSizeMode('absolute', 'absolute', 'absolute')
  .setAbsoluteSize(250, 250)
// Center the 'node' to the parent (the screen, in this instance)
.setAlign(2, 0)
// Set the translational origin to the center of the 'node'
.setMountPoint(0.5, 0.5)
// Set the rotational origin to the center of the 'node'
.setOrigin(0.5, 0.5);

// // Add a spinner component to the logo 'node' that is called, every frame
var spinner = logo.addComponent({
  onMount: function(time) {
    console.log('mount time ' + time);
  },
  onUpdate: function(time) {
    // console.log('time ' + time);
    logo.setRotation(0, time / 1000, time / 2000);
    logo.requestUpdateOnNextTick(spinner);
  }
});

// var logoChild = logo.addChild();


// child to scene

var planets = [];
for (var i = 0; i < 9; i++) {
  var node = box.addChild();
  var size = new Size(node).setMode(1, 1);
  var position = new Position(node);
  if (i !== 0) {
    node.id = i;
    createPlanets.call(this, node, size, position, i);
  }
}


function createPlanets(node, size, position, i) {
  var planetRadius = i * 10
  size.setAbsolute(planetRadius, planetRadius);
  console.log(node, size, position, i);
  console.log('i ' + i);
  node.setAlign(i / 2, i / 5)
  var radius = 200;
  var x = Math.floor(Math.random() * radius * 2) - radius;
  var y = (Math.round(Math.random()) * 2 - 1) * Math.sqrt(radius * radius - x * x);
  var color = 'rgb(' + Math.abs(x) + ',' + Math.abs(Math.round(y)) + ',' + (255 - node.id) + ')';


  var el = new DOMElement(node, {
    properties: {
      'background-color': color,
      'border-radius': '50%'
    }
  });
  var satellite = new Sphere({
    radius: 20,
    mass: 5,
    // position: new Vec3(x + window.innerWidth / 2, y + window.innerHeight / 2, -y / 2)
    position: [i / 5, i / 10, 0]
  });
  console.log(color);
  // satellite.setVelocity(-y / Math.PI, -x / Math.PI / 2, y / 2);
  // // gravity.addTarget(satellite);
  // simulation.add(satellite);
  // items.push([satellite, position]);
}




// Let the magic begin...
box.requestUpdate(spinnerBox);
logo.requestUpdate(spinner);