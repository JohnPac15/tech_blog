const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers')
const exphbs = require('express-handlebars');
const path = require('path');

const hbs = exphbs.create({})

const app = express();
const PORT = process.env.PORT || 3001;


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
  });