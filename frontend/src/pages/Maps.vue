<template>
  <q-page class="flex flex-start bg-grey-2">
    <div class="fit column wrap justify-start items-start content-start dashboard">
      <div class="name__container bg-primary q-pa-lg text-white">
        <div class="row">
          <div class="column col header text-weight-bold"> 
            {{ this.header }}
          </div>
          <q-icon class="column col-1 icon" name="o_map"></q-icon>
        </div>
      </div>
      <div class=" full-width justify-between items-start content-center column ">
        <div class="expansion-item bg-white row">
          <q-expansion-item
            v-bind:default-opened="open === 'map'"
            class="item text-dark"
            show-if-above
            width="350"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon color="grey-6" name="o_map" />
              </q-item-section>
              <q-item-section>
                Map
              </q-item-section>
            </template>
            <q-card>
              <q-card-section
                class="bg-white map__container">
                <iframe
                  class="map" 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5698.653722182829!2d26.102157!3d44.426457!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xafe2420b55c9bc77!2sBucharest%20Fountains!5e0!3m2!1sro!2sus!4v1638378646841!5m2!1sro!2sus" 
                  height="450" 
                  style="border:0;" 
                  allowfullscreen="" 
                  loading="lazy">
                </iframe>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          </div>

      </div>

      <div class=" full-width justify-between items-start content-center column">
        <div class="expansion-item bg-white row ">
          <q-expansion-item
            v-bind:default-opened="open === 'trip'"
            class="item text-dark"
            show-if-above
            width="350"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon color="grey-6" name="o_add_road" />
              </q-item-section>

              <q-item-section>
                Add new trip
              </q-item-section>
            </template>
            <q-card>
              <q-card-section
                class="bg-white">
                <q-form
                  @submit.prevent.stop="handleNewTrip">
                  <div class="row">
                    <div class="col col-md first">
                      <div class="label"> To </div>
                      <q-input 
                        outlined 
                        v-model="to" 
                        dense
                        lazy-rules
                        :rules="[ 
                          value => value && value.length > 0 || 'Destination is required!', 
                        ]"
                      />  
                    </div>
                    <div class="col col-md">
                      <div class="label"> From </div>
                      <q-input 
                        outlined 
                        v-model="from" 
                        dense
                        lazy-rules
                        :rules="[ 
                          value => value && value.length > 0 || 'Starting location is required!', 
                        ]"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col col-md first">
                      <div class="label"> Number of km </div>
                      <q-input 
                        outlined 
                        v-model="km" 
                        dense
                        lazy-rules
                        type='number'
                        min='0'
                        :rules="[ 
                          value => value && value.length > 0 || 'Number of km is required!', 
                        ]"
                      />
                    </div>
                    <div class="col col-md">
                      <div class="label"> Car licence plate </div>
                      <q-select 
                        outlined
                        dense 
                        v-model="licence" 
                        :options="licenceOptions" 
                        class="licence-select" />
                    </div>
                  </div>


                <div class="row">
                  <div class="col">
                  <div class="label label--last"> Pick the date of your trip </div>
                    <q-input 
                      outlined
                      dense 
                      v-model="selectedDate" 
                      mask="date"
                      :rules="[
                        'date'
                      ]">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                            <q-date 
                              v-model="selectedDate"
                              :options="accidentOptions">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>          
                  </div>                   
                </div>
                <div class="row">
                  <q-btn
                    no-caps
                    rounded
                    color='accent'
                    icon='r_add'
                    type='sumbit'
                    label='Save trip'>
                  </q-btn>
                </div>
                </q-form>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>

        <div class="expansion-item bg-white row">
          <q-expansion-item
            v-bind:default-opened="open === 'place'"
            class="item text-dark"
            show-if-above
            width="350"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon color="grey-6" name="o_home_work" />
              </q-item-section>

              <q-item-section>
                Add new place
              </q-item-section>
            </template>
            <q-card>
              <q-card-section
                class="bg-white">
                  <q-form
                    @submit.prevent.stop="handleNewPlace">

                    <div class="row col-md ">
                      <div class="col first">
                      <div class="label"> Name </div>
                        <q-input 
                          outlined 
                          v-model="name" 
                          dense
                          lazy-rules
                          :rules="[ 
                            value => value && value.length > 0 || 'Name is required!', 
                          ]"
                        />  
                      </div>
                      <div class="col">
                        <div class="label"> Place type </div>
                          <q-select
                            class="col-6" 
                            outlined 
                            v-model="type"
                            :options="typeOptions" 
                            dense
                            lazy-rules
                            :rules="[ 
                              value => value && value.length > 0 || 'Place type unit is required!', 
                            ]"
                          /> 
                      </div>
                    </div>

                    <div class="row">
                      <div class="col">
                        <div class="label"> Address </div>
                        <q-input 
                          outlined 
                          v-model="address" 
                          dense
                          lazy-rules
                          :rules="[ 
                            value => value && value.length > 0 || 'Address is required!', 
                          ]"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <q-btn
                        no-caps
                        rounded
                        color='accent'
                        icon='r_add'
                        label='Save place'
                        type='submit'>
                      </q-btn>
                    </div>
                  </q-form>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
      <div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useQuasar, date } from 'quasar';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router'
import VueGoogleMaps from "@point-hub/vue-google-maps";

export default defineComponent({
  name: 'Schedule',
  
   setup () {

    const server = 'http://localhost:3000'
    const user = JSON.parse(localStorage.getItem('USER'))
    const typeOptions = ['Home', 'Work', 'Store', 'Hospital', 'Other']
    const router = useRouter();
    const route = useRoute();
    const open = ref(route.params.open)

    let to = ref('');
    let from = ref('');

    let licenceOptions = ref([]);
    let licence = ref('');
    let km = ref(0);

    let name = ref('');
    let address = ref('');
    let type = ref(typeOptions[0]);

    let cars = [];

    axios
      .get(`${server}/api/cars/licences/${user.id}`, {
        headers: {
          "authorization": localStorage.getItem('AUTH_TOKEN')
        }
      })
      .then((res) => {
        res.data.map(item => {
          licenceOptions.value.push(item.licence);
        })
        licence.value = licenceOptions.value[0];
        localStorage.setItem('CARS', JSON.stringify(res.data));
      })
      .catch((err) => {
      })

    cars = JSON.parse(localStorage.getItem('CARS'))

    let formattedDate = date.formatDate(Date.now(), 'YYYY/MM/DD');
    let selectedDate = ref(formattedDate);

    const handleNewPlace = () => {
      axios
        .post(`${server}/api/places/addOne`, {
          name: name.value,
          address: address.value,
          type: type.value.toUpperCase(),
          userId: user.id
        }, {
          headers: {
            "authorization": localStorage.getItem('AUTH_TOKEN')
          }
        })
      .then((res) => {
        router.go()
        $q.notify({
          progress: true,
          message: `${name.value} successfully added!`,
          color: 'positive',
          actions: [
            { label: 'Amaizing', color: 'white', handler: () => { /* ... */ } }
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

    if(localStorage.getItem('TO')) {
      to.value = localStorage.getItem('TO');
    }

    const handleNewTrip = () => {
      axios
        .post(`${server}/api/rides/addOne`, {
          from: from.value,
          to: to.value,
          km: km.value,
          date: new Date(selectedDate.value).toUTCString(),
          carId: cars.find(car => car.licence === licence.value).id,
          userId: user.id
        }, {
          headers: {
            'authorization': localStorage.getItem('AUTH_TOKEN')
          }
        })
        .then((res) => {
          router.go()
          $q.notify({
            progress: true,
            message: `${name.value} successfully added!`,
            color: 'positive',
            actions: [
              { label: 'Amaizing', color: 'white', handler: () => { /* ... */ } }
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

      axios
        .patch(`${server}/api/cars/edit/km`, {
          id: cars.find(car => car.licence === licence.value).id,
          km: parseInt(km.value)
        }, {
          headers: {
            'authorization': localStorage.getItem('AUTH_TOKEN')
          }
        })
        .then((res) => {
          router.go()
          $q.notify({
            progress: true,
            message: `${name.value} successfully added!`,
            color: 'positive',
            actions: [
              { label: 'Amaizing', color: 'white', handler: () => { /* ... */ } }
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

      if (localStorage.getItem('TO')) {
        localStorage.removeItem('TO');
      }
    }

    return {
      header: ref('Hello, ' + user.username),
      to,
      from,
      licenceOptions,
      licence,
      km,
      selectedDate,
      name,
      address,
      type,
      typeOptions,
      handleNewPlace,
      handleNewTrip,
      open,
    }
  }

})
</script>

<style lang="scss" scoped>

  .dashboard {
    padding: 1.5em;
    width: 100%;
  }
  .name__container {
    width: 100%;
    border-radius: 22px;
    height: fit-content;
    max-height: 25vh;
  }

  .map__container {
    width: 100%;
    padding: 1.5em;
    border-radius: 22px;
  }

  .map {
    width: 100%;
  }

  .icon, .header {
    font-size: 2em;
  }

    .expansion-item {
      display: flex;
      margin-top: 1em;
      border-radius: 15px;
      padding: 1em;
      width: 100%;

      .item {
        width: 100%;
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

    .label {
      padding: .3em;

    }

    .q-btn {
      margin: .3em;
      height: 3em;
    }

    .first {
      margin-right: 1em;
    }
  

  @media( min-width: $breakpoint-sm-max) {
      
  .expansion-item {
    display: flex;
    margin-top: 1em;
    border-radius: 15px;
    padding: 1em;

    .item {
      width: 100%;
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
    }

    @media (max-width: $breakpoint-sm-max) {
    .login-image {
      padding: 0px !important;
    }

    .map {
      height: 300px;
    }

    .expansion-item {
      display: flex;
      margin-top: 1em;
      border-radius: 15px;
      max-width: 340px;
      padding: 1em;
      width: 100%;

      .item {
        width: 100%;
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
  }
</style>
