const express = require('express');
const app = express();
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");


const initializePassport = require("./passportConfig");

initializePassport(passport);

const PORT = process.env.PORT || 4000;

//CSS Rendering
//app.use('/public', express.static('public'));

//Image Rendering
//app.use('/images', express.static(path.join(__dirname, 'images')))

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret',

    resave: false,

    saveUninitialized: false
})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/users/register', (req, res) => {
    res.render("register");
})

app.get('/users/dashboard', (req, res) => {
    res.render("dashboard");
})

app.post('/users/register', async (req,res)=>{
    let {name, email, password, password2 } = req.body;

    console.log({name, email, password, password2});

    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ message: "Please Enter All Fields" });
    }

    if(password.length < 6) {
        errors.push({ message: "Password Must Be at least 6 Characters" });
    }

    if(password != password2) {
        errors.push({ message: "Passwords Do Not Match, Please Try Again" });
    }

    if (errors.length > 0) {
        res.render('register', { errors });
    } else {
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        //queries database to check for existing user
        pool.query(
            `SELECT * FROM users
            WHERE email = $1`, [email], (err, results) => {
                if(err) {
                    throw err;
                }
                console.log(results.rows);

                if(results.rows.length > 0){
                    errors.push({ message: "An Account is Already Registered to that E-mail" });
                    res.render("register", { errors });
                } else {
                    pool.query(
                        `INSERT INTO users (name, email, password)
                        VALUES ($1, $2, $3)
                        RETURNING id, password`, [name, email, hashedPassword], (err, results) => {
                            if (err){
                                throw err
                            }
                            console.log(results.rows);
                            req.flash('success_msg', "Succesfully Registered, Please Login.")
                            res.redirect("/");
                        }
                    )
                }
            }
        )
    }
})

app.post("/", passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/",
    failureFlash: true
})
);

app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${ PORT }`)
});