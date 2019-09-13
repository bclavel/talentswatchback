var mongoose = require('mongoose');

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
}
mongoose.connect('mongodb+srv://gpopadmin:NJswDSNDDXQR3z9N@gpopdb-bq1sz.mongodb.net/test?retryWrites=true&w=majority',

    options,
    function(err) {
     console.log(err);
    }
);
