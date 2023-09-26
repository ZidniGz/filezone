const app = require ("express")()
const fs = require("fs")

app.get('/', (req,res) => res.send('GET'))
app.post('/',(req,res) => res.send('POST'))
app.get('/data', (req, res) => {

let data = fs.writeFileSync('./data.txt','halo dari get')
res.send('GET')
})
app.post('/data', (req, res) => {

let data = fs.readFileSync('./data.txt')
res.send(data)
})

app.listen(4000)