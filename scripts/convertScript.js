console.log("hello world");

const inputString = document.querySelector('#inputString');
const outputString = document.querySelector('#outputString');
const submitButton = document.querySelector('#submit');

// delete semicolon, wrap rest in quotes
function convertScript() {
    input = inputString.value;

    let convertedInput = "";

    let lastVtuber = "";

    let inputSplit = input.split(/\r?\n/g);
    for (var line of inputSplit) {

        // skip if line is all whitespace
        if (line.trim().length === 0) {
            continue;
        }

        let convertedLine = line;

        // find semicolon
        for (let i = 0; i < line.length; i++) {
            let c = line.charAt(i);
            if (c == ':') {
                let currentVtuber = line.substring(0, i);
                let currentVtuberLower = currentVtuber.toLowerCase();
                
                // who current char if necessary
                if (currentVtuber !== lastVtuber) {
                    convertedInput += "show " + currentVtuberLower + " normal\n";
                }

                // hide prev model if necessary
                if (currentVtuber !== lastVtuber && lastVtuber !== "") {
                    convertedInput += "hide " + lastVtuber + "\n";
                } 
                
                convertedLine = currentVtuber + " \"" + line.substring(i+2, line.length) + "\"";

                lastVtuber = currentVtuberLower;

                break;

            } else if (i >= line.length - 1) { // if not semicolon and reached the end
                convertedLine = "\"" + line + "\"";
            }
        }

        convertedInput += (convertedLine + "\n\n");
    }

    


    outputString.value = convertedInput;
}


submitButton.onclick = convertScript;

