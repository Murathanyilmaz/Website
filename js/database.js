let serverLoaded = false;
let serverStep = 0;

setTimeout(function FetchTest () {
    const serverStatus = document.querySelector(".server-status");
    if (serverLoaded) {
        serverStatus.innerHTML = "Server: Online 🟢";
        return;
    }
    let serverText = "Server initializing";
    for (let i = 0; i < serverStep; i++) {
        serverText += ".";
    }
    serverStatus.innerHTML = serverText;
    serverStep++;
    if (serverStep > 3) serverStep = 0;
    setTimeout(FetchTest, 500);
}, 1000);


const messageButton = document.getElementById("messageButton");
messageButton.onclick = PostMessage;

async function PostMessage() {
    let text = document.getElementById("userMessage").value;
    if (!text.replace(/\s+/g, '').length) {
        alert("Enter text");
        return;
    }
    await fetch("https://nodejs-server-c0m3.onrender.com/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    document.getElementById("userMessage").value = "";
    await GetMessages();
}
let messageCount = 0;

async function GetMessages() {
    const res = await fetch("https://nodejs-server-c0m3.onrender.com/messages");
    const data = await res.json();
    if (data.length > 0) {
        console.log(data);
        //const messages = data.map(m => `<span class="messagesList">${m.text}</span>`).join("");
        Object.entries(data).forEach(([key, value], i) => {
            if (messageCount > key) return;
            const msgDiv = document.createElement("div");
            let msgTime = value.createdAt;
            const date = new Date(msgTime);
            const Y = date.getFullYear();
            const M = String(date.getMonth() + 1).padStart(2,'0');
            const D = String(date.getDate()).padStart(2,'0');
            const h = String(date.getHours()).padStart(2,'0');
            const m = String(date.getMinutes()).padStart(2,'0');
            const s = String(date.getSeconds()).padStart(2,'0');

            const formatted = `${Y}-${M}-${D} ${h}:${m}:${s}`;
            console.log(formatted);
            msgDiv.innerHTML = formatted + ":&nbsp;&nbsp;&nbsp;&nbsp;" + value.text;
            msgDiv.classList.add("messageItem");
            document.querySelector(".messagesArea").appendChild(msgDiv);
            messageCount++;
        });
    }
}
GetMessages();
setInterval(() => {
    GetMessages();
}, 1000);

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

/* POST-ECHO YOUR MESSAGE
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
async function GreetUser (userMessage) {
    /*onclick="GreetUser(document.querySelector(`#userInput`).value)*/
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