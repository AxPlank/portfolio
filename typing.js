"use strict"

let i = 0;
let languages = [
    "Web Developer",
    "Javascript",
    "SQL",
    "Python"
];
const wait = (time) => {
    const wait = new Promise((resolve) => {
        setTimeout(resolve, time);
    });

    return wait;
}

const remove = async () => {
    await wait(1000);

    let language = languages[i].split("");

    while (language.length) {
        language.pop();
        document.getElementById("typing").innerHTML = language.join("");
        await wait(200);
    }

    document.getElementById("typing").innerHTML = "";

    i = !languages[i+1]? 0 : i+1;

    typing(1000);
}

const typing = async () => {
    await wait(1000);

    let language = languages[i].split("");
    
    while (language.length) {
        document.getElementById("typing").innerHTML += language[0];
        language.shift();
        await wait(200);
    }

    remove();
}

setTimeout(typing(), 0);