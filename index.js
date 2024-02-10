//Importing from Express to make the app, and using Body-Parser middleware.
import express from "express";
import bodyParser from "body-parser";
import readline from "readline-sync";


//Using the app variable to use express.
const app = express();

//Using port 3000 for the project.
const port = 3000;


/*Variables that will be used for the user's username and stores their messages in EJS. 
isHistory handles whether or not if there are comments in mhistory.*/
let name = "";
let mhistory = [];
let isHistory = false;

//Connects the public folder to use images located there.
app.use(express.static("public"));

//Middleware.
app.use(bodyParser.urlencoded({ extended: true }));

//A Get request that renders the index.ejs.
app.get("/", (req, res) => {
    res.render("signin.ejs");
}); 

//A Post request that request the username from the user. Then render the homepage.ejs.
app.post("/signin", (req, res) => {

    //Grabs the username that the user submitted for the Post request.
    name = req.body["username"]

    //Renders the homepage.ejs along with the username the user provided.
    res.render("homepage.ejs", {
        username: name
    });
});

/*A Post request that gets the message from the user. Then render the homepage.ejs.
Once received, the message is added to the mhistory array to store user's messages.*/
app.post("/homepage", (req, res) => {

    //Creating the m variable to handle the messages that the user sends.
    let m = req.body["messages"];

    //Push the new message into the mhistory Array.
    mhistory.push(m);

    //isHistory changes the HTML to show history.
    isHistory = true;

    //Renders the homepage.ejs, along with the user's username and message history.
    res.render("homepage.ejs", {
        username: name,
        messages: mhistory
    });
})

/*A Post request that handles if the Edit or Delete buttons 
are pressed in history.ejs.*/
app.post("/history", (req, res) => {
    
    //If the edit button is pressed... 
    if(req.body["edit"]){

        //New variable to store new message.
        var newComment = "";
        
        //Prompt that ask the user for the new comment in the terminal.
        newComment = readline.question("What is the new comment?");
        
        //For loop that finds the old message in the mhistory array.
        for (let i = 0; i < mhistory.length; i++) {

            //Once found, replace the old message spot with the new one in the array.
            if(req.body["edit"] === mhistory[i]){
                mhistory[i] = newComment;
            }
            
        }
        
        //Message confirming the comment change
        console.log("The message has been changed!");
    }
    
    //If the delete button is pressed... 
    else if (req.body["delete"]){
        
        //Find the comment in mhistory, then delete it.
        mhistory = mhistory.filter(item => item !== req.body["delete"]);

        //If there is no comments in mhistory, change isHistory to false
        //to represent no history.
        if(mhistory.length === 0){
            isHistory = false;
        }
    }
    
    //Renders the homepage.ejs, along with the user's username and message history.
    res.render("history.ejs", {
        username: name,
        messages: mhistory,
        history: isHistory
    });
})

//Renders homepage.ejs.
app.get("/homepage", (req, res) => {
    res.render("homepage.ejs", {
        username: name,
    });
});

//Renders history.ejs.
app.get("/history", (req, res) => {
    res.render("history.ejs", {
        username: name,
        messages: mhistory,
        history: isHistory
    });
}); 

//App listening on Port 3000.
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



