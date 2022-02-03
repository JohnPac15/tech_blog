async function loginFormHandler(event) {
    event.preventDefault();
    console.log('login!')

    const username = document.querySelector('#username-login').value.trim()
    const password = document.querySelector('#password-login').value.trim()

    const response = await fetch('/api/users/login', {
        method:"post",
        body: JSON.stringify({
            username,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
    })

    console.log(response,'response')

    if(response.ok){
        document.location.replace('/')
    } else{
        console.log(response.statusText,'inside login');
    }

}

async function signupFromHandler(event){
    event.preventDefault();
    console.log('signup!')

    const username = document.querySelector('#username-signup').value.trim()
    const email = document.querySelector('#email-signup').value.trim()
    const password = document.querySelector('#password-signup').value.trim()

    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password
        }),
        headers: {"Content-Type": "application/json"}
    })

    if(response.ok){
        document.location.replace('/');
        console.log('success');
      } else {
        console.log(response.statusText,'inside signup');

      }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler)
document.querySelector('.signup-form').addEventListener('submit', signupFromHandler)