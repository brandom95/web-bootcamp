import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

// global variables
const app = express();
const port = 3000;
const userPost = [];

//middleware for checking input
const postById = (req, res, next) => {
    const {
        body,
        params: { id },
    } = req;

    const parsedID = parseInt(id);
    if (isNaN(parsedID)) return res.sendStatus(400);
    const findPostId = userPost.findIndex((post) => post.id === parsedID);

    if (findPostId === -1) return res.sendStatus(400);
    req.findPostId = findPostId;
    next();
}

//express configuration
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(methodOverride('_method'));


// port listening 
app.listen(port, () => {
    console.log(`The app is running on port ${port}.`)
});



//getting the index.ejs 
app.get("/", (req, res) => {
    res.render("index.ejs", { userPost: userPost });
});


//post app method
app.post("/submit", (req, res) => {
    console.log(req.body);
    const { paragraph_text } = req.body;
    let newId = 0;
    if (userPost.length === 0) {
        newId = 1;
    } else {
        newId = userPost[userPost.length - 1].id + 1;
    }

    const newPost = { id: newId, post: paragraph_text };
    userPost.push(newPost);
    res.redirect("/")
});

// ID access for verification
app.get("/post/:id", postById, (req, res, next) => {
    const findPostId = req.findPostId;
    const findPost = userPost[findPostId];
    if (!findPost) return res.sendStatus(400);
    return res.send(findPost);
});

//put 
app.put("/post/:id", postById, (req, res) => {
    const { body, findPostId } = req;
    userPost[findPostId] = { id: userPost[findPostId].id, ...body };
    return res.sendStatus(200);
});

//patch method for update
app.patch("/post/:id", postById, (req, res) => {
    const { post } = req;
    const findPostId = req.findPostId;
    userPost[findPostId].post = post; // Update the post text
    return res.sendStatus(200);
});


