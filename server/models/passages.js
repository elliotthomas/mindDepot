var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var PassageSchema = new Schema ({
  title: {type: String, required: true},
  author: {type: String, required: true},
  sourceUrl: {type: String, required: false},
  imageUrl: {type: String, required: false},
  passage: {type: String, required: true},
  recited: {type: Number, required: false},
  depot: {type: Boolean, require:false},
  user: {type: String, require: false},
  first_name: {type: String, require: false},
  last_name: {type: String, require: false},
  correct: {type: Number, required: false},
  total: {type: Number, required: false}
});

var Passages = mongoose.model('passages', PassageSchema);

module.exports = Passages;
