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

function getAndDisplayPatientButtons() {
    getPatientsByGuardian(displayPatientButtons);
}
////////GETTING AND DISPLAYING CLIENT'S KIDS (PATIENTS) - END//////////


//A patient button listener that logs the unique patient ID of the selected patient
function logPatientIdFromButton() {
  $('.patient-button').click(event => {
  $('.logged-in-as').text = 'hello';//$(event.currentTarget).attr('class').split(' ')[1]; //the second class was set to be the unique patientId
  });
}


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


let selectedPatientId;
$(function() {
    getAndDisplayPatientButtons();
    logPatientIdFromButton();
})
