const express = require('express');
const app = express();
const path = require('path');
const port = 3000
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
const JSON = require('circular-json');

mongoose.connect("mongodb://localhost/wordBankDB", { useNewUrlParser: true,  useUnifiedTopology: true }, (err, database) => {
}
);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
})

app.use('/build', express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* alternate code that works to what i have compiled aboce */

// app.get('/build/bundle.js', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build/bundle.js'))
// })
//original code but modified to less code on line 10. just used app.use and express.static
let nameSchema = new mongoose.Schema({
    word: String,
    definition: String
   });

let InputModel = mongoose.model("Input", nameSchema);
// console.log(Input)

app.post("/add", (req, res) => {
    // InputModel.findOne({req.body})
    // console.log("req.body", req.body) //-- >  console.log worked
    let denotation = new InputModel(req.body);
    // console.log(denotation);
    denotation.save(function(err, doc){
        if(err) {
            console.log('error in cb on save')
            res.send(err)
        }
        
    })
    // let filteredArr = [];
    InputModel.find({}, function(err, allArray){
        // for(let i = 0; i < allArray.length; i++){
        //         filteredArr.push([allArray[i].word, allArray[i].definition])
        //     }
       
        res.status(200);
        res.set({ 'Content-type': 'application/json'});
        res.send(JSON.stringify(allArray));
                // return filteredArr;  
        }) 
            // console.log(query)  
    

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))