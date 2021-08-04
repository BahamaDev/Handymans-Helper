//This ensures page is fully loaded before running anything. Alway start with this.
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit-button').addEventListener('click', addJob)  //This adds event to the submit button.

})



let masterJobArr = []


const addJob = (ev) => {
    ev.preventDefault();

    // creates a jobEntry object and grabs values from DOM 
    let jobEntry = {
        jobName: document.getElementById('title').value,
        description: document.getElementById('description').value,
        apartment: document.getElementById('unit-number').value,
        work_done: document.getElementById('work-done').value,
        owner: document.getElementById('assign-to').value,
        status: document.getElementById('job-status').value,
        }


    //takes the jobEntry object and pushes it to the masterJobArr
    masterJobArr.unshift(jobEntry);
    document.forms[0].reset();  //reset form
    // console.log(`pushed {jobEntry} to the masterJobArr.`);
    // console.log("your Job Array is" + JSON.stringify(masterJobArr));




    //sets masterJobArr to local storage in a key value pair-  'savedToLocal': masterJobArr
    localStorage.setItem('savedToLocal', JSON.stringify(masterJobArr));
   


// grabs and creates string from data from local storage and assigns it to keyFromLocalStorage. 
    let keyFromLocalStorage = '\n' + JSON.stringify(localStorage.getItem('savedToLocal', '\t', 2))  ;
    console.log(keyFromLocalStorage);



    let forScreen = document.getElementById("output-section");


    forScreen.innerHTML = "<li class='entrycontainer'><h3>" + `${keyFromLocalStorage}` +
        "</h3>" + "</li>"

}









//let pre = document.querySelector('ul');
// pre.innerHTML += '<li>' + JSON.stringify(Object.values(jobEntry)) + '</li>';

// This takes values from objects in the masterjobArr  and pushes them to the DOM.

// pre.innerHTML += 
// '<li class="entrycontainer">' 
//          +
// '<div class="titlesec">' + JSON.stringify(masterJobArr[masterJobArr.length - 1].jobName) + '</div>'

//         +

// '<div class="apartsec">' + JSON.stringify(masterJobArr[masterJobArr.length - 1].apartment) + '</div>'

//             +
// '<div class="descripsec">' + JSON.stringify(masterJobArr[masterJobArr.length - 1].description) + '</div>'
//             +
// '<div class="workdonesec">' + JSON.stringify(masterJobArr[masterJobArr.length - 1].work_done) + '</div>'
//             +
// '<div class="ownersec">' + JSON.stringify(masterJobArr[masterJobArr.length - 1].owner) + '</div>'
//             +
// '<div class="statusec">' + JSON.stringify(masterJobArr[masterJobArr.length - 1].status) + '</div>'
//         +

// '<input id="cbx" type="checkbox" name="jobItem">' 
// +

//         '</li>'



//take the array from local storage and push it to the dom








