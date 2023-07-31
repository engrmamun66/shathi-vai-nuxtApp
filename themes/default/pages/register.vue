<template>
    <div class="wrapper">
        <div class="h-100 d-flex justify-content-center align-items-center">
            <div>
              
                <div class="text-center">
                  <img src="/img/logo.png" width="100" />
                </div>
                <div class="text-center">
                  <h4 class="mt-3">Muslim Brothers</h4>
                </div>
                <form>
                    <div class="row">
                        <label for="email">Select Masjid</label>
                        <select >
                          <option value="">--Select--</option>
                          <option value="">Masjid 1</option>
                          <option value="">Masjid 2</option>
                          <option value="">Masjid 3</option>
                        </select>
                    </div>
                    <div class="row">
                        <label for="email">Username or Email</label>
                        <input type="email" name="text" autocomplete="off" placeholder="Username/email">
                    </div>
                    <div class="row">
                        <label for="password">Password</label>
                        <input type="password" name="password" placeholder="password">
                    </div>
                    <div class="d-flex justify-content-center">
                        <a  @click="navigateTo('/login')" class="text-center cp"> <i class="las la-sign-in-alt"></i> Login Now</a>
                    </div>
                    <button type="button">Registration</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>


<style scoped>
.wrapper{
    height: 100vh;
}

form {
  background: #fff;
  max-width: 460px;
  width: 100%;
  padding: 58px 44px;
  border: 1px solid #e1e2f0;
  border-radius: 4px;
  box-shadow: 0 0 5px 0 rgba(42, 45, 48, 0.12);
  transition: all 0.3s ease;
}

form a {
cursor: pointer;
}

.row {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.row label {
  font-size: 16px;
  color: #8086a9;
  padding-left: 0px;
}

.row input,
.row select
 {
  flex: 1;
  padding: 13px;
  border: 1px solid #d6d8e6;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.2s ease-out;
  color: #58585a;
}
.row select option
 {
  color: #58585a;
}

.row input:focus,
.row select:focus
 {
  outline: none;
  box-shadow: inset 2px 2px 5px 0 rgba(42, 45, 48, 0.12);
}

.row input::placeholder,
.row select::placeholder
 {
  color: #C8CDDF;
}

button {
  width: 100%;
  padding: 12px;
  font-size: 18px;
  background: #15C39A;
  color: #fff;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;
  margin-top: 15px;
  transition: background 0.2s ease-out;
}

button:hover {
  background: #55D3AC;
}

@media(max-width: 700px) { 
  
  form {
    border: none;
    box-shadow: none;
    padding: 20px 0;
  }
  form a
  {
    color: #58585a;
    text-decoration: none;
    padding: 2px 12px;
    font-size: 14px;
  }
  form a i
  {
    color: #58585a;
    text-decoration: none;
    padding: 2px 5px;
    font-size: 14px;
  }

}
</style>