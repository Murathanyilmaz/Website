const serverStatus = document.querySelector(".server-status");
const inputArea = document.querySelector(".inputArea");
const messagesArea = document.querySelector(".messagesArea");

let serverLoaded = false;
let serverStep = 0;
let animationTimeout;
const SOCKET_SERVER_URL = "https://nodejs-server-c0m3.onrender.com";
const socket = io(SOCKET_SERVER_URL);

AnimateLoading();
socket.on("connect", () => {
    serverLoaded = true;
    clearTimeout(animationTimeout);
    serverStatus.innerHTML = "Server: Online 🟢";
    inputArea.classList.remove("hidden");
    GetHistoricalMessages();
});
socket.on("disconnect", () => {
    serverLoaded = false; 
    serverStatus.innerHTML = "Server: Offline 🔴";
    inputArea.classList.add("hidden"); 
});
socket.on("reconnecting", () => {
    serverLoaded = false; 
    serverStatus.innerHTML = "Reconnecting";
    inputArea.classList.add("hidden");
    AnimateLoading();
});
socket.on("connect_error", (err) => {
    console.error("Socket Connection Error:", err.message);
    serverStatus.innerHTML = "Server: Error 🟠";
});
socket.on("message", (savedMessage) => {
    DisplayMessages(savedMessage); 
});

function AnimateLoading () {
    console.log("here");
    if (serverLoaded) {
        serverStatus.innerHTML = "Server: Online 🟢";
        return;
    }
    let serverText = "Connecting server";
    for (let i = 0; i < serverStep; i++) {
        serverText += ".";
    }
    serverStatus.innerHTML = serverText;
    serverStep++;
    if (serverStep > 3) serverStep = 0;
    animationTimeout = setTimeout(AnimateLoading, 500);
}

const messageButton = document.getElementById("messageButton");
messageButton.onclick = PostMessage;

async function PostMessage() {
    let text = document.getElementById("userMessage").value;
    if (!text.replace(/\s+/g, '').length) {
        alert("Enter text");
        return;
    }
    socket.emit("message", text); 
    document.getElementById("userMessage").value = "";
}

function DisplayMessages(messageData) {
    const msgDiv = document.createElement("div");
    let msgTime = messageData.createdAt; 
    const date = new Date(msgTime);
    const Y = date.getFullYear();
    const M = String(date.getMonth() + 1).padStart(2,'0');
    const D = String(date.getDate()).padStart(2,'0');
    const h = String(date.getHours()).padStart(2,'0');
    const m = String(date.getMinutes()).padStart(2,'0');
    const s = String(date.getSeconds()).padStart(2,'0');
    
    const formatted = `${Y}-${M}-${D} ${h}:${m}:${s}`;
    
    msgDiv.innerHTML = formatted + ":&nbsp;&nbsp;&nbsp;&nbsp;" + messageData.text;
    msgDiv.classList.add("messageItem");
    
    // Append to show newest messages at the bottom
    messagesArea.appendChild(msgDiv); 
    messagesArea.scrollTop = messagesArea.scrollHeight; // Auto-scroll to bottom
}

async function GetHistoricalMessages() {
    try {
        const res = await fetch(`${SOCKET_SERVER_URL}/messages`);
        const data = await res.json();
        messagesArea.innerHTML = ''; 
        //data.reverse().forEach(displayMessage); // Reverse to display oldest on top
        data.forEach(DisplayMessages); // Reverse to display oldest on top
    } catch (err) {
        console.error("Failed to load historical messages:", err);
    }
}


//ROOT SERVER COMMAND
fetch("https://nodejs-server-c0m3.onrender.com")
    .then(res => {
        return res.json();
    })
    .then(data => {
        serverLoaded = true;
        document.querySelector(".inputArea").classList.remove("hidden");
    })
    .catch(err => console.error(err));

/* 
async function GreetUser (userMessage) {
    onclick="GreetUser(document.querySelector(`#userInput`).value)
    userMessage = userMessage.split(" ").join("");
    if (!userMessage) {
        alert("Enter text");
    }
    else {
        await fetch("https://nodejs-server-c0m3.onrender.com/greet?name=" + userMessage)
        .then(res => res.json())
        .then(data => {
            alert(data.message);
        });
    }
}

POST-ECHO YOUR MESSAGE
fetch("https://nodejs-server-c0m3.onrender.com/echo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        name: "murathanyilmaz.net",
        type: "website",
        author: "Murathan",
        index: 0,
        })
    })
    .then(res => res.json())
    .then(data => {
        Object.entries(data.youSent).forEach(([key, value], i) => {
            console.log(`${key}: ${value}`);
        });
    });
*/