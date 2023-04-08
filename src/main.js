// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyBNYfWsGWI6-q8by0KkHK05Joh4vIC25ek",
  authDomain: "courseoutline-a3649.firebaseapp.com",
  projectId: "courseoutline-a3649",
  storageBucket: "courseoutline-a3649.appspot.com",
  messagingSenderId: "711912027557",
  appId: "1:711912027557:web:656b73c6539332c7cb644c",
  measurementId: "G-7Q0C7PM4NG"
};

firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

//Variable to access database collection

const db2 = firestore.collection("documents");

const db3 = firestore.collection("issues");

// //Starter function when page is loaded
// document.addEventListener("DOMContentLoaded", function() {
//   // document.getElementById("select").style.display = "block";
//   document.getElementById("save").style.display = "block";
//   document.getElementById("information-logs").style.display = "block";
// });


const dropdown = document.getElementById("dropdown");
const outlineDiv = document.getElementById("outline");
const selectDiv = document.getElementById("select");
const commentP = document.getElementById("comment");





//Get Submit Form
let submitButton = document.getElementById("submit");

//Create Event Listener To Allow Form Submission
submitButton.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();


  let hislog = document.getElementById("historylog");
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time + ' <br />';

  hislog.innerHTML += dateTime;

  let hl = document.getElementById("historylog").innerHTML;
  let issue = document.getElementById("issues").value;




  let i0 = document.getElementById("indicator0").innerText;
  let i1 = document.getElementById("indicator1").innerText;
  let i2 = document.getElementById("indicator2").innerText;
  let i3 = document.getElementById("indicator3").innerText;
  let i4 = document.getElementById("indicator4").innerText;
  let i5 = document.getElementById("indicator5").innerText;
  let i6 = document.getElementById("indicator6").innerText;
  let i7 = document.getElementById("indicator7").innerText;
  let i8 = document.getElementById("indicator8").innerText;
  let i9 = document.getElementById("indicator9").innerText;
  let i10 = document.getElementById("indicator10").innerText;
  let i11 = document.getElementById("indicator11").innerText;

  let complete1 = document.getElementById("completed1").value;
  let complete2 = document.getElementById("completed2").value;
  let complete3 = document.getElementById("completed3").value;
  let complete4 = document.getElementById("completed4").value;


  let outline = document.getElementById("outline").value;
  let edit = document.getElementById("editormain").innerHTML;
  let feedback = document.getElementById("feedback").value;
  let courseNum = document.getElementById("course-num").value;

  firestore

  //Save Form Data To Firebase
  db2.doc(outline)
    .set({

        indicator0: i0,
        indicator1: i1,
        indicator2: i2,
        indicator3: i3,
        indicator4: i4,
        indicator6: i5,
        indicator7: i6,
        indicator5: i7,
        indicator8: i8,
        indicator9: i9,
        indicator10: i10,
        indicator11: i11,

        completed1: complete1,
        completed2: complete2,
        completed3: complete3,
        completed4: complete4,
        doc : edit,
        justifications: feedback,
        hl: hl,
        issues: issue,
        courseNumber: courseNum



    })
    .then(() => { })
    .catch((error) => {
      console.log(error);
    });

    db3.doc(outline)
      .set({
        courseNum: courseNum,
        status: 'Submitted for review'
      })
      .then(() => { })
      .catch((error) => {
        console.log(error);
      });
  
  //alert
  alert("Your Form Has Been Submitted Successfully");

  //clear form after submission
  function clearForm() {
    // document.getElementById("outline").reset();
    document.getElementById("select").style.display = "none";
    document.getElementById("dropdown").selectedIndex = 0;

    // Hide the div with id "outline"
    document.getElementById("outline").style.display = "none";
    document.getElementById("save").style.display = "none";
    document.getElementById("information-logs").style.display = "none";
    commentP.textContent = "";
  }
  clearForm()
});

let newoutline = document.getElementById("new");

 newoutline.addEventListener("click",(e)=>{
   window.location.reload();
 });

function setTime(num){
    console.log("hello")
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime =  '/n' + date+' '+time + '/n';
     
    console.log(dateTime)

    var checkboxvar = document.getElementById("completed" + num);
    
    if (checkboxvar.checked == true){
       
        document.getElementById("completed" + num + "0").innerHTML = "Completed on: " + dateTime;
    }
    else{
        document.getElementById("completed" + num + "0").innerHTML = "Completed on: ";
    }
}

function getDocuments(id) {
	const q = query(collection(firestore, 'docs', id, 'documents'));
	const unsubscribe = onSnapshot(q, (querySnapshot) => {
		querySnapshot.forEach((doc) => {
			let dcus = doc.data();
			dcus.id = doc.id;
			holdDoc.push(dcus);
			showDoc();
		});
	});
}


