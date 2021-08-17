//Логика по авторизации пользователя:

export function getAuthForm() {  //возвр-ет html модального окна
    return `
        <form class="" id="auth-form">

            <div class="form">
              <input type="email" id="email" class="input modal-form" required>
              <label for="email">Email</label>

              <input type="password" id="password" class="input modal-form" required>
              <label for="password">Password</label>
            </div>

            <button type="submit" id="auth-button" class="submitBtn">
              Sign in
            </button>
        </form>
    `
}


//Авторизация с email и password:
export function authWithEmailAndPass(email, password) {
  const apiKey = 'AIzaSyDVQZK9VtMD_ni0YE_aR7RLwtPKqLBEJIMs';
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, { //firebase (sing in with email)
      method: 'POST',
      body: JSON.stringify( {
          email: email,
          password: password,
          returnSeсureToken: true
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then (response => response.json())
  .then (data => data.idToken)  //получить idToken
}