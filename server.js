const { app } = require('./app');

const { User } = require('./models/user.model');
const { Task } = require('./models/task.model');

const { db } = require('./utils/database');

db.authenticate()
  .then(() => console.log('Database succeful'))
  .catch(err => console.log(err));

User.hasMany(Task);
Task.belongsTo(User);

db.sync(/* { force: true } */)
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
