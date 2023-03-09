<script setup>
</script>

<template>
    <div class="navbar">
        <div class="logo">
            <picture>
                <router-link to="/"><img src="../assets/geeks.png" alt="logotipo" width="200" /></router-link>
            </picture>
        </div>
        <div class="menu">
            <ul>
                <li><router-link to="/login"><button type="button" class="btn btn-primary">{{ $t("nav.login") }} / {{
                    $t("nav.signup") }}</button></router-link></li>
                <li class="row">
                    <div class="col" style="margin: 0; padding: 0;">
                        <SwitchLanguage></SwitchLanguage>
                    </div>
                    <div class="col box" style="margin: 0; padding: ;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                            class="bi bi-translate" viewBox="0 0 16 16">
                            <path
                                d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
                            <path
                                d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z" />
                        </svg>
                    </div>

                </li>
            </ul>
        </div>
    </div>
</template>


<style>
.box {
    display: inline-flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

a {
    color: inherit;
    text-decoration: none;
}

.parent {
    position: fixed;
    top: 0;
    left: 0;
    margin: auto;
    width: 100%;
}

.navbar {
    display: flex;
    justify-content: space-between;
    /* margin-left: 8%; */
    /* margin-right: 8%; */
}

.logo {
    /* padding: 20px; */
}

.menu {
    display: flex;
    align-items: center;
}

.menu ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    list-style: none;
}

.menu li {
    padding: 20px;
    /* margin-left: 20px; */
    font-size: 16px;
    font-weight: bold;
}
</style>

<script>
import SwitchLanguage from "@/components/SwitchLanguage.vue"
export default {
    components: { SwitchLanguage }
}
</script>