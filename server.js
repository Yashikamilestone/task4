let express = require("express");
let bodyParser = require("body-parser");

let app = express();
app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();

});
let axios = require("axios");
app.use(bodyParser.json());
var port = process.env.PORT || 2410;

let baseUrl = "https://jsonplaceholder.typicode.com";
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

app.post("/myserver", async function(req,res){
    let{method,url,body1,headers} = req.body
    let config = {headers : headers}
    console.log("config", config)
    
    try {
        if(method==="get"){
            console.log("inside if",url)
        let response = await axios.get(`${url}`,config)
        console.log(response.data)
        //let{data} = response;
        let data = typeof response.data === 'number' ? response.data.toString() : response.data;
        res.send(data);
      /* if(Array.isArray(data))res.send(data);
       else res.send(data.toString());
        */}
        else{
            console.log("inside else",url)
            let data1 = JSON.parse(body1)
            console.log(body1)
            let response = await axios.post(`${url}`,data1)
            console.log("resp", response)
            res.send(response.data);
        }
    }
    catch(error){
        console.log("inside catch")
        if(error.response){
            let{status,statusText}= error.response;
            let response = {data : {message : error.message, code :error.code}}
            console.log(error.code)
            res.status(401).send(response)
        }
        else { res.status(404).send(error.message)}
    }

})