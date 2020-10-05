var numbers = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);

//Returns the color of the box
function getBoxColor(id){
    var box = document.getElementById(id);
    var style = window.getComputedStyle(box);
    let color = style.backgroundColor;

    return color;
}

//Checks if the box contains a number
function isNumber(id){
    var boxValue = document.getElementById(id).value;

    if(isNaN(boxValue) || boxValue == 0){
        return false;
    }

    return true;
}

//Checks the board to see if there are errors or a win
function checkGame(){
    var victory = true;
    var emptyBoxes = false;
    var repetition = false;

    for(let i = 0; i < 81; i++){
        var id = document.getElementsByClassName("box")[i].id;
        var boxValue = document.getElementsByClassName("box")[i].value;
        var boxColor = getBoxColor(id);

        //Sets red boxes back to white
        if(boxColor == "rgb(255, 0, 0)"){
            document.getElementById(id).classList.toggle("red");
        }

        //Ignores empty boxes
        if(boxValue != ""){
            var valid = validatePosition(id);
            var isNum = isNumber(id);

            //Marks boxes with repetition with a red background
            if(!valid || !isNum){
                document.getElementById(id).classList.toggle("red");
                
                victory = false;
                repetition = true;
            }
        }
        else{
            emptyBoxes = true;
            victory = false;
        }
    }

    if(victory && (!emptyBoxes))
        alert("YOU WON!");
    else if(!victory && emptyBoxes && (!repetition))
        alert("Looking good. Keep going!");
    else if(repetition)
        alert("Oops! Found some errors.");
}

//Shows the confirmation menu
function show(){
    document.getElementById("content").classList.toggle("show");
}

/* Restarts the puzzle */
function resetGame(id){

    console.log("Resetting game");
    for(let i = 0; i < 81; i++){
    
        if(!(document.getElementsByClassName("box")[i].hasAttribute("readonly"))){
            document.getElementsByClassName("box")[i].value = "";
        }
        
        var id = document.getElementsByClassName("box")[i].id;
        var boxColor = getBoxColor(id);

        //Sets red boxes back to white
        if(boxColor == "rgb(255, 0, 0)"){
            document.getElementById(id).classList.toggle("red");
        }
    }

    show();
}

/* Sets every box to empty and changes the color/font back to its original state */
function newBoard(){
    for(let i = 0; i < 81; i++){
        var id = document.getElementsByClassName("box")[i].id;
        
        document.getElementsByClassName("box")[i].value = "";

        var isEditableBox = document.getElementById(id).classList.contains("writtenbox");
        
        if(isEditableBox)
            document.getElementById(id).classList.toggle("writtenbox");
    }
}

function assignNumbers(){
    for(let i = 0; i < 81; i++){
        
        //Make all assigned numbers uneditable
        document.getElementsByClassName("box")[i].setAttribute('readonly', true);
        
        let id = document.getElementsByClassName("box")[i].id;
        
        //Assign a box a random number, check if the number can be placed
        let number = Math.floor(Math.random() * 9) + 1; 
        document.getElementById(id).value = number;

        if(!(validatePosition(id))){
            changeValue(id);
        }

    }
}

//Checks if a number can be placed in its box
function validatePosition(id){
    
    if(repetitionInRows(id) || repetitionIncols(id) || repetitionInBlocks(id)){
        return false;
    } 

    return true;
}

function changeValue(id){
    shuffle(numbers);
    
    ///Loops through the numbers array and check if a number can be placed.
    for(var i = 0; i < numbers.length; i++){
        document.getElementById(id).value = numbers[i];

        if(validatePosition(id))
            return;
    }

    //Starts a new game if the board becomes unsolvable
    newGame();
}

//Shuffles all the elements in an array
function shuffle(array){
    for(var i = array.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * (i+1));
        
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//Returns the index of the id's column
function getColumn(id){
    var table = document.getElementById("tab");
    
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            var cellID = table.rows[i].cells[j].firstChild.id;
            
            if(cellID == id){
                var index = table.rows[i].cells[j].cellIndex;
                return index;
            }
        }
    }
}

////Returns true if there is any repeating numbers in a row
function repetitionInRows(id){
    var table = document.getElementById("tab");
    
    var row = document.getElementById(id).parentElement.parentElement;
    var index = row.rowIndex;

    var boxValue = document.getElementById(id).value;
    
    //Loop through every cell in a row to find repetition
    for (var i = 0; i < 9; i++) {
        var cellID = table.rows[index].cells[i].childNodes[0].id;
        var cellValue = table.rows[index].cells[i].childNodes[0].value;
        
        if(cellValue == boxValue && cellID != id){
            return true;
        }
    }

    return false;
}

//Returns true if repetition was found in a column
function repetitionIncols(id){
    var table = document.getElementById("tab");
    var colIndex = getColumn(id);
    var boxValue = document.getElementById(id).value;
    
    //Loop through every cell in the table to find repetition
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            
            var cellID = table.rows[i].cells[j].childNodes[0].id;
            var cellValue = table.rows[i].cells[j].childNodes[0].value;
            var cellIndex = table.rows[i].cells[j].cellIndex;
            
            //Checks if the cell is in the same column as the id
            //Checks for repetition in a column, ignores the cell with the same id
            if(cellIndex == colIndex && cellValue == boxValue && cellID != id){
                return true;
            }
        }
    }
    return false;
}

//Returns true if repetition was found in a block
function repetitionInBlocks(id){
    var boxValue = document.getElementById(id).value;
    var block = getBlock(id);
    var repeating;
    
    switch(block){
        case 1:
            repeating = isRepetition(id,boxValue,0,2,0,2); break;
        case 2:
            repeating = isRepetition(id,boxValue,0,2,3,5); break;
        case 3:
            repeating = isRepetition(id,boxValue,0,2,6,8); break;
        case 4:
            repeating = isRepetition(id,boxValue,3,5,0,2); break;
        case 5:
            repeating = isRepetition(id,boxValue,3,5,3,5); break;
        case 6:
            repeating = isRepetition(id,boxValue,3,5,6,8); break;
        case 7:
            repeating = isRepetition(id,boxValue,6,8,0,2); break;
        case 8:
            repeating = isRepetition(id,boxValue,6,8,3,5); break;
        case 9:
            repeating = isRepetition(id,boxValue,6,8,6,8); break;  
        default:
            console.log("Something went wrong. Block not found."); break;
    }

    return repeating;
}

//Returns which block the box is stored in
function getBlock(id){
    var rowsIndex = document.getElementById(id).parentElement.parentElement.rowIndex;
    var colIndex = getColumn(id);
    
    if(isBetween(rowsIndex, 0, 2) && isBetween(colIndex, 0, 2))
        return 1;
    if(isBetween(rowsIndex, 0, 2) && isBetween(colIndex, 3, 5))
       return 2;
    if(isBetween(rowsIndex, 0, 2) && isBetween(colIndex, 6, 8))
       return 3;
    if(isBetween(rowsIndex, 3, 5) && isBetween(colIndex, 0, 2))
       return 4;
    if(isBetween(rowsIndex, 3, 5) && isBetween(colIndex, 3, 5))
       return 5;
    if(isBetween(rowsIndex, 3, 5) && isBetween(colIndex, 6, 8))
       return 6;
    if(isBetween(rowsIndex, 6, 8) && isBetween(colIndex, 0, 2))
       return 7;
    if(isBetween(rowsIndex, 6, 8) && isBetween(colIndex, 3, 5))
       return 8;
    if(isBetween(rowsIndex, 6, 8) && isBetween(colIndex, 6, 8))
       return 9;
}

//Checks if a number is between a range
function isBetween(number, range1, range2){
    if(number >= range1 && number <= range2)
        return true;
    else
        return false;
}

//Loops through every number in a block and checks for repetition
function isRepetition(id, boxValue, rowStart, rowEnd, colStart, colEnd){
    
    var table = document.getElementById("tab");
  
    for(let i = rowStart; i < rowEnd+1; i++){
        for(let j = colStart; j < colEnd+1; j++){
            
            var cellID = table.rows[i].cells[j].childNodes[0].id;
            var cellValue = table.rows[i].cells[j].childNodes[0].value;
        
            if(cellValue == boxValue && cellID != id){
                return true;
            }
        }
    }

    return false;
}

// function resizeNav(){
//     var w = window.outerWidth;
//     var gameTitle = document.getElementById("game-title");

//     if(w < 487){
//         gameTitle.style.fontSize = "40px";
//     }
//     else if(w >= 487)
//         gameTitle.style.fontSize = "50px";

// }

//Randon number generator decides which boxes will get removed
function removeNumbers(){

    for(let i = 0; i < 81; i++){
    
        let id = document.getElementsByClassName("box")[i].id;
        let randomNum = Math.floor(Math.random() * 50000 + 1);

        if(randomNum > 37500){
            document.getElementsByClassName("box")[i].value = "";
            
            //Make all blank boxes editable
            document.getElementsByClassName("box")[i].removeAttribute('readonly');
            
            //Change the color and font of editable boxes
            document.getElementById(id).classList.toggle("writtenbox");
        }
    }
}

/* Creates a solvable sudoku puzzle */
function newGame(){
    document.getElementById('ngbtn').setAttribute('disabled', true);
    
    newBoard();
    assignNumbers();

    document.getElementById('ngbtn').setAttribute('enabled', true);
}