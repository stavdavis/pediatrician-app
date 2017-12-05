//this function is the only one that will change with the real api - 
//instead of the timeout, we will use jQuery to make an ajax call to the endpoint
function getVaccineList(callbackFn) {
    let vaccineJsonUrl = 'https://frozen-temple-20849.herokuapp.com/vaccines';
  $.getJSON(vaccineJsonUrl, data => callbackFn(data))
  .error(e => { `Bad API connection` });  
}

// this function stays the same when we connect
// to real API later
function displayVaccineList(data) {
    for (index in data.vaccines) {
       $('body').append(
        '<p>' + data.vaccines[index].vaccineName + '<br>' +
        data.vaccines[index].relatedDiseases + '<br>' +
        data.vaccines[index].vaccineStatus + '<br>' +
        data.vaccines[index].dueDate + '<br>' +
        data.vaccines[index].doneDate + '</p>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayVaccineList() {
    getVaccineList(displayVaccineList);
}

$(function() {
    getAndDisplayVaccineList();
})
