var app = angular.module('jobRotation');

app.service('authService', function($firebaseAuth){
  //Just a reference to the firebase endpoint
  var firebaseUrl = 'https://drh-job-rotation.firebaseio.com/'
  //Creates an object using the Firebase Constructor with our endpoint passed in
  var fbRef = new Firebase(firebaseUrl);
  var authObj = $firebaseAuth(fbRef);

  //Step 3 of Registration
  this.register = function(user, cb){
    authObj.$createUser({
      email: user.email,
      password: user.password
    }).then(function(userObj){
        console.log("User created successfully");
        return authObj.$authWithPassword({
          email : user.email,
          password : user.password
        });
    }).then(function(authData){
      if (authData){
        authData.name = user.name;
        authData.timestamp = new Date().toISOString();
        fbRef.child('users').child(authData.uid.replace('simplelogin:', '')).set(authData);
        cb(authData);
      } else {
        console.log('Error');
      }
    }).catch(function(error){
        switch (error.code) {
          case "EMAIL_TAKEN":
            console.log("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            console.log("The specified email is not a valid email.");
            break;
          default:
            console.log("Error creating user:", error);
        }
    });
  };

  //login method to be called from our controller. The callback is then passed the authenticated user
  this.login = function(user, cb){
    authObj.$authWithPassword({
      email : user.email,
      password : user.password
    }).then(function(authData){
      // user authenticated with Firebase
      console.log("Logged In! User ID: " + authData.uid);
      cb(authData);
    }).catch(function(err){
      switch (err.code) {
        case "INVALID_EMAIL":
          // handle an invalid email
          case "INVALID_PASSWORD":
          // handle an invalid password
          default:
      }
    });
  };

  this.getAuthData = function(){
    return authObj;
  }

  this.logout = function(){
    authObj.$unauth();
  }

});
