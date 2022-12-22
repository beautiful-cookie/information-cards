<template> 
  <div>
    <div class="content-wrapper" 
      v-for="card of showedCards"
      :key="card.id" 
    >

      <Card :card="card" @deleteCard="ToDeleteCard" @updateCards="saveCardsInLocal" />
      
  </div> 

  <AddCardVue @addCard="addCard" />

  <footer>
    <div class="deleteCards" v-if="this.cards.length > 0" @click="deleteNotes">Удалить все заметки</div>
  </footer>
  </div> 
</template>


<script> 
import Card from '@/components/Card.vue'; 
import AddCardVue from '@/components/AddCard.vue' 

export default {
  data() {
    return {
      cards: null, 
      showedCards: null, 
      saveArr: this.cards 
    }
  }, 
  created() { 
    this.cards = this.getCardsFromLocal() 
    this.showedCards = this.cards 
    console.log(this.cards.length)
    this.saveCardsInLocal() 
    this.routesFilter() 
  }, 
  components: {
    Card, 
    AddCardVue 
  }, 
  watch: {
    $route() {
      this.routesFilter() 
    }, 
  }, 
  methods: {
      routesFilter() {
        this.showedCards = this.cards.filter(card => { 
          if (this.$route.params.categorie == 'все' || this.$route.params.categorie == undefined || this.$route.params.categorie == 'information-cards') {
            return true 
          }
          return card.category.toLowerCase() === this.$route.params.categorie  
        })
      },
      addCard(card) { 
        this.cards.unshift(
          {
            category: card.category, imgSrc: card.imgSrc, 
            title: card.title, description: card.description, 
            urls: [card.urls], id: Date.now() + 1
          }
        ) 
        this.saveCardsInLocal() 
        this.routesFilter() 
      }, 
      ToDeleteCard(cardToDelete) {
        this.cards = this.cards.filter(card => card.id !== cardToDelete.cardId) 
        this.showedCards = this.cards 
        this.saveCardsInLocal() 
      }, 
      deleteNotes() { 
        this.cards = this.cards.filter(card => 1 == 0) 
        this.showedCards = this.cards 
        this.saveCardsInLocal() 
      }, 
      saveCardsInLocal() {
        localStorage.setItem('cards', JSON.stringify(this.cards))
      }, 
      getCardsFromLocal() {
        const storage = localStorage.getItem('cards') 
        if (!storage) return [] 
        return JSON.parse(storage) 
      }, 
    } 

}
</script>


<style lang="scss" scoped>
.content-wrapper {
  display: flex; 
  justify-content: center; 
  align-items: center; 
  flex-direction: column; 
  width: 100vw; 
  margin-top: 50px; 
  gap: 20px; 
} 

footer {
  display: flex; 
  justify-content: center; 
  align-items: center; 
  width: 100vw; 
  height: 20vh; 

  .deleteCards { 
    width: 70%; 
    max-width: 500px; 
    height: auto;
    text-align: center; 
    background-color: rgb(105, 9, 9); 
    color: #cecece; 
    font-size: large; 
    font-weight: 500;  
    border-radius: 10px; 
    padding: 10px 5px 10px 5px; 
    transition: background-color, text-shadow, 0.5s;

    &:hover {
      background-color: rgb(170, 10, 10); 
      text-shadow: 0 0 5px #cecece; 
    }
  }
}
</style>