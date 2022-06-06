///////////////////////////////////////////////////////////////////////
//Colecciones

const letterContainersCollection = ["11", "12", "13", "14", "15", "21", "22", "23", "24", "25", "31", "32", "33", "34", "35", "41", "42", "43", "44", "45", "51", "52", "53", "54", "55", "61", "62", "63", "64", "65"]

let wordCollection;

const getData = async () => {
    await fetch("data.json")
    .then((resp) => resp.json())
    .then((data) => wordCollection = data)
    .catch((error) => Toastify({
        text: error,
        gravity: "top",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #E80D00, #FF8D70)",
          }
    }).showToast())
}

let notInWordCollection = [];

let word = "queso";

///////////////////////////////////////////////////////////////////////
//Elección de la palabra al azar

const chooseWord = () => {
    min = Math.ceil(0);
    max = Math.floor(wordCollection.length);
    let randomNum = Math.floor(Math.random() * (max - min) + min);
    word = wordCollection[randomNum].word;
}

const startApp = async () => {
    await getData();
    chooseWord();
}

startApp();

///////////////////////////////////////////////////////////////////////
//Seteo de wins/losses

let victorys = localStorage.getItem("wins");
let defeats = localStorage.getItem("losses");

const Stats = () => {
    {victorys !== null ? document.getElementById("wins").innerHTML = `Victorias: ${victorys}` : document.getElementById("wins").innerHTML = "Aún no has ganado"}

    {defeats !== null ? document.getElementById("losses").innerHTML = `Derrotas: ${defeats}` : document.getElementById("losses").innerHTML = "Aún no has perdido"}
}

Stats();

///////////////////////////////////////////////////////////////////////
//Dark Mode

let darkMode = localStorage.getItem("darkMode");

const darkModeFromStorage = () => {
    if(darkMode !== null){
        darkMode = localStorage.getItem("darkMode");
        applyStyle();
    } else {
        localStorage.setItem("darkMode", true);
    }
}

const applyStyle = () => {
    switch(darkMode){
        case "true":
            document.body.style.backgroundColor = "rgb(18,18,19)";
            document.getElementById("title").style.color = "white";
            document.getElementById("checkboxLabel").style.color = "white";
            document.getElementById("checkboxLabel").innerHTML = "Dark Mode";
            if(document.getElementById("debugLabel")){
                document.getElementById("debugLabel").style.color = "white";
                document.getElementById("debugDiv").style.color = "white";
            }
            document.getElementById("darkModeIMG").src = "./public/img/moonwhite.svg";
            letterContainersCollection.map((obj) => {
                document.getElementById(obj).style.color = "white";
                document.getElementById(obj).style.backgroundColor = "rgb(34, 34, 34)";
            })
            break;
        case "false":
            document.body.style.backgroundColor = "white";
            document.getElementById("title").style.color = "black";
            document.getElementById("checkboxLabel").style.color = "black";
            document.getElementById("checkboxLabel").innerHTML = "Light Mode";
            if(document.getElementById("debugLabel")){
                document.getElementById("debugLabel").style.color = "black";
                document.getElementById("debugDiv").style.color = "black";
            }
            document.getElementById("darkModeIMG").src = "./public/img/sunblack.svg";
            break;
        default:
            document.body.style.backgroundColor = "rgb(18,18,19)";
            document.getElementById("title").style.color = "white";
            document.getElementById("checkboxLabel").style.color = "white";
            document.getElementById("checkboxLabel").innerHTML = "Dark Mode";
            if(document.getElementById("debugLabel")){
                document.getElementById("debugLabel").style.color = "white";
                document.getElementById("debugDiv").style.color = "white";
            }
            
            document.getElementById("darkModeIMG").src = "./public/img/moonwhite.svg";
            letterContainersCollection.map((obj) => {
                document.getElementById(obj).style.color = "white";
                document.getElementById(obj).style.backgroundColor = "rgb(34, 34, 34)";
            })
            break;
    }
}

const switchDarkMode = () => {
    if(darkMode == "null"){
        localStorage.setItem("darkMode", true);
    } else if (darkMode == "true"){
        localStorage.setItem("darkMode", false);
    } else if(darkMode == "false"){
        localStorage.setItem("darkMode", true);
    }
    darkMode = localStorage.getItem("darkMode");
    applyStyle();
}

//Invocación para igualar los estilos al valor del localStorage al inicializar la app

darkModeFromStorage();

///////////////////////////////////////////////////////////////////////
//Debug Mode

let debug = false;

const switchDebug = () => {
    if(!debug){
        document.getElementById("debugDiv").innerHTML = `La palabra es "${word}"`;
        document.getElementById("debugDiv").style.visibility = "visible";
        debug = true;
    } else {
        document.getElementById("debugDiv").style.visibility = "hidden";
        debug = false;
    }
}

///////////////////////////////////////////////////////////////////////
//Clickear el botón apretando enter

const handleEnter = (e) => {
    {e.keyCode === 13 ? document.getElementById("btn").click() : null}
};

///////////////////////////////////////////////////////////////////////
//Chequeo del cumplimiento de las reglas para la palabra ingresada (5 letras, sin espacios)

const checkWord = () => {
    let input = "";
    input = document.getElementById("textInput").value;
    input = input.toLowerCase();

    if(input === ""){
        Toastify({
            text: "Ingrese una palabra.",
            gravity: "top",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #E80D00, #FF8D70)",
              }
        }).showToast();
    } else if(input.search(" ") !== -1){
        Toastify({
            text: "No ingrese espacios.",
            gravity: "top",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #E80D00, #FF8D70)",
              }
        }).showToast();
    } else if(input.length !== 5){
        Toastify({
            text: "Ingrese una palabra de 5 letras.",
            gravity: "top",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #E80D00, #FF8D70)",
              }
        }).showToast();
    } else {
        return true;
    }
};

///////////////////////////////////////////////////////////////////////
//Comparación de la palabra ingresada con la palabra objetivo

finalCheck = [{
    letter: null,
    isInWord: false,
    rightPos: false,
},{
    letter: null,
    isInWord: false,
    rightPos: false,
},{
    letter: null,
    isInWord: false,
    rightPos: false,
},{
    letter: null,
    isInWord: false,
    rightPos: false,
},{
    letter: null,
    isInWord: false,
    rightPos: false,
}];

const compareWord = () => {
    let input = "";
    input = document.getElementById("textInput").value;
    input = input.toLowerCase();

    let splitArray = input.split(``);

    splitArray.map((obj, index) => {
        finalCheck[index].letter = obj;
        if(word.search(obj) !== -1){
            finalCheck[index].isInWord = true;
            if(word.charAt(index) === obj){
                finalCheck[index].rightPos = true;
            }
        } else {
            notInWordCollection.push(obj);
        }
    })
    }

///////////////////////////////////////////////////////////////////////
//Modificación del DOM para reflejar visualmente aciertos/fallos

const paintWordle = (row) => {

    //first character

    document.getElementById(`${row}1`).innerHTML = finalCheck[0].letter;
    if(finalCheck[0].rightPos === true){
        document.getElementById(`${row}1`).style.backgroundColor = "rgb(106,170,100)";
    } else if (finalCheck[0].isInWord === true) {
        document.getElementById(`${row}1`).style.backgroundColor = "rgb(201,180,88)";
    } else {
        document.getElementById(`${row}1`).style.color = "grey";
    }

    //second character

    document.getElementById(`${row}2`).innerHTML = finalCheck[1].letter;
    if(finalCheck[1].rightPos === true){
        document.getElementById(`${row}2`).style.backgroundColor = "rgb(106,170,100)";
    } else if (finalCheck[1].isInWord === true) {
        document.getElementById(`${row}2`).style.backgroundColor = "rgb(201,180,88)";
    } else {
        document.getElementById(`${row}2`).style.color = "grey";
    }

    //third character

    document.getElementById(`${row}3`).innerHTML = finalCheck[2].letter;
    if(finalCheck[2].rightPos === true){
        document.getElementById(`${row}3`).style.backgroundColor = "rgb(106,170,100)";
    } else if (finalCheck[2].isInWord === true) {
        document.getElementById(`${row}3`).style.backgroundColor = "rgb(201,180,88)";
    } else {
        document.getElementById(`${row}3`).style.color = "grey";
    }

    //fourth character

    document.getElementById(`${row}4`).innerHTML = finalCheck[3].letter;
    if(finalCheck[3].rightPos === true){
        document.getElementById(`${row}4`).style.backgroundColor = "rgb(106,170,100)";
    } else if (finalCheck[3].isInWord === true) {
        document.getElementById(`${row}4`).style.backgroundColor = "rgb(201,180,88)";
    } else {
        document.getElementById(`${row}4`).style.color = "grey";
    }

    //fifth character

    document.getElementById(`${row}5`).innerHTML = finalCheck[4].letter;
    if(finalCheck[4].rightPos === true){
        document.getElementById(`${row}5`).style.backgroundColor = "rgb(106,170,100)";
    } else if (finalCheck[4].isInWord === true) {
        document.getElementById(`${row}5`).style.backgroundColor = "rgb(201,180,88)";
    } else {
        document.getElementById(`${row}5`).style.color = "grey";
    }

    notInWordCollection.map((obj) => {
        document.getElementById(`${obj}`).style.backgroundColor = "rgb(34, 34, 34)";
        document.getElementById(`${obj}`).style.color = "rgb(179, 179, 179)";
    })

    finalCheck.map((obj) => {
        if(obj.isInWord === true){
            document.getElementById(`${obj.letter}`).style.backgroundColor = "rgb(201,180,88)";
        } else if(obj.rightPos === true){
            document.getElementById(`${obj.letter}`).style.backgroundColor = "rgb(106,170,100)";
        }
    })

    currentTry = row;
}

let currentTry = 0;

const updateWordle = () => {
    switch(currentTry){
        case 0:
            paintWordle(1);
            break;
        case 1:
            paintWordle(2);
            break;
        case 2:
            paintWordle(3);
            break;
        case 3:
            paintWordle(4);
            break;
        case 4:
            paintWordle(5);
            break;
        case 5:
            paintWordle(6);
            break;
        case 6:
            Toastify({
                text: "Usaste todos tus intentos :(",
                gravity: "top",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #E80D00, #FF8D70)",
                  }
            }).showToast();
            let losses = localStorage.getItem("losses");
            if(losses === null){
                localStorage.setItem("losses", 1);
            } else {
                localStorage.setItem("losses", parseInt(losses) + 1);
            }
            break;
    }
}

///////////////////////////////////////////////////////////////////////
// Función integral

const Wordle = () => {
    let input = "";
    input = document.getElementById("textInput").value;
    input = input.toLowerCase();

    if(checkWord()){
        compareWord();
        updateWordle();
        if(input === word){
            Toastify({
                text: "Adivinaste la palabra!",
                gravity: "top",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                  }
            }).showToast();
            let wins = localStorage.getItem("wins");
            {wins === null ? localStorage.setItem("wins", 1) : localStorage.setItem("wins", parseInt(wins) + 1)}
        }
        document.getElementById("textInput").value = "";
    }
    finalCheck = [{
        letter: null,
        isInWord: false,
        rightPos: false,
    },{
        letter: null,
        isInWord: false,
        rightPos: false,
    },{
        letter: null,
        isInWord: false,
        rightPos: false,
    },{
        letter: null,
        isInWord: false,
        rightPos: false,
    },{
        letter: null,
        isInWord: false,
        rightPos: false,
    }];
}