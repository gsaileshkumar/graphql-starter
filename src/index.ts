import express from "express";
import graphqlHTTP from "express-graphql";
import TodoSchema from "./schema";
import mongoose from "mongoose";

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@free-cluster-pjrcd.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`,
  { useUnifiedTopology: true, useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("conneted to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: TodoSchema,
    graphiql: true
  })
);

app.listen(4000);
