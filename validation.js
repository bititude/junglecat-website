// validation
const name = document.form.name
const email = document.form.email
const message = document.form.message
let captchaResponseKey = ''

const captchaError = document.getElementById('captcha-error')
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

  // if (message.value === '') {
  //   message.nextElementSibling.style.display = 'block'
  //   return false
  // } else {
  //   message.nextElementSibling.style.display = 'none'
  // }

  // reCaptcha  verifications
  var response = grecaptcha.getResponse()
  if (response.length == 0) {
    captchaError.style.display = 'block'
    return false
  } else {
    captchaResponseKey = response
    captchaError.style.display = 'none'
  }
}

function fun() {
  document.getElementById('name').value = ''
  document.getElementById('email').value = ''
  document.getElementById('message').value = ''
  name.nextElementSibling.style.display = 'none'
  email.nextElementSibling.style.display = 'none'
  // message.nextElementSibling.style.display = 'none';
  toggleButton(false);
  document.getElementById("success-message").style.display = "none";
 
} 


// toggiling send button in contact form and showing success message
function toggleButton(value){
  if(value){  
    document.getElementById("submit-button").style.display = "none";
    document.getElementById("submit-button-loading").style.display = "block";
  }
  else{
    document.getElementById("submit-button").style.display = "block";
    document.getElementById("submit-button-loading").style.display = "none";
  }
 
}

const thisForm = document.getElementById('customerform')
thisForm.addEventListener('submit', async function (e) { 
  
  e.preventDefault();
  if (validated() === false) {
    return
  }
  toggleButton(true);
 
  const response = await fetch(
    'https://api.junglecat.com/api/contact/insert',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        captchaResponseKey: captchaResponseKey,
      }),
    },
  )
  const result = await response.json();

  if(result.status){
    fun();
    toggleButton(false);
    grecaptcha.reset();
    document.getElementById("success-message").style.display = "block";
  }
  else{
    document.getElementById("success-message").style.display = "none";
  }
 
  captchaResponseKey = '';
  // setTimeout(()=>{modal.hide();},500);
  
})

function debounce(func, wait, immediate) {
  var timeout
  return function () {
    var context = this,
      args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}


// when clicking contact in navbar
function onContactClick() {
  window.history.pushState({}, '', '#contact');
  fun();
  autoFillContactForm();
}

// autofill contact form details
function autoFillContactForm() {
  let paramString = (window.location.href).split("?")[1];
  const urlParams = new URLSearchParams(paramString);

  let firstName = urlParams.get('first_name');
  let lastName = urlParams.get('last_name');
  const email = urlParams.get('email');
  
  firstName = firstName ? firstName : '';
  lastName = lastName ? " " + lastName : '';
  const fullName = firstName + lastName;

  if (fullName || email) {
    if (fullName) {
      document.getElementById('name').value = fullName;
      setTimeout(function () { document.getElementById('email').focus(); }, 500);
    }
    if (email) {
      document.getElementById('email').value = email;
      if (fullName) {
        setTimeout(function () { document.getElementById('message').focus(); }, 500);
      }
      else {
        setTimeout(function () {  document.getElementById('name').focus(); }, 500);
      }
    }
  }
  else {
    setTimeout(function () { document.getElementById('name').focus(); }, 500);
  }
}
