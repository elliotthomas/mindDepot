var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var PassageSchema = new Schema ({
  title: {type: String, required: true},
  author: {type: String, required: true},
  sourceUrl: {type: String, required: false},
  passage: {type: String, required: true}
});

var Passages = mongoose.model('passages', PassageSchema);

module.exports = Passages;
