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
        document.location.replace('/main')
    } else{
        console.log(response.statusText,'inside login');
    }

}


document.querySelector('.the-login-form').addEventListener('submit', loginFormHandler)
