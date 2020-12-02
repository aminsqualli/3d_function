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

function colorDef(col1,col2){
    var codeCol;
    if (graphics.color === "v") {codeCol='rgb(' + col2 + ',' + col1 + ',' + 0 + ')'}; //vert
    if (graphics.color === "o") {codeCol='rgb(' + col1 + ',' + col2 + ',' + 0 + ')'}; //orange
    if (graphics.color === "r") {codeCol='rgb(' + col1 + ',' + 0 + ',' + col2 + ')'}; //rose
    if (graphics.color === "m") {codeCol='rgb(' + col2 + ',' + 0 + ',' + col1 + ')'}; //mauve
    if (graphics.color === "b") {codeCol='rgb(' + 0 + ',' + col2 + ',' + col1 + ')'}; //bleu
    if (graphics.color === "e") {codeCol='rgb(' + 0 + ',' + col1 + ',' + col2 + ')'}; //emeraude
    if (graphics.style==="p"){
        ctx.fillStyle=codeCol;
    }
    else if (graphics.style==="g") {
        ctx.strokeStyle=codeCol;
    }
};

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
            colorDef(level1,level2);
            ctx.fillRect(pixels[i].x*graphics.zoom,pixels[i].y*graphics.zoom,graphics.pixPrecision,graphics.pixPrecision)
        }
    }

    //Tracé en grid	
    else if (graphics.style==="g") {
       for (var x=0; x<xlong; x++){
            for (var y=0; y<ylong; y++){
                if ((x*ylong+y+1)%ylong!==0){
                    ctx.beginPath();
                    var level1 = 255-1.5*colorLevel(pixels[x*ylong+y].z2);
                    var level2 = 255-2.5*colorLevel(pixels[x*ylong+y].z2);
                    colorDef(level1,level2);
                    ctx.moveTo(pixels[x*ylong+y].x*graphics.zoom,pixels[x*ylong+y].y*graphics.zoom);
                    ctx.lineTo(pixels[x*ylong+y+1].x*graphics.zoom,pixels[x*ylong+y+1].y*graphics.zoom);
                    ctx.stroke();
                }
            }
        };

        for (var y=0; y<ylong; y++){
            for (var x=0; x<xlong-1; x++){
                    ctx.beginPath();
                    level1 = 255-1.5*colorLevel(pixels[y+x*ylong].z2);
                    var level2 = 255-2.5*colorLevel(pixels[y+x*ylong].z2);
                    colorDef(level1,level2);
                    ctx.moveTo(pixels[y+x*ylong].x*graphics.zoom,pixels[y+x*ylong].y*graphics.zoom);
                    ctx.lineTo(pixels[(x+1)*ylong+y].x*graphics.zoom,pixels[y+(x+1)*ylong].y*graphics.zoom);
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