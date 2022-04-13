const express = require("express");

require("dotenv").config()


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.port || 8000


const projectsData = [
  {
    title: "My Personal Blog",
    esDescription: "Este es mi blog personal, en el que utilizo Flask. Acá implementé algunas tecnologías interesantes como autenticación, una BD con PostgreSQL y más",
    enDescription: "none",
    url: "https://alejo-blog.herokuapp.com/",
    image: "python"
  },
  {
    title: "Shopping Cart App",
    esDescription: "Esta aplicación fue desarrollada con React.js y me sirvió para poner en práctica los hooks de React. Simula el funcionamiento de un carrito de compras",
    enDescription: "none",
    url: "https://alejo-shopping-cart.vercel.app/",
    image: "react"
  },
  {
    title: "Notes App",
    esDescription: "Aplicación desarrollada con React.js. Me sirvió para practicar manejo de estado en React a traves de hooks",
    enDescription: "none",
    url: "https://alejo-notes-app.vercel.app/",
    image: "react"
  },
]


app.get("/projects", (req, res) => {
  console.log(`Projects request. Language: ${req.body.lang}`)
  if (["es", "en"].includes(req.body.lang)) {
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
