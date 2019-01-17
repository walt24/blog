const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const blogPosts = require('./blogModel.js');
const author = require('./authorModel.js').Author;

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


//app.use(validatePost);

app.get('/blog-posts',(req,res)=>{
	blogPosts.find({},(err,posts)=>{
		if(err){
  		console.log(err)
  		return res.send("Internal error 500");
  	};
		return res.json(posts);
	})
})

app.get('/blog-post/:id',(req,res)=>{
	blogPosts.findById(req.params.id,(err,post)=>{
		if(err){
  		console.log(err)
  		return res.send("Internal error 500");
  	};
		return res.json(post);
	})
})

app.post('/blog-post',(req,res)=>{
	let reqList = ["title","content","firstName","lastName"]
	let counter = 0;
	for(prop in req.body){
		if(!(prop == reqList[counter])){
			console.log( ` ${reqList[counter]} - ${counter} and ${prop}`)
			return res.json(`The input ${prop} is missing`);
		}
		counter++
	}
	blogPosts.create({title: req.body.title,content: req.body.content, author:{ firstName: req.body.firstName, lastName: req.body.lastName}},(err,post)=>{
  	if(err){
  		console.log(err)
  		return res.send("Internal error 500");
  	};
 		return res.json(post)
	})
})

app.delete('/blog-post/:id',(req,res)=>{
	blogPosts.deleteOne({_id: req.params.id},(err)=>{
		if(err){
  		console.log(err)
  		return res.send("Internal error 500");
  	};
		return res.redirect('/blog-posts');	
	});	
})




app.post('/author',(req,res)=>{
	author.create({firstName : req.body.firstName, lastName: req.body.lastName, username: req.body.username},(err,doc)=>{
		if(err){
			console.err(err);
			return res.json({error: "Internal error 500"})
		}
		return res.json(doc);
	})
})

app.put('/author/:id',(req,res)=>{
	let update = {}
	for(prop in req.body){
		update[prop] = req.body[prop]
	}
	author.findOneAndUpdate({_id: req.params.id},update,(err,doc)=>{
		if(err){
			console.err(err);
			return res.json({error: "Internal error 500"})
		}
		return res.json(doc);
	})
	
})

app.delete('/author/:id',(req,res)=>{
	author.deleteOne({_id: req.params.id},(err)=>{
		blogPosts.deleteMany({'author._id': req.params.id},(err)=>{
			if(err){
				console.err(err);
				return res.json({error: "Internal error 500"})
			}
			return res.redirect('/blog-posts')
		})
	})
	
})

/*
app.listen(3000,()=>{
	console.log("Server now running!")
});
*/



let server;

function runServer() {
  const port = process.env.PORT || 3000;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    })
    .on('error', err => {
      reject(err);
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log("Closing server");
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};


module.exports = { app, runServer, closeServer };