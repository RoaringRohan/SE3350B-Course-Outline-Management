
const firebaseConfig = {
    apiKey: "AIzaSyBNYfWsGWI6-q8by0KkHK05Joh4vIC25ek",
    authDomain: "courseoutline-a3649.firebaseapp.com",
    projectId: "courseoutline-a3649",
    storageBucket: "courseoutline-a3649.appspot.com",
    messagingSenderId: "711912027557",
    appId: "1:711912027557:web:656b73c6539332c7cb644c",
    measurementId: "G-7Q0C7PM4NG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  var db = firebase.firestore();
  var collectionRef = db.collection("users");
  
  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    var type = document.getElementById('type').value;
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is incorrect')
      return
    }
    if (validate_field(full_name) == false || validate_field(type) == false) {
      alert('One or More Extra Fields is left empty.')
      return
    }
   
    collectionRef.doc(email).set({
      full_name: full_name,
      email: email,
      password: password,
      type_of_user: type,
      last_login: Date.now()
    }).then(function() {
      // Done
      alert('User has been created successfully')
    }).catch(function(error) {
      var error_message = error.message
      alert(error_message)
    })
  }
  
  function login() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or password incorrect')
      return
    }
    
    // Retrieve the user's password from the database and compare it with the input password
    collectionRef.doc(email).get().then(function(doc) {
      if (doc.exists) {
        var user = doc.data();
        if (user.password == password && (user.type_of_user == 'instructor' || user.type_of_user == 'reviewer')) {
          // Password is correct, update last login and redirect to new page
          collectionRef.doc(email).update({
            last_login: Date.now()
          }).then(function() {
            // Navigate to new HTML page
            //<!-- USE YOUR LOCAL FILE LOCATION FOR THIS DURING DEMO VIDEO-->

            window.location.href = "../dashboard/dashboard.html";

          }).catch(function(error) {
            var error_message = error.message
            alert(error_message)
          })
        } else if (user.password == password && (user.type_of_user == 'administrator' || user.type_of_user == 'department chair' || user.type_of_user == 'associate chair' || user.type_of_user == 'program director')) {
          // Password is correct, update last login and redirect to new page
          collectionRef.doc(email).update({
            last_login: Date.now()
          }).then(function() {
            // Navigate to new HTML page
            //<!-- USE YOUR LOCAL FILE LOCATION FOR THIS DURING DEMO VIDEO-->

            window.location.href = "../admin_dashboard/dashboard.html";

          }).catch(function(error) {
            var error_message = error.message
            alert(error_message)
          })
        } else {
          alert('Email or password incorrect')
        }
      } else {
        alert('User not found')
      }
    }).catch(function(error) {
      var error_message = error.message
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }