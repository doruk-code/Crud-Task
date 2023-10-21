const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
var router = express.Router();
const port = 3000;
app.use(cors());
app.use(express.json());
const HTML_DIR = path.join(__dirname, '/public/')
app.use(express.static(HTML_DIR))
const mysql = require('mysql');
const { query } = require('express');

const baglanti = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kullanicilar'
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.listen(port, () => {
  console.log(`Çalıştığı PORT ${port}`)
})


app.get('/kullanici', function(req, res) {
  let sql = 'SELECT * FROM kullanicilar';
  baglanti.query(sql, function (err, results, fields) {
      res.status(202).send(results);
  });
});


app.post('/kullaniciekleme', function(req, res) {
  const kkadi = req.body.kkadi;
  const sifre = req.body.sifre;
  let sql2 = `SELECT * FROM kullanicilar WHERE kullaniciadi = '${kkadi}'`;
  baglanti.query(sql2, function (err, results) {
    console.log(results)
      if (err) throw err;
      if(results.length == 0){
        let sql = 'INSERT INTO kullanicilar (kullaniciadi, sifre) VALUES (?, ?)';
        let values = [kkadi, sifre];
        baglanti.query(sql, values, function (err, results, fields) {
            if (err) throw err;
            res.status(201).send(results);
        }
        );
      }
      else{
        res.status(202).send(results);
      }
  }
  );

});



app.post('/kullanicisilme', function(req, res) {
  const kkadi = req.body.kkadi;

  let sql = 'DELETE FROM kullanicilar WHERE kullaniciadi = ?';
  let values = [kkadi];
  baglanti.query(sql, values, function (err, results, fields) {
      if (err) throw err;
      res.status(202).send(results);
  }
  ); 
}
);

app.post('/kullaniciarama', function(req, res) {
  const kkadi = req.body.kkadi;

  let sql = `SELECT * FROM kullanicilar WHERE kullaniciadi = '${kkadi}'`;
  console.log(kkadi);
  baglanti.query(sql, function (err, results) {
    console.log(results)
      if (err) throw err;
      res.status(202).send(results);
  }
  );

}
);

app.post('/kullaniciguncelleme', function(req, res) {
  const kkadi = req.body.kkadi;
  const sifre = req.body.sifre;
  let sql = `UPDATE kullanicilar SET sifre = '${sifre}' WHERE kullaniciadi = '${kkadi}'`;
  baglanti.query(sql, function (err, results) {
      console.log(results)
      if (err) throw err;
      if(results.affectedRows == 0){
        res.status(202).send(results);
      }
      else{
        res.status(201).send(results);
      }
  }
  );

}
);  
  