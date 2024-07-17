import supertest from "supertest";
import {web} from "../src/application/web.js";
import {logger} from "../src/application/logging.js";
import {createTestUser, deleteTestUser, getTestUser} from "./test-util.js";
import bcrypt from "bcrypt";

describe('POST /api/users', () => {
    afterEach(async () => {
        await deleteTestUser()
    })

    it('should be able to register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'rahasia',
                name: 'test'
            })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
        expect(result.body.data.password).toBeUndefined();
    });

    it('should be able to reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                password: '',
                name: ''
            })

        logger.info(result.body)
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    });

    it('should be able to reject if username already existed', async () => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'rahasia',
                name: 'test'
            })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'rahasia',
                name: 'test'
            })

        logger.info(result.body)

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    });
});

describe('POST /api/users/login', () => {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await deleteTestUser()
    })

    it('should be able to login user', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test',
                password: 'rahasia'
            })

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.token).toBeDefined()
        expect(result.body.data.token).not.toBe('test')
    })

    it('should be able to reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: '',
                password: ''
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    it('should be able to reject if password is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test',
                password: 'salah'
            })

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

    it('should be able to reject if username is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'salah',
                password: 'salah'
            })

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
});

describe('GET /api/users/current', () => {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await deleteTestUser()
    })

    it('should be able to get current user data', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test')
    });

    it('should be able to reject if token is invalid', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'salah')

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    });
});

describe('PATCH /api/users/current', () => {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await deleteTestUser()
    })

    it('should be able to update data', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 'Alfito',
                password: 'rahasialagi'
            })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('Alfito')

        const user = await getTestUser()
        expect(await bcrypt.compare('rahasialagi', user.password)).toBe(true)
    });

    it('should be able to update user name', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 'Alfito',
            })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('Alfito')
    });

    it('should be able to update user password', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                password: 'rahasialagi'
            })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test')

        const user = await getTestUser()
        expect(await bcrypt.compare('rahasialagi', user.password)).toBe(true)
    });

    it('should be able to reject if request is invalid', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'tokensalah')
            .send({})

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    });
});

describe('DELETE /api/users/logout', () => {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await deleteTestUser()
    })

    it('should be able to logout', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data).toBe('OK')


        const user = await getTestUser()
        expect(user.token).toBeNull()
    });

    it('should be able to reject if token is invalid', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'tokensalah')

        expect(result.status).toBe(401)
    });
});