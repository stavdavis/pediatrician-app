const baseUrl = 'https://frozen-temple-20849.herokuapp.com';
// const baseUrl = 'http://localhost:8080';

let loggedInUser = "MargeAndHomerSimpson";
$('.logged-in-as').text(`Logged in as: ${loggedInUser}`);

////////GETTING AND DISPLAYING CLIENT'S KIDS (PATIENTS) - START//////////
//This function gets all patients that have this user as their parent or guardian
function getPatientsByGuardian(callbackFn) {
    let patientJsonUrl = baseUrl + '/patients/byGuardianName/' + loggedInUser;
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
function logPatientIdFromButton() {
    $('.patient-buttons').on('click', '.patient-button', event => { //need event deleation here, b/c patient-button doesn't exist upon initial page load
        $('.results-display').html(''); //wiping old results when selecting a new patient 
        currentPatientId = $(event.currentTarget).attr('class').split(' ')[1]; //the second class was set to be the unique patientId
    });
}


////////GETTING AND DISPLAYING VACCINES - START//////////
function getVaccinesByPatient(callbackFn) {
    let vaccineJsonUrl = baseUrl + '/vaccines/byPatient/' + currentPatientId;
    $.getJSON(vaccineJsonUrl, data => callbackFn(data))
    .error(e => { `Bad API connection or invalid patient ID` });  
}

function displayVaccineList(data) {
    $('.results-display').html(''); //clearing the results area between clicks
    //creating the title row for the results table:
    $('.results-display').html(
        '<table>' +
            '<tr>' +
                '<th class="col1-vacs">Vaccine</th>' +
                '<th class="col2-vacs">Diseases</th>' +
                '<th class="col3-vacs">Status</th>' +
                '<th class="col4-vacs">Due Date</th>' +
                '<th class="col5-vacs">Done Date</th>' +
            '</tr>' +
        '</table>'
    ); 
    //creating each row in the table:
    for (index in data.vaccines) {
        $('.results-display').append(
            '<table>' +    
                '<tr>' +
                    '<td class="col1-vacs">' + data.vaccines[index].vaccineName + '</td>' +
                    '<td class="col2-vacs">' + data.vaccines[index].relatedDiseases + '</td>' +
                    '<td class="col3-vacs">' + data.vaccines[index].vaccineStatus + '</td>' +
                    '<td class="col4-vacs">' + formatDate(data.vaccines[index].dueDate) + '</td>' +
                    '<td class="col5-vacs">' + formatDate(data.vaccines[index].doneDate) + '</td>' +
                '</tr>' +
            '</table>'
        );
    }
}

function getAndDisplayVaccinesByPatient() {
    getVaccinesByPatient(displayVaccineList);
}

//An event listener for a vaccine request (only after patient selection):
function vaccineListener() {
    $('.vaccines-button').click( event => { 
        getAndDisplayVaccinesByPatient()
    })
}

function formatDate(date) {
    return date.slice(5,7) + "/" + date.slice(8,10) + "/" + date.slice(2,4);
}
////////GETTING AND DISPLAYING VACCINES - END//////////

////////GETTING AND DISPLAYING APPOINTMENTS - START//////////
function getAppointmentsByPatient(callbackFn) {
    let appointmentsJsonUrl = baseUrl + '/appointments/byPatient/' + currentPatientId;
    $.getJSON(appointmentsJsonUrl, data => callbackFn(data))
    .error(e => { `Bad API connection or invalid patient ID` });  
}

function displayAppointmentsList(data) {
    $('.results-display').html(''); //clearing the results area between clicks
    //creating the title row for the results table:
    $('.results-display').html(
        '<table>' +
            '<tr>' +
                '<th class="col1-apnts">Date</th>' +
                '<th class="col2-apnts">Reason</th>' +
                '<th class="col3-apnts">Summary</th>' +
            '</tr>'
    ); 
    //creating each row in the table:
    for (index in data.appointments) {
        $('.results-display').append(
            '<table>' +    
                '<tr>' +
                    '<td class="col1-apnts">' + formatDate(data.appointments[index].date) + '</td>' +
                    '<td class="col2-apnts">' + data.appointments[index].reason + '</td>' +
                    '<td class="col3-apnts">' + data.appointments[index].summary + '</td>' +
                '</tr>' +
            '</table>'
        );
    }
}

function getAndDisplayAppointmentsByPatient() {
    getAppointmentsByPatient(displayAppointmentsList);
}

//An event listener for a vaccine request (only after patient selection):
function appointmentListener() {
    $('.appointment-button').click( event => { 
        getAndDisplayAppointmentsByPatient()
    })
}
////////GETTING AND DISPLAYING APPOINTMENTS - END//////////

////////GETTING AND DISPLAYING PATIENT INFO - START//////////
function getPatientInfo(callbackFn) {
    let patientJsonUrl = baseUrl + '/patients/byPatientId/' + currentPatientId;
    $.getJSON(patientJsonUrl, data => callbackFn(data))
    .error(e => { `Bad API connection or invalid patient ID` });  
}

function displayPatientInfo(data) {
    $('.results-display').html(''); //clearing the results area between clicks
    //creating the title row for the results table:
    $('.results-display').html(
        '<div>' + 
            'Patient name: ' + data.fullName + '<br>' +
            'Date of birth: ' +  formatDate(data.dob) + '<br>' +
            'Age: ' + getAge(data.dob) + ' Years<br>' +
            'Gender: ' + data.gender + '<br>' +
            'Guardians: ' + data.guardians + '<br>' +
        '</div>'
    ); 
}

function getAndDisplayPatientInfo() {
    getPatientInfo(displayPatientInfo);
}

//An event listener for a vaccine request (only after patient selection):
function patientInfoListener() {
    $('.patient-info-button').click( event => { 
        getAndDisplayPatientInfo()
    })
}

function getAge(dobString) {
    let date1 = new Date(Date.now());
    let date2 = new Date(formatDate(dobString));
    let timeDiff = date1 - date2;
    let diffDays = (timeDiff / (1000 * 3600 * 24 * 365)).toFixed(1); 
    return diffDays;
}
////////GETTING AND DISPLAYING  PATIENT INFO - END//////////


let currentPatientId; //this variable is updated upon patient selection in logPatientIdFromButton
$(function() {
    getAndDisplayPatientButtons
    .then(logPatientIdFromButton)
    .then(vaccineListener)
    .then(appointmentListener)
    .then(patientInfoListener)
})