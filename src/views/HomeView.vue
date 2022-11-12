<template> 
  <div class="content-wrapper">

    <Card />
    <Card />

  </div>
</template>

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

</style>

<script> 
import Card from '@/components/Card.vue'
export default {
  components: {
    Card
  }
}
</script>