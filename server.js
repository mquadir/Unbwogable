
// https://expressjs.com/en/starter/hello-world.html
const express = require('express');
const mongoose = require('mongoose');

// Point URLs to files in api folder in routes folder
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
//

// initialize Express application
const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
// Connect to mongoURI
.connect(db, {
    // Enables the new unified topology layer
    useUnifiedTopology: true,
    // Flag for using new URL string parser set to true;
    useNewUrlParser: true,
})
// Return success message if connection achieved
.then(() => console.log('MongoDB connected!'))
// Return error message if connection failed
.catch(err => console.log(err));

app.get('/', (req, res) => res.send('I AM UNBWOGABLE!'));

// Using routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 7000;

// Listen for port and return message if port heard
app.listen(port, () => console.log(`Server running on port ${port}`));

