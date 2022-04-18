
<h1 align="center">📝 Angular-ToDo 📝</h1>

<h3 align="center">👉 Demonstration Video: https://vimeo.com/697521411 👈 </h3>

![image](https://user-images.githubusercontent.com/88730354/162493843-4533edf7-b802-4f44-996b-2203a4178235.png)

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Technology](#technology)
- [Backend](#backend)
- [Contributing](#contributing)
- [Questions](#questions)

## Description
<div>📜 A Notetaking App Built in Angular using a PostgreSQL database on the Back-End for Encrypted Login Verification.</div>

## Installation
<ul>
  <li>💾 Ensure that Node.js is installed and running the latest version</li>
  <li>💾 Download this Repository's Code</li>
  <li>💾 Extract the .zip folder and open the downloaded code in an editor of your choice (e.g. VSCode)</li>
  <li>💾 Install all packages by running the following in your root directory's integrated terminal: npm i</li>
  <li>💾 Open an integrated terminal for the BACKEND folder and run: node server.js</li>
  <li>💾 Open an integrated terminal for the FRONTEND folder and run: ng serve</li>
  <li>💾 Open your browser and navigate to localhost:4200</li>
</ul>

## Technology

- Express Js for REST APIs
- bcryptjs for password encrytion
- jsonwebtoken to token based authentication & authorization
- Sequelize for database CRUD operations
- PostgreSQL for data storage
- Angular 13 
- RxJS 6
- Bootstrap 4

## Backend

These are APIs that Node.js Express App will export:
| Methods |Urls|Actions|
|----------------|-------------------------------|-----------------------------|
|POST|/api/auth/signup |signup new account |
|POST|/api/auth/signup |login an account |
|GET|/api/user|retrieve all users|
|GET|/api/user/:id|retrieve user by id|
|GET|/api/items|retrieve all to-do items|
|GET|/api/items/:id|retrieve to-do item by id|
|DELETE|/api/items/:id|remove a to-do item by id|

## Contributing
👪 Andy Waine

## Questions
✉️ Email me with any questions: waine.andrew@protonmail.com<br /><br />
:octocat: Find me on GitHub: [Andy-Waine](https://github.com/Andy-Waine)<br />

