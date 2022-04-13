const express = require("express");

require("dotenv").config()


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.port || 8000


app.get("/projects", (req, res) => {
  console.log(`Projects request. Language: ${req.body.lang}`)
  if (["es", "en"].includes(req.body.lang)) {
    let projectsData = require("./data/projectsData")
    let projects = []
    projectsData.map(project => 
      projects.push({
        title: project.title,
        description: (req.body.lang === "es") ? project.esDescription : project.enDescription,
        url: project.url,
        image: project.image
      })
    )

    res.json(projects)
  } else {
    res.status(400).json({ error: "Enter a valid language... en / es" })
  }
})


app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})
