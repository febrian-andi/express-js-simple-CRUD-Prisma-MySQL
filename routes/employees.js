var express = require('express');
var router = express.Router();
const db = require('../config/config');

// METHOD GET
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM employees';
  db.query(sql, (err, results) => {
    if (err) {
      res.send({
        status : 500,
        error : err,
        message : 'Gagal mendapatkan data karyawan',
        data : []
      })
    } else {
      res.send({
        status : 200,
        error : null,
        message : 'Berhasil mendapatkan data karyawan',
        data : results
      })
    }
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id; // Mengambil ID dari jalur URL
  const sql = `SELECT * FROM employees WHERE id_employee = ${id}`;
  db.query(sql, (err, results) => {
    if (err) {
      res.send({
        status : 500,
        error : err,
        message : 'Gagal mendapatkan data karyawan',
        data : []
      });
    } else {
      if (results.length === 0) {
        res.send({
          status : 404,
          error : null,
          message : 'Data karyawan tidak ditemukan',
          data : []
        });
      } else {
        res.send({
          status : 200,
          error : null,
          message : 'Berhasil menemukan data karyawan dengan id : ' + id,
          data : results
        });
      }
    }
  });
});

// METHOD POST
router.post('/', (req, res) => {
  const { nama, job, salary } = req.body;
  const sql = `INSERT INTO employees (nama, job, salary) VALUES ('${nama}', '${job}', '${salary}')`;
  db.query(sql, (err, results) => {
    if (err) {
      res.send({
        status : 500,
        error : err,
        message : 'Gagal menambahkan data karyawan',
        data : []
      });
    } else {
      res.send({
        status : 200,
        error : null,
        message : 'Berhasil menambahkan data karyawan',
        data : {
          id: results.insertId,
          fields: req.body
          // nama: nama,
          // job: job,
          // salary: salary
        }
      });
    }
  });
});

// METHOD PUT
router.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const { nama, job, salary } = req.body;
  const sql = `UPDATE employees SET nama = '${nama}', job = '${job}', salary = '${salary}' WHERE id_employee = ${id}`;
  db.query(sql, (err, results) => {
    if (err) {
      res.send({
        status : 500,
        error : err,
        message : 'Gagal memperbarui data karyawan',
        data : []
      });
    } else {
      res.send({
        status : 200,
        error : null,
        message : 'Berhasil memperbarui data karyawan dengan id : ' + id,
        data : {
          id: id,
          fields: req.body
        }
      });
    }
  });
});

// METHOD DELETE
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM employees WHERE id_employee = ${id}`;
  db.query(sql, (err, results) => {
    if (err) {
      res.send({
        status : 500,
        error : err,
        message : 'Gagal menghapus data karyawan',
        data : []
      });
    } else {
      res.send({
        status : 200,
        error : null,
        message : 'Berhasil menghapus data karyawan dengan id : ' + id,
        data : []
      });
    }
  });
});

module.exports = router;
