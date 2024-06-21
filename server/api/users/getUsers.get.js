import { getUsers } from "~/server/repository/users"

export default defineEventHandler(async (event) => {

    const data = await getUsers()

    return {
        data
    }
})