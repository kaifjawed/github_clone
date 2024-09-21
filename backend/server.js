import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import path from 'path';
const __dirname = path.resolve();

import "./passport/github.auth.js";

import userRoutes from "./routes/user.route.js";
import exploreRoutes from "./routes/explore.route.js";
import authRoutes from "./routes/auth.route.js";

import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app=express();


app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

//app.use(cors());
//dotenv.config();
 app.get("/homepage",(req,res) => {
     res.send("Server is ready");
 });



app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/explore",exploreRoutes);

const PORT = process.env.PORT || 5000;
app.use( express.static(path.join(__dirname, '/frontend/dist')))

app.get("*", (_req, res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'dist', "index.html"))
})
app.listen(PORT,()=> {
    console.log(`Server started on port ${PORT}`);
    connectMongoDB();
});