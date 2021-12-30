//sets value of keyFromlocal to either whatever is gotten from local storage or an empty array.
let keyFromLocalStorage =
  JSON.parse(localStorage.getItem("savedToLocal")) || [];

// Render Data to Screen
function renderData() {
  let forScreen = document.getElementById("output-section");
  if (keyFromLocalStorage === []) {
    forScreen.innerHTML += "No Job Data Available";
  }

  forScreen.innerHTML += " ";
  keyFromLocalStorage.forEach((job) => {
    forScreen.innerHTML += `<li> 
        <div class="entrycontainer"> 
        <div class="id_sect info-box"> <label class="sect-label"> Job ID: </label> ${job.id}</div>
        <div class="apart_sect info-box"> <label class="sect-label"> Unit Number: </label> ${job.apartment}</div>
        <div class="title_sect info-box"> <label class="sect-label"> Job Name:</label> ${job.jobName}</div>
        <div class="manag_sect info-box"> <label class="sect-label"> Manager: </label> ${job.owner}</div>
        <div class="status_sect info-box"> <label class="sect-label">Status: </label> ${job.status}</div>
        <div class="descript_sect info-box"> <label class="sect-label"> Description: </label> ${job.description}</div>
        <div class="work_done_sect info-box"> <label class="sect-label"> Action Taken: </label> ${job.Work_done} </div>
        <div class="entry-button"> 
        <button onclick="deleteJob(${job.id})" class="delete-button job-button"> Delete </button>
        <button class="edit-button job-button" onclick="editJob(${job.id})"> Edit </button>
        </div>
        </li> `;

    // < button onclick = "setStatusClosed(${job.id})" class="btn btn-warning" > Close </button >
  });
}

// Creates new job and pushes to storage
const addJob = (ev) => {
  ev.preventDefault();

  // creates a jobEntry object, creates its properties, and grabs their values from the DOM
  let jobEntry = {
    jobName: document.getElementById("title").value,
    description: document.getElementById("description").value,
    apartment: document.getElementById("unit-number").value,
    work_done: document.getElementById("work-done").value,
    owner: document.getElementById("assign-to").value,
    status: document.getElementById("job-status").value,
    id: Math.floor(Math.random() * 100),
  };

  //FIRST this pushes the entry to keyFromLocalStorage whether it is composed of  parsed data already gotten from localStorage, or just an empty array as indicated above.
  keyFromLocalStorage.unshift(jobEntry);

  // This now takes that new updated value of keyFromlocalStorage and pushes it to the same local storage Array.
  localStorage.setItem("savedToLocal", JSON.stringify(keyFromLocalStorage));

  document.forms[0].reset(); //resets form
  location.reload();
  renderData();
};

//Adds listener and sets handler for add job.
const form = document.getElementById("info-form");
form.addEventListener("submit", addJob);

// Changes Status to Completed
// function setStatusClosed(id) {
//   let jobs = keyFromLocalStorage.forEach((job) => {
//     if (job.id == id) {
//       console.log(`ready to complete ${job.id}`);
//       job.status = "Completed";
//     }
//   });

//   localStorage.setItem("savedToLocal", JSON.stringify(jobs));

//   renderData();
// }

// Deletes Job
function deleteJob(id) {
  let jobs = keyFromLocalStorage;

  for (i = 0; i < jobs.length; i++) {
    if (jobs[i].id == id) console.log(`you just deleted job ${jobs[i].id}`);
    jobs.splice(jobs[i], 1);
  }

  localStorage.setItem("savedToLocal", JSON.stringify(jobs));
  renderData();
}

//////// Edits Job
function editJob(id) {
  // Get job data
  let job = keyFromLocalStorage.find((job) => job.id == id);

  // Set inputs values
  document.getElementById("description").value = job.description;
  document.getElementById("title").value = job.jobName;
  document.getElementById("unit-number").value = job.apartment;
  document.getElementById("work-done").value = job.work_done;
  document.getElementById("assign-to").value = job.owner;
  document.getElementById("job-status").value = job.status;

  let rightLocation = document.getElementById("info-form");
  let idHolder = document.createElement("input");
  idHolder.setAttribute("id", "id-Holder");
  idHolder.setAttribute("type", "text");
  idHolder.setAttribute("readonly", "true");
  rightLocation.appendChild(idHolder);
  idHolder.value = id;
  // idHolder.style.display = "none";

  //Hides unncessary buttons
  let subButton = document.getElementById("submit-button");
  let closeButtons = document.getElementsByClassName("btn btn-warning");
  let jobButtons = document.getElementsByClassName("job-button");
  subButton.parentNode.removeChild(subButton);

  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].style.display = "none";
  }

  for (let i = 0; i < jobButtons.length; i++) {
    jobButtons[i].style.display = "none";
  }

  stageData();
}

// Gets the Id from the idHolder and holds it.
function getId() {
  let fromIdHolder = document.getElementById("id-Holder");
  let givenId = fromIdHolder.value;
  // console.log(givenId);
  return givenId;
}
let passedId = getId;

function stageData() {
  let passedId1 = passedId();
  let newJobEntry = {
    jobName: document.getElementById("title").value,
    description: document.getElementById("description").value,
    apartment: document.getElementById("unit-number").value,
    work_done: document.getElementById("work-done").value,
    owner: document.getElementById("assign-to").value,
    status: document.getElementById("job-status").value,
    id: passedId,
  };
  let rightLocation = document.getElementById("info-form");
  let saveButton = document.createElement("button");
  saveButton.addEventListener(
    "onclick",
    secondaryCheck(passedId1, newJobEntry)
  );
  saveButton.setAttribute("id", "save-button");
  saveButton.innerText = "Save Updated Data";
  rightLocation.appendChild(saveButton);
  return;
}

function secondaryCheck(givenId, givenJobEntry) {
  if (confirm("Confirm Update") === true) {
    let givenId1 = givenId;
    let givenJobEntry1 = givenJobEntry;
    saveUpdatedJob(givenId1, givenJobEntry1);
    // console.log(givenId1, givenJobEntry1);
  } else {
    return;
  }
}

//Inserts updated Data to Local Storage
function saveUpdatedJob(givenId, givenJobEntry) {
  let oldKey = keyFromLocalStorage;
  console.log(oldKey);
  console.log(oldKey.length);

  let findId = (item) => item.id === givenId;
  let jobIndex = oldKey.findIndex(findId);
  console.log(jobIndex);

  // let jobIndex = keyFromLocalStorage.findIndex((job) => job.id === x);
  // console.log("jobIndex from SUJ" + jobIndex);

  oldKey.splice(oldKey[jobIndex], 1, givenJobEntry);
  console.log(oldKey);
}

// 3 main issues to be resolved:
//  1) Why is secondaryConfirm confirm firing at edit onclick
// 2) Why are delete and inserts not working. As well as why Id number changing when saved.
//3) How to properly refresh the page after upates.
