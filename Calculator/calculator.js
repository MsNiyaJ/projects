//function negates a number
function negation() 
{ 
    var ans = document.getElementById("ans").value*-1;
    document.getElementById("ans").value = ans; 
} 

//function that clears the display 
function cls(){
    document.getElementById("ans").value = "0";
}

//function displays button values on screen
function display(x){
    var output = document.getElementById("ans").value;
        
    if(output == '0' && x == '.')
        document.getElementById("ans").value += x;
    else if(output == '0')
        document.getElementById("ans").value = x;
    
        /*prevents '.' from being displayed twice
    //All operators will not be displayed
    else if(x == "." && output.includes('.') || x == '/' || x == '+' 
        || x == '*' || x == '-')
        document.getElementById("ans").value += "";*/
    
    else 
        document.getElementById("ans").value += x;
}

//function calculates the total
function calculate(){
    var output = document.getElementById("ans").value;
    var sol = eval(output);
    document.getElementById("ans").value = sol;
}

//TODO: Function that stores your last three entries