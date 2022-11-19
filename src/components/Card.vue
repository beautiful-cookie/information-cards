<template>
    <details>
      <transition name="fade">
        <div v-if="show">
          <div class="card">
            <div class="category-name-wrapper"><span class="empty-class"></span><span class="category-name">{{card.category}}</span></div>
            <div class="image-wrapper"><img :src="card.imgSrc" alt="Ops.."></div>
            <h3><span class="title">{{card.title}}</span></h3>
            <div class="description">{{card.description}}</div>
            <div class="url">
              <div class="url-title-wrapper">
                <span class="url-title">Links:</span>
                <span class="empty-class"></span>
              </div>
              <ol>
                <h4 v-for="url of card.urls">
                  <li class="link">
                    <a :href="url" target="_blank" class="link">
                     {{url}}
                    </a>
                  </li>
                </h4>
              </ol>
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
  font-family: 'Comfortaa', cursive; 
  transition-property: color;
  transition-duration: 0.3s;

  &:hover {
    color: #dfdfdf;
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

    img {
      max-width: 100%; 
      max-height: 100%; 
    }
  }

  h3 .title {
    color: #c0c0c0; 
    text-shadow: 0 0 1px white; 
    font-family: 'Comfortaa', cursive; 
  }

  .description {
    color: #fafafa; 
    border: 2px solid #424242; 
    text-align: start;
    border-radius: 5px; 
    padding: 10px; 
    background-color: #212121;
    width: 90%; 
    font-weight: 500;
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
    font-weight: 500;

    ol h4 {
      display: flex; 
      justify-content: start; 
      align-items: center; 
      gap: 5vh; 
    }

    .link { 
      color: #1565c0; 
      max-width: 25vw; 
      text-decoration: none; 
      overflow-wrap: break-word; 
      text-align: start;
      transition-property: color; 
      transition-duration: 0.3s; 
      
      &:hover {  
        color: #1e88e5; 
      }   
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