// import { updateUser } from "~/server/repository/users";

export default defineEventHandler(async (event) => {
    const id = event.context.params.id;
    const body = await readBody(event);

    const { name, email } = body;

    if (!id) {
        return sendError(event, createError({
            statusCode: 406,
            statusMessage: 'ID obrigatório'
        }))
    }

    // const data = await updateUser(id, { name, email })

    return {
        sucess: true,
        data
    }
})