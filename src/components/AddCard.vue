<template>
  <div class="addBtn-wrapper">
    <AddCardModal v-if="show" @closeCardModal="toggleCardModal">
      <div class="card-modal-content-wrapper">

        <div class="input-image-wrapper">
          <div class="image-wrapper"><img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wallon.ru%2F_ph%2F14%2F282289135.jpg%3F1586789285&f=1&nofb=1&ipt=9f5b67c9de5a563c710d6493b562916cd466b249b5e670976d05eb0143ae187c&ipo=images" alt="Ops.."></div>
          <input type="file" class="inputImage" value="Выберете картинку" />
        </div>

        <div class="input-title-wrapper">
          <span><h3>Название:</h3></span>
          <input type="text" placeholder="Введите название..." v-model="inputTitle">
        </div>

        <div class="input-description-wrapper">
          <span><h3>Описание:</h3></span>
          <span class="textarea-wrapper">
            <textarea rows="1" placeholder="Введите описание..." v-model="inputDescription"></textarea>
          </span>
        </div>

        <div class="input-urls-wrapper">
          <span><h3>Ссылки:</h3></span> 

          <div class="input-button-url-wrapper">
            <input type="url" placeholder="Введите ссылки..." v-model="inputUrls">
            <button><i class="material-icons addUrl">add</i></button>
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
.category-div {
  position: relative;
  display: flex; 
  justify-content: start;
  align-items: center; 
  flex-direction: column;
  width: 100%; 
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
      max-width: 100%; 
      min-width: 59%; 
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



  .input-button-url-wrapper {
    display: flex; 
    justify-content: start; 
    align-items: center; 
    gap: 5px; 
    width: 100%; 
    max-height: 10%; 
    overflow: scroll; 

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
</style>

<script>
import AddCardModal from '@/components/AddCardModal.vue'
export default { 
  data() {
    return {
      show: false, 
      showChooseCategory: false, 
      categories: null, 
      choosedCategory: 'Выбрать категорию', 
      inputTitle: '',
      inputDescription: '',
      inputUrls: '', 
      inputImage: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wallon.ru%2F_ph%2F14%2F282289135.jpg%3F1586789285&f=1&nofb=1&ipt=9f5b67c9de5a563c710d6493b562916cd466b249b5e670976d05eb0143ae187c&ipo=images', 
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
                             urls: this.inputUrls, 
                             category: this.inputCategorie == 'Выбрать категорию' ? '' : this.inputCategorie, 
                             imgSrc: this.inputImage}) 
      this.inputTitle = '' 
      this.inputDescription = '' 
      this.inputUrls = '' 
      this.inputCategorie = 'Выбрать категорию' 
      this.choosedCategory = 'Выбрать категорию' 
      this.showChooseCategory = false 
      this.show = false 
    }, 
    chooseCategory(title) {
      this.choosedCategory = title 
      this.inputCategorie = title 
      this.showChooseCategory = false 
    }, 
    getCategoriesFromLocal() {
      const storage = localStorage.getItem('categories')
      if (!storage) return [] 
      return JSON.parse(storage)
    } 
  }
}
</script>