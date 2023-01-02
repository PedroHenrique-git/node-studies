const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

context.fillStyle = "green";

canvas.width = 500;
canvas.height = 700;

context.fillRect(0, 0, 500, 700);

document.body.appendChild(canvas);