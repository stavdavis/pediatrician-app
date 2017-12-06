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
    $('.patient-buttons').html(''); //clearing the previous buttons
    for (index in data.patients) {
        $('.patient-buttons').append( //adding the patientId as the second class of the button(use in onclick later)
        `<button class="patient-button ${data.patients[index].id}">${data.patients[index].fullName}</button>`);
    }
}

const getAndDisplayPatientButtons = new Promise((resolve, reject) => {
    resolve(getPatientsByGuardian(displayPatientButtons));
});
////////GETTING AND DISPLAYING CLIENT'S KIDS (PATIENTS) - END//////////


//A patient button listener that logs the unique patient ID of the selected patient
const logPatientIdFromButton = new Promise((resolve, reject) => {
    $('.patient-buttons').on('click', '.patient-button', event => { //need event deleation here, b/c patient-button doesn't exist upon initial page load
    $('.results-display').html(''); //wiping old results when selecting a new patient
    resolve(currentPatientId = $(event.currentTarget).attr('class').split(' ')[1]); //the second class was set to be the unique patientId
  });
}


////////GETTING AND DISPLAYING VACCINES - START//////////
function getVaccinesByPatient(callbackFn) {
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

function getAndDisplayVaccinesByPatient() {
    getVaccinesByPatient(displayVaccineList);
}
////////GETTING AND DISPLAYING VACCINES - END//////////

let currentPatientId; //this variable is updated upon patient selection in logPatientIdFromButton
$(function() {
    getAndDisplayPatientButtons
    .then(logPatientIdFromButton); 
    .then(alert('testing'));
})