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
                <li>
                    <SwitchLanguage></SwitchLanguage>
                </li>
            </ul>
        </div>
    </div>
</template>


<style>
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