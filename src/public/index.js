//Registering a new user: create a submit listener:
$('.user-login-form').submit( event => {
  event.preventDefault();
  let usernameInput = $('.username-field').val();
  let passwordInput = $('.password-field').val();
  getAndStoreJwt(usernameInput, passwordInput)
  .then(window.location.href='/results.html');
});

//Getting this user's JWT and storing it locally for use in other pages:
function getAndStoreJwt(usernameInput, passwordInput) {
  return new Promise((resolve, reject) => {
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
  })
}