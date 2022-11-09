<template>
    <div class="categories-wrapper"> 
        <div class="categories-item-wrapper" v-for="categorie of categories" :key="categorie.id">
            <div class="categories-item">{{categorie.title}}</div>
        </div>

        <div class="categories-item" @click="toggleModal">Добавить</div>
        <Modal v-if="isShowModal" @close="toggleModal">
            <div class="modal-content-wrapper">
                <input class="modal-input" type="text" placeholder="Введите название..." v-model="addCathegorieTxt">
                <button class="add-categorie" @click="addCategoriesItem">Добавить</button>
            </div>
        </Modal> 
    </div>
</template>

<script>
import Modal from '@/components/Add-categories-modal.vue' 
export default { 
    name: 'Categories', 
    data() {
        return {
            categories: [
                {title: 'Избранное', id: 1},
                {title: 'Важное', id: 2},
            ], 
            isShowModal: false, 
            addCathegorieTxt: '' 
        }
    },
    methods: {
        addCategoriesItem() { 
            this.categories.push({
                title: this.addCathegorieTxt = '' ? this.addCathegorieTxt : 'Нет названия', 
                id: Date.now()  
            })
            this.addCathegorieTxt = ''
        }, 
        toggleModal() {
            this.isShowModal = !this.isShowModal 
        }
    }, 
    components: {
        Modal 
    }
}
</script>

<style lang="scss" scoped>
.categories-wrapper { 
    position: relative; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    flex-wrap: wrap; 
    gap: 15px;
    max-width: 80vw; 
    max-height: 15vh; 
    overflow-y: scroll;
    margin: auto; 
    margin-top: 25px; 
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 14px;
    border-bottom: 1px solid #525252; 
    padding-bottom: 15px; 
}

.categories-item {
    background-color: #272727; 
    color: white; 
    padding: 6px 10px 6px 10px; 
    border-radius: 13px; 
    overflow: hidden; 
    transition-property: background-color; 
    transition-duration: 0.3s;

    &:hover {
        background-color: #525252;
    } 
} 



.modal-content-wrapper {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    flex-direction: column; 
    gap: 10px; 
    height: 50%; 

    .modal-input {
        background-color: #222222; 
        padding: 10px; 
        color: white;
        border: 1px solid #818181; 
        border-radius: 10px; 
        width: 70%; 
    }

    .add-categorie {
        background-color: transparent; 
        color: white; 
        padding: 10px; 
        width: 70%; 
        border: 2px solid rgba(85, 85, 85, 0.502); 
        border-radius: 5px; 
        transition-property: background-color, border; 
        transition-duration: 0.3s; 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        

        &:hover {
            background-color: #7c7c7c;
            border-color: #9e9e9e; 
        }
    }
}



@media screen and (max-width: 670px) {
    .categories-wrapper { 
        font-size: 12px;
    }
}

@media screen and (max-width: 600px) {
    .categories-wrapper { 
        max-width: 70vw; 
    }
}

@media screen and (max-width: 510px) {
    .categories-wrapper { 
        max-width: 80vw;
    }
}

@media screen and (max-width: 440px) {
    .categories-wrapper { 
        max-width: 100vw;
    }
}

@media screen and (max-width: 360px) {
    .categories-wrapper { 
        font-size: 9px;
    }
}

@media screen and (max-width: 290px) {
    .categories-wrapper { 
        font-size: 7px;
    }
}

</style>