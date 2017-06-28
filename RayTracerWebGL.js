"use strict";
// onLoad() function
var canvas;
function start()
{
	canvas = document.getElementById("3DScene");

	initGL();
	initScene1();
	initScreen();

	drawScene();
}

/******************
 * INITIALIZATION *
 ******************/

var gl;
function initGL()
{
	gl = canvas.getContext("experimental-webgl");

	initShaderProgram();
	initBuffers();
}

var SELECTION_NONE_ = 0;
var SELECTION_SPHERE_ = 1;
var SELECTION_PLANE_ = 2;
var selectionType_;
var selectionNumber_;
function initScene1()
{
	camera_.init(shaderProgram_);
	camera_.add(new Camera([0, 0, 56], mat4.identity([]), 45));
	camera_.active(0);

	sphere_.init(shaderProgram_);
	plan_.init(shaderProgram_);

	sphere_.add(new Sphere([-1.5, -0, 48], 1, [1, 0, 0], 0));
	sphere_.add(new Sphere([1, -1, 50], 1, [1.0, 0.0, 0], 0));

	var wallColor1 = [0.0, 1.0, 0.0];
	var wallColor2 = [0.7, 0.7, 0.7];
	var wallColor3 = [0.0, 0.5, 1.0];
	plan_.createBox2(wallColor1, wallColor2, wallColor3, 20);
}

function initScene2()
{
	camera_.init(shaderProgram_);
	camera_.add(new Camera([0, 0, 56], mat4.identity([]), 45));
	camera_.active(0);

	sphere_.init(shaderProgram_);
	sphere_.add(new Sphere([-0.5, -0, 48], 1, [1, 0, 0], 1));
	sphere_.add(new Sphere([1, -1, 50], 1, [1.0, 0.0, 0], 0));

	plan_.init(shaderProgram_);
	var wallColor1 = [0.0, 1.0, 0.0];
	var wallColor2 = [0.7, 0.7, 0.7];
	var wallColor3 = [0.0, 0.5, 1.0];
	plan_.createBox2(wallColor1, wallColor2, wallColor3, 20);
}

function initScreen()
{
	gl.uniform1f(shaderProgram_.uniform.HEIGHT_, canvas.height);
	gl.uniform1f(shaderProgram_.uniform.WIDTH_, canvas.width);
}

/**********************
 * END INITIALIZATION *
 **********************/

/**************************
 * BUFFERS INITIALIZATION *
 **************************/

function initBuffers()
{
	var vertices = [
		+1, +1, 0,
		-1, +1, 0,
		+1, -1, 0,
		-1, -1, 0
	];
	gl.vertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	// TODO: Retirer le TODO
	gl.enable(gl.DEPTH_TEST);

	gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram_.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0); // 3 is the item size of gl.vertexPositionBuffer elements
}

/******************************
 * END BUFFERS INITIALIZATION *
 ******************************/

function drawScene()
{
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}


/**
 * removeSphere
 * Remove a sphere from the scene
 *
 * Parameters
 * n - Number, number of the sphere in global sphere array
 *
 * Returns
 * None
 */
function removeSphere(n)
{
	if(n >= 0 && n < sphereCpt_)
	{
		sphere_.splice(n * 4, 4);
		sphereColor_.splice(n * 4, 4);
		gl.uniform1i(shaderProgram_.uniform.sphereCpt_, --sphereCpt_);
		gl.uniform4fv(shaderProgram_.uniform.sphere_, sphere_);
		gl.uniform4fv(shaderProgram_.uniform.sphereColor_, sphereColor_);
	}
	else
	{
		alert("Can't remove sphere number '" + n + "'. Number of sphere: " + sphereCpt_ + ".");
	}
}
function removeAllSpheres()
{
	var sphereCpt_ = gl.getUniformLocation(shaderProgram_, "sphereCount_");
	for( var i = 0; i < sphereCpt_; i++)
	{
		removeSphere(i);
	}
}

function clearScene()
{
	removeAllSpheres();

}

function drawScene1()
{
	clearScene();
	initScene1();
	drawScene();
}

function drawScene2()
{
	clearScene();
	initScene2();
	drawScene();
}

