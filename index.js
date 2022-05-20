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
//Desarmado de la palabra para tenerla en un array, se separa en objetos que contienen el caracter y el index en el que se encuentra.

let wordArray = [];

const disarmWord = () => {
    let split = word.split(``);
    split.map((char, index) => {
        wordArray.push({char: char, pos: index})
    })
}

disarmWord();

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

finalCheck = [];

const compareWord = () => {
    let input = "";
    input = document.getElementById("textInput").value;
    input = input.toLowerCase();

    let foundInWord = [];

    let splitArray = input.split(``);

    //Detectar que letras se encuentran en ambas palabras

    splitArray.map((char, index) => {
        if(word.search(char) !== -1){
            foundInWord.push({char: char, pos: index})
        } else {
            foundInWord.push({char: char, pos: null});
            if(notInWordCollection.indexOf(char) === -1){
                notInWordCollection.push(char);
            }
        }
    })

    //Saber si la posición de la letra es la correcta

    foundInWord.map((obj, index) => {

         let first = false;

         if(obj.pos !== null){
            for(i = index; i < wordArray.length; i++){
                if(obj.char === wordArray[i].char && first === false){
                    if(index === wordArray[i].pos){
                       finalCheck.push({char: obj.char, pos: index, state: true});
                       first = true;
                    } else {
                       finalCheck.push({char: obj.char, pos: index, state: false});
                       first = true;
                    }
                }
        }
         } else {
            finalCheck.push({char: obj.char, pos: null, state: null});
         }
        })

        console.log(foundInWord);
    }

///////////////////////////////////////////////////////////////////////
//Modificación del DOM para reflejar visualmente aciertos/fallos

const paintWordle = (row) => {
    if(finalCheck[0].pos !== null){
        document.getElementById(`${row}1`).innerHTML = finalCheck[0].char;
        {finalCheck[0].state ? document.getElementById(`${row}1`).style.backgroundColor = "rgb(106,170,100)" : document.getElementById(`${row}1`).style.backgroundColor = "rgb(201,180,88)"}
    } else {
        document.getElementById(`${row}1`).innerHTML = finalCheck[0].char;
        document.getElementById(`${row}1`).style.color = "grey";
    }
    if(finalCheck[1].pos !== null){
        document.getElementById(`${row}2`).innerHTML = finalCheck[1].char;
        {finalCheck[1].state ? document.getElementById(`${row}2`).style.backgroundColor = "rgb(106,170,100)" : document.getElementById(`${row}2`).style.backgroundColor = "rgb(201,180,88)"}
    } else {
        document.getElementById(`${row}2`).innerHTML = finalCheck[1].char;
        document.getElementById(`${row}2`).style.color = "grey";
    }
    if(finalCheck[2].pos !== null){
        document.getElementById(`${row}3`).innerHTML = finalCheck[2].char;
        {finalCheck[2].state ? document.getElementById(`${row}3`).style.backgroundColor = "rgb(106,170,100)" : document.getElementById(`${row}3`).style.backgroundColor = "rgb(201,180,88)"}
    } else {
        document.getElementById(`${row}3`).innerHTML = finalCheck[2].char;
        document.getElementById(`${row}3`).style.color = "grey";
    }
    if(finalCheck[3].pos !== null){
        document.getElementById(`${row}4`).innerHTML = finalCheck[3].char;
        {finalCheck[3].state ? document.getElementById(`${row}4`).style.backgroundColor = "rgb(106,170,100)" : document.getElementById(`${row}4`).style.backgroundColor = "rgb(201,180,88)"}
    } else {
        document.getElementById(`${row}4`).innerHTML = finalCheck[3].char;
        document.getElementById(`${row}4`).style.color = "grey";
    }
    if(finalCheck[4].pos !== null){
        document.getElementById(`${row}5`).innerHTML = finalCheck[4].char;
        {finalCheck[4].state ? document.getElementById(`${row}5`).style.backgroundColor = "rgb(106,170,100)" : document.getElementById(`${row}5`).style.backgroundColor = "rgb(201,180,88)"}
    } else {
        document.getElementById(`${row}5`).innerHTML = finalCheck[4].char;
        document.getElementById(`${row}5`).style.color = "grey";
    }

    notInWordCollection.map((obj) => {
        document.getElementById(`${obj}`).style.backgroundColor = "rgb(34, 34, 34)";
        document.getElementById(`${obj}`).style.color = "rgb(179, 179, 179)";
    })
    finalCheck.map((obj) => {
        if(obj.pos !== null){
            {obj.state ? document.getElementById(`${obj.char}`).style.backgroundColor = "rgb(106,170,100)" : document.getElementById(`${obj.char}`).style.backgroundColor = "rgb(201,180,88)"}
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
    finalCheck = [];
}