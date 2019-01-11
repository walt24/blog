const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const blogPosts = require('./blogModel.js')

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


//app.use(validatePost);




app.get('/blog-posts',(req,res)=>{
	blogPosts.find({},(err,posts)=>{
		if(err){
  		console.log(err)
  		res.send("Internal error 500");
  	};
		res.json(posts);
	})
})

app.get('/blog-post/:id',(req,res)=>{
	blogPosts.findById(req.params.id,(err,post)=>{
		if(err){
  		console.log(err)
  		res.send("Internal error 500");
  	};
		res.json(post);
	})
})

app.post('/blog-post',(req,res)=>{
	let reqList = ["title","content","firstName","lastName"]
	let counter = 0;
	for(prop in req.body){
		if(!(prop == reqList[counter])){
			console.log( ` ${reqList[counter]} - ${counter} and ${prop}`)
			res.json(`The input ${prop} is missing`);
		}
		counter++
	}
	
	blogPosts.create({title: req.body.title,content: req.body.content, author:{ firstName: req.body.firstName, lastName: req.body.lastName}},(err,post)=>{
  	if(err){
  		console.log(err)
  		res.send("Internal error 500");
  	};
 		res.json(post)
	})
})

app.delete('/blog-post/:id',(req,res)=>{
	blogPosts.deleteOne({_id: req.params.id},(err)=>{
		if(err){
  		console.log(err)
  		res.send("Internal error 500");
  	};
		res.redirect('/blog-posts');	
	});	
})



app.listen(3000,()=>{
	console.log("Server now running!")
});