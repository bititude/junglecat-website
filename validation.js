const name = document.form.name
const email = document.form.email
const message = document.form.message
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
}
function sendEmail(){
  email.send({
    
  })
}