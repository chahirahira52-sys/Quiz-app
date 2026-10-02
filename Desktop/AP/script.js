
const write = document.getElementById("write");
const search = document.getElementById("search");
const list = document.getElementById("list");

let found = false;
let writeValue = null;
let userData;

// Search
function Search() {
    found = false;
    writeValue = write.value;
    list.textContent = "";

    if (writeValue === "") {
        list.textContent = "No User Found";
        return;
    }

    userData.forEach(function(person) {
        if (
            person.name.toLowerCase().includes(writeValue.toLowerCase()) ||
            person.username.toLowerCase().includes(writeValue.toLowerCase()) ||
            person.email.toLowerCase().includes(writeValue.toLowerCase())
        ) {
            found = true;

            const li = document.createElement("li");

            const h3 = document.createElement("h3");
            h3.textContent = `Name: ${person.name}`;
            li.appendChild(h3);

            const p = document.createElement("p");
            p.textContent = `Username: ${person.username}`;
            li.appendChild(p);

            const pp = document.createElement("p");
            pp.textContent = `Email: ${person.email}`;
            li.appendChild(pp);

            const ppp = document.createElement("p");
            ppp.textContent = `ID: ${person.id}`;
            li.appendChild(ppp);

            list.appendChild(li);
        }
    });

    if (found === false) {
        list.textContent = "No user found";
    }
}

search.addEventListener("click", Search);


// Loading
list.textContent = "Loading...";


// Fetch users
async function getUsers() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        console.log(response.ok);
        console.log(response.status);

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();

        userData = data;
        list.textContent = "";

        data.forEach(function(person) {
            const li = document.createElement("li");

            const h3 = document.createElement("h3");
            h3.textContent = `Name: ${person.name}`;
            li.appendChild(h3);

            const p = document.createElement("p");
            p.textContent = `Username: ${person.username}`;
            li.appendChild(p);

            const pp = document.createElement("p");
            pp.textContent = `Email: ${person.email}`;
            li.appendChild(pp);

            const ppp = document.createElement("p");
            ppp.textContent = `ID: ${person.id}`;
            li.appendChild(ppp);

            list.appendChild(li);
        });

    } catch (error) {
        console.log(error);
        list.textContent = "Failed to load users";
    }
}

getUsers();