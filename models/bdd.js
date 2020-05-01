var mongoose = require('mongoose');

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
}
mongoose.connect('mongodb+srv://gpopadmin:NJswDSNDDXQR3z9N@gpopdb-bq1sz.mongodb.net/rework?retryWrites=true&w=majority',

    options,
    function(err) {
      if (err) console.log(err);
      else {
        console.log('Connexion to database established')
      }
    }
);
