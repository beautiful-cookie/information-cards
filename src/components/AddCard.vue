<template>
  <div class="addBtn-wrapper">
    <i class="material-icons addPlus">add</i> 
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