<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-white shadow-5">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" dense icon="r_menu" class="text-accent menu" size='lg'/>
        <img src="../../public/full-logo.svg" class="header-logo">
      </q-toolbar>
    </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above

        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay
        rounded

        :width="180"
        :breakpoint="599"
        class="bg-grey-1 inset-shadow text-dark drawer"
      >
        <q-scroll-area class="fit drawer-bg shadow-5">
          <q-list padding>
            <q-item clickable v-ripple rounded to='/' exact>
              <q-item-section avatar>
                <q-icon name="o_cottage"/>
              </q-item-section>
              <q-item-section>
                Home
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple rounded to='/schedule' exact >
              <q-item-section avatar>
                <q-icon name="o_edit_calendar"/>
              </q-item-section>
              <q-item-section>
                Schedule
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple rounded to='/map/map' >
              <q-item-section avatar>
                <q-icon name="o_map"/>
              </q-item-section>
              <q-item-section>
                Map
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple rounded to='/cars' >
              <q-item-section avatar>
                <q-icon name="o_directions_car"/>
              </q-item-section>
              <q-item-section>
                Cars
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple rounded to='/login' class="text-dark">
              <q-item-section avatar>
                <q-icon name="o_logout"/>
              </q-item-section>
              <q-item-section>
                Logout
              </q-item-section>
            </q-item>
            
          </q-list>
        </q-scroll-area>
      </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>



    <q-footer class="footer text-dark">
      <q-toolbar>

        <div class="row justify-center items-center content-center full-height full-width text-center">
          <span> Designed using <q-icon name="fab fa-figma"></q-icon> <q-icon name="o_more_vert" class="text-accent"></q-icon>  <q-icon name='ion-logo-github' class="color-accent"></q-icon>  </span>
        </div>
      </q-toolbar>
    </q-footer>



  </q-layout>
</template>

<script>

import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',

  setup () {

    const router = useRouter();
    const user = ref();
    user.value = JSON.parse(localStorage.getItem('USER'))

    return {
      router,
      user,
      drawer: ref(false),
      miniState: ref(true),
    }

    
  },

})
</script>
<style lang="scss" scoped>
  @import url("https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;600;700&display=swap");
  @import "../css/quasar.variables.scss";

  .header-logo {
    height: 6vh;
  }

  .drawer {
    background-color: $light-gray;
    font-family: 'Lexend Deca', sans-serif;
  }

  .q-scrollarea__content {
    box-shadow: 1px 4px 7px rgba(0, 0, 0, 0.25);
  }

  .q-item {
    margin: .3em;
    color: $primary;
    &:hover {

      background-color: $grey-2;
      border-radius: 15px;
    }

  }

  .q-router-link--active {
    background-color: #1abc9c30;
    border-radius: 15px;
    color: $primary;

  }

  .menu {
    border-radius: 15px;
    margin: .3em;

      .q-icon {
        color: $grey-7;
        font-size: 1.5em;
      }
  }

  .footer {
    background-color: #F7F8F8;
    height: fit-content !important;
  }

  .expansion-item {
    border-radius: 15px;
    max-width: 340px;

    .item {
      width: 280px;
      font-size: 1em;
      border-radius: 15px;

      &:hover {
        background-color: $grey-3;
      }

      &__content {
        font-size: .8em;
        color: $grey-7;
      }
    }
  }

  .q-toolbar {
    height: 8vh;
  }

  @media (min-width: $breakpoint-xs-max) {
    .menu{
      display: none; 
    }
  }

</style>