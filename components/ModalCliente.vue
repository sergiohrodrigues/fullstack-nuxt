<template>
    <div class="text-center pa-4">
        <v-btn @click="clienteSelecionado">
            <v-icon :icon="`mid mdi-${icon}`"></v-icon>
        </v-btn>

        <v-dialog v-model="dialog" max-width="600">
            <v-card max-width="100%" :text="itemSelecionado.name" title="Atualizar Cliente">
                <form @submit.prevent="submit" style="padding: 1rem">
                    <v-text-field v-model="name.value.value" :counter="10" :error-messages="name.errorMessage.value"
                        label="Name"></v-text-field>

                    <!-- <v-text-field v-model="phone.value.value" :counter="7" :error-messages="phone.errorMessage.value"
                        label="Phone Number"></v-text-field> -->

                    <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value"
                        label="E-mail"></v-text-field>

                    <!-- <v-select v-model="select.value.value" :error-messages="select.errorMessage.value" :items="items"
                        label="Select"></v-select> -->

                    <v-btn class="me-4" type="submit">
                        Atualizar
                    </v-btn>

                    <v-btn @click="handleReset">
                        Limpar
                    </v-btn>
                </form>
                <template v-slot:actions>
                    <v-btn class="ms-auto" text="Sair" @click="dialog = false"></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import type ICliente from '~/interfaces/Cliente';
import { useField, useForm } from 'vee-validate'

const dialog = ref(false);

const props = defineProps<{
    icon: string,
    id: string
}>();

function clienteSelecionado() {
    dialog.value = true;
    getUsers(props.id)
}

const itemSelecionado: ICliente = ref({})

async function getUsers(id: string) {
    try {
        const { data } = await $fetch(`/api/users/${id}`, {
            method: "GET",
        })
        // console.log(data)
        itemSelecionado.value! = data
    } catch (error) {
        console.log(error)
    }
}

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        name(value) {
            if (value?.length >= 2) return true

            return 'Name needs to be at least 2 characters.'
        },
        phone(value) {
            if (value?.length > 9 && /[0-9-]+/.test(value)) return true

            return 'Phone number needs to be at least 9 digits.'
        },
        email(value) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

            return 'Must be a valid e-mail.'
        },
        select(value) {
            if (value) return true

            return 'Select an item.'
        },
    },
})
const name = useField('name')
const phone = useField('phone')
const email = useField('email')
const select = useField('select')

const items = ref([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
])

const submit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2))
})

</script>