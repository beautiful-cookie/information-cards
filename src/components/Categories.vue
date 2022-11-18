<template>
    <div class="categories-wrapper"> 
        <div class="categories-item-wrapper" v-for="categorie of categories" :key="categorie.id">
            <router-link class="categories-item" :to="'/' + categorie.title.toLowerCase()">
                <span>
                    <i @click="deleteCategorie(categorie)" class="material-icons closeCross">close</i>
                </span>
                {{categorie.title}}
            </router-link>
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
            categories: null, 
            isShowModal: false, 
            addCathegorieTxt: '' 
        }
    }, 
    created() {
        this.categories = this.getFromLocal().length > 0 ? this.getFromLocal() : this.getStartCategories()  
    }, 
    methods: {
        addCategoriesItem() { 
            this.categories.push({
                title: this.addCathegorieTxt.length > 0 ? this.addCathegorieTxt : 'Нет названия', 
                id: Date.now()  
            })
            this.addCathegorieTxt = ''; 
            this.saveInLocal() 
        }, 
        deleteCategorie(categorieElement) {
            this.categories = this.categories.filter(categorie => categorie !== categorieElement) 
            this.saveInLocal() 
        }, 
        toggleModal() {
            this.isShowModal = !this.isShowModal 
        },
        saveInLocal() {
            localStorage.setItem('categories', JSON.stringify(this.categories))
        }, 
        getFromLocal() {
            const storage = localStorage.getItem('categories') 
            if (!storage) return [] 
            return JSON.parse(storage) 
        },
        getStartCategories() {
            return [
                {title: 'Все', id: Date.now()}, 
                {title: 'Избранное', id: Date.now() + 1},
                {title: 'Важное', id: Date.now() + 2},
            ] 
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
    display: flex; 
    justify-content: center; 
    align-items: center; 
    gap: 5px; 
    background-color: #272727; 
    color: white; 
    text-decoration: none;
    padding: 6px 10px 6px 10px; 
    border-radius: 13px; 
    overflow: hidden; 
    transition-property: background-color; 
    transition-duration: 0.3s;

    &:hover {
        background-color: #525252;
    } 

    span {
        display: flex; 
        justify-content: center; 
        align-items: center; 
    }

    .material-icons.closeCross {
        font-size: 14px;
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