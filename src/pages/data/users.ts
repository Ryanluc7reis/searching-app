import { faker } from '@faker-js/faker'
import { User } from '../types/users'

let cachedUsers = []

export const getUsers = async (): Promise<User[]> => {

    if (!cachedUsers.length) {
        const quantity = faker.helpers.rangeToNumber({ min: 10, max: 30 })

        const users = Array.from({ length: quantity }).map(() => ({
            id: faker.string.uuid(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: faker.helpers.rangeToNumber({ min: 18, max: 65 }),
            address: {
                street: faker.location.street(),
                city: faker.location.city(),
                state: faker.location.state(),
                country: faker.location.country(),
            }
        }))

        cachedUsers = users
    }

    // Somente para simular uma demora na conexao
    await new Promise(resolve => setTimeout(resolve, faker.helpers.rangeToNumber({ min: 200, max: 700 })))

    return cachedUsers
}
