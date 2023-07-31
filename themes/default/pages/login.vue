<template>
    <div class="h h-100">
        <div class="h-75 d-flex justify-content-center align-items-center">
            <div>
                <h1 class="text-center">
                <img src="/img/logo.png" width="100" />
                </h1>
                <form>
                    <div class="row">
                        <label for="email">Email</label>
                        <input type="email" name="email" autocomplete="off" placeholder="email">
                    </div>
                    <div class="row">
                        <label for="password">Password</label>
                        <input type="password" name="password" placeholder="password">
                    </div>
                    <div class="d-flex justify-content-between">
                        <a class="text-center">For</a>
                        <a class="text-center">New Registration</a>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>


<style scoped>
.wraper{
    align-items: center;
}

h1 {
  margin-top: 48px;
}

form {
  background: #fff;
  max-width: 360px;
  width: 100%;
  padding: 58px 44px;
  border: 1px solid #e1e2f0;
  border-radius: 4px;
  box-shadow: 0 0 5px 0 rgba(42, 45, 48, 0.12);
  transition: all 0.3s ease;
}

.row {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.row label {
  font-size: 16px;
  color: #8086a9;
  padding-left: 0px;
}

.row input {
  flex: 1;
  padding: 13px;
  border: 1px solid #d6d8e6;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.2s ease-out;
}

.row input:focus {
  outline: none;
  box-shadow: inset 2px 2px 5px 0 rgba(42, 45, 48, 0.12);
}

.row input::placeholder {
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

@media(max-width: 458px) {
  
  body {
    margin: 0 18px;
  }
  
  form {
    border: none;
    box-shadow: none;
    padding: 20px 0;
  }

}
</style>