import {
    createManyTestAddresses,
    createTestAddress,
    createTestContact,
    createTestUser,
    deleteTestUser,
    getTestAddress,
    getTestContact,
    removeAllTestAddress,
    removeAllTestContact
} from "./test-util.js";
import supertest from "supertest";
import {web} from "../src/application/web.js";

describe('POST /api/contacts/:contactId/addresses', () => {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestAddress()
        await removeAllTestContact()
        await deleteTestUser()
    })

    it('should be able to create new address', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .post(`/api/contacts/${testContact.id}/addresses`)
            .set('Authorization', 'test')
            .send({
                street: 'Jalan test',
                city: 'Kota test',
                province: 'Provinsi test',
                country: 'Indonesia',
                postal_code: '1234'
            })

        expect(result.status).toBe(201)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.street).toBe('Jalan test')
        expect(result.body.data.city).toBe('Kota test')
        expect(result.body.data.province).toBe('Provinsi test')
        expect(result.body.data.country).toBe('Indonesia')
        expect(result.body.data.postal_code).toBe('1234')
    });

    it('should be able to reject if request is invalid', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .post(`/api/contacts/${testContact.id}/addresses`)
            .set('Authorization', 'test')
            .send({
                street: 'Jalan test',
                city: 'Kota test',
                province: 'Provinsi test',
                country: '',
                postal_code: ''
            })

        expect(result.status).toBe(400)
    });

    it('should be able to reject if contact is not found', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .post(`/api/contacts/${testContact.id + 1}/addresses`)
            .set('Authorization', 'test')
            .send({
                street: 'Jalan test',
                city: 'Kota test',
                province: 'Provinsi test',
                country: 'Indonesia',
                postal_code: '1234'
            })

        expect(result.status).toBe(404)
    });
});

describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
        await createTestAddress()
    })

    afterEach(async () => {
        await removeAllTestAddress()
        await removeAllTestContact()
        await deleteTestUser()
    })

    it('should be able to get address', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()
        const result = await supertest(web)
            .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
            .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.street).toBe('Jalan test')
        expect(result.body.data.city).toBe('Kota test')
        expect(result.body.data.province).toBe('Provinsi test')
        expect(result.body.data.country).toBe('Indonesia')
        expect(result.body.data.postal_code).toBe('1234')
    });

    it('should be able to reject if contact is not found', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()
        const result = await supertest(web)
            .get(`/api/contacts/${testContact.id + 1}/addresses/${testAddress.id}`)
            .set('Authorization', 'test')

        expect(result.status).toBe(404)
    });

    it('should be able to reject if address is not found', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()
        const result = await supertest(web)
            .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id + 1}`)
            .set('Authorization', 'test')

        expect(result.status).toBe(404)
    });
});

describe('PUT /api/contacts/:contactId/addresses/:addressId', () => {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
        await createTestAddress()
    })

    afterEach(async () => {
        await removeAllTestAddress()
        await removeAllTestContact()
        await deleteTestUser()
    })

    it('should be able to update address', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()
        const result = await supertest(web)
            .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
            .set('Authorization', 'test')
            .send({
                street: 'Jalan',
                city: 'Kota',
                province: 'Provinsi',
                country: 'Indonesia',
                postal_code: '11111'
            })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testAddress.id)
        expect(result.body.data.street).toBe('Jalan')
        expect(result.body.data.city).toBe('Kota')
        expect(result.body.data.province).toBe('Provinsi')
        expect(result.body.data.country).toBe('Indonesia')
        expect(result.body.data.postal_code).toBe('11111')
    });

    it('should be able to reject if request is invalid', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()
        const result = await supertest(web)
            .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
            .set('Authorization', 'test')
            .send({
                street: 'Jalan',
                city: 'Kota',
                province: 'Provinsi',
                country: '',
                postal_code: ''
            })

        expect(result.status).toBe(400)
    });

    it('should be able to reject if address is not found', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()
        const result = await supertest(web)
            .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id + 5}`)
            .set('Authorization', 'test')
            .send({
                street: 'Jalan',
                city: 'Kota',
                province: 'Provinsi',
                country: 'Indonesia',
                postal_code: '111'
            })

        expect(result.status).toBe(404)
    });

    it('should be able to reject if contact is not found', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()
        const result = await supertest(web)
            .put(`/api/contacts/${testContact.id + 5}/addresses/${testAddress.id}`)
            .set('Authorization', 'test')
            .send({
                street: 'Jalan',
                city: 'Kota',
                province: 'Provinsi',
                country: 'Indonesia',
                postal_code: '111'
            })

        expect(result.status).toBe(404)
    });
});

describe('DELETE /api/contacts/:contactId/addresses/:addressId', () => {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
        await createTestAddress()
    })

    afterEach(async () => {
        await removeAllTestAddress()
        await removeAllTestContact()
        await deleteTestUser()
    })

    it('should be able to remove address', async () => {
        const testContact = await getTestContact()
        let testAddress = await getTestAddress()

        const result = await supertest(web)
            .delete(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
            .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data).toBe('OK')

        testAddress = await getTestAddress()

        expect(testAddress).toBe(null)
    });

    it('should be able to reject if address is not found', async () => {
        const testContact = await getTestContact()
        let testAddress = await getTestAddress()

        const result = await supertest(web)
            .delete(`/api/contacts/${testContact.id}/addresses/${testAddress.id + 1}`)
            .set('Authorization', 'test')

        expect(result.status).toBe(404)
    });

    it('should be able to reject if contact is not found', async () => {
        const testContact = await getTestContact()
        let testAddress = await getTestAddress()

        const result = await supertest(web)
            .delete(`/api/contacts/${testContact.id + 1}/addresses/${testAddress.id}`)
            .set('Authorization', 'test')

        expect(result.status).toBe(404)
    });
});

describe('GET /api/contacts/:contactId/addresses', () => {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
        await createManyTestAddresses()
    })

    afterEach(async () => {
        await removeAllTestAddress()
        await removeAllTestContact()
        await deleteTestUser()
    })

    it('should be able to return list of address', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .get(`/api/contacts/${testContact.id}/addresses`)
            .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(5)
    });

    it('should be able to reject if contact is not found', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .get(`/api/contacts/${testContact.id + 1}/addresses`)
            .set('Authorization', 'test')

        expect(result.status).toBe(404)
    });
});