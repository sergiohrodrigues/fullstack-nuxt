import { getUser } from "~/server/repository/users";

export default defineEventHandler(async (event) => {
    const id = event.context.params.id;

    if (!id) {
        console.log(id)
        return sendError(event, createError({
            statusCode: 406,
            statusMessage: 'ID obrigatório'
        }))
    }

    const data = await getUser(id)

    return {
        sucess: true,
        data
    }
})