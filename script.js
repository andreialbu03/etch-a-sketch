// Default color
var current_color = "#333333";
var grid = document.getElementById('grid');
var current_mode = "pen";

var mouseClicked = false;
document.body.onmousedown = () => {
    mouseClicked = true;
};
document.body.onmouseup = () => {
    mouseClicked = false;
};


// Slider
var slider = document.getElementById("slide-input");
var output = document.getElementById("slide-size");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
};
slider.onchange = function() {
    clearGrid();
    setupGrid(this.value);
};

// Change color
var color_picker = document.getElementById("colorPicker");
color_picker.onchange = (e) => {
    current_color = e.target.value;
};


function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (var i=0; i < size*size; i++) { 
        var div = document.createElement('div');
        div.classList.add('grid-cell');
        div.addEventListener('mouseover', changeColour);
        div.addEventListener('mousedown', changeColour);
        grid.appendChild(div);
    }
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i=0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function changeColour(event) {
    if (event.type === "mouseover" && !mouseClicked) {
        return;
    } else if (current_mode == "pen") {
        this.style.backgroundColor = current_color;
    } else if (current_mode == "eraser") {
        this.style.backgroundColor = "white";
    } else if (current_mode == "rainbow") {
        this.style.backgroundColor = getRandomColor();
    }
}


function clearGrid() {
    const cells = document.getElementsByClassName('grid-cell');

    for (var i=0; i < cells.length ; i++) {
        cells[i].style.backgroundColor = "#fff";
    }
}


function changeMode(mode) {
    current_mode = mode;
}


window.onload = function () {
    setupGrid(16);
};
