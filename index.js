/*"eslint": "7.29.0",*/
const { request, response } = require('express')
const express = require('express')
const cors = require('cors')
const app = express()
const looger = require('./loogerMiddleware ')



/*app.use(requestTime);

app.get('/', function (req, res) {
  var responseText = 'Hello World!';
  responseText += 'Requested at: ' + req.requestTime + '';
  res.send(responseText);
});

app.listen(3000);*/
app.use(cors())
app.use(express.json())
app.use(looger)
let notes = [
    {
      id: 1,
      content: 'Colombia HTML is easy',
      date: '2019-05-30T17:30:31.098Z',
      important: true
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      date: '2019-05-30T18:39:34.091Z',
      important: false
    },
    {
      id: 3,
      content: 'GET and POST are the most important methods of HTTP protocol',
      date: '2019-05-30T19:20:14.298Z',
      important: true
    }
  ]

/*const http = require('http')

const app = http.createServer((request, response) => {

    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify(notes))
})*/

app.get('/', (request,response) =>{ 

    response.send('<h1>Servidor con Express</h1>')
})

app.get('/api/notes', (request,response)=>{
    response.json(notes)
})

app.get('/api/notes/:id', (request,response)=>{
     const id  = Number(request.params.id)
     console.log({id})
     const note = notes.find(note  => note.id == id)
     console.log({note})
     
     if(note){
      response.json(note)

     }else{
      response.status(404).end()
     }
     //response.send(id)
})

app.delete('/api/notes/:id', (request,response)=>{
  const id  = Number(request.params.id)
  notes = notes.filter(note  => note.id != id)
  console.log({id})
  console.log({notes})
  response.status(204).end()
  
})

app.post('/api/notes', (request,response)=>{
  const note = request.body
  
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important != 'undefine'? note.important : false
    
  }
  notes = [...notes, newNote]
  response.status(201).json(newNote)
})

app.use((request, response)=>{
  response.status(404).json({error: 'Pagina No Encontrada'})
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`El servidor corre en el puerto ${PORT}`)
})



