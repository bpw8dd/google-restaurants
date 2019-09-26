const axios = require('axios');
const express = require('express');
const app = express()
const port = 9000

app.get('/', function(req, res){
    res.send("Restaurants Server");
});

app.get('/restaurant/:address/:cuisine', (req, res) => { 
        let URL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + req.params.cuisine + " restaurants+in "+ req.params.address +"&key=AIzaSyBQRbOl8Z5HnrY12zURP84C6Tdwsoy-HUI";
        axios.get(URL).then(response => {
            res.send(response.data);
        });
    });

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/*
app.get('/getGeocode:address', (req,res) =>{
    access google api with req.params.address
    axios.get(google api url).then(
        res.send(response from google)
    )
})
*/