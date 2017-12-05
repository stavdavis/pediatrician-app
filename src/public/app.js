let loggedInUser = "MargeAndHomerSimpson";

////////GETTING AND DISPLAYING CLIENT'S KIDS (PATIENTS) - START//////////
//This function gets all patients that have this user as their parent or guardian
function getPatients(callbackFn) {
    let patientJsonUrl = 'https://frozen-temple-20849.herokuapp.com/patients/' + loggedInUser;
  $.getJSON(patientJsonUrl, data => callbackFn(data))
  .error(e => { `Bad API connection` });  
}

function displayPatientButtons(data) {
    for (index in data.patients) {
       $('.select-child').html(
        '<button>' + data.patients[index].firstName + '</button>');
    }
}

function getAndDisplayPatientButtons() {
    getPatients(displayPatientButtons);
}
////////GETTING AND DISPLAYING CLIENT'S KIDS (PATIENTS) - END//////////

////////GETTING AND DISPLAYING VACCINES - START//////////
function getVaccineList(callbackFn) {
    let vaccineJsonUrl = 'https://frozen-temple-20849.herokuapp.com/vaccines';
  $.getJSON(vaccineJsonUrl, data => callbackFn(data))
  .error(e => { `Bad API connection` });  
}

function displayVaccineList(data) {
    for (index in data.vaccines) {
       $('.body').html(
        '<p>' + data.vaccines[index].vaccineName + '<br>' +
        data.vaccines[index].relatedDiseases + '<br>' +
        data.vaccines[index].vaccineStatus + '<br>' +
        data.vaccines[index].dueDate + '<br>' +
        data.vaccines[index].doneDate + '</p>');
    }
}

function getAndDisplayVaccineList() {
    getVaccineList(displayVaccineList);
}
////////GETTING AND DISPLAYING VACCINES - END//////////


$(function() {
    getAndDisplayPatientButtons();
    // getAndDisplayVaccineList();
})
