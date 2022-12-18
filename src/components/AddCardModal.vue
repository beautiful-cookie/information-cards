<template>
    <div class="card-modal-wrapper">
        <div class="title-wrapper">
            <h3>{{this.modalTitle}} событие</h3>
            <span>
                <i @click="closeCardModal" class="material-icons">close</i>
            </span>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.card-modal-wrapper { 
    position: fixed; 
    background-color: #1E1E1E; 
    border: 2px solid #333333; 
    border-radius: 10px; 
    padding: 15px;
    width: 500px; 
    height: 500px; 
    color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);


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
    .card-modal-wrapper { 
        width: 400px; 
    }
}

@media screen and (max-width: 500px) {
    .card-modal-wrapper { 
        width: 300px; 
    }
}

@media screen and (max-width: 400px) {
    .card-modal-wrapper { 
        width: 300px; 
    }
}

@media screen and (max-width: 300px) {
    .card-modal-wrapper { 
        width: 250px; 
    }
}

</style>

<script>
export default {
    name: 'Modal', 
    methods: {
        closeCardModal() {
            this.$emit('closeCardModal'); 
        }
    }, 
    props: {
        modalTitle: {
            type: String, 
            required: true 
        }
    }
}
</script>