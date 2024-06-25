<template>
    <VMain>
        <VAppBar>
            <VAppBarTitle>
                Clientes
            </VAppBarTitle>
            <ModalAddCliente />
        </VAppBar>
        <ul>
            <li v-for="user in usuarios" :key="user.id">
                {{ user.name }}
            </li>
        </ul>
        <v-table>
            <!-- <thead>
                    <tr>
                        <th class="text-left">
                            Clientes
                        </th> -->
            <!-- <th class="text-left">
                            Calories
                        </th> -->
            <!-- </tr>
                </thead> -->
            <tbody>
                <tr v-for="cliente in clientes" :key="cliente.name">
                    <td style="width: 70%;">{{ cliente.name }}</td>
                    <td style="width: 5%;">
                        <ModalCliente icon="pencil-outline" :id="cliente.id" />
                    </td>
                    <td style="width: 5%;">
                        <v-btn>
                            <v-icon icon="mdi-delete"></v-icon>
                        </v-btn>
                    </td>

                    <!-- <td>{{ item.calories }}</td> -->
                </tr>
            </tbody>
        </v-table>
    </VMain>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "alternative",
})

import ModalAddCliente from "~/components/ModalAddCliente.vue";
import ModalCliente from "~/components/ModalCliente.vue";
// const id = ref("")
// const name = ref("");
// const email = ref("");
// const password = ref("");
// const confirmPassword = ref("");
// const rules = reactive({
//     name: [
//         value => {
//             if (value) return true

//             return 'You must enter a first name.'
//         },
//     ],
//     email: [
//         value => !!value || 'Required.',
//         value => (value || '').length <= 20 || 'Max 20 characters',
//         value => {
//             const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//             return pattern.test(value) || 'Invalid e-mail.'
//         },
//     ],
// })

// const update = async () => {
//     try {
//         name.value = `${name.value} - Update`

//         await $fetch(`/api/users/${id.value}`, {
//             method: "PUT",
//             headers: {
//                 Authorization: 'xyz'
//             },
//             body: {
//                 name: name.value,
//                 email: email.value
//             }
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

// const remove = async () => {
//     try {
//         await $fetch(`/api/users/${id.value}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: 'xyz'
//             },
//         })
//     } catch (error) {
//         console.log(error)
//     }

//     id.value = ""
//     name.value = ""
//     email.value = ""
//     password.value = ""
//     confirmPassword.value = ""
// }


const clientes = ref([]);

async function getUsers() {
    try {
        const { data } = await $fetch("/api/users/getUsers", {
            method: "GET",
            // headers: {
            //     Authorization: 'xyz'
            // },
        })
        clientes.value = data
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    getUsers();
})

console.log(clientes.value)

</script>