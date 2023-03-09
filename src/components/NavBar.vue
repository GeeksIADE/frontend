<script setup>
</script>

<template>
    <div class="parent">
        <div class="navbar">
            <div class="logo">
                <picture>
                    <router-link to="/"><img src="../assets/geeks.png" alt="logotipo" width="200" /></router-link>
                </picture>
            </div>
            <div class="menu">
                <ul>
                    <li><router-link to="/login">{{ $t("nav.login") }}</router-link></li>
                    <li>
                        <SwitchLanguage></SwitchLanguage>
                    </li>
                </ul>
            </div>
    </div>
</div>
<!-- <nav class="navbar navbar-expand-lg navbar-dark">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Dropdown
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                                                                                                                                                                                                                                                                                            </form>
                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                    </nav> -->
</template>


<style>
/* Clear formatting*/

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* Remove formatting from links*/

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
    margin-left: 8%;
    margin-right: 8%;
    /*   */
}

.logo {
    padding: 20px;
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
    margin-left: 20px;
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