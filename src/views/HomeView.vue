<template> 
  <div>
    <div class="content-wrapper" 
      v-for="card of cards"
      :key="card.id" 
    >

      <Card v-bind:card="card" /> 

  </div> 

  <footer></footer>
  </div>
</template>


<script> 
import Card from '@/components/Card.vue'

export default {
  data() {
    return {
      cards: [
        {category: 'Избранное', imgSrc: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Foboifullhd.ru%2F_ph%2F16%2F596751958.jpg%3F1625782729&f=1&nofb=1&ipt=a0a49fe2db887543b78eade346d76ad22279e37eb28cdd0da0351b242aafed00&ipo=images', title: 'Новое событие 1', description: 'Какое-то описание 1', url: 'https://google.com', id: Date.now()}, 
        {category: 'Важное', imgSrc: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wallon.ru%2F_ph%2F14%2F282289135.jpg%3F1586789285&f=1&nofb=1&ipt=9f5b67c9de5a563c710d6493b562916cd466b249b5e670976d05eb0143ae187c&ipo=images', title: 'Новое событие 2', description: 'Какое-то описание 2', url: 'https://yandex.ru', id: Date.now() + 1}
      ]
    }
  },
  components: {
    Card
  }, 
  methods: {
    
  }, 

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