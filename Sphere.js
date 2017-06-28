"use strict";
const MAX_SPHERE_ = 100;

/**
 * Object Sphere
 */
function Sphere(position, radius, color, specularity)
{
	this.specularity = specularity;
	this.position = position;
	this.radius = radius;
	this.color = color;
}

var sphere_ = [];

sphere_.init = function(shaderProgram)
{
	sphere_.count = 0;
	sphere_.shaderProgram = shaderProgram;

	sphere_.uniform = {};
	sphere_.uniform.sphere_ = [];
	sphere_.uniform.sphereCount_ = gl.getUniformLocation(shaderProgram, "sphereCount_");
}

sphere_.add = function(sphere)
{
	const i = sphere_.count;
	if(i < MAX_SPHERE_)
	{
		sphere_[i] = sphere;

		sphere_[i].uniform = new Sphere(
			gl.getUniformLocation(sphere_.shaderProgram, "sphere_[" + i + "].position"),
			gl.getUniformLocation(sphere_.shaderProgram, "sphere_[" + i + "].radius"),
			gl.getUniformLocation(sphere_.shaderProgram, "sphere_[" + i + "].color"),
			gl.getUniformLocation(sphere_.shaderProgram, "sphere_[" + i + "].specularity"));

		gl.uniform3fv(sphere_[i].uniform.position, sphere_[i].position);
		gl.uniform1f (sphere_[i].uniform.radius, sphere_[i].radius);
		gl.uniform3fv(sphere_[i].uniform.color, sphere_[i].color);
		gl.uniform1f (sphere_[i].uniform.specularity, sphere_[i].specularity);
		gl.uniform1i (sphere_.uniform.sphereCount_, ++sphere_.count);
	}
	else
	{
		alert("You have reached the maximum number of spheres allowed: " + MAX_SPHERE_ + ".");
	}
	return i;
}

