<template>
  <div id="app">
    <Navbar /> 
    <Categories /> 
    <router-view/> 
  </div>
</template>


<script>
import Navbar from '@/components/Navbar.vue' 
import Categories from '@/components/Categories.vue';

export default {
  components: {
    Navbar,
    Categories 
  } 
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; 
}

* 
{
  margin: 0; 
  padding: 0; 
  box-sizing: border-box; 
}

body 
{
  display: flex; 
  justify-content: center; 
  align-items: center; 
  flex-direction: column; 
  background-color: black; 
}

::-webkit-scrollbar {
  display: none; 
} 
</style>
