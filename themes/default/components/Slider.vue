<template>
    <div class="slider-container">  
        <template v-for="(image, index) in images" :key="index"> 
          <!-- Pring Images in DOM to for loading all images            -->
          <img :src="image.url" :alt="index" class="d-none">
        </template>

        <div ref="slider" class="slider">
          <template v-for="(image, index) in images" :key="index">
            <div ref="slides" class="slide active">
              <img :src="image.url" :alt="index">
            </div>
          </template>
        </div>
      </div>
</template>

<script setup>
// const slider = document.querySelector('.slider');
// const slides = document.querySelectorAll('.slide');
const slider = ref(null)
const slides = ref([]);

let images = ref([
  {url: '1.jpg'},
  {url: '2.jpg'},
  {url: '3.jpg'},
  {url: '4.jpg'},
  {url: '5.jpg'},
  {url: '6.jpg'},
  {url: '7.jpg'},
]);
let currentIndex = shallowRef(0);
const currentSlide = ref(slider.value?.[currentIndex.value] || {})


function showSlide(index) {
  slides.value.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
  slider.value.style.transform = `translateX(-${currentIndex.value * 20}%)`;
  slider.value.classList.add(effect);
  setTimeout(() => {
    slider.value.classList.remove(effect);
    showSlide(currentIndex.value);
  }, 1000);
}

function startSlider() {
  showSlide(currentIndex.value);
  setInterval(nextSlide, 3000);
}

onMounted(() => {
  H.delay(()=>{
    startSlider()
  }, 0)

})



</script>


<style scoped>

.slider-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.slider {
  display: flex;
  width: 500%;
  height: auto;
  transition: transform 1s ease;
}

.slide {
  flex: 0 0 20%;
}

.slide img {
  width: 100%;
  height: auto;
}

</style>