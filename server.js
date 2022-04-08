const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;
app.set("view engine", "ejs")


app.get('/', (req, res) => {
    res.render('login');
});

app.get('/users/register', (req, res) => {
    res.render("register");
})

app.get('/users/dashboard', (req, res) => {
    res.render("dashboard", { user: "andy" });
})

app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${ PORT }`)
});