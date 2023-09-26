const app = require ("express")()

app.get('/', (req,res) => res.send('GET'))
app.post('/',(req,res) => res.send('POST'))
app.listen(4000)
