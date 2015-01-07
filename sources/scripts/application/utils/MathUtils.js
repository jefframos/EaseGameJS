function pointDistance(x, y, x0, y0){
	return Math.sqrt((x -= x0) * x + (y -= y0) * y);
}

function degreesToRadians(deg) {
	return deg * (Math.PI / 180);
}

function radiansToDegrees(rad) {
	return rad / (Math.PI / 180);
}