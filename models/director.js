var mongoose = require('mongoose');

var subCatSchema = mongoose.Schema({
  subCatLabel: String,
});

var profileSchema = mongoose.Schema({
  profileLabel: String,
});

var videoSchema = mongoose.Schema({
  videoUrl: String,
  videoSource: String,
});

var directorSchema = mongoose.Schema({
  directorName : String,
  directorAppbaseId : String,
  directorLoca : String,
  directorCat : String,
  directorSubCat : [subCatSchema],
  directorProfile : [profileSchema],
  directorSituation : String,
  directorContent : String,
  directorContactEmail : String,
  directorContactPhone: String,
  directorContacted : String,
  directorWebsite : String,
  directorVimeo : String,
  directorInsta : String,
  directorVideos : [videoSchema],
});

module.exports = mongoose.model('directors', directorSchema);
