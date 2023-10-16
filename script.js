let string = "";
let inputField = document.querySelector('input');
let buttons = document.querySelectorAll('.button');
let historyTextArea = document.querySelector('textarea');
let deleteHistoryButton = document.createElement('button'); // Create a Delete History button

// Initialize history array
let history = [];

function updateInputField() {
    inputField.value = string;
}

function updateHistoryTextarea() {
    historyTextArea.value = history.join('\n');
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
}

function handleButtonClick(e) {
    let buttonValue = e.target.innerHTML;

    if (buttonValue === "=") {
        try {
            const result = eval(string);
            history.push(`${string} = ${result}`);
            string = result;
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
    updateHistoryTextarea();
}

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', handleButtonClick);
});

function handleKeyboardEvent(event) {
    let keyName = event.key;

    if (keyName === "=" || event.keyCode === 13) {
        event.preventDefault();
        try {
            const result = eval(string);
            history.push(`${string} = ${result}`);
            string = result;
        } catch (error) {
            string = "Error";
        }
    } else if (event.keyCode === 16 || event.keyCode === 17 || event.keyCode === 18) {
        event.preventDefault();
    } else if (keyName === "a") {
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
    updateHistoryTextarea();
}

// Load history from local storage
history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];

// Create a "Delete History" button
deleteHistoryButton.textContent = 'Delete History';
deleteHistoryButton.addEventListener('click', function () {
    history = [];
    updateHistoryTextarea();
    localStorage.removeItem('calculatorHistory');
});

// Append the Delete History button to the second container
document.querySelector('.second.container').appendChild(deleteHistoryButton);

document.addEventListener('keydown', handleKeyboardEvent);
updateHistoryTextarea(); // Update history textarea on page load
