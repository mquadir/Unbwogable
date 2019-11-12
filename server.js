// Reference:
// https://expressjs.com/en/starter/hello-world.html
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Point URLs to files in api folder in routes folder
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
//

// initialize Express application
const app = express();

// Body Parser
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
// Connect to mongoURI


// , {
//     // Enables the new unified topology layer
//     useUnifiedTopology: true,
//     // Flag for using new URL string parser set to true;
//     useNewUrlParser: true,
// })


.connect(db, {
    useNewUrlParser : true,
    useUnifiedTopology: true
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

const port = process.env.PORT || 12000;

// Listen for port and return message if port heard
app.listen(port, () => console.log(`Server running on port ${port}`));

