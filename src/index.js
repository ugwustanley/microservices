import express from 'express'
import routes from './routes/index'

const app = express()

app.get("/" , (req, res) =>{
    res.send("welcome to service registry")
})

app.use("/services", routes)

const PORT = process.env.PORT || 7000

app.listen(PORT , () =>{

    console.log(`app listening at port ${PORT}`)
})