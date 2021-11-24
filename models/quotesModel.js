const mongoose = require( 'mongoose' );

var QuoteSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 3
    },
    quote: {
        type: String, 
        required: true, 
        minlength: 3
    },
    date: {
        type: Date
    }
});

const Quote = mongoose.model("Quote", QuoteSchema);

const QuoteModel = {
    createQuotes : function ( newQuote ){
        return Quote.create( newQuote );
    },
    getQuotes : function(){
        return Quote.find();
    }

};


module.exports = {QuoteModel};


