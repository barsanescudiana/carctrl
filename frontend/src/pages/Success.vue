<template>
  <q-page class="page bg-grey-2 fit row content-center items-center justify-center">
    <div>
      <div class="form__container row text-dark content-center items-center justify-center">
        <div class="section column content-center items-center justify-center text-center">
          <div class="title text-weight-bold"> Amaizing! </div>
          <div class="subtitle"> Vehicle <span class="text-weight-bold"> {{ carDetails }}</span> was successfully added!  </div>
          <q-btn
            no-caps
            rounded
            label="Great!"
            color="primary"
            class="home--btn"
            @click="handleHomeBtn">

          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';


export default {

  setup() {

    const router = useRouter();
    const user = JSON.parse(localStorage.getItem('USER'))

    const carDetails = ref(localStorage.getItem('DETAILS'));

    const handleHomeBtn = () => {
      if (localStorage.getItem('TO_ADD')) {
        localStorage.removeItem('TO_ADD')
      }

      if(localStorage.getItem('TO_ADD_SECOND')) {
        localStorage.removeItem('TO_ADD_SECOND')
      }

      localStorage.removeItem('DETAILS')
      router.push('/')
    }

    return {
      carDetails,
      handleHomeBtn,
    }
  }
}
</script>

<style lang="scss" scoped>
  .page {
    padding: 1em;
  }

  .form__container {

    .section {
      height: fit-content;
      margin: 2em 5em;
      padding: 1em;
      border-radius: 22px;
      background-color: white;
      min-width: 20em;
    }

    .title {
      font-size: 2em;
      padding: 1em;
    }

    .subtitle {
      font-size: 1.5em;
      padding: .5em 1em;
    }

    .home--btn {
      font-size: 1em;
      min-width: 7em !important;
      margin: 1.5em 0;
      border-radius: 10px;
    }
  }

  @media (max-width: $breakpoint-sm-max) {
    .page {
      padding: 1em !important;
    }

    .title {
      font-size: 1.5em !important;
      padding: 1em;
    }

    .subtitle {
      font-size: 1em !important;
      padding: .5em 1em;
    }

  }
</style>