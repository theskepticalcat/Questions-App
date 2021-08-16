export function getAuthForm() {  //возвр-ет html модального окна
    return `
        <form class="/" id="auth-form">

            <div class="/">
              <input type="email" id="email" required>
              <label for="email">Email</label>
            </div>

            <div class="/">
              <input type="password" id="password" required>
              <label for="password">Password</label>
            </div>

            <button type="submit" id="auth-button" class="/">
              Sign in
            </button>
        </form>
    `
}