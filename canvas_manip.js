window.addEventListener("load",setup,false);

function setup() {
    canvas.addEventListener("wheel", wheelZoom, false);  // dblclic
    canvas.addEventListener("mousedown", handleMouseDown, false); // click and hold to pan
    canvas.addEventListener("mousemove", handleMouseMove, false);
    canvas.addEventListener("mouseup", handleMouseUp, false);

    draw()
}

var mouseX, 
    mouseY, 
    stockX, 
    stockY,
    drag = false;

function wheelZoom(event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (event.deltaY <0){
        if (graphics.zoom<=50){graphics.zoom+=4}
    };
    if (event.deltaY >0){
        if (graphics.zoom>=10){graphics.zoom-=4}
    };

    draw();
}

function handleMouseDown(event) {
	if(!drag) {drag = true};
	canvas.style.cursor = "grabbing";
	var x = event.pageX;
        y = event.pageY;
	mouseX = x;
	mouseY = y;
};

function handleMouseUp(event) {
    if(drag) {drag = false}; 
    canvas.style.cursor = "grab"; 
}

function handleMouseMove(event) {
	stockX = mouseX;
	stockY = mouseY;
	var x = event.pageX;
        y = event.pageY;	
    if (Math.abs(x - stockX) >= 0.05) {
        mouseX = x;
    } else {mouseX = stockX};
	if (Math.abs(y - stockY) >= 0.05) {
        mouseY = y;
    } else {mouseY = stockY}	

	if(drag === true) {
		angles.phi += -(mouseY - stockY)*0.01;
		angles.theta += (mouseX - stockX)*0.01;
		draw();
	}
};