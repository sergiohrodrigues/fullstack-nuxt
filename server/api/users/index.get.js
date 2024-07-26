import { users } from "./register.post"

export default defineEventHandler((event) => {

    return {
        data: users
    }
})