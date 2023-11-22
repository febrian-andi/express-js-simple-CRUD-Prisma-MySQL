var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// METHOD GET
router.get('/', async (req, res) => {
  try {
    const employee = await prisma.employees.findMany();
    res.send({
      status : 200,
      error : null,
      message : 'Berhasil mendapatkan data karyawan',
      data : employee
    });
  } catch (error) {
    console.log(error);
    res.send({
      status : 500,
      error : error,
      message : 'Gagal mendapatkan data karyawan',
      data : []
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const employee = await prisma.employees.findUnique({
      where: {
        id_employee: parseInt(req.params.id),
      },
    });
    if (employee) {
      res.send({
        status : 200,
        error : null,
        message : 'Berhasil mendapatkan data karyawann dengan id : ' + req.params.id,
        data : employee
      });
      } else {
        res.send({
          status : 404,
          error : null,
          message : 'Data karyawan tidak ditemukan',
          data : []
        });
      }
  } catch (error) {
    console.log(error);
    res.send({
      status : 500,
      error : error,
      message : 'Gagal mendapatkan data karyawan',
      data : []
    });
  }
});

// METHOD POST
router.post('/', async (req, res) => {
  const { name, job, salary } = req.body;
  try {
    const employee = await prisma.employees.create({
      data: {
        name: name,
        job: job,
        salary: salary,
      },
    });
    res.send({
      status : 200,
      error : null,
      message : 'Berhasil menambahkan data karyawan',
      data : employee
    });
  } catch (error) {
    console.log(error);
  }
});

// METHOD PUT
router.put('/update/:id', async (req, res) => {
  try {
    // const id = req.params.id;
    const { id } = req.params;
    const { name, job, salary } = req.body;
  
    const updateEmployee = await prisma.employees.update({
      where: {
        id_employee: parseInt(id),
      },
      data: {
        name: name,
        job: job,
        salary: salary,
      },
    });
    res.send({
      status : 200,
      error : null,
      message : 'Berhasil memperbarui data karyawan dengan id : ' + id,
      data : updateEmployee
    });
  } catch (error) {
    console.log(error);
    res.send({
      status : 500,
      error : error,
      message : 'Gagal memperbarui data karyawan',
      data : []
    });
  }
});

// METHOD DELETE

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleteEmployee = await prisma.employees.delete({
      where: {
        id_employee: parseInt(id),
      },
    });
    res.send({
      status : 200,
      error : null,
      message : 'Berhasil menghapus data karyawan dengan id : ' + id,
      data : deleteEmployee
    });
  } catch (error) {
    console.log(error);
    res.send({
      status : 500,
      error : error,
      message : 'Gagal menghapus data karyawan',
      data : []
    });
  }
});

module.exports = router;
