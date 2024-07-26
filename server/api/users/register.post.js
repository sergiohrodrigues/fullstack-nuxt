export const users = [];

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const { name, email, password, confirmPassword } = body;

    if (!name || !email || !password || !confirmPassword) {
        return sendError(event, createError({
            statusCode: 406,
            statusMessage: 'Campos obrigatórios não preenchidos'
        }))
    }

    if (password !== confirmPassword) {
        return sendError(
            event,
            createError({
                statusCode: 406,
                statusMessage: 'Senhas diferentes'
            })
        )
    }

    const emailExistente = users.some((user) => user.email.toUpperCase() === email.toUpperCase());

    if (emailExistente) {
        return sendError(
            event,
            createError({
                statusCode: 406,
                statusMessage: 'Email já cadastrado.'
            })
        )
    }

    users.push(body)

    return {
        sucess: true,
        body
    }
})