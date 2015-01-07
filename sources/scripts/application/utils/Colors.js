/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r, g, b){
	r /= 255;
	g /= 255;
	b /= 255;
	var max = Math.max(r, g, b);
	var min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;

	if(max === min){
		h = s = 0; // achromatic
	}else{
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch(max){
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return {h:h, s:s, l:l};
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l){

	function hue2rgb(p, q, t){
		if(t < 0){
			t += 1;
		}
		if(t > 1){
			t -= 1;
		}
		if(t < 1/6){
			return p + (q - p) * 6 * t;
		}
		if(t < 1/2){
			return q;
		}
		if(t < 2/3){
			return p + (q - p) * (2/3 - t) * 6;
		}
		return p;
	}

	var r, g, b;

	if(s === 0){
		r = g = b = l; // achromatic
	}else{
		

		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1/3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1/3);
	}

	return {r:Math.round(r * 255), g:Math.round(g * 255), b:Math.round(b * 255)};
}
function toHex(n) {
	n = parseInt(n,10);
	if (isNaN(n)){
		return '00';
	}
	n = Math.max(0,Math.min(n,255));
	return '0123456789ABCDEF'.charAt((n-n%16)/16) + '0123456789ABCDEF'.charAt(n%16);
}
function rgbToHex(R,G,B) {
	return parseInt('0x' + toHex(R)+toHex(G)+toHex(B));
}


function hexToRgb(hex){
    var r = hex >> 16;
    var g = hex >> 8 & 0xFF;
    var b = hex & 0xFF;
    return {r:r,g:g,b:b};
}

function addSaturation(color, value){
	var rgb = hexToRgb(color);
	var hsl = rgbToHsl(rgb.r,rgb.g,rgb.b);
	hsl.s *= value;
	if(hsl.s > 1){
		hsl.s = 1;
	}
	if(hsl.s < 0){
		hsl.s = 0;
	}
	rgb = hslToRgb(hsl.h,hsl.s,hsl.l);
	return rgbToHex(rgb.r,rgb.g,rgb.b);
}