
//sets value of keyFromlocal to either whatever is gotten from local storage or an empty array.
let keyFromLocalStorage = JSON.parse(localStorage.getItem('savedToLocal')) || [];



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
    }



    //FIRSTthis pushes the entry to keyFromLocalStorage whether it is composed of  paresed data already gotten from localStorage, or just an empty array as indicated above. 
    keyFromLocalStorage.push(jobEntry)


    // This now takes that new updated value of keyFromlocalStorage and pushes it to the same local storage Array.
    localStorage.setItem('savedToLocal', JSON.stringify(keyFromLocalStorage))



    document.forms[0].reset();  //resets form


}


const form = document.getElementById('info-form')
form.addEventListener('submit',
    addJob
)

console.log(keyFromLocalStorage, "hello");



// This function loops from the keyFromLocalStorage and pulls the jobName from each object, then pushes it to the DOM.
function renderData() {
    keyFromLocalStorage.forEach(job => {
        let forScreen = document.getElementById("output-section");
        forScreen.innerHTML += `<li> ${job.jobName} </li>`
    })
}


renderData();




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








