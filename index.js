cosnt app = require ("express")()

app.get('/', (req,res) => res.send('GET'))
app.post('/',(req,res) => res.sen('POST'))
app.listen(4000)