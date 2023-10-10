let string = "";
let inputField = document.querySelector('input');
let buttons = document.querySelectorAll('.button');

function updateInputField() {
    inputField.value = string;
}

function handleButtonClick(e) {
    let buttonValue = e.target.innerHTML;

    if (buttonValue === "=") {
        try {
            string = eval(string);
        } catch (error) {
            string = "Error";
        }
    } else if (buttonValue === "AC") {
        string = "";
    } else if (buttonValue === "DEL") {
        string = string.slice(0, string.length - 1);
    } else if (buttonValue === "%") {
        string = string / 100;
    } else {
        string += buttonValue;
    }

    updateInputField();
}

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', handleButtonClick);
});


function handleKeyboardEvent(event) {
    let keyName = event.key;

    if (keyName === "=" || event.keyCode === 13) {
        event.preventDefault();
        try {
            string = eval(string);
        } catch (error) {
            string = "Error";
        }
    } 
    else if(event.keyCode === 16 || event.keyCode === 17  || event.keyCode === 18){
        event.preventDefault();
    }
    else if (keyName === "a") {
        string = "";
    } else if (keyName === "d" || event.keyCode === 8) {
        event.preventDefault(); 
        string = string.slice(0, string.length - 1);
    } else if (keyName === "%") {
        string = string / 100;
    } else {
        if (!keyName.match(/[0-9]*[\+\-\*\/\.]*[0-9]*/)) {
            alert("Enter a valid expression");
        } else {
            string += keyName;
        }
    }

    updateInputField();
}
document.addEventListener('keydown', handleKeyboardEvent);
