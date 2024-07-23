export type User = {
    id: string
    firstName: string
    lastName: string
    email: string
    age: number
    address: {
        street: string
        city: string
        state: string
        country: string
    }
}
