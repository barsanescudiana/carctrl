<template>
  <q-page class="flex flex-center q-pa-xl bg-grey-2 page">

      <div class="full-width row wrap justify-center items-start content-start">
        <div class="col-md-4 self-center q-gutter-md form-container bg-white q-pa-lg" style="overflow: none;">
            <q-img 
              src="../../public/full-logo.svg" 
              alt="carctrtl-logo"/>
               <div class="text-h4 text-weight-bold text-dark q-mb-lg"> Login </div>
               
               
        <q-form 
          ref="loginForm"
          @submit.prevent.stop="onSubmit">
     
          <q-input 
            outlined 
            v-model="email"
            type="email"
            placeholder="Email"
            class="q-mb-sm"
            lazy-rules
            :rules="[ 
              value => value && value.length > 0 || 'Please enter your email.',
              value => value.includes('@gmail.com') || value.includes('@yahoo.com') || 'Invalid email address.'
            ]" 
            />

          <q-input 
            v-model="password" 
            outlined 
            :type="isPwd ? 'password' : 'text'"
            placeholder="Password"
            lazy-rules
            :rules="[ 
              value => value && value.length > 0 || 'Please enter your password.', 
              value => value.length > 6 || 'Password should be at least 6 characters long' 
            ]">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'o_visibility_off' : 'o_visibility'"
                :class="isPwd ? 'cursor-pointer text-grey-5' : 'cursor-pointer text-primary'"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="row flex self-end items-end flex-end q-mt-xs">
            <div
              @click="handleRegister" 
              class="text-grey-5 register" style="cursor: pointer;">
              Don't have an account? Register here!  
            </div>
          </div>
          
          <q-btn 
            color="primary" 
            label="Login"
            type="submit" 
            class="btn-login q-mt-sm"
            no-caps 
            fit />
          </q-form>

        </div>
        <div class="col-md-5 self-center q-gutter-md login-image bg-white items-center" style="overflow: none;">
        
          <q-img src="../assets/login.svg" alt="" class="logo-image"/>
        
        </div>
      </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
   setup () {
    const $q = useQuasar();
    const router = useRouter();
    const server = 'http://localhost:3000';
    const email = ref('');
    const password = ref('');

    localStorage.clear();

    const handleRegister = () => {
      router.push('/register');
    }

    const onSubmit = () => {
      axios.post(`${server}/api/auth/login`, {
        email: email.value,
        password: password.value
      })
      .then((res) => {
        localStorage.setItem('AUTH_TOKEN', 'Bearer ' + res.data.token);
        localStorage.setItem('USER', JSON.stringify(res.data.user));
        router.push('/')
        $q.notify({
          progress: true,
          message: `Login successfull`,
          color: 'positive',
          actions: [
            { label: 'Ok', color: 'white', handler: () => { /* ... */ } }
          ]
        })
      })
      .catch((err) => {
        $q.notify({
          progress: true,
          message: `Something went wrong!`,
          color: 'negative',
          actions: [
            { label: 'Ok', color: 'white', handler: () => { /* ... */ } }
          ]
        })
      })
    }

    return {
      email, 
      password,
      onSubmit,
      loginForm: ref(null),
      isPwd: ref(true),
      accept: ref(false),
      handleRegister,
    }
  }

})
</script>

<style lang="scss" scoped>
  .page {
    width: 100%
  }

  .q-img {
    margin: 0;
  }

  .form-container {
    border-radius: 22px;

  }

  .login-image {
    border-radius: 22px;
    padding: 12px;
  }

  .btn-login {
    width: 96%;
    border-radius: 15px;
    font-size: 1.2em;
  }

  .register {
    font-size: .8em;
  }

    @media (max-width: $breakpoint-sm-max) {
    .login-image {
      padding: 0px !important;
    }
  }
</style>
