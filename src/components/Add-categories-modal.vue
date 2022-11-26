<template>
    <div class="modal-wrapper">
        <div class="title-wrapper">
            <h3>Добавить категорию</h3>
            <span>
                <i @click="close" class="material-icons">close</i>
            </span>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.modal-wrapper { 
    position: fixed; 
    background-color: #1E1E1E; 
    border: 2px solid #333333; 
    border-radius: 10px; 
    padding: 15px;
    width: 500px; 
    height: 40vh; 
    color: white;
    margin: auto; 
    top: 30vh; 
    left: auto; 

    .title-wrapper {
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        font-family: Arial, Helvetica, sans-serif; 
        padding-bottom: 5px;
        border-bottom: 1px solid #666666; 
    }

    .content {
        margin-top: 20px;
        height: 100%; 
    } 
}

@media screen and (max-width: 600px) {
    .modal-wrapper { 
        width: 400px; 
    }
}

@media screen and (max-width: 500px) {
    .modal-wrapper { 
        width: 300px; 
    }
}

@media screen and (max-width: 400px) {
    .modal-wrapper { 
        width: 200px; 
    }
}

</style>

<script>
export default {
    name: 'Modal', 
    methods: {
        close() {
            this.$emit('close'); 
        }
    }
}
</script>