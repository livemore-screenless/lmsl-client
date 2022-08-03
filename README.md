# Project Name
LiveMore ScreenLess video application - Non-profit organization in Minneapolis, MN

## Description
Two Week Sprint

Our team had two weeks to build a full stack application where a user is able to record and post videos to the site. The videos are responses to questions that help the user think about how to use technology in a healthier way, such as "How do you use technology to do creative things?"
These videos can be viewed by anyone, and can be voted on for badges such as "most creative", and "thought-provoking."

The goal was to build an application which utilizes the full stack in order to run database requests, render items to the dom, and create a responsive and immersive experience within the app.

<!--
## Screen Shots
<span>
<img src="./documentation/images/Screen%20Shot%202022-07-11%20at%203.06.37%20PM.png" style="width: 20%;">
<img src="./documentation/images/Screen%20Shot%202022-07-11%20at%203.06.49%20PM.png" style="width: 20%;">
<img src="./documentation/images/Screen%20Shot%202022-07-11%20at%203.07.26%20PM.png" style="width: 20%;">
<img src="./documentation/images/Screen%20Shot%202022-07-11%20at%203.07.59%20PM.png" style="width: 20%;">
  </span>
  -->

### Prerequisites

- PostgreSQL database connectivity
- Chrome browser

## Installation

1. Create a database named `lmsl`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate some introductory data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. I recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

<!--
## Usage

-->

## Built With
<p dir="auto"><a href="/https://github.com/jeanlacosse"><img
            src="https://camo.githubusercontent.com/9d07c04bdd98c662d5df9d4e1cc1de8446ffeaebca330feb161f1fb8e1188204/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d4637444631453f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d626c61636b"
            alt="JavaScript"
            data-canonical-src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&amp;logo=javascript&amp;logoColor=black"
            style="max-width: 100%;"></a>
    <a href="/https://github.com/jeanlacosse/"><img
            src="https://camo.githubusercontent.com/268ac512e333b69600eb9773a8f80b7a251f4d6149642a50a551d4798183d621/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163742d3230323332413f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d363144414642"
            alt="React"
            data-canonical-src="https://img.shields.io/badge/React-20232A?style=for-the-badge&amp;logo=react&amp;logoColor=61DAFB"
            style="max-width: 100%;"></a>
    <a href="/https://github.com/jeanlacosse/"><img
            src="https://camo.githubusercontent.com/2c2e3cab0541596a12e216df86e68fa554256f25826b55a068993a3edfbcd0e8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d6174657269616c2d2d55492d3030383143423f7374796c653d666f722d7468652d6261646765266c6f676f3d6d6174657269616c2d7569266c6f676f436f6c6f723d7768697465"
            alt="MaterialUI"
            data-canonical-src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&amp;logo=material-ui&amp;logoColor=white"
            style="max-width: 100%;"></a>
    <a href="/https://github.com/jeanlacosse/"><img
            src="https://camo.githubusercontent.com/6908bc5919e46cd787b8e5117f092f5ed37da82e8bd602e6339060ea0fff722c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656475782d3539334438383f7374796c653d666f722d7468652d6261646765266c6f676f3d7265647578266c6f676f436f6c6f723d7768697465"
            alt="Redux"
            data-canonical-src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&amp;logo=redux&amp;logoColor=white"
            style="max-width: 100%;"></a>
    <a href="/https://github.com/jeanlacosse/"><img
            src="https://camo.githubusercontent.com/d7926b384d024ad06a498fe04ace5436b2df564b26bdd53d2980e5155a4a20ca/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656475782d2d53616761732d3230323332413f7374796c653d666f722d7468652d6261646765266c6f676f3d726564757873616761266c6f676f436f6c6f723d363144414642"
            alt="Redux"
            data-canonical-src="https://img.shields.io/badge/Redux--Sagas-20232A?style=for-the-badge&amp;logo=reduxsaga&amp;logoColor=61DAFB"
            style="max-width: 100%;"></a>
    <a href="/https://github.com/jeanlacosse/"><img
            src="https://camo.githubusercontent.com/3bcc8da5c94cefdf2d976837d1be601f4d44d36b58d9590e36debe834a6e34de/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4865726f6b752d3433303039383f7374796c653d666f722d7468652d6261646765266c6f676f3d6865726f6b75266c6f676f436f6c6f723d7768697465"
            alt="Heroku"
            data-canonical-src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&amp;logo=heroku&amp;logoColor=white"
            style="max-width: 100%;"></a>
    <a href="/https://github.com/jeanlacosse/"><img
            src="https://camo.githubusercontent.com/4f9d20f3a284d2f6634282f61f82a62e99ee9906537dc9859decfdc9efbb51ec/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163745f526f757465722d4341343234353f7374796c653d666f722d7468652d6261646765266c6f676f3d72656163742d726f75746572266c6f676f436f6c6f723d7768697465"
            alt="ReactRouter"
            data-canonical-src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&amp;logo=react-router&amp;logoColor=white"
            style="max-width: 100%;"></a>
    <a href="/https://github.com/jeanlacosse/"><img
            src="https://camo.githubusercontent.com/e8ba07fa7cc79831afca90c574b74f1eefd0bf76af4e498cb0674330a1634e2a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4353532d3233393132303f267374796c653d666f722d7468652d6261646765266c6f676f3d63737333266c6f676f436f6c6f723d7768697465"
            alt="CSS"
            data-canonical-src="https://img.shields.io/badge/CSS-239120?&amp;style=for-the-badge&amp;logo=css3&amp;logoColor=white"
            style="max-width: 100%;"></a>
    <a href="/https://github.com/jeanlacosse/"><img
            src="https://camo.githubusercontent.com/d63d473e728e20a286d22bb2226a7bf45a2b9ac6c72c59c0e61e9730bfe4168c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f48544d4c352d4533344632363f7374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465"
            alt="HTML"
            data-canonical-src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&amp;logo=html5&amp;logoColor=white"
            style="max-width: 100%;"></a>
    <a href="/https://github.com/jeanlacosse/"><img
            src="https://camo.githubusercontent.com/dfc69d704694f22168bea3d84584663777fa5301dcad5bbcb5459b336da8d554/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d3433383533443f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465"
            alt="Node"
            data-canonical-src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&amp;logo=node.js&amp;logoColor=white"
            style="max-width: 100%;"></a>
    <a href="/https://github.com/jeanlacosse/"><img
            src="https://camo.githubusercontent.com/281c069a2703e948b536500b9fd808cb4fb2496b3b66741db4013a2c89e91986/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f506f737467726553514c2d3331363139323f7374796c653d666f722d7468652d6261646765266c6f676f3d706f737467726573716c266c6f676f436f6c6f723d7768697465"
            alt="postgreSQL"
            data-canonical-src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&amp;logo=postgresql&amp;logoColor=white"
            style="max-width: 100%;"></a>
    <a href="/https://github.com/jeanlacosse/"><img
            src="https://camo.githubusercontent.com/5e5b58b1aa31ee768e6776a4082db16b867a00eebadbf04a076868392da60bac/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50617373706f72742e6a732d3230323332413f7374796c653d666f722d7468652d6261646765"
            alt="Passport" data-canonical-src="https://img.shields.io/badge/Passport.js-20232A?style=for-the-badge"
            style="max-width: 100%;"></a>
    <a href="/https://github.com/jeanlacosse/"><img
            src="https://camo.githubusercontent.com/6f61ce982d7a61713d63c947148300012945bd4a4cafb8b9313e2426c5a1f273/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f457870726573732e6a732d3430344435393f7374796c653d666f722d7468652d6261646765"
            alt="Express" data-canonical-src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"
            style="max-width: 100%;"></a>
</p>

## Screen Shots
<img src="https://i.imgur.com/Tz8xwO5.png" height="280">

## Deployment
1. Create a new Heroku project
2. Link the Heroku project to the project GitHub Repo
3. Create an Heroku Postgres database
4. Connect to the Heroku Postgres database from Postico
5. Create the necessary tables
6. Add an environment variable for SERVER_SESSION_SECRET with a nice random string for security
7. In the deploy section, select manual deploy

## Authors
- Jeannie Branstrator
- Jean-Luc LaCosse
- John Maras
- Badra Mohamed
 


## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped us to make this application a reality.

