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
                    <a :href="url.url.includes('https://') ? url.url : `https://${url.url}`" target="_blank" class="link">
                     {{url.url}}
                    </a>
                  </li>
                </h4>
              </ol>
            </div>

            <div class="action-buttons">
              <div class="change-button">
                <span class="material-icons">edit</span>
              </div>
              <div class="delete-button" @click="deleteCard">
                <span class="material-icons">delete</span>
              </div>
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
export default {
  data() {
    return {
      show: false, 
      showImg: false , 
      showDescriprion: false, 
      showUrls: false 
    }
  }, 
  created() {
    this.showImg = this.card.imgSrc ? true : false 
    this.showDescriprion = this.card.description === '' || this.card.description === ' ' ? false : true 
    this.showUrls = !(this.card.urls > 0) ? false : true 
  }, 
  props: {
    card: {
      type: Object, 
      required: true 
    }
  },
  methods: {
    deleteCard() {
      this.$emit('deleteCard', {cardId: this.card.id})
    }, 
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