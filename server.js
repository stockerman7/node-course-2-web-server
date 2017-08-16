const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();
// 특정 디렉토리를 빠르게 로드하는 registerPartials
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase(); // 대문자로 변경
});

// 조회
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to Home.'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

// bad - json으로 에러 메세지를 전달
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: '요청을 처리할 수 없습니다.'
  });
});

app.listen(port, () => {
  console.log(`${port} 포트로 접속되었습니다.`);
}); // 포트 설정
