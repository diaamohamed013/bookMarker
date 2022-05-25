var markerName = document.getElementById("bookmarkerName");
var siteUrl = document.getElementById("websiteUrl");
var input1 = document.getElementById("input1");
var input2 = document.getElementById("input2");



var bookContainer;
if (localStorage.getItem("books") == null) {
    bookContainer = [];
}
else {
    bookContainer = JSON.parse(localStorage.getItem("books"));
    displayBook();
}
function addBookName() {
    if (validateName() && validateSiteURL()) {
        var book = {
            nameMarker: markerName.value,
            webSiteURL: siteUrl.value
        };
        bookContainer.push(book);
        localStorage.setItem("books", JSON.stringify(bookContainer));
        displayBook();
        markerName.classList.remove("is-valid");
        siteUrl.classList.remove("is-valid");
        clearForm();
    }
    // else{
    //     markerName.classList.add("is-invalid");
    //     input1.classList.replace("d-none", "d-block");
    //     siteUrl.classList.add("is-invalid");
    //     input2.classList.replace("d-none", "d-block");
    // }

};

function displayBook() {
    var cartona = ``;
    for (var i = 0; i < bookContainer.length; i++) {
        cartona += `
                    <tr>
                        <td>${bookContainer[i].nameMarker}</td>
                        <td><a href = "https://${bookContainer[i].webSiteURL}"  target = "_blank" class="btn btn-blue">Visit</a></td>
                        <td><button class="btn btn-danger" onclick="deleteBook(${i})">Delete</button></td>
                    </tr>
        `
    }
    document.getElementById("myTable").innerHTML = cartona;
};

function deleteBook(index) {
    bookContainer.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(bookContainer));
    displayBook();
}

function validateName() {
    var rgex = /^[a-z]{3,15}$/i
    if (rgex.test(markerName.value)) {
        markerName.classList.replace("is-invalid", "is-valid");
        input1.classList.add("d-none");
        return true;
    }
    else {
        markerName.classList.add("is-invalid");
        input1.classList.replace("d-none", "d-block");
        return false;
    }
}
function validateSiteURL() {
    var rgex1 = /^([a-z]|[A-Z]){3,15}(\.com|\.net)$/
    if (rgex1.test(siteUrl.value)) {
        siteUrl.classList.replace("is-invalid", "is-valid");
        input2.classList.add("d-none");
        return true;
    }
    else {
        siteUrl.classList.add("is-invalid");
        input2.classList.replace("d-none", "d-block");
        return false;
    }
}

function clearForm() {
    markerName.value = " ";
    siteUrl.value = " ";
}

