
//sets value of keyFromlocal to either whatever is gotten from local storage or an empty array.
let keyFromLocalStorage = JSON.parse(localStorage.getItem('savedToLocal')) || [];



// Render Data to Screen
function renderData() {

    let forScreen = document.getElementById("output-section")
    if(keyFromLocalStorage === []){forScreen.innerHTML += 'No Job Data Available'};
    keyFromLocalStorage.forEach(job => {
        forScreen.innerHTML += `<li> 
        <div class="entrycontainer"> 
        <div class="id_sect info-box"> <label class="sect-label"> Job ID: </label> ${job.id}</div>
        <div class="apart_sect info-box"> <label class="sect-label"> Unit Number: </label> ${job.apartment}</div>
        <div class="title_sect info-box"> <label class="sect-label"> Job Name:</label> ${job.jobName}</div>
        <div class="manag_sect info-box"> <label class="sect-label"> Manager: </label> ${job.owner}</div>
        <div class="status_sect info-box"> <label class="sect-label">Status: </label> ${job.status}</div>
        <div class="descript_sect info-box"> <label class="sect-label"> Description: </label> ${job.description}</div>
        <div class="work_done_sect info-box"> <label class="sect-label"> Action Taken: </label> ${job.Work_done} </div>

    
         </div>
         <div class="entry-button"> 

         <button onclick="deleteJob(${job.id})" class="delete-button job-button"> Delete </button>
        <button class="edit-button job-button" onclick="editJob(${job.id})"> Edit </button>
         
         </div>




        </li> `

        // < button onclick = "setStatusClosed(${job.id})" class="btn btn-warning" > Close </button >
    })

}




// Creates new job and pushes to storage
const addJob = (ev) => {
    ev.preventDefault();

    

    // creates a jobEntry object, creates its properties, and grabs their values from the DOM 
    let jobEntry = {
        jobName: document.getElementById('title').value,
        description: document.getElementById('description').value,
        apartment: document.getElementById('unit-number').value,
        work_done: document.getElementById('work-done').value,
        owner: document.getElementById('assign-to').value,
        status: document.getElementById('job-status').value,
        id: Math.floor(Math.random() * 100)
    }

    

    



    //FIRST this pushes the entry to keyFromLocalStorage whether it is composed of  parsed data already gotten from localStorage, or just an empty array as indicated above. 
    keyFromLocalStorage.unshift(jobEntry)


    // This now takes that new updated value of keyFromlocalStorage and pushes it to the same local storage Array.
    localStorage.setItem('savedToLocal', JSON.stringify(keyFromLocalStorage))



    document.forms[0].reset();  //resets form






    renderData();

}



//Adds listener and sets handler for add job.
const form = document.getElementById('info-form')
form.addEventListener('submit', addJob)



// Changes Status to Completed
function setStatusClosed(id) {
    let jobs = keyFromLocalStorage.forEach(job => {
        if (job.id == id) {
            console.log(`ready to complete ${job.id}`)
            job.status = "Completed"
        }
    }

    )

    localStorage.setItem('savedToLocal', JSON.stringify(jobs))

    renderData()


}




// Deletes Job
function deleteJob(id) {
    let jobs = keyFromLocalStorage

    for (i = 0; i < jobs.length; i++) {
        if (jobs[i].id == id)
            console.log(`you just deleted job ${jobs[i].id}`)
        jobs.splice(jobs[i], 1)

    }

    localStorage.setItem('savedToLocal', JSON.stringify(jobs))
    renderData()
}



function editJob(id) {
    // Get job data

    let job = keyFromLocalStorage.find(job => job.id == id)

    if (!job) {
        alert("job not found");
        return;
    }


    console.log
    // Set inputs values
    document.getElementById('description').value = job.description;
    document.getElementById('title').value = job.jobName;
    document.getElementById('unit-number').value = job.apartment;
    document.getElementById('work-done').value = job.work_done;
    document.getElementById('assign-to').value = job.owner;
    document.getElementById('job-status').value = job.status;


    let rightLocation = document.getElementById("info-form")
    let idHolder = document.createElement('input')
    idHolder.setAttribute("id", 'id-Holder')
    idHolder.setAttribute("readonly", "true")
    rightLocation.appendChild(idHolder)
    idHolder.value = id
    idHolder.style.display = 'none'






    //Hides unncessary buttons
    let subButton = document.getElementById("submit-button")
    let closeButtons = document.getElementsByClassName("btn btn-warning")
    let deleteButtons = document.getElementsByClassName("btn btn-danger")
    let jobButtons = document.getElementsByClassName("job-button")
    let editButtons = document.getElementsByClassName("edit-button")
    subButton.parentNode.removeChild(subButton)
    


    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].style.display = "none"
    }
    // for (let i = 0; i < deleteButtons.length; i++) {
    //     deleteButtons[i].style.display = "none"
    // }
    // for (let i = 0; i < editButtons.length; i++) {
    //     editButtons[i].style.display = "none"
    // }

    for (let i = 0; i < jobButtons.length; i++) {
        jobButtons[i].style.display = "none"
    }




    // insert Save button
    let saveButton = document.createElement("button")
    saveButton.addEventListener("click", saveUpdatedJob)
    saveButton.setAttribute('id', 'save-button')
    saveButton.innerText = "Save Updated Data"
    rightLocation.appendChild(saveButton)





    ///need to preserve the JOB id Value to pass it to save Updated Job.
    return

}



function saveUpdatedJob(id) {
    //Composes new object from updated input fields and forms new object
    console.log(id)




    let newJobEntry = {
        jobName: document.getElementById('title').value,
        description: document.getElementById('description').value,
        apartment: document.getElementById('unit-number').value,
        work_done: document.getElementById('work-done').value,
        owner: document.getElementById('assign-to').value,
        status: document.getElementById('job-status').value,
        id: document.getElementById('id-Holder').value
    }
    console.log(newJobEntry)

    //Removes Save Button from DOM
    let saveButton = document.getElementById('save-button')
    saveButton.parentElement.removeChild(saveButton)


    let jobIndex = keyFromLocalStorage.findIndex(job => job.id == id)
    console.log(jobIndex)



    keyFromLocalStorage.splice(jobIndex, 1, newJobEntry)



    localStorage.setItem('savedToLocal', JSON.stringify(keyFromLocalStorage))



    document.forms[0].reset();  //resets form

    renderData()
    location.reload()


}


// Need modal to confirm edit.
// remove input box outline
// insert focus animation
// insert hover animation for containers
// fix header
// insert logo










// https://youtu.be/MKD0Vsu0Ikw     -  For Edit Function sample

// https://www.youtube.com/watch?v=NYq9J-Eur9U&ab_channel=CodingTheSmartWay.com




// Things I need mentors help with
        // Make everything look good!
        // Needs to style and place update button
        // Needs to disable submit button untilal input feilds are filled

