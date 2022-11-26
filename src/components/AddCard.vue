<template>
  <div class="addBtn-wrapper">
    <i class="material-icons addPlus" @click="show = !show">add</i> 
    <AddCardModal v-if="show" @closeCardModal="toggleCardModal">
      <div class="card-modal-content-wrapper">
        <div class="input-title-wrapper">
          <h3>Название</h3>
          <input type="text" placeholder="Введите название..." v-model="inputTitle">
        </div>
        <div class="input-description-wrapper">
          <h3>Описание</h3>
          <input type="text" placeholder="Введите описание..." v-model="inputDescription">
        </div>
        <div class="input-urls-wrapper">
          <h3>Ссылки</h3>
          <input type="text" placeholder="Введите ссылки..." v-model="inputUrls">
        </div>
        <div class="choose-category-wrapper">

        </div>
        <button class="add-card-button" @click="addCard">Добавить</button>
      </div>
    </AddCardModal>  
  </div>
</template>

<style lang="scss" scoped> 
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
  height: 50%;
  padding: 5px;
  width: 100%; 
  margin-top: 10vh; 

  .input-title-wrapper, .input-description-wrapper, .input-urls-wrapper {
    display: flex; 
    justify-content: center;
    align-items: center; 
    flex-direction: column;
    gap: 2vh; 
    width: 70%; 

    input {
      background-color: #222222;
      padding: 10px;
      color: white;
      border: 1px solid #818181;
      border-radius: 10px;
      width: 100%;
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
      inputUrls: ''
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
      this.$emit('addCard', {title: this.inputTitle, description: this.inputDescription, urls: this.inputUrls})
    }
  }
}
</script>