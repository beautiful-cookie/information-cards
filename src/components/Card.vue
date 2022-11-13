<template>
    <details>
      <transition name="fade">
        <div v-if="show">
          <div class="card">
            <div class="category-name-wrapper"><span class="empty-class"></span><span class="category-name">{{card.category}}</span></div>
            <div class="image-wrapper"><img :src="card.imgSrc" alt="Ops.."></div>
            <h3><span class="title">{{card.title}}</span></h3>
            <div class="description">{{card.description}}</div>
            <div class="url"><h4>Url: {{card.url}}</h4></div>
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
      show: false 
    }
  }, 
  props: {
    card: {
      type: Object, 
      required: true 
    }
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
  color: #747474; 
  cursor: pointer; 
  transition-property: color;
  transition-duration: 0.3s;

  &:hover {
    color: #c0c0c0;
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
  box-shadow: 0 0 4px white; 
  max-width: 40%;
  max-height: 60%;
  gap: 10px; 
  margin-top: 20px;
  
  .category-name-wrapper {
    display: flex; 
    justify-content: space-between; 
    align-items: center;  
    font-size: 15px; 
    width: 100%; 

    .empty-class {
      flex: 80%; 
    } 
    
    .category-name {
      flex: 20%; 
      color: #747474; 
      cursor: pointer; 
      transition-property: color;
      transition-duration: 0.3s;

      &:hover {
        color: #c0c0c0;
      }
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

    img {
      max-width: 100%; 
      max-height: 100%; 
    }
  }

  h3 .title {
    color: #c0c0c0; 
    text-shadow: 0 0 1px white; 
  }

  .description {
    color: #c0c0c0; 
    border: 2px solid #424242 ; 
    text-align: start;
    border-radius: 5px; 
    padding: 10px; 
    background-color: #212121;
    width: 90%; 
    font-weight: 500;
  } 

  .url {
    background-color: gray; 
    border-radius: 10px; 
    padding: 5px; 
    width: 90%; 
    color: #006172; 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 500;
    transition-property: color; 
    transition-duration: 0.3s; 

    &:hover { 
      color: #29B8DB; 
    }
  }
} 

@media screen and (max-width: 700px) {
  .card {
    max-width: 60%;
    max-height: 60%; 
  }
}



</style>