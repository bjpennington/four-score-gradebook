
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const classroomRouter = require('./routes/classroom.router');
const studentRouter = require('./routes/student.router');
const standardRouter = require('./routes/standard.router');
const scoreRouter = require('./routes/score.router');
const assignmentRouter = require('./routes/assignment.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/classroom', classroomRouter);
app.use('/api/student', studentRouter);
app.use('/api/standard', standardRouter);
app.use('/api/score', scoreRouter);
app.use('/api/assignment', assignmentRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = app;