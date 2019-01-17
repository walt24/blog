const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, runServer, closeServer } = require("../server");
const expect = chai.expect;
chai.use(chaiHttp);

describe("Blog tests", function() {
  before(function() {
    return runServer();
  });
  after(function() {
    return closeServer();
  });

.
  it("expect all blog posts as a json array", function() {
    return chai
      .request(app)
      .get("/blog-posts")
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a("array");
        expect(res.body.length).to.be.at.least(1);
      });
  });

 
  it("expect to add on new blog via POST", function() {
    const newItem = { title: "test blog", content: "long blog post",author:{firstName : "Walter",
	lastName: "andujar",username: "rivera"} };
    return chai
      .request(app)
      .post("/blog-post")
      .send(newItem)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a("object");
        expect(res.body).to.include.keys("title", "content");
        expect(res.body.id).to.not.equal(null);
      });
  });
});