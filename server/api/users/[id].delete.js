import { deleteUser } from "~/server/repository/users";

export default defineEventHandler(async (event) => {
    const id = event.context.params.id;

    if (!id) {
        return sendError(event, createError({
            statusCode: 406,
            statusMessage: 'ID obrigatório'
        }))
    }

    await deleteUser(id)

    return {
        sucess: true,
        data: "Usuário excluido com sucesso"
    }
})