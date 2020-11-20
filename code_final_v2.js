//Initialiser le canvas
var canvas  = document.getElementById("projet");
var ctx = canvas.getContext("2d");

//Définir la fonction de tracé
function fonction(x,y){
    return (Math.cos(Math.abs(x)+Math.abs(y)));
    //Math.sin(10*(x*x+y*y))/10
    //Math.sin(5*x)*Math.cos(5*y)/5
    //Math.sign(x*y)*Math.sign(1-(x*9)*(x*9)+(y*9)*(y*9))/9
}

//Bloc de style
function changeFunction(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fonction = function(x,y){
        return (eval(document.getElementById("Fonction").value))
    };
    draw();
}

function changeFunction1(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fonction = function(x,y){
        return (Math.sin(5*x)*Math.cos(5*y)/5);
    };
    draw();
}

function changeFunction2(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fonction = function(x,y){
        return (Math.sin(10*(x*x+y*y))/10);
    };
    draw();
}

function changeFunction3(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fonction = function(x,y){
        return (Math.cos(Math.abs(x)+Math.abs(y)));
    };
    draw();
}

function changeFunction4(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fonction = function(x,y){
        return (Math.sqrt(x*x+y*y));
    };
    draw();
}

function changeFunction5(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fonction = function(x,y){
        return ((12*Math.cos((x*x+y*y)/4))/(3+x*x+y*y));
    };
    draw();
}

function changeInterval(){
    if (graphics.style==="p"){
        var a = document.getElementById("xMin").value;
        var b = document.getElementById("xMax").value;
        var c = document.getElementById("yMin").value;
        var d = document.getElementById("yMax").value;
        if (a.length >0) {limits.xmin = parseFloat(a)};
        if (b.length >0) {limits.xmax = parseFloat(b)};
        if (c.length >0) {limits.ymin = parseFloat(c)};
        if (d.length >0) {limits.ymax = parseFloat(d)};
        draw();
    }
}

function changeColor(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    graphics.color=document.getElementById("color-select").value;
    draw();
}

function changeAxis(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    graphics.isAxis=document.getElementById("axisyn").value;
    draw();
}

function changeStyle(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    graphics.style=document.getElementById("stylepg").value;
    if (graphics.style==="p"){graphics.nbPoints=0.07}
    if (graphics.style==="g"){
        graphics.nbPoints=0.20;
        limits.xmin=-10;
        limits.xmax=10;
        limits.ymin=-10;
        limits.ymax=10;
    }
    draw();
}
//Fin bloc de style

//Définir les limites de tracé
var limits={
    xmin:-10,
    xmax:10,
    ymin:-10,
    ymax:10
}

//Définir l'angle de projection de base
var angles={
    phi:0.3 * Math.PI, 
    theta:-0.2 * Math.PI, 
}

//Définir fonction de simulation
function simul(xmin, xmax, ymin, ymax, incr) {
    var pixels = [];
    var i = 0;
    for (var x = xmin; x <= xmax; x += incr) {
        for (var y = ymin; y <= ymax; y += incr) {
            var z1 = fonction(x,y);
            var zp = fonction(x,y);
            pixels.push({x:x, y:y, z:z1, z2:zp});
            i+=1;
        }
    }
    return pixels;
}

//Propriétés graphiques
var graphics ={
    zoom:25,
    pixPrecision:4,
    nbPoints:0.07,
    color:"b", //vert, orange, rose, mauve, bleu, emeraude
    isAxis:"n",
    style:"p"
}

//Bloc d'interaction avec le canvas
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
		angles.phi += -(mouseY - stockY)*0.02;
		angles.theta += (mouseX - stockX)*0.02;
		draw();
	}
};
//Fin bloc d'interaction avec Canvas

//Fonctions utiles à la définition des niveaux de couleur
function findMinMax(arr) {
    let min = arr[0].z2, max = arr[0].z2;
  
    for (let i = 1, len=arr.length; i < len; i++) {
      let v = arr[i].z2;
      min = (v < min) ? v : min;
      max = (v > max) ? v : max;
    }
  
    return [min, max];
};

function colorLevel(number){
    var min = simuLimits[0];
    var max = simuLimits[1];
    var level = Math.floor(((max-number)*100)/(max-min));
    return level;
}

var pixels;
var pixelsColor;
var simuLimits;
var axis = [];
var xlong;
var ylong;

//Définir fonction de dessin
function draw() {
    canvas.width = 800
    canvas.height = 600
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    xlong = (limits.xmax -limits.xmin)*5+1;
    ylong = (limits.ymax -limits.ymin)*5+1;

    pixels = simul(limits.xmin, limits.xmax, limits.ymin, limits.ymax, graphics.nbPoints);

    //Simulation des niveaux de couleur
    simuLimits = findMinMax(pixels);

    //Appliquer les matrices de rotation
    rotationX(angles.phi, pixels);	
    rotationY(angles.theta, pixels);

    //Tracer point par point
    if (graphics.isAxis==="o"){
        axis =[{x:300,y:0,z:0}, {x:0,y:300,z:0}, {x:0,y:0,z:300}];

        rotationX(angles.phi, axis);	
        rotationY(angles.theta, axis);

        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        for (var i=0; i < 3; i++) {
            ctx.beginPath();
            ctx.strokeStyle=['red','blue','green'][i];
            ctx.moveTo(0,0);
            ctx.lineTo(axis[i].x*graphics.zoom,axis[i].y*graphics.zoom);
            ctx.fillText('x',5+canvas.height/2,canvas.width-20);
            ctx.stroke();   
        };
        ctx.font = "15px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Axe X", canvas.width/2-70, canvas.height/2-60);
        ctx.fillStyle = "blue";
        ctx.fillText("Axe Y", canvas.width/2-70, canvas.height/2-45);
        ctx.fillStyle = "green";
        ctx.fillText("Axe Z", canvas.width/2-70, canvas.height/2-30);
        ctx.restore();
    };

    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    //Tracé en pixels
    if (graphics.style==="p"){
        pixels.sort((pixel1, pixel2) => {
            return pixel1.z-pixel2.z;
        }); 
        for (var i=0; i < pixels.length; i++) {
                var level1 = 255-1.5*colorLevel(pixels[i].z2);
                var level2 = 255-2.5*colorLevel(pixels[i].z2);
                if (graphics.color === "v") {ctx.fillStyle='rgb(' + level2 + ',' + level1 + ',' + 0 + ')'}; //vert
                if (graphics.color === "o") {ctx.fillStyle='rgb(' + level1 + ',' + level2 + ',' + 0 + ')'}; //orange
                if (graphics.color === "r") {ctx.fillStyle='rgb(' + level1 + ',' + 0 + ',' + level2 + ')'}; //rose
                if (graphics.color === "m") {ctx.fillStyle='rgb(' + level2 + ',' + 0 + ',' + level1 + ')'}; //mauve
                if (graphics.color === "b") {ctx.fillStyle='rgb(' + 0 + ',' + level2 + ',' + level1 + ')'}; //bleu
                if (graphics.color === "e") {ctx.fillStyle='rgb(' + 0 + ',' + level1 + ',' + level2 + ')'}; //emeraude
                ctx.fillRect(pixels[i].x*graphics.zoom,pixels[i].y*graphics.zoom,graphics.pixPrecision,graphics.pixPrecision)
            }
    }
    //Tracé en grid	
    else if (graphics.style==="g") {
       for (var i=0; i<xlong; i++){
            for (var j=0; j<ylong; j++){
                if ((i*ylong+j+1)%ylong!==0){
                    ctx.beginPath();
                    var level1 = 255-1.5*colorLevel(pixels[i*ylong+j].z2);
                    var level2 = 255-2.5*colorLevel(pixels[i*ylong+j].z2);
                    if (graphics.color === "v") {ctx.strokeStyle='rgb(' + level2 + ',' + level1 + ',' + 0 + ')'}; //vert
                    if (graphics.color === "o") {ctx.strokeStyle='rgb(' + level1 + ',' + level2 + ',' + 0 + ')'}; //orange
                    if (graphics.color === "r") {ctx.strokeStyle='rgb(' + level1 + ',' + 0 + ',' + level2 + ')'}; //rose
                    if (graphics.color === "m") {ctx.strokeStyle='rgb(' + level2 + ',' + 0 + ',' + level1 + ')'}; //mauve
                    if (graphics.color === "b") {ctx.strokeStyle='rgb(' + 0 + ',' + level2 + ',' + level1 + ')'}; //bleu
                    if (graphics.color === "e") {ctx.strokeStyle='rgb(' + 0 + ',' + level1 + ',' + level2 + ')'}; //emeraude
                    ctx.moveTo(pixels[i*ylong+j].x*graphics.zoom,pixels[i*ylong+j].y*graphics.zoom);
                    ctx.lineTo(pixels[i*ylong+j+1].x*graphics.zoom,pixels[i*ylong+j+1].y*graphics.zoom);
                    ctx.stroke();
                }
            }
        };

        for (var j=0; j<ylong; j++){
            for (var i=0; i<xlong-1; i++){
                    ctx.beginPath();
                    level1 = 255-1.5*colorLevel(pixels[j+i*ylong].z2);
                    var level2 = 255-2.5*colorLevel(pixels[j+i*ylong].z2);
                    if (graphics.color === "v") {ctx.strokeStyle='rgb(' + level2 + ',' + level1 + ',' + 0 + ')'}; //vert
                    if (graphics.color === "o") {ctx.strokeStyle='rgb(' + level1 + ',' + level2 + ',' + 0 + ')'}; //orange
                    if (graphics.color === "r") {ctx.strokeStyle='rgb(' + level1 + ',' + 0 + ',' + level2 + ')'}; //rose
                    if (graphics.color === "m") {ctx.strokeStyle='rgb(' + level2 + ',' + 0 + ',' + level1 + ')'}; //mauve
                    if (graphics.color === "b") {ctx.strokeStyle='rgb(' + 0 + ',' + level2 + ',' + level1 + ')'}; //bleu
                    if (graphics.color === "e") {ctx.strokeStyle='rgb(' + 0 + ',' + level1 + ',' + level2 + ')'}; //emeraude
                    ctx.moveTo(pixels[j+i*ylong].x*graphics.zoom,pixels[j+i*ylong].y*graphics.zoom);
                    ctx.lineTo(pixels[(i+1)*ylong+j].x*graphics.zoom,pixels[j+(i+1)*ylong].y*graphics.zoom);
                    ctx.stroke();
            }
        };

    }
    ctx.restore();
}

//Définir les fonctions trigo
function rotationX(phi, pixelsTrigo){
    var cos=Math.cos(phi);
    var sin=Math.sin(phi);

    for (var i=0; i<pixelsTrigo.length; i++){
        var pixel=pixelsTrigo[i];
        var y = pixel.y;
        var z = pixel.z;
        pixel.y = y*cos - z*sin;
        pixel.z = y*sin + z*cos
    }
};

function rotationY(theta, pixelsTrigo){
    var cos=Math.cos(theta);
    var sin=Math.sin(theta);

    for (var i=0; i<pixelsTrigo.length; i++){
        var pixel=pixelsTrigo[i];
        var x = pixel.x;
        var z = pixel.z;
        pixel.x = x*cos + z*sin;
        pixel.z = -x*sin + z*cos
    }
};