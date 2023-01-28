//user clicks a button
  //event listener, calling a function to write password
document.getElementById("generate").addEventListener("click", generatePassword);

// shell function that calls each subfunction
function generatePassword() {
  var criteria = promptPasswordCriteria();
  var passwordArray = randomizePassword(criteria);
  writePassword(passwordArray);
}

// arrays for each character type
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
var lowerCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var upperCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var specialCharacters = ['!', '#', '$', '%', '&', '*', '+', '(', ')', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~'];

function promptPasswordCriteria() {
  var passwordLength = prompt("How many characters would you like your password to contain?");
  if (passwordLength === null) {
    return;
  }
  else if (isNaN(passwordLength) || passwordLength%1 !== 0) {
    alert('Please input a whole number between 8 and 128')
    generatePassword();
  }
  else if(passwordLength < 8) {
    alert('Password length must be at least 8 characters');
    generatePassword();
  }
  else if (passwordLength > 128) {
    alert('Password length must be no more than 128 characters');
    generatePassword();
  }
  else{
    //then user confirms for password criteria
    var hasNumeric = confirm("Click OK to confirm including numeric characters.");
    var hasLower = confirm("Click OK to confirm including lowercase characters.");
    var hasUpper = confirm("Click OK to confirm including uppercase characters.");
    var hasSpecial = confirm("Click OK to confirm including special characters.");

    if (!hasNumeric && !hasLower && !hasUpper && !hasSpecial) {
      alert('Must select at least one character type');
      generatePassword();
    }
    else {
      var userPassword = {
        length: passwordLength,
        hasNumeric: hasNumeric,
        hasLower: hasLower,
        hasUpper: hasUpper,
        hasSpecial: hasSpecial
      }
      return userPassword;
    }
  }
}

function randomizePassword(userCriteria) {
  var possibleCharacters = [];
  var guaranteedCharacters = [];
  var result = [];

  function getRandomElement(arr) {
    return arr[Math.floor(arr.length * Math.random())];
  }

  if (userCriteria.hasNumeric) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guaranteedCharacters.push(getRandomElement(numericCharacters));
  }

  if (userCriteria.hasLower) {
    possibleCharacters = possibleCharacters.concat(lowerCharacters);
    guaranteedCharacters.push(getRandomElement(lowerCharacters));
  }

  if (userCriteria.hasUpper) {
    possibleCharacters = possibleCharacters.concat(upperCharacters);
    guaranteedCharacters.push(getRandomElement(upperCharacters));
  }

  if (userCriteria.hasSpecial) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guaranteedCharacters.push(getRandomElement(specialCharacters));
  }

  for (i = 0; i < userCriteria.length; i++) {
    result[i] = getRandomElement(possibleCharacters);
  }

  for (i = 0; i < guaranteedCharacters.length; i++) {
    result[i] = guaranteedCharacters[i];
  }

  return result;
}

//the password is displayed to the screen
function writePassword(result) {
  var password = result.join("");
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}