const express = require( 'express');
const mongoose = require( 'mongoose' );
const bodyParser = require("body-parser");
//const bcrypt = require( 'bcrypt' );
const session = require( 'express-session' );
const flash = require( 'express-flash' );

mongoose.connect('mongodb://localhost/quotes_db', {useNewUrlParser: true});

const {QuoteModel} = require( './models/quotesModel' );
const app = express();

//Setting packages we will use
app.use(flash());
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({useNewUrlParser: true}));
app.use(session({
    secret: "quotes",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
    }));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");


//Endpoints
app.get( '/', function( request, response ){
    response.render( 'index' );
});

app.get("/quotes", function(request, response){

    QuoteModel.getQuotes() 
    .then( result =>{
        response.render('quotes', {info: result});
    })
        /*
        if(error){
            console.log("Error matching DB request!");
        }
        else {
            res.render("quotes", {info: quotes, moment: moment});
        }
    });*/
}); 

app.post("/quotes", function(request, response){
    console.log("Post", request.body);
    QuoteModel.createQuotes(request.body)
    .then( result => {
        request.session.name = result.name;
        request.session.quote = result.quote;
        /*request.session.date = result.date;*/
        console.log("OK");
        response.redirect( '/quotes' );
    })
    .catch( err => {
        request.flash( 'quoteError', 'Your quote has an error or it is in blank!' );
        response.redirect( '/' );
    });



});


app.listen(8080, function(){
    console.log("Quotes server is running in port 8080");
});