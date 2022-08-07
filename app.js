const saveBtn=document.getElementById("save");
const textSize=document.getElementById("text-size");
const textInput=document.getElementById("text");
const textSizeValue=document.getElementById("text-size-value")
const fileInput =document.querySelector("#file")
const backgroundColorBtn=document.getElementById("background-color");
const strokeBtn=document.getElementById("stroke");
const fillBtn=document.getElementById("fill");
const destroyBtn=document.getElementById("destroy-btn");
const eraserBtn=document.getElementById("eraser-btn");
const colorOptions=Array.from(document.getElementsByClassName("color-option"));
const color=document.getElementById("color");
const lineWidth=document.getElementById("line-width");
const lineWidthValue=document.getElementById("line-width-value")
const canvas=document.querySelector("canvas");

const ctx=canvas.getContext("2d");

const CANVAS_WIDTH=800;
const CANVAS_HEIGHT=800;


canvas.width=CANVAS_WIDTH;
canvas.height=CANVAS_HEIGHT;
ctx.lineWidth=lineWidth.value;
ctx.lineCap="round";

let isPainting=false;
let isFilling=false;
let isBackgroundFilling=false;


function onMove(event){
  if(isPainting){
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
}   else{   
    ctx.moveTo(event.offsetX,event.offsetY);}
}

function onMouseDown(){
    isPainting=true;
}

function onMouseUp(){
    isPainting=false;
    if(isFilling){
        ctx.fill();
    }
    ctx.beginPath();
}

function onLineWidthChange(event){
    ctx.lineWidth=event.target.value;
}

function onLineWidthChangeValue(event){
    lineWidthValue.innerText=event.target.value;
}

function onDoubleClick(event){
    const text=textInput.value;
    if(text!==""){
        ctx.save();
        const fontSize=textSize.value;
            ctx.lineWidth=1;
            ctx.font=`${fontSize}px serif`;
            ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
        }
}

function onTextSizeChange(event){
    ctx.textSize=event.target.value;
}

function onTextSizeChangeValue(event){
    textSizeValue.innerText=event.target.value;
}

function onColorChange(event){
    ctx.strokeStyle=event.target.value;
    ctx.fillStyle=event.target.value;

}

function onColorClick(event){
    const colorValue=event.target.dataset.color;
    ctx.strokeStyle=colorValue
    ctx.fillStyle=colorValue;
    color.value=colorValue;
}



function onCanvasClick(){
    if(isBackgroundFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}

function onDestroyClick(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function onEraserClick(){
    ctx.strokeStyle="white";
       
}

function onBackgroundColorBtnClick(){
    isBackgroundFilling=true;
    canvas.fillStyle="";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function onStrokeBtnClick(){
    isFilling=false;
    isBackgroundFilling=false;
}

function onFillBtnClick(){
    isFilling=true;
    isBackgroundFilling=false;
}

function onFileChange(event){
    const file=event.target.files[0];
    const url=URL.createObjectURL(file);
    const image=new Image();
    image.src=url;
    image.onload=function(){
        ctx.drawImage(image,0,0, CANVAS_WIDTH,CANVAS_HEIGHT);
        fileInput.value=null;
        }
}

function onSaveClick(){
    const url=canvas.toDataURL();
    const a =document.createElement("a");
    a.href=url;
    a.download="myDrawing.png";
    a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown",onMouseDown);
canvas.addEventListener("mouseup",onMouseUp);
canvas.addEventListener("click",onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange, onLineWidthChangeValue);
lineWidth.addEventListener("change", onLineWidthChangeValue);
color.addEventListener("change", onColorChange);
textSize.addEventListener("change",onTextSizeChange);
textSize.addEventListener("change",onTextSizeChangeValue);



colorOptions.forEach(color=>color.addEventListener("click",onColorClick));


backgroundColorBtn.addEventListener("click", onBackgroundColorBtnClick);
strokeBtn.addEventListener("click", onStrokeBtnClick);
fillBtn.addEventListener("click", onFillBtnClick);
destroyBtn.addEventListener("click",onDestroyClick);
eraserBtn.addEventListener("click",onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);