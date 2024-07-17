import {prismaClient} from "../src/application/database.js";
import bcrypt from "bcrypt";

const deleteTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: 'test'
        }
    })
}

const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: 'test',
            password: await bcrypt.hash('rahasia', 10),
            name: 'test',
            token: 'test'
        }
    })
}

const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: 'test'
        },
        select: {
            username: true,
            name: true,
            password: true,
            token: true,
            contacts: true
        }
    });
}

const removeAllTestContact = async () => {
    await prismaClient.contact.deleteMany({
        where: {
            username: 'test'
        }
    })
}

const createTestContact = async () => {
    await prismaClient.contact.create({
        data: {
            username: 'test',
            first_name: 'test',
            last_name: 'test',
            email: 'test@test.com',
            phone: '12345'
        }
    })
}

const createManyTestContacts = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.contact.create({
            data: {
                username: 'test',
                first_name: `test ${i}`,
                last_name: `test ${i}`,
                email: `test${i}@test.com`,
                phone: `12345${i}`
            }
        })
    }
}

const createManyTestAddresses = async () => {
    const testContact = await getTestContact()
    for (let i = 0; i < 5; i++) {
        await prismaClient.address.create({
            data: {
                contact_id: testContact.id,
                street: `street ${i}`,
                city: `city ${i}`,
                province: `province ${i}`,
                country: `country ${i}`,
                postal_code: `${i}`,
            }
        })
    }
}

const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username: 'test'
        }
    })
}

const getTestAddress = async () => {
    return prismaClient.address.findFirst({
        where: {
            contact: {
                username: 'test'
            }
        }
    })
}

const removeAllTestAddress = async () => {
    await prismaClient.address.deleteMany({
        where: {
            contact: {
                username: 'test'
            }
        }
    })
}

const createTestAddress = async () => {
    const testContact = await getTestContact()
    await prismaClient.address.create({
        data: {
            contact_id: testContact.id,
            street: 'Jalan test',
            city: 'Kota test',
            province: 'Provinsi test',
            country: 'Indonesia',
            postal_code: '1234'
        }
    })
}
export {
    deleteTestUser,
    createTestUser,
    getTestUser,
    removeAllTestContact,
    createTestContact,
    getTestContact,
    createManyTestContacts,
    removeAllTestAddress,
    createTestAddress,
    getTestAddress,
    createManyTestAddresses
}