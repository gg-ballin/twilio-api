const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN

const client = require('twilio')(accountSid, authToken);
const code = Math.floor(100000 + Math.random() * 900000);

console.log('CODIGO 1: ',code);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Twilio app' });
});



app.post('/api/world', (req, res) => {
  
  console.log("ACA: ",req.body);
  client.messages.create({
    to: req.body.post,
    from: +12563051163,
    body: code
  })
    .then(message => console.log("Message sid: ",message.sid))
    .then(console.log(req.body.post))
    .catch(e => console.log(e))
    
  res.send(
    `Numero: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));