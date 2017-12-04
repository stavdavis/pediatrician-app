var MOCK_VACCINE_LIST = {
    "vaccineList": [
        {
            "vaccineId": 11111111,        //number
            "vaccineName": "DTaP-HIB-IPV-1",  //string
            "relatedDiseases": ["DiphtheriaTetanus", "HIB", "Polio"], //Array of strings
            "patientName": "Lisa Simpson",//string
            "patientId": 12121212,           //number
            "vaccineStatus": "Done",      //"Done", "Not done"
            "dueDate": 1470016976609,     //Date
            "doneDate": 1470016976609     //Date, null
        },
        {
            "vaccineId": 22222222,        //number
            "vaccineName": "DTaP-HIB-IPV-2",  //string
            "relatedDiseases": ["DiphtheriaTetanus", "HIB", "Polio"], //Array of strings
            "patientName": "Lisa Simpson",//string
            "patientId": 12121212,           //number
            "vaccineStatus": "Done",      //"Done", "Not done"
            "dueDate": 1470016976609,     //Date
            "doneDate": 1470016976609     //Date, null
        },
        {
            "vaccineId": 33333333,        //number
            "vaccineName": "DTaP-HIB-IPV-3",  //string
            "relatedDiseases": ["DiphtheriaTetanus", "HIB", "Polio"], //Array of strings
            "patientName": "Lisa Simpson",//string
            "patientId": 12121212,           //number
            "vaccineStatus": "Done",      //"Done", "Not done"
            "dueDate": 1470016976609,     //Date
            "doneDate": 1470016976609     //Date, null
        },
        {
            "vaccineId": 44444444,        //number
            "vaccineName": "HepB",        //string
            "relatedDiseases": ["HepatitisB"], //Array of strings
            "patientName": "Lisa Simpson",//string
            "patientId": 12121212,           //number
            "vaccineStatus": "Done",      //"Done", "Not done"
            "dueDate": 1470016976609,     //Date
            "doneDate": 1470016976609     //Date, null
        },
        {
            "vaccineId": 55555555,        //number
            "vaccineName": "PCV13",       //string
            "relatedDiseases": ["Pneumococcal"], //Array of strings
            "patientName": "Lisa Simpson",//string
            "patientId": 12121212,           //number
            "vaccineStatus": "Done",      //"Done", "Not done"
            "dueDate": 1470016976609,     //Date
            "doneDate": 1470016976609     //Date, null
        },
        {
            "vaccineId": 66666666,        //number
            "vaccineName": "RotaVirus",  //string
            "relatedDiseases": ["RotaVirus"], //Array of strings
            "patientName": "Lisa Simpson",//string
            "patientId": 12121212,           //number
            "vaccineStatus": "Not yet",      //"Done", "Not done"
            "dueDate": 1470016976609,     //Date
            "doneDate": null     //Date, null
        },
        {
            "vaccineId": 77777777,        //number
            "vaccineName": "FLU-IIV4-6-35m-pf-2017-1",  //string
            "relatedDiseases": ["Flu-2017-1"], //Array of strings
            "patientName": "Lisa Simpson",//string
            "patientId": 12121212,           //number
            "vaccineStatus": "Not yet",      //"Done", "Not done"
            "dueDate": 1470016976609,     //Date
            "doneDate": null     //Date, null
        }
    ]
};

//this function is the only one that will change with the real api - 
//instead of the timeout, we will use jQuery to make an ajax call to the endpoint
function getVaccineList(callbackFn) {
    setTimeout(function() { callbackFn(MOCK_VACCINE_LIST)}, 100);
}

// this function stays the same when we connect
// to real API later
function displayVaccineList(data) {
    for (index in data.vaccineList) {
       $('body').append(
        '<p>' + data.vaccineList[index].relatedDiseases + '<br>' +
        data.vaccineList[index].vaccineName + '<br>' +
        data.vaccineList[index].vaccineStatus + '<br>' +
        data.vaccineList[index].dueDate + '<br>' +
        data.vaccineList[index].doneDate + '</p>');
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
