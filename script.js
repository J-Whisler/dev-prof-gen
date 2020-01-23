const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
let user;


const questions = [
  {
    type: 'input',
    name: 'name',
    message: "What is your Github username?",
    answer: ""
  },
  {
    type: 'input',
    name: 'color',
    message: "What is your favorite color?"
  }
]





function gitCall(answers) {
  const queryURL = `https://api.github.com/users/${answers.name}`
  axios.get(queryURL).then(function(response) {
      fs.writeFile("index.html", generateHTML(response), function(err, answers) {
    if (err) console.log('error', err);
     console.log(response)
   })
  
  })
  // .then(function (response) {
  //   console.log(response);
   
  // })
  .catch(function (error) {
    console.log(error);
  })
 
}

inquirer.prompt(questions)
  .then(answers => {
    
    // console.log(answers.name)
    gitCall(answers)
    user = answers
    
    
  })
  .catch(function(err) {
    console.log(err);
});




  



function generateHTML(response) {
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="style.css">
  <title>Document</title>
</head>
<body style="background-color: ${user.color};">
  
  <main class="main">
  <div class="head-wrapper">
   <img class="my-pic" src="${response.data.avatar_url}">
     <div class="name-wrapper">
      <h3 class="user-name">Hi, my name is <em>${response.data.name}</em>!</h3>
     </div>
  </div>

   <div class="user-wrapper">
       <p class="userBio"><b>Bio: </b></p>
       <div class="userBio">${response.data.bio}</div>
     </div>
<div class="row">
 <div class="info-wrapper">
       <p class="userRepo-wrapper">Gitbub Stats: </p>
       <div class="userRepo">Number of repos: ${response.data.public_repos}</div>
       <div class="userFollowers">Number of followers: ${response.data.followers}</div>
       <div class="userFollowing">Number of following: ${response.data.following}</div>
       <div class="userStars">Number of Stars: ${response.data.public_gists}</div>
     </div>

     <div class="link-wrapper">
       <p class="links">Links: </p>
       <div><button class="links"><a href="${response.data.html_url}" target="_blank">Github</a></button></div>
       <div><button class="links"><a href="${response.data.blog}" target="_blank">User blog</a></button></div>
       <div><p class="location" id="location">My location: ${response.data.location}</p></div>
     </div>
    
     
</div>

    
  </main>

  <script src="script.js"></script>
  
</body>
</html>
`}




