let glob_email = "";
let glob_pwd = "";

function signup() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //     .catch(function (error) {

    //         // Handle Errors here.
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         if (errorCode == 'auth/weak-password') {
    //             alert('The password is too weak.');

    //         } else if (errorCode == 'auth/email-already-in-use') {
    //             alert('This email is already in use. Please select a different one.');

    //         } else {
    //             alert(errorMessage);

    //         }
    //         console.log(error);
    //     }).then(window.location = "./createProfile.html");

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

function createProfile() {
    let first = document.getElementById("firstName").value;
    let last = document.getElementById("lastName").value;
    let birthday = document.getElementById("birthday").value;
    let bio = document.getElementById("bio").value;

    var user = firebase.auth().currentUser;

    if (first != "" && last != "" && birthday != "" && bio != "") {
        firebase.database().ref("users/" + user.uid).set({
            first_name: first,
            last_name: last,
            birthday: birthday,
            bio: bio
        });
    }else{
        alert("Please fill out all inputs.");
    }
}