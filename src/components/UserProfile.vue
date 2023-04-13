<template>
    <div class="profile-circle" @click="showMenu = !showMenu">
        <img src="../assets/avatar.png" alt="Profile Image" class="profile-image">
        <div class="options" :class="{ show: showMenu }">
            <ul>
                <li v-for="(option, index) in options" :key="index" @click="option.action">
                    <span class="option-label">{{ option.label }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'UserProfile',
    props: {
        profileImage: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            showMenu: false,
        };
    },
};
</script>
  
<style scoped>
.profile-circle {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.profile-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

.options {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    background-color: #333;
    border-radius: 5px;
    padding: 5px 0;
    display: none;
    z-index: 1;
}

.options.show {
    display: block;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
}

li {
    padding: 5px 10px;
    cursor: pointer;
    display: block;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

li:hover {
    background-color: #666;
}

.option-label {
    display: inline-block;
    text-align: center;
    width: 100%;
}
</style>
  