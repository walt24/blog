const express = require('express');
const app = express();
const {BlogPosts} = require('./blogModel.js');
const morgan = require('morgan');
const bodyParser = require('body-parser');


app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


//app.use(validatePost);


BlogPosts.create("one","This is the first blog post","Walter Andujar",Date.now());
BlogPosts.create("two","This is the second blog post","Walter Andujar",Date.now());
BlogPosts.create("three","This is the third blog post","Walter Andujar",Date.now());
BlogPosts.create("four","This is the fourth blog post","Walter Andujar",Date.now());
BlogPosts.create("five","This is the fifth blog post","Walter Andujar",Date.now());

app.get('/blog-posts',(req,res)=>{
	res.json(BlogPosts.posts);
})

app.post('/blog-posts',(req,res)=>{
	let reqList = ["title","content","author"]
	let counter = 0;
	for(prop in req.body){
		if(!(prop == reqList[counter])){
			res.json(`The input ${prop} is missin`);
			counter++
		}
	}
	BlogPosts.create(req.body.title,req.body.content,req.body.author);
	res.json(BlogPosts);
})

app.delete('/blog-posts/:id',(req,res)=>{
	BlogPosts.delete(req.params.id);
	res.json(BlogPosts);
})

app.put('/blog-posts/:id',(req,res)=>{
	BlogPosts.update(req.body);
	res.json(BlogPosts);
})









app.listen(3000,()=>{
	console.log("Server now running!")
});