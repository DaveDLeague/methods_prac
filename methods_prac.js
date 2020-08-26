const QUESTION_TYPES = [
    "RETURN_TYPE", "METHOD_NAME", "HOW_MANY_PARAMETERS"
];

const DATA_TYPES = [
    "void", "boolean", "int", "long", "byte", "char", "float", "short", "double", "Object", "String", "Robot", "Random"
];

const ACCESS_MODIFIERS = [
    "", "public", "private", "protected"
];

var currentQuestionType;
var currentReturnType;
var currentMethodName;
var currentParamCount;
var inputBox;
var inputButton;
var winningStreak = 0;

window.onload = function(){
    window.addEventListener("keydown", function(event){
        if(event.keyCode == 13){
            txt = document.getElementById("buttonID").innerHTML;
            if(txt == "Click Here to Continue"){
                loadNewQuestion()
            }else{
                checkAnswer();
            }
        }
    });

    document.body.style.fontFamily = "Georgia, serif";
    document.body.style.fontSize = "x-large";

    inputBox = document.createElement("input");
    inputBox.id = "inputID";

    inputButton = document.createElement("button");
    inputButton.id = "buttonID";
    inputButton.innerHTML = "Click Here to Check Your Answer"
    inputButton.onclick = checkAnswer;

    loadNewQuestion();
}

function generateRandomMethodString(){
    currentReturnType = getRandomEntryFromArray(DATA_TYPES);
    currentMethodName = getRandomEntryFromArray(METHOD_NAMES);
    currentParamCount = Math.floor(Math.random() * 6);
    
    let params = "";
    for(let i = 0; i < currentParamCount; i++){
        params += getRandomEntryFromArray(DATA_TYPES) + " " + getRandomEntryFromArray(PARAM_NAMES);
        if(i < currentParamCount - 1){
            params += ", ";
        }
    }

    let accMod = getRandomEntryFromArray(ACCESS_MODIFIERS);

    let ms = accMod + " " + currentReturnType + " " + currentMethodName + "(" + params + "){<br>";
    ms += "&nbsp&nbsp&nbsp&nbsp//pretend that all the necessarry code is here<br>}";
    return ms;
}

function checkAnswer(){
    inpt = document.getElementById("inputID");
    inpt.style.display = "none";    

    let ans = inpt.value;
    let correctAnswer;
    switch(currentQuestionType){
        case "RETURN_TYPE":{
            correctAnswer = currentReturnType;
            break;
        }
        case "METHOD_NAME":{
            correctAnswer = currentMethodName;
            break;
        }
        case "HOW_MANY_PARAMETERS":{
            correctAnswer = currentParamCount;
            break;
        }
    }

    if(ans.trim() == correctAnswer){
        document.body.style.backgroundColor = "#a0ffa0";
        winningStreak += 1;
    }else{
        document.body.style.backgroundColor = "#ffa0a0";
        winningStreak = 0;
    }

    document.body.innerHTML += "<br><br><br>";
    document.body.innerHTML += "Your Answer:<br>";
    document.body.innerHTML += ans + "<br><br>";
    document.body.innerHTML += "Correct Answer:<br>";
    document.body.innerHTML += correctAnswer + "<br>";

    inptBt = document.getElementById("buttonID");
    inptBt.innerHTML = "Click Here to Continue";
    inptBt.onclick = loadNewQuestion;
}

function getRandomEntryFromArray(arr){
    let i = Math.floor(Math.random() * arr.length);
    return arr[i];
}

function loadNewQuestion(){
    inputBox.style.display = "block";

    document.body.style.backgroundColor = "#a0a0ff";
    currentQuestionType = getRandomEntryFromArray(QUESTION_TYPES);
    let qText = "";
    switch(currentQuestionType){
        case "RETURN_TYPE":{
            qText += "What is the return type of the following method?";
            break;
        }
        case "METHOD_NAME":{
            qText += "What is the name of the following method?";
            break;
        }
        case "HOW_MANY_PARAMETERS":{
            qText += "How many parameters does the following method have?<br>"
            qText += "(answer in numerical form: 1, 2, 3, etc...)";
            break;
        }
    }
    qText += "<br><br><br>" + generateRandomMethodString();
    qText += "<br><br>Winning Streak: " + winningStreak;

    document.body.innerHTML = qText;
    document.body.innerHTML += "<br><br><br>"
    document.body.appendChild(inputBox);
    document.body.innerHTML += "<br><br><br>"
    document.body.appendChild(inputButton);
}