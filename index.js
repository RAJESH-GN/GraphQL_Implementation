const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const {buildSchema} = require("graphql");

var app = express();

app.use(bodyParser.json());

app.use('/graphql',graphqlHttp({
    schema:buildSchema(`
        type RootQuery  {
            events: [String!]!
        }

        type RootMutations  {
            createEvent(name:String):String
        }
    schema{
            query:RootQuery
            mutation: RootMutations
        }
    `),
    rootValue:{
        events :() =>{
            return ["Round night","Cooking","All Night Coding"]
        },
        createEvent :(args) =>{
            return args.name
        }
    },
    graphiql:true
}))
app.listen(3000);
