//sets value of keyFromlocal to either whatever is gotten from local storage or an empty array.
let keyFromLocalStorage =
  JSON.parse(localStorage.getItem("savedToLocal")) || [];

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

  //FIRSTthis pushes the entry to keyFromLocalStorage whether it is composed of  paresed data already gotten from localStorage, or just an empty array as indicated above.
  keyFromLocalStorage.unshift(jobEntry);

  // This now takes that new updated value of keyFromlocalStorage and pushes it to the same local storage Array.
  localStorage.setItem("savedToLocal", JSON.stringify(keyFromLocalStorage));

  document.forms[0].reset(); //resets form

  function renderData() {
    keyFromLocalStorage.forEach((job) => {
      let forScreen = document.getElementById("output-section");
      forScreen.innerHTML += `<li> 
        <div class="entrycontainer"> 
        <div class="id_sect"> <label class="sect-label"> Job ID: </label> ${job.id}</div>
        <div class="apart_sect"> <label class="sect-label"> Unit Number: </label> ${job.apartment}</div>
        <div class="title_sect"> <label class="sect-label"> Job Name:</label> ${job.jobName}</div>
        <div class="manag_sect"> <label class="sect-label"> Manager: </label> ${job.owner}</div>
        <div class="status_sect"> <label class="sect-label">Status: </label> ${job.status}</div>
        <div class="descript_sect"> <label class="sect-label"> Description: </label> ${job.description}</div>
        <div class="work_done_sect"> <label class="sect-label"> Action Taken: </label> ${job.Work_done} </div>
        
        <a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning"> Close </a>
        <a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger"> Delete </a>

         </div>
        </li> `;
    });
  }

  renderData();
};

const form = document.getElementById("info-form");
form.addEventListener("submit", addJob);

console.log(keyFromLocalStorage);

// https://www.youtube.com/watch?v=NYq9J-Eur9U&ab_channel=CodingTheSmartWay.com
