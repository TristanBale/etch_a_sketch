let currentMode = 'normal';
let trailStyle = 'vanish';
let color = 'black';

const mainContainer = document.querySelector('.mainContainer');

const btn = document.querySelector('.btn');
const normalBtn = document.querySelector('.normalBtn');
const rainbowBtn = document.querySelector('.rainbowBtn');
const eraserBtn = document.querySelector('.eraserBtn');
const vanishBtn = document.querySelector('.vanishBtn');
const permanentBtn = document.querySelector('.permanentBtn');
const clearBtn = document.querySelector('.clearBtn');
const colorPicker = document.querySelector('#colorPicker');
const modeDisplayer = document.querySelector('.modeDisplayer');
const trailDisplayer = document.querySelector('.trailDisplayer');
const colorDisplayer = document.querySelector('.colorDisplayer');

normalBtn.addEventListener('click', () => {
    currentMode = 'normal';
    modeDisplayer.innerText = 'Current mode: normal';
})

rainbowBtn.addEventListener('click', () => {
    currentMode = 'rainbow';
    modeDisplayer.innerText = 'Current mode: rainbow';
});

eraserBtn.addEventListener('click', () => {
    currentMode = 'eraser';
    modeDisplayer.innerText = 'Current mode: eraser';
});

vanishBtn.addEventListener('click', () => {
    trailStyle = 'vanish';
    trailDisplayer.innerText = 'Trail mode: vanish';
});

permanentBtn.addEventListener('click', () => {
    trailStyle = 'permanent';
    trailDisplayer.innerText = 'Trail mode: permanent'
});

clearBtn.addEventListener('click', () => {
    arrayOfDivs = create2D_Array(10,10);
    create_Divs(arrayOfDivs);
})

colorPicker.addEventListener('input', () => {
    color = colorPicker.value;
    colorDisplayer.innerText = `Colour: ${color}`;
});

let arrayOfDivs = [];
let userInput = '';

arrayOfDivs = create2D_Array(10,10);
create_Divs(arrayOfDivs);


btn.addEventListener('click', () => {
    userInput = prompt('Please choose how many squares per side for the grid: ');
    userInput = +userInput;
    if (typeof userInput === 'number' && userInput < 65 && userInput > 0)  {
        arrayOfDivs = create2D_Array(userInput,userInput);
        create_Divs(arrayOfDivs);
    }
    else {
        alert('Please key in numbers from 1 to 64 only');
    }
});

//console.log(`user input is ${userInput}`);


function create2D_Array(rows, columns) {
    let array = [];
    let value = 0;
    for (let i = 0; i < rows; ++i) {
        array[i] = [];
        for (let j = 0; j < columns; ++j) {
            array[i][j] = value++;
        }
    } 
    return array;
 }



function create_Divs(array) {
    mainContainer.innerHTML = ''; //this is done here and not the other functions as the rest handles creating the arrays. only create_divs actually appends and edit the HTML

    for (const subArray of array) {
        const innerDivContainer = document.createElement('div');
        innerDivContainer.classList.add('innerDivContainer');
        for (const element of subArray) {
            const gridDiv = document.createElement('div');
            gridDiv.classList.add('gridDiv');
            gridDiv.textContent = '';
            innerDivContainer.appendChild(gridDiv);
        }
        mainContainer.appendChild(innerDivContainer);
    }

    let isMouseDown = false; // Flag to track mouse button state

    document.addEventListener('mousedown', () => {
        isMouseDown = true;
    });

    document.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    const gridDivNodeList = document.querySelectorAll('.gridDiv');


    for (let i = 0; i < gridDivNodeList.length; i++) {
        gridDivNodeList[i].addEventListener('mousemove', () => {
        if (isMouseDown) {
            if (currentMode === 'normal') {
                gridDivNodeList[i].setAttribute('style', `background-color: ${color};`);
            } else if (currentMode === 'eraser') {
                gridDivNodeList[i].setAttribute('style', 'background-color: #fefefe;');
            } else if (currentMode === 'rainbow') {
                const randomR = Math.floor(Math.random() * 256);
                const randomG = Math.floor(Math.random() * 256);
                const randomB = Math.floor(Math.random() * 256);
                gridDivNodeList[i].style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
            }
        }
        });
    
        if (trailStyle === 'vanish') {
            gridDivNodeList[i].addEventListener('mouseout', handleMouseOut);
        }
        if (trailStyle === 'permanent') {
            gridDivNodeList[i].removeEventListener('mouseout', handleMouseOut);
        };
}};


function handleMouseOut() {
    if (trailStyle === 'vanish') {
        setTimeout(() => {
            this.setAttribute('style', 'background-color: white;');
        }, 300);
    }
}











