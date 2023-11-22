/**
 * @fileoverview Employee RESTful API
 * @module Employee
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * @typedef {Object} Employee
 * @property {number} id_employee - ID karyawan
 * @property {string} name - Nama karyawan
 * @property {string} job - Jabatan karyawan
 * @property {number} salary - Gaji karyawan
 */

/**
 * Mendapatkan daftar semua karyawan.
 *
 * @route GET /employees
 * @returns {Object} - Objek respons
 * @throws {Error} - Jika terjadi kesalahan dalam mendapatkan data karyawan.
 */
router.get('/', async (req, res) => {
  try {
    /** @type {Employee[]} */
    const employee = await prisma.employees.findMany();
    res.send({
      status: 200,
      error: null,
      message: 'Berhasil mendapatkan data karyawan',
      data: employee,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      error: error,
      message: 'Gagal mendapatkan data karyawan',
      data: [],
    });
  }
});

/**
 * Mendapatkan data karyawan berdasarkan ID.
 *
 * @route GET /employees/:id
 * @param {number} id.params - ID karyawan
 * @returns {Object} - Objek respons
 * @throws {Error} - Jika karyawan tidak ditemukan atau terjadi kesalahan.
 */
router.get('/:id', async (req, res) => {
  try {
    /** @type {Employee} */
    const employee = await prisma.employees.findUnique({
      where: {
        id_employee: parseInt(req.params.id),
      },
    });

    if (employee) {
      res.send({
        status: 200,
        error: null,
        message: `Berhasil mendapatkan data karyawan dengan id: ${req.params.id}`,
        data: employee,
      });
    } else {
      res.send({
        status: 404,
        error: null,
        message: 'Data karyawan tidak ditemukan',
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      error: error,
      message: 'Gagal mendapatkan data karyawan',
      data: [],
    });
  }
});

/**
 * Menambahkan data karyawan baru.
 *
 * @route POST /employees
 * @param {string} name.body.required - Nama karyawan
 * @param {string} job.body.required - Jabatan karyawan
 * @param {number} salary.body.required - Gaji karyawan
 * @returns {Object} - Objek respons
 * @throws {Error} - Jika terjadi kesalahan dalam menambahkan data karyawan.
 */
router.post('/', async (req, res) => {
  const { name, job, salary } = req.body;
  try {
    /** @type {Employee} */
    const employee = await prisma.employees.create({
      data: {
        name: name,
        job: job,
        salary: salary,
      },
    });
    res.send({
      status: 200,
      error: null,
      message: 'Berhasil menambahkan data karyawan',
      data: employee,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      error: error,
      message: 'Gagal menambahkan data karyawan',
      data: [],
    });
  }
});

/**
 * Memperbarui data karyawan berdasarkan ID.
 *
 * @route PUT /employees/update/:id
 * @param {number} id.params - ID karyawan yang akan diperbarui
 * @param {string} name.body.required - Nama karyawan yang baru
 * @param {string} job.body.required - Jabatan karyawan yang baru
 * @param {number} salary.body.required - Gaji karyawan yang baru
 * @returns {Object} - Objek respons
 * @throws {Error} - Jika karyawan tidak ditemukan atau terjadi kesalahan dalam pembaruan.
 */
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, job, salary } = req.body;

    /** @type {Employee} */
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
      status: 200,
      error: null,
      message: `Berhasil memperbarui data karyawan dengan id: ${id}`,
      data: updateEmployee,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      error: error,
      message: 'Gagal memperbarui data karyawan',
      data: [],
    });
  }
});

/**
 * Menghapus data karyawan berdasarkan ID.
 *
 * @route DELETE /employees/delete/:id
 * @param {number} id.params - ID karyawan yang akan dihapus
 * @returns {Object} - Objek respons
 * @throws {Error} - Jika karyawan tidak ditemukan atau terjadi kesalahan dalam penghapusan.
 */
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    /** @type {Employee} */
    const deleteEmployee = await prisma.employees.delete({
      where: {
        id_employee: parseInt(id),
      },
    });

    res.send({
      status: 200,
      error: null,
      message: `Berhasil menghapus data karyawan dengan id: ${id}`,
      data: deleteEmployee,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      error: error,
      message: 'Gagal menghapus data karyawan',
      data: [],
    });
  }
});

module.exports = router;