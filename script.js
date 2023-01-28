// event listener, calls generatePassword when generate button is clicked
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
var specialCharacters = ['!', '#', '$', '%', '&', '*', '+', '(', ')', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~', '"', "'"]; //pulled from resouce provided, but excluded [space] 

// collects user criteria (password length, character types)
function promptPasswordCriteria() {
  var passwordLength = prompt("How many characters would you like your password to contain?");

  // allows user to quit out with "cancel" button
  if (passwordLength === null) {
    return;
  }
  // error message + function restart if user input is not a number or not an integer
  else if (isNaN(passwordLength) || passwordLength%1 !== 0) {
    alert('Please input a whole number between 8 and 128')
    generatePassword();
  }
  // error message + function restart if user input is less than 8
  else if(passwordLength < 8) {
    alert('Password length must be at least 8 characters');
    generatePassword();
  }
  // error message + function restart if user input is greater than 128
  else if (passwordLength > 128) {
    alert('Password length must be no more than 128 characters');
    generatePassword();
  }
  // made it through all passwordLength break points!
  else{
    // ask user what types of characters they want
    var numeric = confirm("Click OK to confirm including numeric characters.");
    var lower = confirm("Click OK to confirm including lowercase characters.");
    var upper = confirm("Click OK to confirm including uppercase characters.");
    var special = confirm("Click OK to confirm including special characters.");

    // error message + function restart if user selected no character types
    if (!numeric && !lower && !upper && !special) {
      alert('Must select at least one character type');
      generatePassword();
    }
    // store all user criteria in object and return that object
    else {
      var userPassword = {
        length: passwordLength,
        hasNumeric: numeric,
        hasLower: lower,
        hasUpper: upper,
        hasSpecial: special
      }
      return userPassword;
    }
  }
}

// create a randomized password based on user criteria object from promptPasswordCriteria() function
function randomizePassword(userCriteria) {
  // declare empty arrays to store possible characters, some guaranteed characters, and our final result
  var possibleCharacters = [];
  var guaranteedCharacters = [];
  var result = [];

  // returns a random element from given array
  function getRandomElement(arr) {
    return arr[Math.floor(arr.length * Math.random())];
  }
  // inserts numeric characters into possibleCharacters and guaranteedCharacters arrays
  if (userCriteria.hasNumeric) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guaranteedCharacters.push(getRandomElement(numericCharacters));
  }
  // inserts lowercase characters into possibleCharacters and guaranteedCharacters arrays
  if (userCriteria.hasLower) {
    possibleCharacters = possibleCharacters.concat(lowerCharacters);
    guaranteedCharacters.push(getRandomElement(lowerCharacters));
  }
  // inserts uppercase characters into possibleCharacters and guaranteedCharacters arrays
  if (userCriteria.hasUpper) {
    possibleCharacters = possibleCharacters.concat(upperCharacters);
    guaranteedCharacters.push(getRandomElement(upperCharacters));
  }
  // inserts special characters into possibleCharacters and guaranteedCharacters arrays
  if (userCriteria.hasSpecial) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guaranteedCharacters.push(getRandomElement(specialCharacters));
  }

  // fills result array with random elements from possibleCharacters array, total of userCriteria.length elements
  for (i = 0; i < userCriteria.length; i++) {
    result[i] = getRandomElement(possibleCharacters);
  }
  // replaces first few characters in result array with elements of guaranteedCharacters array to ensure at least one of each requested character type is present
  for (i = 0; i < guaranteedCharacters.length; i++) {
    result[i] = guaranteedCharacters[i];
  }
  // returns result array
  return result;
}

//converts passwordArray into string and writes string to text box
function writePassword(passwordArray) {
  var password = passwordArray.join("");
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}