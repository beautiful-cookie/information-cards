<template>
    <details>
      <transition name="fade">
        <div v-if="show">
          <div class="card">
            <div class="category-name-wrapper"><span class="empty-class"></span><span class="category-name">{{card.category}}</span></div>
            <div class="image-wrapper" v-if="showImg"><img :src="card.imgSrc" alt="Такой картинки не найдено..."></div>
            <div class="description" v-if="showDescriprion">{{card.description}}</div>
            <div class="url" v-if="showUrls">
              <div class="url-title-wrapper">
                <span class="url-title">Ссылки:</span>
                <span class="empty-class"></span>
              </div>
              <ol>
                <h4 :key="url.id" v-for="url of card.urls[0]">
                  <li class="link-li">
                    <a :href="fixUrl(url)" target="_blank" class="link">
                     {{fixUrl(url)}}
                    </a>
                  </li>
                </h4>
              </ol>
            </div>

            <div class="action-buttons">
              <div class="change-button" @click="toggleChangeCardModal">
                <span class="material-icons">edit</span>
              </div>
              <div class="delete-button" @click="deleteCard">
                <span class="material-icons">delete</span> 
              </div>
              <ChangeCardModal v-if="showChangeCard" @closeChangeCardModal="toggleChangeCardModal" :modalTitle="'Изменить'" :card="this.card">
                <div class="change-card-modal-content-wrapper"> 

                  <div class="image-modal-wrapper">
                    <div class="change-image-wrapper" v-if="pictureSelected()"><img :src="changeInputImage" alt="Такой картинки не найдено..."></div>
                    <span class="textarea-wrapper image-input">
                      <textarea rows="3" placeholder="Введите ссылку на картинку..." v-model="changeInputImage"></textarea>
                    </span>
                  </div> 

                  <div class="input-title-wrapper">
                    <span><h3>Название:</h3></span>
                    <input type="text" placeholder="Введите название..." v-model="changeInputTitle">
                  </div>

                  <div class="input-description-wrapper">
                    <span><h3>Описание:</h3></span>
                    <span class="textarea-wrapper">
                      <textarea rows="3" placeholder="Введите описание..." v-model="changeInputDescription"></textarea>
                    </span>
                  </div>

                  <div class="input-urls-wrapper">
                    <span><h3>Ссылки:</h3></span> 

                    <div class="input-button-url-wrapper">
                      <ol>
                        <h4 v-for="url of this.urlsToChange" :key="url.id" >
                          <li class="link-li">
                            <a :href="fixUrl(url)" target="_blank" class="link">
                              {{fixUrl(url)}}
                            </a>
                          </li>
                          <button><i class="material-icons delUrl" @click="clearUrl(url.id)">close</i></button>
                        </h4>
                      </ol>
                      <div class="add-urls-button-input-wrapper">
                        <input type="url" placeholder="Введите ссылки..." v-model="changeInputUrls">
                        <button><i class="material-icons addUrl" @click="addUrl()">add</i></button>
                      </div>
                    </div>
                  </div>

                  <div class="choose-category-wrapper">
                    <div class="choose-category-content">
                      <span class="category-div">
                        <input type="button" class="chooseCategoryButton" @click="toggleShowChooseCategory" v-model="choosedChangeCategory">
                        <transition name="fade">
                            <ol class="choose-categories-list-wpapper" v-if="showChooseChangeCategory">
                              <li v-for="categorie of changeCategories" :key="categorie.id"
                                class="choose-categories-list-item" @click="chooseCategory(categorie.title)"
                                >
                                {{categorie.title}}
                              </li>
                          </ol>
                        </transition>
                      </span>
                    </div>
                  </div>

                  <button class="change-card-button" @click="changeCard">Изменить</button>
                </div> 
              </ChangeCardModal>  
            </div>  
          </div> 
        </div> 
      </transition> 
 
 
      <summary @click="show = !show">  
        {{card.title}} 
      </summary> 
    </details> 
</template> 
 
<script> 
import ChangeCardModal from '@/components/ChangeCardModal.vue' 
export default { 
  data() {
    return {
      show: false, 
      showImg: false , 
      showDescriprion: false, 
      showUrls: false, 
      showChangeCard: false, 
      showChooseChangeCategory: false, 
      changeCategories: null, 
      changeInputImage: '', 
      changeInputTitle: '', 
      changeInputDescription: '', 
      changeInputUrls: '', 
      choosedChangeCategory: '', 
      changeInputCategory: '', 
      urlsToChange: [] 
    } 
  }, 
  created() {
    this.showImg = this.card.imgSrc ? true : false 
    this.showDescriprion = this.card.description === '' || this.card.description === ' ' ? false : true 
    this.showUrls = !(this.card.urls[0].length > 0) ? false : true 
    this.changeInputImage = this.card.imgSrc 
    this.changeInputTitle = this.card.title 
    this.changeInputDescription = this.card.description 
    this.urlsToChange = this.card.urls[0] 
    this.choosedChangeCategory = this.card.category 
    this.changeCategories = this.getCategoriesFromLocal() 
  }, 
  props: {
    card: {
      type: Object, 
      required: true 
    }
  }, 
  components: {
    ChangeCardModal 
  }, 
  methods: {
    deleteCard() {
      this.$emit('deleteCard', {cardId: this.card.id})
    }, 
    changeCard() {
      this.card.imgSrc = this.changeInputImage 
      this.card.title = this.changeInputTitle 
      this.card.description = this.changeInputDescription 
      this.card.urls[0] = this.urlsToChange 
      this.showChangeCard = false 
      this.card.category = this.changeInputCategory 
    }, 
    fixUrl(url) {
      return url.url.includes('https://') ? url.url : `https://${url.url}`
    }, 
    clearUrl(id) {
      this.urlsToChange = this.urlsToChange.filter(url => url.id !== id) 
    }, 
    toggleChangeCardModal() {
      this.showChangeCard = !this.showChangeCard 
    }, 
    pictureSelected() {
      return !this.changeInputImage ? false : true 
    }, 
    addUrl() {
      if (this.changeInputUrls.trim()) {
        this.urlsToChange.push({id: Date.now(), url: this.changeInputUrls}) 
      }
      this.changeInputUrls = '' 
    }, 
    toggleShowChooseCategory() {
      this.showChooseChangeCategory = !this.showChooseChangeCategory 
    }, 
    chooseCategory(title) {
      this.choosedChangeCategory = title 
      this.changeInputCategory = title 
      this.showChooseChangeCategory = false 
    }, 
    getCategoriesFromLocal() {
      const storage = localStorage.getItem('categories')
      if (!storage) return [] 
      return JSON.parse(storage) 
    } 
  }
}
</script>


<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
details div {
  display: flex; 
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer; 
  user-select: none;
}

summary {
  list-style: none; 
  color: #fafafa; 
  font-family: 'Comfortaa', cursive; 
  border: 2px solid transparent; 
  border-radius: 5px; 
  padding: 10px 15px 10px 15px; 
  background-color: #222222; 
  transition-property: text-shadow; 
  transition-duration: 0.3s; 

  &:hover {
    text-shadow: 0 0 4px #fafafa; 
  }
}


button {
  margin-bottom: 5px; 
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

  .material-icons.delUrl {
    font-size: 15px; 
  } 
}

.card {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    flex-direction: column; 
    border: 1px solid white; 
    padding: 10px; 
    border-radius: 10px; 
    background-color: #0f0f0f;
    box-shadow: 0 0 4px white; 
    min-width: 60vw; 
    max-width: 40%;
    max-height: 60%;
    gap: 10px; 
    margin-top: 20px;
  
  .category-name-wrapper, .url-title-wrapper {
    display: flex; 
    justify-content: space-between; 
    align-items: center;  
    font-size: 15px; 
    width: 100%; 

    .empty-class {
      flex: 80%; 
    } 
    
    .category-name, .url-title {
      flex: 20%; 
      color: #cecdcd; 
      cursor: pointer; 
      font-family: 'Comfortaa', cursive; 
      transition-property: color;
    }
  } 

  .image-wrapper {
    min-width: 90%;
    min-height: 60%;
    max-width: 90%; 
    max-height: 60%;
    overflow: hidden; 
    padding: 3px; 
    border: 2px solid #919191;
    border-radius: 5px; 
    color: #cecdcd; 

    img {
      max-width: 100%; 
      max-height: 100%; 
    }
  } 

  .description {
    color: #fafafa; 
    border: 2px solid #424242; 
    text-align: start;
    border-radius: 5px; 
    padding: 10px; 
    background-color: #212121;
    min-width: 90%;
    max-width: 90%; 
    font-weight: 500; 
    user-select: text;
  } 

  .url { 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    flex-direction: column; 
    background-color: #212121; 
    border: 2px solid #424242; 
    border-radius: 10px; 
    padding: 5px; 
    width: 90%; 
    max-width: 90%;
    overflow: hidden;  
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    ol h4 {
      display: flex; 
      justify-content: start; 
      align-items: center; 
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
  }

  .action-buttons {
    display: flex;
    background-color: #212121;
    min-width: 90%;
    max-width: 90%;
    color: white;


    .change-button, .delete-button {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      transition-property: background-color;
      transition-duration: 0.3s;
    }

    .change-button {
      background-color: #1a237e;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      &:hover {
        background-color: #0d47a1 ;
      }
    }

    .delete-button {
      background-color: #b71c1c;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      &:hover {
        background-color: #d50000;
      }
    } 
  }
} 

.change-card-modal-content-wrapper {
  display: flex; 
  justify-content: start; 
  align-items: center; 
  flex-direction: column;  
  gap: 20px; 
  max-height: 90%;  
  padding: 5px; 
  width: 100%; 
  overflow: scroll; 

  .image-modal-wrapper {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    flex-direction: column;
    width: 70%; 
    gap: 10px; 
    padding-bottom: 15px;
    border-bottom: 1px solid #666666; 
  } 

  .change-image-wrapper {
    min-width: 100%;
    min-height: 60%;
    max-width: 90%; 
    max-height: 60%;
    overflow: hidden; 
    padding: 3px; 
    border: 2px solid #919191;
    border-radius: 5px; 
    color: #cecdcd; 

    img {
      max-width: 100%; 
      max-height: 100%; 
    }
  }

  .input-title-wrapper, .input-description-wrapper, .input-urls-wrapper {
    display: flex; 
    justify-content: end;
    align-items: center; 
    width: 70%; 
    gap: 10%; 

    input, textarea { 
      background-color: #222222;
      padding: 5px 10px 5px 10px;
      color: white;
      border: 1px solid #818181;
      border-radius: 10px;
      width: 100%; 
      resize: vertical; 
    } 
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
    } 

    .add-urls-button-input-wrapper {
      display: flex; 
      justify-content: start; 
      align-items: center; 
      width: 100%; 
      gap: 5px; 
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
  }
  .textarea-wrapper {
    display: flex; 
    justify-content: end;
    align-items: center; 
    width: 100%; 
    gap: 10%; 
    max-width: 100%; 
    min-width: 59%; 

    input, textarea { 
      background-color: #222222;
      padding: 5px 10px 5px 10px;
      color: white;
      border: 1px solid #818181;
      border-radius: 10px;
      width: 100%; 
      resize: vertical; 
    } 
  } 
  .image-input {
    min-width: 100%; 
    resize: vertical; 
  } 


  .change-card-button {
    background-color: transparent;
    color: white;
    padding: 10px;
    width: 70%; 
    font-size: medium; 
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
}


</style>