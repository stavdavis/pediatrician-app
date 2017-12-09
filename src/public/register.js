//Registering a new user: create a submit listener:
$('.new-user-registration-form').submit( event => {
  event.preventDefault();
  let usernameInput = $('.username-field').val();
  let passwordInput = $('.password-field').val();
  //Sending user registration data to users api
  var settings = {
    "url": "/api/users",
    "method": "POST",
    "headers": {
      "content-type": "application/json"
    },
    "data": `{"username": "${usernameInput}",
              "password": "${passwordInput}"}`
  }
  $.ajax(settings).done(function (response) {
    getAndStoreJwt(usernameInput, passwordInput);
    window.location.href='/results.html';
  });
})

//Getting this user's JWT and storing it locally for use in other pages:

function getAndStoreJwt(usernameInput, passwordInput) {
  var settings = {
    "url": "/api/auth/login",
    "method": "POST",
    "headers": {
      "content-type": "application/json"
    },
    "data": `{"username": "${usernameInput}", 
              "password": "${passwordInput}"}`
  }

  $.ajax(settings).done(function (response) {
    window.localStorage.setItem('pediatrician-jwt', response.authToken);
    window.localStorage.setItem('pediatrician-username', usernameInput);
  });
}




