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
    const text = document.getElementById("userMessage").value;

    await fetch("https://nodejs-server-c0m3.onrender.com/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    document.getElementById("userMessage").value = "";
    await GetMessage();
}

async function GetMessage() {
    const res = await fetch("https://nodejs-server-c0m3.onrender.com/messages");
    const data = await res.json();

    document.getElementById("msgList").innerHTML = data.map(m => `<li>${m.text}</li>`).join("");
}


app.post("/message", async (req, res) => {
    try {
        const msg = await Message.create({ text: req.body.text });
        res.json({ success: true, message: msg });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/messages", async (req, res) => {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
});


//ROOT SERVER COMMAND
fetch("https://nodejs-server-c0m3.onrender.com")
    .then(res => {
        return res.json();
    })
    .then(data => {
        serverLoaded = true;
        document.querySelector(".inputArea").classList.remove("hidden");
        console.log("Hi");
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