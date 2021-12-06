<template>
  <div class="container fit row wrap justify-evenly items-center content-center bg-white">
    <q-icon 
      v-bind:name=this.placeType size="sm" class="q-pr-md col-md-1 text-primary column wrap content-center items-center justify-center"></q-icon>
    <div class=" col column wrap justify-start items-start content-start">
      <strong>{{this.name}}</strong>
      <span class="address">
        <q-icon name="o_place" class="text-grey-6"></q-icon>
        {{this.address}}
      </span>
    </div>
    <div class=" col-md-2 date column wrap content-center items-center justify-center">
      <q-btn 
        flat 
        rounded 
        color="accent"
        icon="o_add"
        @click="handleNewTrip(name)"/>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { PlaceType } from '../interfaces/placeType.interface';
import { useRouter} from 'vue-router';

export default defineComponent({
    name: 'place-card',
    props: {
      name: {
        type: String,
      },
      address: {
        type: String,
      },
      placeType: {
        type: PlaceType,
        required: true,
      }
    },

  setup() {

    const router = useRouter()
    const handleNewTrip = (name) => {
      localStorage.setItem('TO', name);
      router.push('/map/trip');
    }

    return {
      localName: ref(''),
      localAddress: ref(''),
      handleNewTrip,
    }
  }
})
</script>

<style lang='scss' scoped>
  .container {
    font-size: 1em;
    color: $dark;

    .address {
      font-size: .9em;
    }
  }
</style>