<template> 
  <div>
    <div class="content-wrapper" 
      v-for="card of showedCards"
      :key="card.id" 
    >

      <Card :card="card" />
      
  </div> 

  <AddCardVue @addCard="addCard" />

  <footer></footer>
  </div>
</template>


<script> 
import Card from '@/components/Card.vue'; 
import AddCardVue from '@/components/AddCard.vue' 

export default {
  data() {
    return {
      cards: [
        {
          category: 'Избранное', imgSrc: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Foboifullhd.ru%2F_ph%2F16%2F596751958.jpg%3F1625782729&f=1&nofb=1&ipt=a0a49fe2db887543b78eade346d76ad22279e37eb28cdd0da0351b242aafed00&ipo=images', 
          title: 'Новое событие 1', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus inventore reiciendis dolore in delectus cum voluptates quam sit labore molestias, dignissimos iusto! Voluptatem, explicabo in suscipit architecto dolorem eius ut.', 
          urls: ['https://google.com', 'https://yandex.ru'], id: Date.now()
        }, 
        {
          // https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wallon.ru%2F_ph%2F14%2F282289135.jpg%3F1586789285&f=1&nofb=1&ipt=9f5b67c9de5a563c710d6493b562916cd466b249b5e670976d05eb0143ae187c&ipo=images
          category: 'Важное', imgSrc: undefined, 
          title: 'Новое событие 2', description: 'Какое-то описание 2', 
          urls: ['https://ru.m.wikipedia.org/wiki/%D0%92%D0%B8%D0%BA%D0%B8%D0%BF%D0%B5%D0%B4%D0%B8%D1%8F:%D0%9D%D0%B5%D0%BE%D0%B1%D1%8B%D1%87%D0%BD%D1%8B%D0%B5_%D1%81%D1%82%D0%B0%D1%82%D1%8C%D0%B8'], id: Date.now() + 1
        }
      ], 
      showedCards: null 
    }
  }, 
  created() {
    this.showedCards = this.cards 
    this.routesFilter() 
  }, 
  components: {
    Card, 
    AddCardVue 
  }, 
  watch: {
    $route() {
      this.routesFilter() 
    }  
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
      }
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
  width: 100vw;
  height: 20vh; 
}
</style>