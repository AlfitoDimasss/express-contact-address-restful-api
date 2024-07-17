import {
    createManyTestContacts,
    createTestContact,
    createTestUser,
    deleteTestUser,
    getTestContact,
    getTestUser,
    removeAllTestContact
} from "./test-util.js";
import supertest from "supertest";
import {web} from "../src/application/web.js";

describe('POST /api/contacts', () => {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeAllTestContact()
        await deleteTestUser()
    })

    it('should be able to create contact', async () => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: 'test',
                last_name: 'test',
                email: 'test@gmail.com',
                phone: '123'
            })

        expect(result.status).toBe(201)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.first_name).toBe('test')
        expect(result.body.data.last_name).toBe('test')
        expect(result.body.data.email).toBe('test@gmail.com')
        expect(result.body.data.phone).toBe('123')

        const user = await getTestUser()
        expect(user.contacts).toBeDefined()
    });

    it('should be able to reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: '',
                last_name: 'test',
                email: 'test.com',
                phone: '123123123123123123123123'
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    });
});

describe('GET /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestContact()
        await deleteTestUser()
    })

    it('should be able to get contact', async () => {
        const testContact = await getTestContact()
        const result = await supertest(web)
            .get(`/api/contacts/${testContact.id}`)
            .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.first_name).toBe(testContact.first_name)
        expect(result.body.data.last_name).toBe(testContact.last_name)
        expect(result.body.data.phone).toBe(testContact.phone)
        expect(result.body.data.email).toBe(testContact.email)
    });

    it('should be able to return 404 if contact is not found', async () => {
        const testContact = await getTestContact()
        const result = await supertest(web)
            .get(`/api/contacts/${testContact.id + 1}`)
            .set('Authorization', 'test')

        expect(result.status).toBe(404)
    });
});

describe('PUT /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestContact()
        await deleteTestUser()
    })

    it('should be able to update existing contact', async () => {
        const testContact = await getTestContact()
        const result = await supertest(web)
            .put(`/api/contacts/${testContact.id}`)
            .set('Authorization', 'test')
            .send({
                first_name: 'Alfito',
                last_name: 'Prasetyo',
                email: 'alfito@gmail.com',
                phone: '12345'
            })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.first_name).toBe('Alfito')
        expect(result.body.data.last_name).toBe('Prasetyo')
        expect(result.body.data.email).toBe('alfito@gmail.com')
        expect(result.body.data.phone).toBe('12345')
    });

    it('should be able to reject if request is invalid', async () => {
        const testContact = await getTestContact()
        const result = await supertest(web)
            .put(`/api/contacts/${testContact.id}`)
            .set('Authorization', 'test')
            .send({
                first_name: '',
                last_name: '',
                email: 'alfito',
                phone: ''
            })

        expect(result.status).toBe(400)
    });

    it('should be able to reject if contact is not found', async () => {
        const testContact = await getTestContact()
        const result = await supertest(web)
            .put(`/api/contacts/${testContact.id + 1}`)
            .set('Authorization', 'test')
            .send({
                first_name: 'Alfito',
                last_name: 'Prasetyo',
                email: 'alfito@gmail.com',
                phone: '12345'
            })

        expect(result.status).toBe(404)
    });
});

describe('DELETE /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestContact()
        await deleteTestUser()
    })

    it('should be able to remove contact', async () => {
        let testContact = await getTestContact()
        const result = await supertest(web)
            .delete(`/api/contacts/${testContact.id}`)
            .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data).toBe('OK')

        testContact = await getTestContact()
        expect(testContact).toBeNull()
    });

    it('should be able to reject if request is invalid', async () => {
        let testContact = await getTestContact()
        const result = await supertest(web)
            .delete(`/api/contacts/${testContact.id + 1}`)
            .set('Authorization', 'test')

        expect(result.status).toBe(404)
    });
});

describe('GET /api/contacts', () => {
    beforeEach(async () => {
        await createTestUser()
        await createManyTestContacts()
    })

    afterEach(async () => {
        await removeAllTestContact()
        await deleteTestUser()
    })

    it('should be able to search contact without query', async () => {
        const result = await supertest(web)
            .get('/api/contacts')
            .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(10)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)
    });

    it('should be able to search contact in page 2', async () => {
        const result = await supertest(web)
            .get('/api/contacts')
            .query({
                page: 2
            })
            .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(5)
        expect(result.body.paging.page).toBe(2)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)
    });

    it('should be able to search contact using name query', async () => {
        const result = await supertest(web)
            .get('/api/contacts')
            .query({
                name: 'test 1'
            })
            .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(6)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(1)
        expect(result.body.paging.total_item).toBe(6)
    });

    it('should be able to search contact using email query', async () => {
        const result = await supertest(web)
            .get('/api/contacts')
            .query({
                email: 'test1'
            })
            .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(6)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(1)
        expect(result.body.paging.total_item).toBe(6)
    });

    it('should be able to search contact using phone query', async () => {
        const result = await supertest(web)
            .get('/api/contacts')
            .query({
                phone: '123451'
            })
            .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(6)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(1)
        expect(result.body.paging.total_item).toBe(6)
    });
});