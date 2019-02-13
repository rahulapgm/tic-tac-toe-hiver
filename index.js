/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let selectedInverse =  true;
let isWinnerPredicted = false;
let selectedCounted = 0;
let winners = ["Draw", "X", "O"];
let diagonals = ["00","11","22"];
let reverseDiagonals=["02","11","20"];

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function showWinner(colIdx, rowIdx){
	if(!isWinnerPredicted){
		let winner="";
		let colArr= [];
		
		//Checking Row elements are equal
		isWinnerPredicted = grid[colIdx].every( v => v === grid[colIdx][rowIdx] );
		winner = isWinnerPredicted ? winners[grid[colIdx][rowIdx]] : "";
		
		//Checking Column elements are equal
		if(!isWinnerPredicted){
			colArr = grid.map(x=> x[rowIdx]);
			isWinnerPredicted = colArr.every( v => v === grid[colIdx][rowIdx] );
			winner = isWinnerPredicted ? winners[colArr[0]] : "";
		}
		
		//Checking Diagonals elements are equal
		if(!isWinnerPredicted){
			if(diagonals.includes(colIdx+rowIdx)){
				diagonals[colIdx] = grid[colIdx][rowIdx];
				isWinnerPredicted = diagonals.every( v => v === grid[colIdx][rowIdx] );
			}
			if(!isWinnerPredicted && reverseDiagonals.includes(colIdx+rowIdx)){
				reverseDiagonals[colIdx] = grid[colIdx][rowIdx];
				isWinnerPredicted = reverseDiagonals.every( v => v === grid[colIdx][rowIdx] );
			}
			winner = isWinnerPredicted ? winners[grid[colIdx][rowIdx]] : "";
		}
		if(isWinnerPredicted){
			document.getElementById("showWinner").innerHTML = "<h2>" + winner + " winner </h2>";
			document.getElementById("gameAction").innerText="Restart Game";
		}
	}
	if(selectedCounted===9 && !isWinnerPredicted){
		isWinnerPredicted=true;
		document.getElementById("showWinner").innerHTML = "<h2>Match end up in " + winners[0] + "</h2>";
		document.getElementById("gameAction").innerText="Restart Game";
	}
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
	if(grid[colIdx][rowIdx] === 0 && !isWinnerPredicted){
		let newValue = selectedInverse ? 1 : 2;
		selectedInverse = !selectedInverse;
		grid[colIdx][rowIdx] = newValue;
		selectedCounted++;
	}
	showWinner(colIdx, rowIdx);
    renderMainGrid();
    addClickHandlers();
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}



initializeGrid();
renderMainGrid();
addClickHandlers();