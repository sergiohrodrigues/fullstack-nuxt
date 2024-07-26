// import { prisma } from "./db"

// export const getUsers = async () => {
//     return prisma.user.findMany()
// }

// export const getUser = async (id) => {
//     return prisma.user.findFirst({
//         where: {
//             email: id
//             // AND: {
//             //     password: password
//             // }
//         }
//     })
// }

// export const createUser = async ({ name, email, password }) => {

//     try {
//         return prisma.user.create({
//             data: {
//                 name,
//                 email,
//                 password
//             }
//         })
//     } catch (error) {
//         throw new Error("Falha ao criar um  usário")
//     }
// }

// export const updateUser = async (id, { name, email }) => {
//     try {
//         return prisma.user.update({
//             where: {
//                 id
//             },
//             data: {
//                 name,
//                 email
//             }
//         })
//     } catch (error) {
//         throw new Error("Falha ao atualizar um  usário")
//     }
// }

// export const deleteUser = async (id) => {
//     try {
//         return prisma.user.delete({
//             where: {
//                 id
//             }
//         })
//     } catch (error) {
//         throw new Error("Falha ao deletar um  usário")
//     }
// }