var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var PassageSchema = new Schema ({
  title: {type: String, required: true},
  author: {type: String, required: true},
  sourceUrl: {type: String, required: false},
  imageUrl: {type: String, required: false},
  passage: {type: String, required: true},
  recited: {type: Number, required: false},
  depot: {type: Boolean, require:false}

});

var Passages = mongoose.model('passages', PassageSchema);

module.exports = Passages;
