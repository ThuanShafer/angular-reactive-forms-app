const names =  [
    "Aardvark",
    "Albatross",
    "Alligator",
    "Alpaca",
    "Ant",
    "Anteater",
    "Antelope",
    "Ape",
    "Armadillo",
    "Donkey",
    "Baboon",
    "Badger",
    "Barracuda",
    "Bat",
    "Bear",
    "Beaver",
    "Bee",
    "Bison",
    "Boar",
    "Buffalo",
    "Butterfly",
    "Camel",
    "Capybara",
    "Caribou",
    "Cassowary",
    "Cat",
    "Caterpillar",
    "Cattle",
    "Chamois",
    "Cheetah",
    "Chicken",
    "Chimpanzee",
    "Chinchilla",
    "Chough",
    "Clam",
    "Cobra",
    "Cockroach",
    "Cod",
    "Cormorant",
    "Coyote",
    "Crab",
    "Crane",
    "Crocodile",
    "Crow",
    "Curlew",
    "Deer",
    "Dinosaur",
    "Dog",
    "Dogfish",
    "Dolphin",
    "Dotterel",
    "Dove",
    "Dragonfly",
    "Duck",
    "Dugong",
    "Dunlin",
    "Eagle",
    "Echidna",
    "Eel",
    "Eland",
    "Elephant",
    "Elk",
    "Emu",
    "Falcon",
    "Ferret",
    "Finch",
    "Fish",
    "Flamingo",
    "Fly",
    "Fox",
    "Frog",
    "Gaur",
    "Gazelle",
    "Gerbil",
    "Giraffe",
    "Gnat",
    "Gnu",
    "Goat",
    "Goldfinch",
    "Goldfish",
    "Goose",
    "Gorilla",
    "Goshawk",
    "Grasshopper",
    "Grouse",
    "Guanaco",
    "Gull",
    "Hamster",
    "Hare",
    "Hawk",
    "Hedgehog",
    "Heron",
    "Herring",
    "Hippopotamus",
    "Hornet",
    "Horse",
    "Human",
    "Hummingbird",
    "Hyena",
    "Ibex",
    "Ibis",
    "Jackal",
    "Jaguar",
    "Jay",
    "Jellyfish",
    "Kangaroo",
    "Kingfisher",
    "Koala",
    "Kookabura",
    "Kouprey",
    "Kudu",
    "Lapwing",
    "Lark",
    "Lemur",
    "Leopard",
    "Lion",
    "Llama",
    "Lobster",
    "Locust",
    "Loris",
    "Louse",
    "Lyrebird",
    "Magpie",
    "Mallard",
    "Manatee",
    "Mandrill",
    "Mantis",
    "Marten",
    "Meerkat",
    "Mink",
    "Mole",
    "Mongoose",
    "Monkey",
    "Moose",
    "Mosquito",
    "Mouse",
    "Mule",
    "Narwhal",
    "Newt",
    "Nightingale",
    "Octopus",
    "Okapi",
    "Opossum",
    "Oryx",
    "Ostrich",
    "Otter",
    "Owl",
    "Oyster",
    "Panther",
    "Parrot",
    "Partridge",
    "Peafowl",
    "Pelican",
    "Penguin",
    "Pheasant",
    "Pig",
    "Pigeon",
    "Pony",
    "Porcupine",
    "Porpoise",
    "Quail",
    "Quelea",
    "Quetzal",
    "Rabbit",
    "Raccoon",
    "Rail",
    "Ram",
    "Rat",
    "Raven",
    "Red deer",
    "Red panda",
    "Reindeer",
    "Rhinoceros",
    "Rook",
    "Salamander",
    "Salmon",
    "Sand Dollar",
    "Sandpiper",
    "Sardine",
    "Scorpion",
    "Seahorse",
    "Seal",
    "Shark",
    "Sheep",
    "Shrew",
    "Skunk",
    "Snail",
    "Snake",
    "Sparrow",
    "Spider",
    "Spoonbill",
    "Squid",
    "Squirrel",
    "Starling",
    "Stingray",
    "Stinkbug",
    "Stork",
    "Swallow",
    "Swan",
    "Tapir",
    "Tarsier",
    "Termite",
    "Tiger",
    "Toad",
    "Trout",
    "Turkey",
    "Turtle",
    "Viper",
    "Vulture",
    "Wallaby",
    "Walrus",
    "Wasp",
    "Weasel",
    "Whale",
    "Wildcat",
    "Wolf",
    "Wolverine",
    "Wombat",
    "Woodcock",
    "Woodpecker",
    "Worm",
    "Wren",
    "Yak",
    "Zebra"
]

async function getChatData() {
    const chatUrl = "/api/v1/chat/data";
    const chatUrlApiOptions = { method: "GET" };
    const chatUrlResponse = await fetch(chatUrl, chatUrlApiOptions);
    const chatJson = await chatUrlResponse.json();
    return chatJson;
}

async function addChatDataElement(name, message) {
    const chatUrl = "/api/v1/chat/data";
    const chatUrlApiOptions = { method: "POST", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name, message: message }) };
    const chatUrlResponse = await fetch(chatUrl, chatUrlApiOptions);
    const chatJson = await chatUrlResponse.json();
    return chatJson;
}

async function clearChatData() {
    const chatUrl = "/api/v1/chat/data";
    const chatUrlApiOptions = { method: "DELETE", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } };
    const chatUrlResponse = await fetch(chatUrl, chatUrlApiOptions);
    const chatJson = await chatUrlResponse.json();
    return chatJson;
}

async function getChatNumVisitors() {
    const chatUrl = "/api/v1/chat/numvisitors";
    const chatUrlApiOptions = { method: "GET" };
    const chatUrlResponse = await fetch(chatUrl, chatUrlApiOptions);
    const chatJson = await chatUrlResponse.json();
    return chatJson;
}

async function updateChatNumVisitors(num) {
    const chatUrl = `/api/v1/chat/numvisitors/${num}`;
    const chatUrlApiOptions = { method: "PUT", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } };
    const chatUrlResponse = await fetch(chatUrl, chatUrlApiOptions);
    const chatJson = await chatUrlResponse.json();
    return chatJson;
}

function addDivToChatArea(name, message) {
    const $chatArea = document.getElementById("chatArea");
    const $div = document.createElement('div');
    $div.className = "chatArea__text";
    $div.innerHTML = `<strong>${name}</strong>: ${message}`;
    // $div.textContent = `${name}: ${message}`;
    $chatArea.appendChild($div);
    // $chatArea.scrollTop = $chatArea.scrollHeight;
}

function sendCurrentChatMessage() {
    const $name = document.getElementById("inputArea__name").value;
    const $message = document.getElementById("inputArea__message").value;
    addChatDataElement($name, $message);
    addDivToChatArea($name, $message);
    document.getElementById("inputArea__message").value = "";
}

function inputAreaMessageKeyPressed() {
    var key = window.event.keyCode;
    if (key === 13) {
        sendCurrentChatMessage();
        event.preventDefault();
        return false;
    }
    else {
        return true;
    }
}

function assignRandomName() {
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
}

var prevChatDataLength;

window.addEventListener('DOMContentLoaded', async () => {
    setInterval(async function () {
        const chatData = await getChatData();
        const $chatArea = document.getElementById("chatArea");
        $chatArea.textContent = '';
        for (let i = 0; i < chatData.length; ++i) {
            addDivToChatArea(chatData[i].name, chatData[i].message);
        }
        if (prevChatDataLength !== chatData.length)
            $chatArea.scrollTop = $chatArea.scrollHeight;
        prevChatDataLength = chatData.length;
    }, 100);

    let anonymousAnimal = await assignRandomName();
    await updateChatNumVisitors(anonymousAnimal);
    let $name = document.getElementById("inputArea__name");
    $name.textContent = `Anonymous ${anonymousAnimal}`;

    //send button listener
    const $sendButton = document.querySelector("#inputArea__sendButton");
    $sendButton.addEventListener('click', (out) => {
        sendCurrentChatMessage();
    });
    
    const messageTextarea = document.getElementById('inputArea__message');
    const sendButton = document.getElementById('inputArea__sendButton');
    
    messageTextarea.addEventListener('input', () => {
        sendButton.disabled = !messageTextarea.value.trim();
    });
    
    // Handle the Enter key behavior
    messageTextarea.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (messageTextarea.value.trim()) {
                event.preventDefault();
            }
        }
    });
});
