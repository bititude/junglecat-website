const name = document.form.name
const email = document.form.email
const message = document.form.message

const myModalEl = document.querySelector('.mymodal')
const modal = new window.bootstrap.Modal(myModalEl)

function validated() {
  if (name.value == '') {
    name.nextElementSibling.style.display = 'block'
    return false
  } else {
    name.nextElementSibling.style.display = 'none'
  }

  if (
    !email.value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ) ||
    email.value == ''
  ) {
    email.nextElementSibling.style.display = 'block'
    return false
  } else {
    email.nextElementSibling.style.display = 'none'
  }

  if (message.value == '') {
    message.nextElementSibling.style.display = 'block'
    return false
  } else {
    message.nextElementSibling.style.display = 'none'
  }
}

function fun() {
  document.getElementById('name').value = ''
  document.getElementById('email').value = ''
  document.getElementById('message').value = ''
  name.nextElementSibling.style.display = 'none'
  email.nextElementSibling.style.display = 'none'
  message.nextElementSibling.style.display = 'none'
}

const thisForm = document.getElementById('customerform')
thisForm.addEventListener('submit', async function (e) {
  e.preventDefault()
  if (validated() === false) {
    return
  }
  const response = await fetch(
    'https://api-v2.junglecat.com/api/contact/insert',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
      }),
    },
  )
  const result = await response.json()
  modal.hide()
})