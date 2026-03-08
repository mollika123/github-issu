document.getElementById('sign-btn').addEventListener('click', function () {
  //  get the user
  const userInput = document.getElementById("input-name");
  const userName = userInput.value;
  console.log(userName);

  // get the password

  const passwordInput = document.getElementById('input-password');
  const password = passwordInput.value;
  console.log(password);

  // match userand password

  if (userName == "admin" && password == "admin123") {
    alert('Sign In Succesfully');
    window.location.assign('./home.html')
  }
  else {
    alert('Sign In failed');
    return;
  }
})