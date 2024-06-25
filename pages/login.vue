<template>
    <div style="height: 100vh; display: flex; align-items: center; flex-direction: column; justify-content: center;">
        <!-- <v-img class="mx-auto my-6" style="max-height: 0;"
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img> -->

        <v-card class="mx-auto pa-12 pb-8" elevation="8" width="448" max-width="448"
            style="height: 537px; width: 95%; min-width: 345px" rounded="lg">
            <section v-if="!singUp">
                <form @submit.prevent="singIn">
                    <div class="text-subtitle-1 text-medium-emphasis" style="margin-left: 0.2rem">Account</div>

                    <v-text-field v-model="emailLogin.value.value" :error-messages="emailLogin.errorMessage.value"
                        label="E-mail" prepend-inner-icon="mdi-email-outline"></v-text-field>


                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
                        style="margin-left: 0.2rem">
                        Password
                    </div>
                    <v-text-field v-model="passwordLogin.value.value"
                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                        @click:append-inner="visible = !visible" :error-messages="passwordLogin.errorMessage.value"
                        label="Password" prepend-inner-icon="mdi-lock-outline"></v-text-field>

                    <v-btn class="me-4" type="submit" style="margin-bottom: 1rem;" :loading="loadingLogin">
                        Log in
                    </v-btn>

                    <span style="color: red; position: absolute; right: 5rem;" v-if="erroLogin">{{ msgErro
                        }}</span>
                    <span style="color: green; display: block; margin: -0.5rem 0 1rem 1rem;" v-if="loginSucess"> Usuario
                        logado com
                        sucesso. <br> Seja bem vindo, {{
                            usuario }}</span>
                </form>

                <v-card class="mb-12" color="surface-variant" variant="tonal">
                    <v-card-text class="text-medium-emphasis text-caption">
                        Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for
                        three
                        hours. If you must login now, you can also click "Forgot login password?" below to reset the
                        login
                        password.
                    </v-card-text>
                </v-card>

                <v-card-text class="text-center">
                    <a class="text-blue text-decoration-none" @click="() => {
                        singUp = true
                        handleReset()
                    }" rel="noopener noreferrer" target="_blank" style="cursor: pointer; text-decoration: underline">
                        Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                    </a>
                </v-card-text>
            </section>

            <section v-else style="width: 100%; padding: 1rem;">

                <v-icon icon="mid mdi-arrow-left" size="x-large" @click="() => {
                    singUp = false
                    emailLogin.value.value = ''
                    passwordLogin.value.value = ''
                }" style="position: absolute; top: 1rem; left: 1rem">
                </v-icon>

                <h2 style="margin-bottom: 1rem;">Register</h2>

                <form @submit.prevent="submit">
                    <v-text-field v-model="name.value.value" :error-messages="name.errorMessage.value" label="Name"
                        prepend-inner-icon="mdi-account"></v-text-field>

                    <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="E-mail"
                        prepend-inner-icon="mdi-email-outline"></v-text-field>

                    <v-text-field v-model="password.value.value"
                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                        @click:append-inner="visible = !visible" :error-messages="password.errorMessage.value"
                        label="Password" prepend-inner-icon="mdi-lock-outline"></v-text-field>

                    <v-text-field v-model="confirmPassword.value.value"
                        :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'" :type="visible2 ? 'text' : 'password'"
                        @click:append-inner="visible2 = !visible2" :error-messages="confirmPassword.errorMessage.value"
                        label="Confirm password" prepend-inner-icon="mdi-lock-outline"></v-text-field>

                    <v-btn class="me-4" type="submit">
                        Cadastrar
                    </v-btn>

                    <v-btn @click="handleReset">
                        Limpar
                    </v-btn>
                </form>

            </section>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
const router = useRouter()

definePageMeta({
    layout: 'alternative'
})

const emailLogin = useField('emailLogin')
const passwordLogin = useField('passwordLogin')
const msgErro = ref('')
const erroLogin = ref(false)
const loadingLogin = ref(false)
const loginSucess = ref(false)

const usuario = ref('')

async function singIn() {
    if (emailLogin.value.value === undefined) {
        erroMomentanio('Email obrigatório')
        return
    }

    if (passwordLogin.value.value === undefined) {
        erroMomentanio('Senha obrigatória')
        return
    }

    try {
        const { data } = await $fetch(`/api/users/${emailLogin.value.value}`, {
            method: "GET",
            // headers: {
            //     Authorization: 'xyz'
            // },
        })

        if (data.password === passwordLogin.value.value) {
            // router.push({ path: '/' })
            loadingLogin.value = true
            setTimeout(() => {
                loadingLogin.value = false
                loginSucesss(data.name)
            }, 3000)

            emailLogin.value.value = undefined
            passwordLogin.value.value = undefined
        } else {
            loadingLogin.value = true
            setTimeout(() => {
                loadingLogin.value = false
                erroMomentanio('Email ou senha incorretos')
            }, 3000)
        }
    } catch (error) {
        erroMomentanio('Email ou senha incorretos')
    }
}

function loginSucesss(name: string) {
    loginSucess.value = true
    usuario.value = name
    setTimeout(() => {
        loginSucess.value = false
    }, 5000)
}

function erroMomentanio(msg: string) {
    msgErro.value = msg
    erroLogin.value = true
    setTimeout(() => {
        erroLogin.value = false
    }, 4000)
}

const visible = ref(false)
const visible2 = ref(false)

const singUp = ref(false)

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        name(value) {
            if (value?.length >= 2) return true

            return 'Digite um nome por favor.'
        },
        email(value) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

            return 'Digite um e-mail válido.'
        },
        password(value) {
            if (value?.length >= 4) return true

            return 'Digite um senha com no minimo 4 caracteres.'
        },
        confirmPassword(value) {
            if (value! === password.value.value) return true

            return 'Senhas diferentes'
        },
    },
})

const name = useField('name')
const email = useField('email')
const password = useField('password')
const confirmPassword = useField('confirmPassword')

const submit = handleSubmit(async values => {
    try {
        await $fetch("/api/users/register", {
            method: "POST",
            body: {
                name: name.value.value,
                email: email.value.value,
                password: password.value.value,
                confirmPassword: confirmPassword.value.value
            }
        })
    } catch (error) {
        console.log(error)
    }

    handleReset()
})

</script>