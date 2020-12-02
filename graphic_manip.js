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