<template> 
  <div>
    <Navbar /> 
    <Categories />
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
