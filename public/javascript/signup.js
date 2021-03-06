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
        document.location.replace('/main');
        console.log('success');
      } else {
        console.log(response.statusText,'inside signup');

      }
}

document.querySelector('.signup-form').addEventListener('submit', signupFromHandler)
