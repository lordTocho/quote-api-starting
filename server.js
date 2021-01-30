// the main script that runs the server side code using express

const e = require('express');
const express = require('express');
const app = express();
 
// contains all of the data for the quotes
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// API to return back a random quote
app.get('/api/quotes/random', (req, res, next) => {
    console.log( "Inside the random quote number generator" );
    let singleQuote = getRandomElement( quotes );
    console.log( `The quote being return is ${singleQuote.quote}` );

    // sends back a JSON response back to the client( e.g. front-end )
    res.send({
        quote: getRandomElement(quotes)
      });
});

// API that fetches quotes and checks if the user send the app a query
app.get('/api/quotes/', (req, res, next) => {
    console.log( req.query );
    // check if the user sent a query
    const newQuote = {
        person: req.query.person
    }
    // if there is no query, return all of the quotes
    if( req.query.person === undefined ) {
        console.log( "No query has been found from the user" );
        res.send({quotes: quotes })
    }
    else {
        let result = quotes.filter( quote => newQuote.person === quote.person )
        res.send({quotes: result});
    }
})

app.post( '/api/quotes', (req, res, next ) => {
    const newQuote = {
        quote: req.query.quote,
        person: req.query.person
      };
      if (newQuote.quote && newQuote.person) {
        quotes.push(newQuote);
        res.send({ quote: newQuote });
      } else {
        res.status(400).send();
      }
} );


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });


