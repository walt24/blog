const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://wandujar:Woar9253@ds243441.mlab.com:43441/emailerdb",{useNewUrlParser: true});

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    firstName: String,
    lastName: String
  }
})

blogSchema.methods.fullName = function(){
  return `${this.author.firstName} ${this.author.lastName}`
}

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;

/*
Blog.create({title: "second",content: "bad blog", author:{ firstName: "walter", lastName: "Andujar"}},function(err,post){
  if(err){console.log(err)};
  console.log(post.fullName());
})
*/
