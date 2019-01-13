let glob_email = "";
let glob_pwd = "";

function signup() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            glob_email = email;
            glob_pwd = password;
            //window.location = "./createProfile.html";

        })
        .catch(function (error) {

            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');

            } else if (errorCode == 'auth/email-already-in-use') {
                alert('This email is already in use. Please select a different one.');

            } else {
                alert(errorMessage);

            }
            console.log(error);
        });

}

function signin() {
    let email = document.getElementById("emailSignIn").value;
    let password = document.getElementById("passwordSignIn").value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(() =>{
        console.log("signed in");
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        
        if (errorCode == 'auth/user-not-found' || errorCode == 'auth/wrong-password') {
            alert('Incorrect email or password. Please try again.');
        } else {
            alert(errorMessage);

        }
        console.log(error);
    });
}

function signout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("signed out");
      }).catch(function(error) {
        // An error happened.
      });
}

function createProfile() {
    let first = document.getElementById("firstName").value;
    let last = document.getElementById("lastName").value;
    let birthday = document.getElementById("birthday").value;
    let bio = document.getElementById("bio").value;

    var user = firebase.auth().currentUser;

    if (first != "" && last != "" && birthday != "" && bio != "") {
        firebase.database().ref("users/" + user.uid).set({
            uid: user.uid,
            first_name: first,
            last_name: last,
            birthday: birthday,
            bio: bio
        }).then(() =>{
            document.getElementById("createProfile").style.display = "none";
        });
    } else {
        alert("Please fill out all inputs.");
    }
}

function updateTextInput(val) {
    document.getElementById('textInput').value = val * 30;
}

function getNeedsInfo() {
    let user = firebase.auth().currentUser;
    var name = "";
    firebase.database().ref("users/" + user.uid).on('value', function(snapshot) {
        name = (snapshot.val() && (snapshot.val().first_name + " " + snapshot.val().last_name)) || 'Anonymous';
    });
    let address = document.getElementById("address");
    let jobs = document.getElementsByClassName("job");

    let jobList = [];

    for(var i = 0; i < jobs.length; i++){
        if (jobs[i].checked && jobs[i].name == "other"){
            jobList.push(document.getElementById("other").value);
        }else if(jobs[i].checked){
            jobList.push(jobs[i].name);
        }
    }
    console.log(jobList);
}

