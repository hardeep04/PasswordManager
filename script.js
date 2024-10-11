function maskPassword(pass) {
    return "*".repeat(pass.length); // Simplified password masking
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(() => {
        document.getElementById("alert").style.display = "inline";
        setTimeout(() => {
            document.getElementById("alert").style.display = "none";
        }, 2000);
    }).catch(() => {
        alert("Clipboard copying failed");
    });
}


const showToast = (message) => {
    const toastBody = document.querySelector('.toast-body');
    toastBody.textContent = message;

    const toast = new bootstrap.Toast(document.getElementById('toast'));
    toast.show();
};


const deletePassword = (index) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);

    // Remove the password at the specific index
    arr.splice(index, 1);

    localStorage.setItem("passwords", JSON.stringify(arr));
    showToast("Password deleted");
    showPasswords();
}

const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No Passwords";
    } else {
        tb.innerHTML = `<tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>`;
        
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `<tr>
                <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy Button" width="10" height="10"></td>
                <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy Button" width="10" height="10"></td>
                <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy Button" width="10" height="10"></td>
                <td><button class="btnsm" onclick="deletePassword(${index})">Delete</button></td>
            </tr>`;
        }
        tb.innerHTML += str;
    }
    website.value = "";
    username.value = "";
    password.value = "";
}


document.getElementById("passwordForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const website = document.getElementById("website").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let passwords = JSON.parse(localStorage.getItem("passwords") || "[]");
    passwords.push({ website, username, password });
    localStorage.setItem("passwords", JSON.stringify(passwords));

    showToast("Password Saved");
    showPasswords();
    document.getElementById("passwordForm").reset();
});

showPasswords();
