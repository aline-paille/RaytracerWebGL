"use strict";
const MAX_PLAN_ = 20;

/**
 * Object Plan
 */
function Plan(normal, distance, color, specularity)
{
	this.specularity = specularity;
	this.distance = distance;
	this.normal = normal;
	this.color = color;
}

var plan_ = [];

plan_.init = function(shaderProgram)
{
	plan_.count = 0;
	plan_.shaderProgram = shaderProgram;

	plan_.uniform = {};
	plan_.uniform.plan_ = [];
	plan_.uniform.planCount_ = gl.getUniformLocation(shaderProgram, "planCount_");
}

plan_.add = function(plan)
{
	const i = plan_.count;
	if(i < MAX_PLAN_)
	{
		plan_[i] = plan;

		plan_[i].uniform = new Plan(
			gl.getUniformLocation(plan_.shaderProgram, "plan_[" + i + "].normal"),
			gl.getUniformLocation(plan_.shaderProgram, "plan_[" + i + "].distance"),
			gl.getUniformLocation(plan_.shaderProgram, "plan_[" + i + "].color"),
			gl.getUniformLocation(plan_.shaderProgram, "plan_[" + i + "].specularity"));
		gl.uniform3fv(plan_[i].uniform.normal, plan_[i].normal);
		gl.uniform1f (plan_[i].uniform.distance, plan_[i].distance);
		gl.uniform3fv(plan_[i].uniform.color, plan_[i].color);
		gl.uniform1f (plan_[i].uniform.specularity, plan_[i].specularity);
		gl.uniform1i (plan_.uniform.planCount_, ++plan_.count);
	}
	else
	{
		alert("You have reached the maximum number of plans allowed: " + MAX_PLAN_ + ".");
	}
	return i;
}

plan_.createBox = function(color, distance)
{
	plan_.add(new Plan([ 1,  0,  0], distance, color, 0));
	plan_.add(new Plan([-1,  0,  0], distance, color, 0));
	plan_.add(new Plan([ 0,  1,  0], distance, color, 0));
	plan_.add(new Plan([ 0, -1,  0], distance, color, 0));
	plan_.add(new Plan([ 0,  0,  1], distance, color, 0));
	plan_.add(new Plan([ 0,  0, -1], distance, color, 0));
}

plan_.createBox2 = function(color1, color2, color3, distance)
{
	plan_.add(new Plan([ 1,  0,  0], distance, color1, 0));
	plan_.add(new Plan([-1,  0,  0], distance, color1, 0));
	plan_.add(new Plan([ 0,  1,  0], distance, color2, 0));
	plan_.add(new Plan([ 0, -1,  0], distance, color2, 0));
	plan_.add(new Plan([ 0,  0,  1], distance, color3, 0));
	//plan_.add(new Plan([ 0,  0, -1], distance, color3, 0));
}