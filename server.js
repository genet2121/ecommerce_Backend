const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());



const ProjectDependencies = require("./configuration/dependencies");
const dependencies = new ProjectDependencies();
const {port} = dependencies.getDependencies()

//ROUTERS
const authRouter = require("./infrastructure/routes/auth");
const FileRouter = require("./infrastructure/routes/file");
const CrudRouter = require("./infrastructure/routes/crud");
const crudrouter = new CrudRouter(dependencies.getDependencies());


app.use(express.json());

app.use("/api/crud", crudrouter.getRoute(dependencies.getDependencies()))
app.use("/api/auth", authRouter(dependencies.getDependencies()))
app.use("/api/file", FileRouter(dependencies.getDependencies()))



app.use((req, res)=>{
    try{
        return res.status(404).json(`URL Not Found ${req.originalUrl}`)
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Unknown Error"})
    }
})


app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
})