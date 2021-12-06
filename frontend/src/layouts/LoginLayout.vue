<template>
  <q-layout view="hHh lpR fFf">

    <router-view/>
    
    <q-footer class="footer text-dark">
      <q-toolbar>

        <div class="row justify-center full-height full-width text-center">
          <span> Designed using <q-icon name="fab fa-figma"></q-icon> <q-icon name="o_more_vert" class="text-accent"></q-icon>  <q-icon name='ion-logo-github' class="color-accent"></q-icon> <a href="https://github.com/barsanescudiana/carctrl">Github repo</a>  <q-icon name="o_more_vert" class="text-accent"></q-icon> <q-icon name="ion-globe"></q-icon> Also available <a href="https://carctrl-ec0b7.web.app/">here</a>! </span>
        </div>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LoginLayout',

  components: {
  },

  setup () {
    return {

    }
  }
})
</script>

<style lang="scss" scoped>
  .footer {
    background-color: #F7F8F8;
  }
</style>
