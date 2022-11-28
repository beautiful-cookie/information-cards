<template>
  <div class="addBtn-wrapper">
    <i class="material-icons addPlus" @click="show = !show">add</i> 
    <AddCardModal v-if="show" @closeCardModal="toggleCardModal">
      <div class="card-modal-content-wrapper">
        <div class="input-image-wrapper">
          <span><h3>Картинка</h3></span>
          <input type="text" placeholder="Введите название..." v-model="inputImage">
        </div>
        <div class="input-title-wrapper">
          <span><h3>Название</h3></span>
          <input type="text" placeholder="Введите название..." v-model="inputTitle">
        </div>
        <div class="input-description-wrapper">
          <span><h3>Описание</h3></span>
          <input type="text" placeholder="Введите описание..." v-model="inputDescription">
        </div>
        <div class="input-urls-wrapper">
          <span><h3>Ссылки</h3></span>
          <div class="input-button-url-wrapper">
            <input type="text" placeholder="Введите ссылки..." v-model="inputUrls">
            <div class="urls-button"><i class="material-icons addPlusUrls">add</i></div>
          </div>
        </div>
        <div class="choose-category-wrapper">

        </div>
        <button class="add-card-button" @click="addCard">Добавить</button>
      </div>
    </AddCardModal>  
  </div>
</template>

<style lang="scss" scoped> 

span {
  display: flex; 
  justify-content: start;
  align-items: center; 
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
  justify-content: center; 
  align-items: center; 
  flex-direction: column; 
  gap: 20px; 
  max-height: 100%;
  padding: 5px;
  width: 100%; 
  margin-top: 20px; 

  .input-title-wrapper, .input-description-wrapper, .input-urls-wrapper, .input-image-wrapper {
    display: flex; 
    justify-content: center;
    align-items: center; 
    flex-direction: column;
    gap: 2vh; 
    width: 70%; 

    input {
      background-color: #222222;
      padding: 5px 10px 5px 10px;
      color: white;
      border: 1px solid #818181;
      border-radius: 10px;
      width: 100%;
    }
  }

  .input-button-url-wrapper {
    display: flex; 
    justify-content: start; 
    align-items: center; 
    gap: 5px; 
    width: 100%; 
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
      inputTitle: '',
      inputDescription: '',
      inputUrls: '', 
      inputImage: '', 
      inputCategorie: '' 
    }
  },
  components: {
    AddCardModal 
  }, 
  methods: {
    toggleCardModal() {
      this.show = !this.show 
    },
    addCard() {
      this.$emit('addCard', {title: this.inputTitle, description: this.inputDescription, urls: this.inputUrls, category: this.inputCategorie, imgSrc: this.inputImage})
    }
  }
}
</script>