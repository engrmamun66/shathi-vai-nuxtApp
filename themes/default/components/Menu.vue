<template>
  <div class="position-relative">

    <header class="header" id="header">
      <nav class="navbar menu-container">
        <div class="d-flex justify-content-start align-items-center">
        <img src="/img/logo.png" class="me-3" width="50" />
        <nuxt-link to="/" class="brand">
        This is my mosjid name
        </nuxt-link>
        </div>

        <div class="menu" id="menu">
          <ul class="menu-list">            
            
            <!-- <li class="menu-item">
              <a href="#" class="menu-link">
                <i class="menu-icon ion-md-cart"></i>
                <span class="menu-name">Cart</span>
              </a>
            </li> -->
            <li class="menu-item">
              <a href="#" class="menu-link">
                <i class="menu-icon ion-md-heart"></i>
                <span class="menu-name">Favorite</span>
              </a>
            </li>
            <li class="menu-item">
              <a href="#" class="menu-link">
                <i class="menu-icon ion-md-contact"></i>
                <span class="menu-name">Account</span>
              </a>
            </li>
            <li class="menu-item">
              <a href="#" class="menu-link is-active">
                <i class="menu-icon ion-md-home"></i>
                <span class="menu-name">Home</span>
              </a>
            </li>
            <li class="menu-item">
              <a href="#" class="menu-link">
                <i class="menu-icon ion-md-search"></i>
                <span class="menu-name">Search</span>
              </a>
            </li>
            <li class="menu-item">
              <a href="#" class="menu-link">
                <i class="menu-icon ion-md-menu"></i>
                <span class="menu-name">Menu</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  
</div>

</template>

<script setup>

</script>
<style scoped>
:root {
  --color-black: hsl(0, 0%, 10%);
  --color-white: hsl(0, 0%, 100%);
  --color-darken: hsl(0, 0%, 20%);
  --color-teal-100: hsl(160, 85%, 87%);
  --color-teal-200: hsl(162, 78%, 77%);
  --color-teal-300: hsl(162, 72%, 65%);
  --color-teal-400: hsl(162, 68%, 54%);
  --color-teal-500: hsl(162, 73%, 46%);
  --color-teal-600: hsl(162, 82%, 40%);
  --color-teal-700: hsl(162, 87%, 35%);
  --color-teal-800: hsl(162, 88%, 30%);
  --shadow-small: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-medium: 0px -3px 6px #eae7e7;
  --shadow-large: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
  	0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  list-style-type: none;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}


a,
button {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  text-decoration: none;
}

img,
video {
  display: block;
  max-width: 100%;
  height: auto;
  -o-object-fit: cover;
     object-fit: cover;
}

.menu-container {
  max-width: 75rem;
  height: auto;
  margin: 0 auto;
  padding: 0 1.25rem;
}

.brand {
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  color: var(--color-teal-800);
  text-transform: uppercase;
  text-align: center;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 100;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  margin: 0 auto;
  background-color: #e7e7e7c2;
}

.menu {
  position: fixed;
  left: 0;
  bottom: 0;
  display: grid;
  align-content: center;
  width: 100%;
  height: 3.5rem;
  padding: 0 1rem;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  background: var(--color-white); 
}
.menu-list {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.menu-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  color: var(--color-black);
}
.menu-link.is-active {
  position: relative;
  color: hsl(162, 88%, 30%);
  transition: all 0.35s ease;
}
.menu-icon {
  font-size: 1.35rem;
  line-height: 1;
  color: inherit;
}
.menu-name {
  display: none;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25;
  visibility: hidden;
  text-transform: capitalize;
}

@media only screen and (max-width: 700px) {
  .menu{
    box-shadow: 0px -3px 6px #a2a2a233;
    border-top: 1px solid #c8c8c8;
  }
}
@media only screen and (min-width: 360px) {
  .menu-name {
    display: block;
    visibility: visible;
  }
}
@media only screen and (min-width: 576px) {
  .menu-list {
    justify-content: center;
    -moz-column-gap: 3rem;
         column-gap: 3rem;
  }
}
@media only screen and (min-width: 768px) {
  .header {
    background: var(--color-white);
    box-shadow: var(--shadow-medium);
    transition: all 0.35s ease-in-out;
  }

  .menu {
    position: relative;
    top: 0;
    right: 0;
    width: auto;
    height: auto;
    background: none;
    box-shadow: none;    
  }
  .menu-link.is-active::before {
    position: absolute;
    content: "";
    left: 0;
    bottom: 0;
    width: 2rem;
    height: 2px;
    border: none;
    outline: none;
    background: var(--color-teal-800);
  }
  .menu-link:hover {
    color: var(--color-teal-800);
    transition: all 0.35s ease;
  }
  .menu-icon {
    display: none;
    visibility: hidden;
  }
  .menu-name {
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    margin-bottom: 0.2rem;
  }
}
</style>