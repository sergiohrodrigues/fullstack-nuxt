import { users } from "./register.post";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    console.log(body)

    const emailCorreto = users.some((user) => user.email === body.email);
    const senhaCorreta = users.some((user) => user.password === body.password);

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