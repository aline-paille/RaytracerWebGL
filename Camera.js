"use strict";
const MAX_CAMERA_ = 1;

/**
 * Object Camera
 */
function Camera(position, rotation, fovyDeg)
{
	this.position = position;
	this.rotation = rotation;
	this.fovyDeg = fovyDeg;

	if(isNaN(fovyDeg))
	{
		this.fovyRad = fovyDeg;
	}
	else
	{
		this.fovyRad = fovyDeg * Math.PI / 180;
		this.default = {};
		this.default.position = vec3.create(position);
		this.default.rotation = mat4.create(rotation);
		this.default.fovyDeg = this.fovyDeg;
		this.default.fovyRad = this.fovyRad;
	}
}

var camera_ = [];

camera_.init = function(shaderProgram)
{
	camera_.count = 0;
	camera_.shaderProgram = shaderProgram

	camera_.uniform = {};
	camera_.uniform.camera_ = [];
	camera_.uniform.cameraCount_ = gl.getUniformLocation(shaderProgram, "cameraCount_");
	camera_.uniform.cameraActive_ = gl.getUniformLocation(shaderProgram, "cameraActive_");
}

camera_.add = function(camera)
{
	const i = camera_.count;
	if(i < MAX_CAMERA_)
	{
		camera_[i] = camera;

		camera_[i].uniform = new Camera(
			gl.getUniformLocation(camera_.shaderProgram, "camera_[" + i + "].position"),
			gl.getUniformLocation(camera_.shaderProgram, "camera_[" + i + "].rotation"),
			gl.getUniformLocation(camera_.shaderProgram, "camera_[" + i + "].fovyRad"));
		gl.uniform3fv(camera_[i].uniform.position, camera_[i].position);
		gl.uniformMatrix4fv(camera_[i].uniform.rotation, gl.FALSE, camera_[i].rotation);
		gl.uniform1f(camera_[i].uniform.fovyRad, camera_[i].fovyRad);
		gl.uniform1i(camera_.uniform.cameraCount_, ++camera_.count);
	}
	else
	{
		alert("You have reached the maximum number of cameras allowed: " + MAX_CAMERA_ + ".");
	}
	return i;
}

camera_.active = function(n)
{
	if(n <= camera_.count - 1)
	{
		camera_.activeNumber = n;
		gl.uniform1i(camera_.uniform.cameraActive_, n);
	}
	else
	{
		alert("You are trying to activate an inexistant camera: " + n + ".");
	}
}
