// function login() {
   
//     // You can perform login validation and authentication here
//     // For simplicity, let's just display an alert
//     console.log("Login clicked. Username: testUser, Password: testPassword");
// }

// function register() {
   

//     // Frontend validation for registration form
    

//     // Validate email format
    
//     // Validate username (no special characters)
    

//     // Validate password (at least 8 characters, one capital letter, and one numeric)
    
// }
// module.exports = { login, register };


// // validation.js

// function setError(inputEl, errorEl, message) {
//   inputEl.setAttribute('aria-invalid', 'true');
//   errorEl.textContent = message;
// }

// function clearError(inputEl, errorEl) {
//   inputEl.setAttribute('aria-invalid', 'false');
//   errorEl.textContent = '';
// }

// function isEmpty(value) {
//   return value.trim().length === 0;
// }

// function isValidUsername(value) {
//   // Letters, numbers, underscores only
//   const re = /^[A-Za-z0-9_]+$/;
//   return re.test(value);
// }

// function isValidEmail(value) {
//   // Practical email pattern (keeps it simple and effective)
//   const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
//   return re.test(value);
// }

// function isValidPassword(value) {
//   return value.length >= 8;
// }

// // Attach live validation once (optional but nice UX)
// (function attachLive() {
//   const fields = [
//     { input: 'registerName', error: 'nameError' },
//     { input: 'registerEmail', error: 'emailError' },
//     { input: 'registerUsername', error: 'usernameError' },
//     { input: 'registerPassword', error: 'passwordError' },
//   ];

//   fields.forEach(({ input, error }) => {
//     const inputEl = document.getElementById(input);
//     const errorEl = document.getElementById(error);
//     if (!inputEl) return;

//     inputEl.addEventListener('input', () => {
//       // Re-run the specific rule for the field
//       const v = inputEl.value;

//       if (input === 'registerName') {
//         if (!isEmpty(v)) clearError(inputEl, errorEl);
//       }

//       if (input === 'registerEmail') {
//         if (!isEmpty(v) && isValidEmail(v)) clearError(inputEl, errorEl);
//       }

//       if (input === 'registerUsername') {
//         if (!isEmpty(v) && isValidUsername(v)) clearError(inputEl, errorEl);
//       }

//       if (input === 'registerPassword') {
//         if (!isEmpty(v) && isValidPassword(v)) clearError(inputEl, errorEl);
//       }
//     });
//   });
// })();

// function register() {
//   const nameInput = document.getElementById('registerName');
//   const emailInput = document.getElementById('registerEmail');
//   const usernameInput = document.getElementById('registerUsername');
//   const passwordInput = document.getElementById('registerPassword');

//   const nameError = document.getElementById('nameError');
//   const emailError = document.getElementById('emailError');
//   const usernameError = document.getElementById('usernameError');
//   const passwordError = document.getElementById('passwordError');

//   const successMsg = document.getElementById('successMsg');
//   if (successMsg) successMsg.style.display = 'none';

//   let firstInvalid = null;

//   // Name: required
//   if (isEmpty(nameInput.value)) {
//     setError(nameInput, nameError, 'Name is required.');
//     firstInvalid = firstInvalid || nameInput;
//   } else {
//     clearError(nameInput, nameError);
//   }

//   // Email: required + valid
//   if (isEmpty(emailInput.value)) {
//     setError(emailInput, emailError, 'Email is required.');
//     firstInvalid = firstInvalid || emailInput;
//   } else if (!isValidEmail(emailInput.value)) {
//     setError(emailInput, emailError, 'Please enter a valid email address.');
//     firstInvalid = firstInvalid || emailInput;
//   } else {
//     clearError(emailInput, emailError);
//   }

//   // Username: required + only letters/numbers/underscore
//   if (isEmpty(usernameInput.value)) {
//     setError(usernameInput, usernameError, 'Username is required.');
//     firstInvalid = firstInvalid || usernameInput;
//   } else if (!isValidUsername(usernameInput.value)) {
//     setError(usernameInput, usernameError, 'Username can only contain letters, numbers, and underscores.');
//     firstInvalid = firstInvalid || usernameInput;
//   } else {
//     clearError(usernameInput, usernameError);
//   }

//   // Password: required + min 8 characters
//   if (isEmpty(passwordInput.value)) {
//     setError(passwordInput, passwordError, 'Password is required.');
//     firstInvalid = firstInvalid || passwordInput;
//   } else if (!isValidPassword(passwordInput.value)) {
//     setError(passwordInput, passwordError, 'Password must be at least 8 characters long.');
//     firstInvalid = firstInvalid || passwordInput;
//   } else {
//     clearError(passwordInput, passwordError);
//   }

//   if (firstInvalid) {
//     firstInvalid.focus();
//     return; // stop; invalid
//   }

//   // All good
//   if (successMsg) successMsg.style.display = 'block';

//   // Example payload (replace with your submit logic)
//   const payload = {
//     name: nameInput.value.trim(),
//     email: emailInput.value.trim(),
//     username: usernameInput.value.trim(),
//     password: passwordInput.value, // do not log this in production
//   };

//   console.log('Registration payload ready:', { ...payload, password: '********' });

//   // TODO: Replace with real submission (fetch/axios)
//   // fetch('/api/register', {
//   //   method: 'POST',
//   //   headers: { 'Content-Type': 'application/json' },
//   //   body: JSON.stringify(payload),
//   // }).then(res => res.json())
//   //   .then(data => console.log('Server response:', data))
//   //   .catch(err => console.error('Error:', err));
// }









// validation.js

// ---------- Pure validators (safe to import in Node) ----------


function login(context) {
  let usernameInput, passwordInput;

  if (context) {
    ({ usernameInput, passwordInput } = context);
  }

  if (!usernameInput && typeof document !== 'undefined') {
    usernameInput = document.getElementById('loginUsername');
    passwordInput = document.getElementById('loginPassword');
  }

  if (!usernameInput || !passwordInput) {
    return { ok: false, reason: 'MISSING_DOM' };
  }

  const username = String(usernameInput.value ?? '').trim();
  const password = String(passwordInput.value ?? '');

  // Simple required checks (align with your login form rules)
  if (isEmpty(username) || isEmpty(password)) {
    // You can expand with setError(...) if your login form has error nodes
    return { ok: false, reason: 'INVALID' };
  }


  console.log(`Login clicked. Username: ${username}, Password: ${password}`);

  return { ok: true, payload: { username, password } };
}

function isEmpty(value) {
  return String(value ?? '').trim().length === 0;
}

function isValidUsername(value) {
  // Letters, numbers, underscores only
  const re = /^[A-Za-z0-9_]+$/;
  return re.test(String(value));
}

function isValidEmail(value) {
  // Practical email pattern
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(String(value));
}

function isValidPassword(value) {
  return String(value).length >= 8;
}

// ---------- DOM helpers (guarded) ----------
function setError(inputEl, errorEl, message) {
  if (!inputEl || !errorEl) return;
  inputEl.setAttribute?.('aria-invalid', 'true');
  errorEl.textContent = message;
}

function clearError(inputEl, errorEl) {
  if (!inputEl || !errorEl) return;
  inputEl.setAttribute?.('aria-invalid', 'false');
  errorEl.textContent = '';
}

function register(context) {
  let nameInput, emailInput, usernameInput, passwordInput;
  let nameError, emailError, usernameError, passwordError, successMsg;

  if (context) {
    ({
      nameInput,
      emailInput,
      usernameInput,
      passwordInput,
      nameError,
      emailError,
      usernameError,
      passwordError,
      successMsg,
    } = context);
  }

  // Fallback to DOM if available
  if (!nameInput && typeof document !== 'undefined') {
    nameInput = document.getElementById('registerName');
    emailInput = document.getElementById('registerEmail');
    usernameInput = document.getElementById('registerUsername');
    passwordInput = document.getElementById('registerPassword');

    nameError = document.getElementById('nameError');
    emailError = document.getElementById('emailError');
    usernameError = document.getElementById('usernameError');
    passwordError = document.getElementById('passwordError');

    successMsg = document.getElementById('successMsg');
  }

  // If still missing (Node without context), bail gracefully
  if (!nameInput || !emailInput || !usernameInput || !passwordInput) {
    return { ok: false, reason: 'MISSING_DOM' };
  }

  if (successMsg) successMsg.style.display = 'none';
  let firstInvalid = null;

  // Name: required
  if (isEmpty(nameInput.value)) {
    setError(nameInput, nameError, 'Name is required.');
    firstInvalid = firstInvalid || nameInput;
  } else {
    clearError(nameInput, nameError);
  }

  // Email: required + valid
  if (isEmpty(emailInput.value)) {
    setError(emailInput, emailError, 'Email is required.');
    firstInvalid = firstInvalid || emailInput;
  } else if (!isValidEmail(emailInput.value)) {
    setError(emailInput, emailError, 'Please enter a valid email address.');
    firstInvalid = firstInvalid || emailInput;
  } else {
    clearError(emailInput, emailError);
  }

  // Username: required + pattern
  if (isEmpty(usernameInput.value)) {
    setError(usernameInput, usernameError, 'Username is required.');
    firstInvalid = firstInvalid || usernameInput;
  } else if (!isValidUsername(usernameInput.value)) {
    setError(
      usernameInput,
      usernameError,
      'Username can only contain letters, numbers, and underscores.'
    );
    firstInvalid = firstInvalid || usernameInput;
  } else {
    clearError(usernameInput, usernameError);
  }

  // Password: required + min 8 characters
  if (isEmpty(passwordInput.value)) {
    setError(passwordInput, passwordError, 'Password is required.');
    firstInvalid = firstInvalid || passwordInput;
  } else if (!isValidPassword(passwordInput.value)) {
    setError(passwordInput, passwordError, 'Password must be at least 8 characters long.');
    firstInvalid = firstInvalid || passwordInput;
  } else {
    clearError(passwordInput, passwordError);
  }

  if (firstInvalid) {
    firstInvalid.focus?.();
    return { ok: false, reason: 'INVALID' };
  }

  if (successMsg) successMsg.style.display = 'block';

  name = String(nameInput.value).trim();
  email = String(emailInput.value).trim();
  username = String(usernameInput.value).trim();
  password = String(passwordInput.value).trim();

  const payload = {
    name: String(nameInput.value).trim(),
    email: String(emailInput.value).trim(),
    username: String(usernameInput.value).trim(),
    password: passwordInput.value, // don't log this in production
  };

//   console.log('Registration payload ready:', { ...payload, password: '********' });
//   console.log("Register clicked. Name: ", name, ", Email: ", email,", Username: ", username, ", Password: ", password);

console.log(
  `Register clicked. Name: ${name}, Email: ${email}, Username: ${username}, Password: ${password}`
);

  return { ok: true, payload };
}

// ---------- init(): bind live validation — only in browser ----------
function init() {
  if (typeof document === 'undefined') return;

  const fields = [
    { input: 'registerName', error: 'nameError', validate: (v) => !isEmpty(v) },
    { input: 'registerEmail', error: 'emailError', validate: (v) => !isEmpty(v) && isValidEmail(v) },
    { input: 'registerUsername', error: 'usernameError', validate: (v) => !isEmpty(v) && isValidUsername(v) },
    { input: 'registerPassword', error: 'passwordError', validate: (v) => !isEmpty(v) && isValidPassword(v) },
  ];

  fields.forEach(({ input, error, validate }) => {
    const inputEl = document.getElementById(input);
    const errorEl = document.getElementById(error);
    if (!inputEl || !errorEl) return;

    inputEl.addEventListener('input', () => {
      const v = inputEl.value;
      if (validate(v)) {
        clearError(inputEl, errorEl);
      }
    });
  });
}

// Run init only when a browser DOM exists and is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    register,
    init,
    isEmpty,
    isValidUsername,
    isValidEmail,
    isValidPassword,
    setError,
    clearError,
    login
  };
}

