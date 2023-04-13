<template>
    <div class="game-item">
        <p>{{ game.name }}</p>
        <button @click="emitAddToList">Add to List</button>
    </div>
</template>
  
<script>
export default {
    name: 'GameItem',
    props: {
        game: {
            type: Object,
            required: true,
        },
    },
    methods: {
        emitAddToList() {
            this.$emit('add-to-list', this.game);
        },
    },
};
</script>
  