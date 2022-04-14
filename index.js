///////////////////////////////////////////////////////////////////////
//Colecciones

const letterContainersCollection = ["11", "12", "13", "14", "15", "21", "22", "23", "24", "25", "31", "32", "33", "34", "35", "41", "42", "43", "44", "45", "51", "52", "53", "54", "55"]

const wordCollection = ["queso", "cubos", "palos", "cenar", "coder", "jugos", "cobra", "cazar", "opalo", "pizza", "apaga", "arder", "bayas"];

let notInWordCollection = [];

let word = "queso";

///////////////////////////////////////////////////////////////////////
//Elección de la palabra al azar

const chooseWord = () => {
    min = Math.ceil(0);
    max = Math.floor(wordCollection.length);
    let randomNum = Math.floor(Math.random() * (max - min) + min);
    word = wordCollection[randomNum];
}

chooseWord();

///////////////////////////////////////////////////////////////////////
//Dark Mode

let darkMode = true;

const switchDarkMode = () => {
    if(darkMode){
        document.body.style.backgroundColor = "white";
        document.getElementById("title").style.color = "black";
        document.getElementById("checkboxLabel").style.color = "black";
        document.getElementById("debugLabel").style.color = "black";
        document.getElementById("debugDiv").style.color = "black";
        letterContainersCollection.map((obj) => {
            document.getElementById(obj).style.backgroundColor = "grey";
            
        })
        darkMode = false;
    } else {
        document.body.style.backgroundColor = "rgb(41, 40, 40)";
        document.getElementById("title").style.color = "white";
        document.getElementById("checkboxLabel").style.color = "white";
        document.getElementById("debugDiv").style.color = "white";
        letterContainersCollection.map((obj) => {
            document.getElementById(obj).style.color = "white";
            document.getElementById(obj).style.backgroundColor = "rgb(34, 34, 34)";
        })
        darkMode = true;
    }
}

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

let handleEnter = (e) => {
    if (e.keyCode === 13) {
    return document.getElementById("btn").click();
    }
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
        alert("Ingrese una palabra.")
    } else if(input.search(" ") !== -1){
        alert("No ingrese espacios.")
    } else if(input.length !== 5){
        alert("Ingrese una palabra de 5 letras.")
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
    }

///////////////////////////////////////////////////////////////////////
//Modificación del DOM para reflejar visualmente aciertos/fallos

const paintWordle = (row) => {
    if(finalCheck[0].pos !== null){
        document.getElementById(`${row}1`).innerHTML = finalCheck[0].char;
        if(finalCheck[0].state){
            document.getElementById(`${row}1`).style.backgroundColor = "rgb(106,170,100)";
        } else if(!finalCheck[0].state){
            document.getElementById(`${row}1`).style.backgroundColor = "rgb(201,180,88)";
        }
    } else {
        document.getElementById(`${row}1`).innerHTML = finalCheck[0].char;
        document.getElementById(`${row}1`).style.color = "grey";
    }
    if(finalCheck[1].pos !== null){
        document.getElementById(`${row}2`).innerHTML = finalCheck[1].char;
        if(finalCheck[1].state){
            document.getElementById(`${row}2`).style.backgroundColor = "rgb(106,170,100)";
        } else if(!finalCheck[1].state){
            document.getElementById(`${row}2`).style.backgroundColor = "rgb(201,180,88)";
        }
    } else {
        document.getElementById(`${row}2`).innerHTML = finalCheck[1].char;
        document.getElementById(`${row}2`).style.color = "grey";
    }
    if(finalCheck[2].pos !== null){
        document.getElementById(`${row}3`).innerHTML = finalCheck[2].char;
        if(finalCheck[2].state){
            document.getElementById(`${row}3`).style.backgroundColor = "rgb(106,170,100)";
        } else if(!finalCheck[2].state){
            document.getElementById(`${row}3`).style.backgroundColor = "rgb(201,180,88)";
        }
    } else {
        document.getElementById(`${row}3`).innerHTML = finalCheck[2].char;
        document.getElementById(`${row}3`).style.color = "grey";
    }
    if(finalCheck[3].pos !== null){
        document.getElementById(`${row}4`).innerHTML = finalCheck[3].char;
        if(finalCheck[3].state){
            document.getElementById(`${row}4`).style.backgroundColor = "rgb(106,170,100)";
        } else if(!finalCheck[3].state){
            document.getElementById(`${row}4`).style.backgroundColor = "rgb(201,180,88)";
        }
    } else {
        document.getElementById(`${row}4`).innerHTML = finalCheck[3].char;
        document.getElementById(`${row}4`).style.color = "grey";
    }
    if(finalCheck[4].pos !== null){
        document.getElementById(`${row}5`).innerHTML = finalCheck[4].char;
        if(finalCheck[4].state){
            document.getElementById(`${row}5`).style.backgroundColor = "rgb(106,170,100)";
        } else if(!finalCheck[4].state){
            document.getElementById(`${row}5`).style.backgroundColor = "rgb(201,180,88)";
        }
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
            if(obj.state){
                document.getElementById(`${obj.char}`).style.backgroundColor = "rgb(106,170,100)";
            } else {
                document.getElementById(`${obj.char}`).style.backgroundColor = "rgb(201,180,88)";
            }
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
                alert("Usaste todos tus intentos!");
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
            alert("Adivinaste la palabra!");
        }
        document.getElementById("textInput").value = "";
    }
    finalCheck = [];
}