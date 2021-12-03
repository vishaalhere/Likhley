console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", func1);

//func 1 defined
function func1(e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  let title = localStorage.getItem("title");

  if (notes == null && title == null) {
    Array.notesObj = [];
    Array.notesTitle = [];
  } else {
    notesObj = JSON.parse(notes);
    notesTitle = JSON.parse(title);
  }
  check();
  function check(e) {
    if (addTxt.value == "" && addTitle.value == "") {
      alert("Please Write Something in Title or Notes Area to add a Note!!");
      // let alert_warning = document.getElementById("header");
      // alert_warning.appendChild(warning);
    } 
    else {
      notesObj.push(addTxt.value);
      notesTitle.push(addTitle.value);

      localStorage.setItem("notes", JSON.stringify(notesObj));
      localStorage.setItem("title", JSON.stringify(notesTitle));

      alert("Note Added Successfully!!");
      // let alert_success = document.getElementById("header");
      // alert_success.appendChild(success);
    }
  }

  addTxt.value = "";
  addTitle.value = "";
  showNotes();
}

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  let title = localStorage.getItem("title");
  if (notes == null) {
    notesObj = [];
    notesTitle = [];
  } else {
    notesObj = JSON.parse(notes);
    notesTitle = JSON.parse(title);
  }

  let html = "";
  let btnText = "Important";
  for (let i = 0; i < notesObj.length && i < notesTitle.length ; i++) {
    const element = notesObj[i];
    const noteTitle = notesTitle[i];
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem; border-color:rgba(0, 0, 0, 0.600);">
                    <div class="card-body">
                        <h5 class="card-title">${noteTitle == "" ? "Title" : noteTitle }</h5>
                        <p  class="card-text">${element == "" ? "Note" : element }</p>
                        <button id="${i}" onclick="deleteNote(this.id)" class="btn btn-dark">Delete</button>
                        <button id= "${i + 1}" onclick="important(this.id)" class="btn btn-dark">${btnText}</button>
                    </div>
                </div>`;
  }

  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  let title = localStorage.getItem("title");
  if (notes == null) {
    notesObj = [];
    notesTitle = [];
  } else {
    notesObj = JSON.parse(notes);
    notesTitle = JSON.parse(title);
  }
  notesTitle.splice(index, 1);
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("title", JSON.stringify(notesTitle));
  showNotes();
}

//To Search for a specific Note
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    let cardTitle = element
      .getElementsByTagName("h5")[0]
      .innerText.toLowerCase();

    if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

function important(index) {
  let cardBody = document.getElementsByClassName("card-body");
  console.log(cardBody);
  if(cardBody[index].style.backgroundColor = '#fff'){
    cardBody[index].style.backgroundColor = 'lightblue'
  }
  else{
    cardBody[index].style.backgroundColor = '#fff';
  }

  localStorage.setItem('color', cardBody[index].style.backgroundColor)
  // let imp = document.getElementById(index);
  // console.log(imp);
  // let btnText = "Important";
  // imp.addEventListener('click', function input(btnText) {
  // btnText == 'Important' ? 'Not Important' : 'Important';
// });
}
/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/


  // let warning = document.createElement("div");
  // warning.className ="alert alert-warning alert-dismissible d-flex align-items-center";
  // warning.ariaRoleDescription = "alert";
  // warning.setAttribute('data-bs-dismiss','alert');
  // warning.innerHTML = `<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg><div>
  // Please Write Something in Title or Notes Area to add a Note!!
  // <button type="button" class="btn-close" aria-label="Close">X</button>
  // </div>`;

  // let success = document.createElement("div");
  // success.className ="alert alert-success alert-dismissible d-flex align-items-center";
  // success.ariaRoleDescription = "alert";
  // // success.setAttribute('data-auto-dismiss','2000');
  // success.innerHTML = `<svg class="bi flex-shrink-0 me-2"width="24"height="24"role="img"aria-label="Success:"><use xlink:href="#check-circle-fill" /></svg><div>Note Added Successfully!!
  // <button type="button" class="btn-close" aria-label="Close">X</button>
  // </div>`;