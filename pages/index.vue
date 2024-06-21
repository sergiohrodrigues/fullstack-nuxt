<template>
    <VAppBar>
        <VAppBarTitle>
            My App
        </VAppBarTitle>
    </VAppBar>

    <VNavigationDrawer></VNavigationDrawer>

    <VMain>
        <!-- <v-sheet class="mx-auto" width="300" style="margin: 1rem;">
            <v-form @submit.prevent="submit">
                <v-text-field :rules="rules.name" label="Nome" v-model="name"></v-text-field>
                <v-text-field :rules="rules.email" label="Email" v-model="email"></v-text-field>
                <v-text-field :rules="rules.password" label="Password" type="password"
                    v-model="password"></v-text-field>
                <v-text-field :rules="rules.password" label="Confirme Password" type="password"
                    v-model="confirmPassword"></v-text-field>
                <v-btn class="mt-2" type="submit" block>Adicionar</v-btn>
            </v-form>
        </v-sheet>

        <div>
            <v-btn type="button" @click="update">Atualizar</v-btn>
            <v-btn type="button" @click="remove">Excluir</v-btn>
        </div>

        <div>
            <button type="button" @click="getUsers">Ver usuarios</button>
        </div>

        <ul>
            <li v-for="user in usuarios" :key="user.id">
                {{ user.name }}
            </li>
        </ul> -->
        <div>
            <v-sheet class="d-flex" height="54" tile>
                <v-select v-model="type" :items="types" class="ma-2" label="View Mode" variant="outlined" dense
                    hide-details></v-select>
                <v-select v-model="weekday" :items="weekdays" class="ma-2" label="weekdays" variant="outlined" dense
                    hide-details></v-select>
            </v-sheet>
            <v-sheet>
                <v-calendar ref="calendar" v-model="value" :events="events" :view-mode="type"
                    :weekdays="weekday"></v-calendar>
            </v-sheet>
        </div>

    </VMain>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDate } from 'vuetify'

// Tipos
interface Event {
    title: string
    start: Date
    end: Date
    color: string
    allDay: boolean
}

// Variáveis reativas
const type = ref<string>('month')
const types: string[] = ['month', 'week', 'day']
const weekday = ref<number[]>([0, 1, 2, 3, 4, 5, 6])
const weekdays = [
    { title: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
    { title: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
    { title: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
    { title: 'Mon, Wed, Fri', value: [1, 3, 5] },
]
const value = ref<Date[]>([new Date()])
const events = ref<Event[]>([])
const colors: string[] = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
const titles: string[] = ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']

// Funções auxiliares
const adapter = useDate()

const rnd = (a: number, b: number): number => {
    return Math.floor((b - a + 1) * Math.random()) + a
}

const getEvents = ({ start, end }: { start: Date, end: Date }) => {
    const eventList: Event[] = []

    const min = start
    const max = end
    const days = (max.getTime() - min.getTime()) / 86400000
    const eventCount = rnd(days, days + 20)

    for (let i = 0; i < eventCount; i++) {
        const allDay = rnd(0, 3) === 0
        const firstTimestamp = rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        eventList.push({
            title: titles[rnd(0, titles.length - 1)],
            start: first,
            end: second,
            color: colors[rnd(0, colors.length - 1)],
            allDay: !allDay,
        })
    }

    events.value = eventList
}

const getEventColor = (event: Event): string => {
    return event.color
}

// Executa quando o componente é montado
onMounted(() => {
    getEvents({ start: adapter.startOfDay(adapter.startOfMonth(new Date())), end: adapter.endOfDay(adapter.endOfMonth(new Date())) })
})

/*codigo anterior começa aqui*/
// const id = ref("")
// const name = ref("");
// const email = ref("");
// const password = ref("");
// const confirmPassword = ref("");

// const usuarios = ref([]);

// const getUsers = async () => {
//     const { data } = await $fetch("/api/users/getUsers", {
//         method: "GET",
//         headers: {
//             Authorization: 'xyz'
//         },
//     })

//     usuarios.value = data
// }

// getUsers()

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

// const submit = async () => {
//     try {
//         const { data } = await $fetch("/api/users/register", {
//             method: "POST",
//             body: {
//                 name: name.value,
//                 email: email.value,
//                 password: password.value,
//                 confirmPassword: confirmPassword.value
//             }
//         })

//         id.value = data.id
//     } catch (error) {
//         console.log(error)
//     }
// }

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
</script>