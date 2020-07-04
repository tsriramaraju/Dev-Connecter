const express = require('express');
const connectDB = require('./config/mongoDB');
const userRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const profileRoutes = require('./routes/profile');

//Intialisation
const app = express();
const port = 3000;

//DataBase Connection
connectDB();

//body Parser
app.use(express.json());

//Routes
app.get('/', (req, res) => res.json({ message: 'welcome to Dev Connector' }));
app.get('/v1/api/', (req, res) =>
  res.json({ message: 'welcome to Dev Connector API Version:1.0' })
);
app.use('/v1/api/users', userRoutes);
app.use('/v1/api/posts', postsRoutes);
app.use('/v1/api/profile', profileRoutes);

//Server
app.listen(port, () => console.log('Server running on PORT:' + port));