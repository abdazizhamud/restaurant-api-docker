import express from 'express';
import menuRouter from './src/routes/menu.routes.js';

const app = express();
const port = 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.use('/api/v1/menu', menuRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})