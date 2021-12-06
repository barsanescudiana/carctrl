<template>
  <div class="container bg-white full-width row wrap justify-start items-center content-center">
    <q-item clickable v-ripple rounded  to='/cars/add/first' exact >
      <q-item-section avatar>
        <q-icon :name="firstIcon"/>
      </q-item-section>
      <q-item-section>
        Car information
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple rounded to='/cars/add/second' exact >
      <q-item-section avatar>
        <q-icon :name="secondIcon"/>
      </q-item-section>
      <q-item-section>
        Engine information
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'add-navigation',
  props: {
    firstIcon: {
      type: String,
    },
    secondIcon: {
      type: String
    }
  }

}
</script>

<style lang="scss" scoped>
  .container {
    height: fit-content;
    border-radius: 22px;
    padding: .5em;
  }

  .section {
    padding-left: 1em !important;
    padding: .5em;
    font-size: 1.2em;
  }

  .q-icon {
    font-size: 1.8em;
    color: $accent;
  }

  .q-router-link--active {
    background-color: $accent-25;
    color: $dark;
  }

  .q-item {
    height: 100%;
    border-radius: 15px;
      
      &:first-child {
      margin-right: 1em !important;
    }
  }

  @media (max-width: $breakpoint-sm-max) {
    .q-item {
      font-size: .9em;
      padding: .5em;
    }

    .q-item__section {
      padding-right: .5em !important;
    }
  }
</style>