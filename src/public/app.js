const baseUrl = 'https://frozen-temple-20849.herokuapp.com';

let loggedInUser = "MargeAndHomerSimpson";
$('.logged-in-as').text(`Logged in as: ${loggedInUser}`);

////////GETTING AND DISPLAYING CLIENT'S KIDS (PATIENTS) - START//////////
//This function gets all patients that have this user as their parent or guardian
function getPatientsByGuardian(callbackFn) {
    let patientJsonUrl = baseUrl + '/patients/' + loggedInUser;
    $.getJSON(patientJsonUrl, data => callbackFn(data))
    .error(e => { `Bad API connection` });
}

function displayPatientButtons(data) {
    for (index in data.patients) {
       $('.select-child').html( //adding the patientId as the second class of the button(use in onclick later)
        `<button class="patient-button ${data.patients[index].id}">${data.patients[index].firstName}</button>`);
    }
}

function getAndDisplayPatientButtons() {
    getPatientsByGuardian(displayPatientButtons);
}
////////GETTING AND DISPLAYING CLIENT'S KIDS (PATIENTS) - END//////////

////////GETTING THE SELECTED PATIENT'S ID - START//////////
function getSelectedPatientId() {
    // /byPatient/:patientId

}
////////GETTING THE SELECTED PATIENT'S ID - END//////////

////////GETTING AND DISPLAYING VACCINES - START//////////
function getVaccineList(callbackFn) {
    let vaccineJsonUrl = baseUrl + '/vaccines';
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
