import { users } from "./register.post";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { email, password } = body;

    const emailCorreto = users.some((user) => user.email === email);
    const senhaCorreta = users.some((user) => user.password === password);

    const emailEncontrado = users.some((user) => user.email === email);

    if (!emailEncontrado) {
        return sendError(event, createError({
            statusCode: 404,
            statusMessage: 'E-mail não encontrado, por favor cadastre-se'
        }))
    }

    if (!emailCorreto || !senhaCorreta) {
        return sendError(event, createError({
            statusCode: 403,
            statusMessage: 'E-mail ou senha incorretos'
        }))
    }


    return {
        data: users.find((user) => user.email === body.email)
    }
})