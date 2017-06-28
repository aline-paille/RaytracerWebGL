"use strict";
var shaderProgram_;

/**
 * @return string source code from script element
 */
function getShaderSource(shaderScript)
{
	var shaderSource = "";
	var node = shaderScript.firstChild;
	while(node)
	{
		if(node.nodeType == node.TEXT_NODE)
		{
			shaderSource += node.textContent;
		}
		node = node.nextSibling;
	}
	return shaderSource;
}

/**
 * @return WebGLShader compiled vertex shader
 */
function getVS()
{
	var shaderScript = document.getElementById("shader-vs");
	var shaderSource = getShaderSource(shaderScript);
	var shader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(shader, shaderSource);
	gl.compileShader(shader);
	return shader;
}

/**
 * @return WebGLShader compiled fragment shader
 */
function getFS()
{
	var shaderScript = document.getElementById("shader-fs");
	var shaderSource = getShaderSource(shaderScript);
	var shader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(shader, shaderSource);
	gl.compileShader(shader);
	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
	{
		alert(gl.getShaderInfoLog(shader));
		return null;
	}
	return shader;
}

function initShaderProgram()
{
	/* Vertex Shader */
	var vShader = getVS();
	/* Fragment Shader */
	var fShader = getFS();

	shaderProgram_ = gl.createProgram();
	shaderProgram_.uniform = [];

	gl.attachShader(shaderProgram_, vShader);
	gl.attachShader(shaderProgram_, fShader);
	gl.linkProgram(shaderProgram_);
	gl.useProgram(shaderProgram_);

	shaderProgram_.vertexPositionAttribute = gl.getAttribLocation(shaderProgram_, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram_.vertexPositionAttribute);

	shaderProgram_.uniform.HEIGHT_ = gl.getUniformLocation(shaderProgram_, "HEIGHT_");
	shaderProgram_.uniform.WIDTH_ = gl.getUniformLocation(shaderProgram_, "WIDTH_");
}
