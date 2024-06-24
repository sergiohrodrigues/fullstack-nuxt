<template>
    <div>
        <VApp>

            <VAppBar>
                <VAppBarTitle>
                    My App
                </VAppBarTitle>
            </VAppBar>

            <VNavigationDrawer style="padding: 1rem;">
                <NuxtLink to="/">
                    <v-btn block prepend-icon="$vuetify">
                        Home
                    </v-btn>
                </NuxtLink>
                <NuxtLink to="/clientes">
                    <v-btn block prepend-icon="$vuetify">
                        Clientes
                    </v-btn>
                </NuxtLink>
            </VNavigationDrawer>

            <Main>
                <slot />
            </Main>

        </VApp>
    </div>
</template>