async function editFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const title = document.querySelector('input[name="post-title"]').value.trim();

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({title}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

          if(response.ok){
            document.location.replace('/dashboard/');
        } else {
          alert(response.statusText);
        }
}

async function deleteFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    console.log(id)

  const response = await fetch(`/api/posts/${id}`, {
      method: 'delete',
      headers: {
          'Content-Type': 'application/json'
        }
  })
  console.log(response)
  if(response.ok){
      document.location.replace('/dashboard/')
  } else{
      alert( response.statusText)
  }

}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);