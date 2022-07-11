const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const { DBPool } = require('idb-pconnector');
const db = require('idb-connector')
const dbconn = new db.dbconn()
dbconn.conn("*LOCAL")
const stmt = new db.dbstmt(dbconn)

var express = require('express')
var app = express()
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.get('/', function(req, res) {
  //let stmt = new db.dbstmt(dbconn)
  //stmt.exec(`SELECT * FROM gani1.EMPLOYEE`, function(results, err) {
   res.json('Hello PIO......you welcome in Employee world!')
   //stmt.close()
  })
app.get('/data', function(req, res) {
    let stmt = new db.dbstmt(dbconn)
    stmt.exec(`SELECT * FROM gani1.EMPLOYEE`, function(results, err) {
     res.json(results)
     stmt.close()
    })
  })


  app.post('/Create', async(req, res)=> {
    try {
        const pool = new DBPool();
        const EId = req.body.id;
        const EName = req.body.name;
        const EAge = req.body.age;
        const EGen = req.body.gen;

        const sql = `Insert into GANI1.EMPLOYEE(EMPID, EMPNAME, EMPAGE, EMPGEN) values (?,?,?,?) WITH NONE`;
        const params = [EId, EName, EAge, EGen];
        await pool.prepareExecute(sql, params); // prepare and execute the statement 
        res.redirect('/data');
    } catch (error) { 
        console.log(error);
    }

  })
  app.put('/update/:id', async(req, res)=> {
    try {
        const pool = new DBPool();
        const EId = req.params.id;
        const EName = req.body.name;
        const EAge = req.body.age;
        const EGen = req.body.gen;

        const sql = `Update GANI1.EMPLOYEE SET EMPNAME = ?, EMPAGE=?, EMPGEN=? Where EMPID = ? WITH NONE`;
        const params = [EName, EAge, EGen, EId];
        await pool.prepareExecute(sql, params); // prepare and execute the statement 
        //res.redirect('/data');
        res.json('"Sucess":"Y"');
    } catch (error) { 
        console.log(error);
    }

  })

  app.delete('/delete/:id', async(req, res)=> {
    try {
        const pool = new DBPool();
        const EId = req.params.id;
        const sql = `Delete from GANI1.EMPLOYEE Where EMPID = ? WITH NONE`;
        const params = [EId];
        await pool.prepareExecute(sql, params); // prepare and execute the statement 
        //res.redirect('/data');
        res.json('"Sucess":"Y"');
    } catch (error) { 
        console.log(error);
    }

  })


dotenv.config({ path: 'config.env' });
var port = process.env.PORT || 8080
app.listen(port, function() {
  console.log('Running on port %d', port)
})
