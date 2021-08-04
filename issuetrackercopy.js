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


  

 //iflocal storage is empty then set the value to an array.
        if(localStorage.getItem('savedToLocal')== null);{
            localStorage.setItem('savedToLocal', '[]')
}

    
    let oldData =  JSON.parse(localStorage.getItem('savedToLocal'))
    oldData += jobEntry
  

    localStorage.setItem('savedToLocal', JSON.stringify(oldData))
    // console.log(localStorage)


    
    document.forms[0].reset();  //reset form



    //this grabs data from local storage and displays it on screen
    // let fromLocalStorage = JSON.parse(localStorage['savedToLocal']);

    let keyFromLocalStorage = localStorage.getItem('savedToLocal');
    console.log(`key from storage is ${keyFromLocalStorage}`);



    let forScreen = document.getElementById("output-section");


    forScreen.innerHTML = "<li class='entrycontainer'><h3>" + `${keyFromLocalStorage}`  +
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








