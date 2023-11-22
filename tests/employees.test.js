const { PrismaClient } = require('@prisma/client');
const express = require('express');
const request = require('supertest');
const router = require('../routes/employees');

const prisma = new PrismaClient();
const app = express();
app.use('/', router);

describe('Test handlers', function () {
    test("respond to /", async () => {
        try {
            const response = await request(app).get('/');
            const getEmployees = await prisma.employees.findMany();
            expect(response.body.data).toEqual(getEmployees);
        } catch (error) {
            console.log(error);
        }
    });

    test("respond to /:id", async () => {
        try {
            const response = await request(app).get('/1');
            const getEmployees = await prisma.employees.findUnique({
                where: {
                    id_employee: parseInt(1),
                },
            });
            expect(response.body.data).toEqual(getEmployees);
        } catch (error) {
            console.log(error);
        }
    });
});
