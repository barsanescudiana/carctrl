<template>
  <div class="container fit row wrap">
    <div class="row fit justify-between items-center content-center">
      <q-icon name="o_settings" size="sm" class="col-md-1 text-accent icon"></q-icon>
      <div class=" col-md column wrap justify-start items-start content-start">
        <strong>{{this.name}}</strong> 
      </div>
      <div class=" col-md-4 date column wrap content-end items-end justify-end">
        {{this.date}}
      </div>
    </div>
    <div class="row items-start content-start justify-start space-evenly details">
      <div class="row full-width address">
        <q-icon name="o_toys" class="text-grey-6" size='xs'></q-icon>
        {{this.licence}}
      </div>
      <div class=" row full-width address">
        <q-icon name="o_badge" class="text-grey-6" size='xs'></q-icon>
        {{this.person}}
      </div>
      <div class=" row full-width address">
        <q-icon name="o_place" class="text-grey-6" size='xs'></q-icon>
        {{this.address}}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import EventTypes from '../interfaces/eventTypes';

export default defineComponent({
    name: 'event-card',
    props: {
      name: {
        type: String,
      },
      date: {
        type: String,
        default: new Date().toLocaleDateString('en-US'),
        required: true,
      },
      type: {
        type: EventTypes,
      },
      licence: {
        type: String
      },
      person: {
        type: String,
      },
      address: {
        type: String,
      }
    },

  setup() {
    return {
    }
  }
})
</script>

<style lang='scss' scoped>
  .container {
    font-size: 1em;
    color: $dark;

    .address {
      font-size: .8em;
      margin: .2em;
    }

    .date {
      font-size: .8em;
      color: $grey-7
    }

    .details {
      padding: 0 1em;
      margin-top: .5em;
    }

    .q-icon {
      margin-right: .2em;
    }

    .icon {
      margin-right: .5em !important;
    }
  }
</style>