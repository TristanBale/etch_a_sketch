//step 1: make a 16 x 16 grid of divs
    //make a 2D array of 16 by 16 places
const mainContainer = document.querySelector('.mainContainer');

const btn = document.querySelector('.btn');

let arrayOfDivs = [];
let userInput = '';

btn.addEventListener('click', () => {
    userInput = prompt('Please choose how many squares per side for the grid: ');
    userInput = +userInput;
    if (typeof userInput === 'number' && userInput < 51 && userInput > 0)  {
        arrayOfDivs = create2D_Array(userInput,userInput);
        console.log(arrayOfDivs);
        create_Divs(arrayOfDivs);
    }
    else {
        alert('Please key in numbers from 1 to 50 only');
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

//arrayOfDivs = create2D_Array(userInput, userInput);

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

    const gridDivNodeList = document.querySelectorAll('.gridDiv');


    for (let i = 0; i < gridDivNodeList.length; i++) {
        gridDivNodeList[i].addEventListener('mouseover', () => {
            gridDivNodeList[i].setAttribute('style', 'background-color: black;');
        });
        gridDivNodeList[i].addEventListener('mouseout', () => {
            setTimeout( () => 
            gridDivNodeList[i].setAttribute('style', 'background-color: lavender;'), 300);
        });      
    }
}








