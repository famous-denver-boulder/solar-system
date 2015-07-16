'use strict';

// Famous dependencies
var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');
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
  .setAlign(0.5, 0.5);

var spinnerBox = box.addComponent({
  onMount: function(time) {
    console.log('mount time ' + time);
  },
  onUpdate: function(time) {
    // console.log('time ' + time);
    box.setRotation(0, time / 1000, time / 2000);
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
.setAlign(3, 0)
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
var briebug = scene.addChild();
new DOMElement(briebug, {
  tagName: 'img'
})
  .setAttribute('src', './images/briebug-logo.jpg');

briebug
// Set size mode to 'absolute' to use absolute pixel values: (width 250px, height 250px)
.setSizeMode('absolute', 'absolute', 'absolute')
  .setAbsoluteSize(250, 250)
// Center the 'node' to the parent (the screen, in this instance)
.setAlign(0.5, 0.2)
// Set the translational origin to the center of the 'node'
.setMountPoint(0.5, 0.5)
// Set the rotational origin to the center of the 'node'
.setOrigin(0.5, 0.5);

// Add a spinner component to the logo 'node' that is called, every frame
var spinnerB = briebug.addComponent({
  onMount: function(time) {
    console.log('Bmount time ' + time);
  },
  onUpdate: function(time) {
    // console.log('Btime ' + time);
    briebug.setRotation(0, time / -1000, 0);
    briebug.requestUpdateOnNextTick(spinnerB);
  }
});
// Let the magic begin...
box.requestUpdate(spinnerBox);
logo.requestUpdate(spinner);
briebug.requestUpdate(spinnerB);