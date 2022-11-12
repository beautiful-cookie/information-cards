<template>
    <details>
      <transition name="fade">
        <div v-if="show">
          <div class="card">
            <div class="category-name-wrapper"><span class="empty-class"></span><span class="category-name">{Категория}</span></div>
            <div class="image-wrapper"><img src="@/assets/testImg.jpg" alt="Ops.."></div>
            <div class="title-wrapper"><span class="title">{Название}</span></div>
            <div class="description">{Описание}</div>
            <div class="url">{Url}</div>
          </div>
        </div>
      </transition>


      <summary @click="show = !show"> 
        Название 1
      </summary>
    </details>
</template>

<script>
export default {
  data() {
    return {
      show: false 
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
} 

@media screen and (max-width: 700px) {
  .card {
    max-width: 60%;
    max-height: 60%; 
  }
}



</style>