<template>
  <div class="container fit row wrap justify-evenly items-center content-center bg-grey-2">
    <div :class="car.color.toLowerCase() === 'white' ? 'container-card bg-blue-grey-2' : 'container-card bg-white'">
      <div class="fit row wrap justify-start items-center content-start q-mb-lg">
        <q-icon name="o_toys" :class="car.color.toLowerCase() === 'black' ? 'car__icon column col-2 text-dark' : 'car__icon column col-2 text-' + car.color.toLowerCase()" ></q-icon>
        <div class="licence__container fit column col wrap justify-start items-start content-start text-grey-5">
          <div :class="car.color.toLowerCase() === 'black' ? 'title fit row text-weight-bold text-justify text-center text-dark' : 'title fit row text-weight-bold text-justify text-center text-' + car.color.toLowerCase()"> {{ car.licence }} 
            <q-icon
              id="infoIcon" 
              name="o_info" 
              :class="expired ? 'text-negative info items-center content-center justify-center column col-md-1 ' : 'text-positive info items-center column col-md-1 '"
              >
              <q-tooltip class="tooltip bg-grey-3 text-dark">
                {{ new Date(car.itp).getTime() - new Date().getTime() > 0 ? `ITP expiring on ${new Date(car.itp).toLocaleDateString('en-US')}` : `ITP expired on ${new Date(car.itp).toLocaleDateString('en-US')}`}}
                <br/>
                {{ new Date(car.rca).getTime() - new Date().getTime() > 0 ? `RCA expiring on ${new Date(car.rca).toLocaleDateString('en-US')}` : `\n RCA expired on ${new Date(car.rca).toLocaleDateString('en-US')}`}}
              </q-tooltip>
            </q-icon>
          </div>
          <div class="subtitle text-dark"> {{ car.brand }} {{ car.model }} </div>
        </div>
        
      </div>
      <div class="info__container row nowrap justify-start items-start content-start text-dark">
        <div class="fit column col text-dark">
          <span class="fit row wrap justify-start items-center content-start q-mb-md">
            <q-icon name="o_route" class="text-grey-5 icon-details" ></q-icon>
            <div> <strong> {{ trips }} </strong> trips registered </div>
          </span>
          <span class="fit row nowrap justify-start items-center content-start q-mb-md">
            <q-icon name="o_bolt" class="text-grey-5 icon-details"></q-icon>
            <div> <strong>{{car.avgConsumption }} L</strong> average consumption</div>
          </span>
        </div>
        <div class="fit column col text-dark">
        <span class="fit row wrap justify-start items-center content-start q-mb-md">
            <q-icon name="o_add_road" class="text-grey-5 icon-details" ></q-icon>
            <div> <strong>{{ car.km }} KM</strong> so far</div>
          </span>
          <span
            v-if="last" 
            class="fit row wrap justify-start items-center content-start">
            <q-icon name="o_schedule" class="text-grey-5 icon-details" ></q-icon>
            <div> Last ride on  <strong>{{ last }} </strong></div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { date, useQuasar } from 'quasar'

export default defineComponent({
    name: 'CarCard',
    props: {
      car: {
        type: Object,
        required: true,
      }
    },

  setup(props) {

    const $q = useQuasar();
    const server = 'http://localhost:3000'
    const user = JSON.parse(localStorage.getItem('USER'))

    let expired = ref(false);
    let trips = ref(0);
    let last = ref(null);

    if (new Date(props.car.rca).getTime() - new Date().getTime() < 0 || new Date(props.car.itp).getTime() - new Date().getTime() < 0) {
      expired.value = true;
    }

    axios
      .get(`${server}/api/rides/all/${user.id}/${props.car.id}`, {
        headers: {
          'authorization': localStorage.getItem('AUTH_TOKEN')
        }
      })
      .then((res) => {
        trips.value = res.data.length;
      })
      .catch((err) => {
        $q.notify({
          progress: true,
          message: `No rides registered for this car yet!`,
          color: 'negative',
          actions: [
            { label: 'Ok', handler: () => { /* ... */ } }
          ]
        })
      })

    axios
      .get(`${server}/api/rides/last/${user.id}/${props.car.id}`, {
        headers: {
          'authorization': localStorage.getItem('AUTH_TOKEN')
        }
      })
      .then((res) => {
        last.value = date.formatDate(new Date(res.data).toLocaleDateString('en-US'), 'DD/MM/YYYY');
      })
      .catch((err) => {
        $q.notify({
          progress: true,
          message: `No rides registered for this car yet!`,
          color: 'negative',
          actions: [
            { label: 'Ok', color: 'white', handler: () => { /* ... */ } }
          ]
        })
      })

return {
      expired,
      trips,
      last
    }
  }
})
</script>

<style lang='scss' scoped>
  .container {
    border-radius: 22px;
    padding: 2em;
    min-width: 40vw;
    width: fit-content;
  }

  .container-card {
    border: .2em solid $accent-25;
    border-radius: 22px;
    padding: 2em;
    min-width: 25em;
    width: fit-content;
  }

  #infoIcon {
    cursor: pointer;
    font-size: .5em !important;
    margin-left: .2em;
  }

  .tooltip {
    border-radius: 5px;
    border: .5em solid black;
    border-color: $dark;
    font-size: 14px;
  }

  .title {
    font-size: 2em;
  }

  .subtitle {
    font-size: 1em;
  }

  .car__icon {
    font-size: 3em !important;
    padding: .2em;
    margin-right: .3em;
    width: 1em;
    height: 1em;
    background-color: #2c3e5010;
    border-radius: 15px;
  }

  .q-icon {
    font-size: 2em;
  }

  .icon-details {
    font-size: 1.5em;
    margin-right: .5em;
  }

  .info__container {
    width: 100%;
  }

  
  @media(max-width: $breakpoint-md-min) {
    .container {
      padding: 0 !important;
      padding-right: 2em !important;
      font-size: 12px;
      width: 40em;
    }

    .container-card {
      border: .2em solid $accent-25;
      border-radius: 22px;
      padding: 2em;
      min-width: 25vw;
      width: fit-content;
    }
  }

   @media (max-width: $breakpoint-xs-max) {
    .container {
      padding: 1em !important;
      font-size: 12px;
    }

    .title {
      font-size: 1.2em;
      margin-right: .2em;
    }

    .subtitle {
      font-size: .7em;
    }

    .q-icon {
      font-size: 1.3em;
    }

    .car__icon {
      font-size: 2.5em !important;
      padding: .2em;
      margin-right: .3em;
      width: 1em;
      height: 1em;
      background-color: #2c3e5010;
      border-radius: 10px;
    }

     #infoIcon {
       margin-top: 1em;
    }
  }

</style>