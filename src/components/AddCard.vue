<template>
  <div class="addBtn-wrapper">
    <AddCardModal v-if="show" @closeCardModal="toggleCardModal" :modalTitle="'Добавить'">
      <div class="card-modal-content-wrapper">

        <div class="input-image-wrapper">
          <div class="image-wrapper" v-if="pictureSelected()"><img :src="inputImage" alt="Такой картинки не найдено..."></div>
          <span class="textarea-wrapper image-input">
            <textarea rows="3" placeholder="Введите ссылку на картинку..." v-model="inputImage"></textarea>
          </span>
        </div>

        <div class="input-title-wrapper">
          <span><h3>Название:</h3></span>
          <input type="text" placeholder="Введите название..." v-model="inputTitle">
        </div>

        <div class="input-description-wrapper">
          <span><h3>Описание:</h3></span>
          <span class="textarea-wrapper">
            <textarea rows="3" placeholder="Введите описание..." v-model="inputDescription"></textarea>
          </span>
        </div>

        <div class="input-urls-wrapper">
          <span><h3>Ссылки:</h3></span> 

          <div class="input-button-url-wrapper">
            <ol>
              <h4 v-for="url of urlsToAdd" :key="url.id" >
                <li class="link-li">
                  <a :href="fixUrl(url)" target="_blank" class="link">
                    {{fixUrl(url)}}
                  </a>
                </li>
                <button><i class="material-icons delUrl" @click="clearUrl(url.id)">close</i></button>
              </h4>
            </ol>
            <div class="add-urls-button-input-wrapper">
              <input type="url" placeholder="Введите ссылки..." v-model="inputUrls">
              <button><i class="material-icons addUrl" @click="addUrl">add</i></button>
            </div>
          </div>
        </div>

        <div class="choose-category-wrapper">
          <div class="choose-category-content">
            <span class="category-div">
              <input type="button" class="chooseCategoryButton" @click="toggleShowChooseCategory" v-model="choosedCategory">
              <transition name="fade">
                  <ol class="choose-categories-list-wpapper" v-if="showChooseCategory">
                    <li v-for="categorie of categories" :key="categorie.id"
                      class="choose-categories-list-item" @click="chooseCategory(categorie.title)"
                      >
                      {{categorie.title}}
                    </li>
                </ol>
              </transition>
            </span>
          </div>
        </div>

        <button class="add-card-button" @click="addCard">Добавить</button>
      </div>
    </AddCardModal>
    <i class="material-icons addPlus" @click="show = !show, showChooseCategory = false">add</i>
  </div>
</template>


<style lang="scss">
.fade-enter-active, .fade-leave-active { 
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}


</style>

<style lang="scss" scoped> 
.fade-enter-active, .fade-leave-active { 
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
span {
  position: relative;
  width: 51%;  
  text-align: start; 
}


.addBtn-wrapper {
  position: fixed;
  display: flex;
  justify-content: center; 
  align-items: center; 
  width: 80px; 
  height: 80px; 
  background-color: rgba(32, 150, 219, 0.3); 
  border-radius: 50%; 
  bottom: 10vh; 
  right: 10vw; 
  user-select: none; 
  transition-property: background-color; 
  transition-duration: 0.3s;

  &:hover {
    background-color: rgba(32, 150, 219, 1); 
  }

  &:hover .material-icons.addPlus{
    color: rgba(255, 255, 255, 1); 
  }

  .material-icons.addPlus {
    font-size: 40px; 
    color: rgba(255, 255, 255, 0.3); 
  }
}

.card-modal-content-wrapper { 
  display: flex; 
  align-items: center; 
  flex-direction: column;  
  gap: 20px; 
  max-height: 85%;  
  padding: 5px;
  width: 100%; 
  margin-top: 20px; 
  overflow: scroll; 

  .input-title-wrapper, .input-description-wrapper, .input-urls-wrapper, .input-image-wrapper {
    display: flex; 
    justify-content: end;
    align-items: center; 
    width: 70%; 
    gap: 10%; 
    
    .textarea-wrapper {
      width: 100%; 
      max-width: 100%; 
      min-width: 59%; 
    } 

    .image-input {
       min-width: 100%; 
       resize: vertical; 
    } 

    input, textarea { 
      background-color: #222222;
      padding: 5px 10px 5px 10px;
      color: white;
      border: 1px solid #818181;
      border-radius: 10px;
      width: 100%; 
      resize: vertical; 
    } 

    .inputImage {
      background-color: transparent;
      color: white;
      padding: 10px;
      width: 70%;
      border: 2px solid rgba(85, 85, 85, 0.502);
      border-radius: 5px;
      transition-property: background-color, border;
      transition-duration: 0.3s;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      text-align: center; 
      cursor: pointer; 


      &:hover {
        background-color: #7c7c7c;
        border-color: #9e9e9e;
      }
    }

    .image-wrapper { 
      min-width: 100%;
      min-height: 60%;
      max-width: 90%; 
      max-height: 60%;
      overflow: hidden; 
      padding: 3px; 
      border: 2px solid #919191;
      border-radius: 5px; 

      img {
        max-width: 100%; 
        max-height: 100%; 
      }
    }
  }

  .input-image-wrapper { 
    flex-direction: column; 
    gap: 10px; 
    padding-bottom: 10px;
    border-bottom: 1px solid #666666; 
  }



  .input-button-url-wrapper {
    display: flex; 
    justify-content: start; 
    align-items: center; 
    flex-direction: column;
    gap: 5px; 
    width: 100%; 
    max-height: 10%; 
    overflow: scroll; 

    ol h4 {
      display: flex; 
      justify-content: start; 
      align-items: center; 
      gap: 5px; 

      button {
        margin-bottom: 5px; 
      }

      .material-icons.delUrl {
        font-size: 15px; 
      }
    }

    .link-li {
      color: #1565c0; 
      max-width: 40vw; 
      overflow-wrap: break-word; 
      text-align: start; 
      position: relative; 
      padding: 2px; 
      margin-bottom: 10px;
    }
    .link { 
      color: #2885f0; 
      text-decoration: none; 
      transition-property: color; 
      transition-duration: 0.3s; 
      
      &:hover {  
        color: white; 
      }   

      &::before {
        content: ""; 
        position: absolute; 
        width: 100%; 
        height: 2px; 
        bottom: 0; 
        left: 0; 
        background-color: rgba(45, 129, 255, 0.5); 
        transition-property: background-color, height; 
        transition-duration: 0.3s; 
      }
      &:hover:before {
        background-color: rgba(1, 88, 155, 0.3); 
        height: 100%; 
      }
    }  

    .add-urls-button-input-wrapper {
      display: flex; 
      justify-content: start; 
      align-items: center; 
      width: 100%; 
      gap: 5px; 
    }

    button {
      display: flex; justify-content: center; align-items: center;
      background-color: transparent;
      color: white; 
      font-size: 10px; 
      padding: 2px; 
      border: 2px solid rgba(85, 85, 85, 0.502);
      border-radius: 5px;
      transition-property: background-color, border;
      transition-duration: 0.3s;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

      &:hover {
        background-color: #7c7c7c;
        border-color: #9e9e9e;
      } 
      .material-icons.addUrl {
        font-size: 20px; 
      }
    } 
  }

  .category-div {
  position: relative;
  display: flex; 
  justify-content: start;
  align-items: center; 
  flex-direction: column;
  width: 100%; 
} 

.choose-category-wrapper { 
  display: flex; 
  justify-content: start;
  align-items: center; 
  flex-direction: column; 

  width: 70%; 

  .choose-category-content { 
    display: flex; 
    justify-content: start;
    align-items: center; 
    flex-direction: column;  
    width: 100%; 

    .chooseCategoryButton {
        font-size: 14px;
        padding: 7px; 
        border-radius: 5px; 
        font-size: 15px; 
        font-weight: bolder; 
        color: #cecdcd; 
        border: 2px solid #3f3f3f; 
        background-color: #72727283; 
        transition-property: background-color; 
        transition-duration: 0.3s;

        &:hover {
          background-color: #96969683; 
        }
      }

      .choose-categories-list-wpapper {
        position: absolute;
        top: 30px;
        left: 0;
        display: flex; 
        justify-content: start; 
        align-items: center; 
        flex-direction: column; 
        width: 100%;
        margin-top: 10px; 
        max-height: 300%; 
        overflow: scroll; 

        .choose-categories-list-item {
          top: 0; 
          background-color: #2b2b2b;
          color: #dfdfdf; 
          padding: 5px 10px 5px 10px;
          width: 100%; 
          border: 1px solid #7c7c7c; 
          border-top: 0.5px solid #7c7c7c; 
          border-bottom: 0.5px solid #7c7c7c; 
          overflow: hidden; 
          text-align: center;
          max-width: 70%; 
          min-height: 30px; 
          transition-property: background-color; 
          transition-duration: 0.3s;

          &:hover {
            background-color: #6b6b6b;
          } 
        }
      }
  }
}


  .add-card-button {
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

  .urls-button {
    background-color: transparent;
    color: white;
    padding: 3px;
    width: 15%;
    border: 2px solid rgba(85, 85, 85, 0.502);
    border-radius: 1px;
    transition-property: background-color, border;
    transition-duration: 0.3s;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;


    &:hover {
      background-color: #7c7c7c;
      border-color: #9e9e9e;
    }

    .material-icons.addPlusUrls {
      font-size: 15px; 
      color: white; 
    }
  }
}

@media screen and (max-height: 600px) {
.addBtn-wrapper { 
  width: 50px; 
  height: 50px;  

    .material-icons.addPlus {
      font-size: 30px; 
    }
  }
} 


@media screen and (max-width: 700px) {
  .card {
    max-width: 60vw;
  }
}

@media screen and (max-width: 600px) {
  .card {
    min-width: 80vw; 
    max-width: 80vw;
  } 

  h3 {
    font-size: 15px; 
  } 

  .card-modal-content-wrapper .image-modal-wrapper {
    width: 100%; 
  }
  .card-modal-content-wrapper .input-title-wrapper, .card-modal-content-wrapper .input-description-wrapper, .card-modal-content-wrapper .input-urls-wrapper {
    flex-direction: column; 
    gap: 10px; 
    width: 100%; 
  }
}
</style>

<script>
import AddCardModal from '@/components/AddCardModal.vue'
export default { 
  data() {
    return {
      show: false, 
      showChooseCategory: false, 
      categories: null, 
      urlsToAdd: [], 
      choosedCategory: 'Выбрать категорию', 
      inputTitle: '',
      inputDescription: '',
      inputUrls: '', 
      inputImage: '', 
      inputCategorie: '' 
    }
  },
  created() {
    this.categories = this.getCategoriesFromLocal()
  }, 
  watch: {
    showChooseCategory() {
      this.categories = this.getCategoriesFromLocal() 
    }
  }, 
  components: {
    AddCardModal 
  }, 
  methods: {
    toggleCardModal() {
      this.show = !this.show 
    }, 
    toggleShowChooseCategory() {
      this.showChooseCategory = !this.showChooseCategory 
    }, 
    addCard() {
      this.$emit('addCard', {title: this.inputTitle, 
                             description: this.inputDescription, 
                             urls: this.urlsToAdd, 
                             category: this.inputCategorie == 'Выбрать категорию' ? '' : this.inputCategorie, 
                             imgSrc: this.inputImage}) 
      this.clearAddCardModalData() 
    }, 
    chooseCategory(title) {
      this.choosedCategory = title 
      this.inputCategorie = title 
      this.showChooseCategory = false 
    }, 
    addUrl() {
      if (this.inputUrls.trim()) {
        this.urlsToAdd.push({id: Date.now(), url: this.inputUrls}) 
      }
      this.inputUrls = '' 
    }, 
    clearAddCardModalData() {
      this.inputTitle = '' 
      this.inputDescription = '' 
      this.inputUrls = '' 
      this.inputImage = ''
      this.inputCategorie = 'Выбрать категорию' 
      this.choosedCategory = 'Выбрать категорию' 
      this.showChooseCategory = false 
      this.show = false 
      this.urlsToAdd = [] 
    }, 
    pictureSelected() {
      return !this.inputImage ? false : true 
    }, 
    clearUrl(id) {
      this.urlsToAdd = this.urlsToAdd.filter(url => url.id !== id) 
    }, 
    fixUrl(url) {
      return url.url.includes('https://') ? url.url : `https://${url.url}`
    }, 
    getCategoriesFromLocal() {
      const storage = localStorage.getItem('categories')
      if (!storage) return [] 
      return JSON.parse(storage) 
    } 
  }
}
</script>