<template>
  <q-page class="flex flex-start bg-grey-2">
    <div class="fit column wrap justify-start items-start content-start dashboard">
      <div class="name__container bg-primary q-pa-lg text-white">
        <div class="row">
          <div class="column col header text-weight-bold"> 
            {{ this.header }}
          </div>
          <q-icon class="column header-icon col-1" name="o_edit_calendar"></q-icon>
        </div>

        <div class="flex flex-center justify-center content-center items-center">
          <q-select 
            outlined 
            use-chips
            emit-value
            v-model="selected" 
            :options="options"
            color="dark" 
            label-color="dark" 
            bg-color="white"
            width="20"
            label="Choose what you want to schedule..."
            class="select" />
        </div>
      </div>
      <div
        v-if="selected === 'ITP renewal' || selected === 'RCA renewal'" 
        class="form bg-white">
        <q-form
          ref='dateForm'
          @submit.prevent.stop="submitDateForm" 
          class="flex flex-start justify-start items-start content-start column wrap ">
          <q-select 
            outlined 
            v-model="licence" 
            :options="licenceOptions" 
            label="Car licence plate"
            class="licence-select" />
          <q-input
            readonly 
            outlined
            v-model="person"
            label="Person assigned"
            type="text">
          </q-input>
          <q-input
            readonly 
            outlined
            v-model="address"
            label="Location for getting document"
            type="text">
          </q-input>
          <q-input 
            outlined 
            v-model="selectedDate"
            :label="'Enter the new expiration date of your ' + selected.split(' ')[0]" 
            mask="date" 
            :rules="[
              'date'
            ]">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                  <q-date 
                    v-model="selectedDate"
                    :options="calendarOption">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-btn 
            color="accent" 
            :label="'Update ' + selected.split(' ')[0] + ' date'"
            type="submit" 
            class="btn-submit"
            no-caps/>
        </q-form>
      </div>
      <div
        v-if="selected === 'Accident'" 
        class="form bg-white">
        <q-form
          ref='accidentForm' 
          @submit="submitDateForm"
          class="flex flex-start justify-start items-start content-start row wrap">
          <q-select 
            outlined 
            v-model="licence" 
            :options="licenceOptions" 
            label="Car licence plate"
            class="licence-select" />
          <q-input 
            outlined 
            v-model="selectedDate" 
            mask="date"
            label="Pick the date of the accident" 
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
          <q-input
            outlined
            v-model="cost"
            label="Accident cost in EUR"
            type="number"
            class="cost">
          </q-input>
          <q-input
            readonly 
            outlined
            v-model="person"
            label="Person assigned"
            type="text">
          </q-input>
          <q-input
            readonly 
            outlined
            v-model="address"
            label="Location for reparations"
            type="text">
          </q-input>
          <q-btn 
            color="accent" 
            label="Register accident"
            type="submit" 
            class="btn-submit q-mt-md"
            no-caps/>
        </q-form>
      </div>
      <div
        v-if="selected === 'Service visit'" 
        class="form">
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { date } from 'quasar'
import EventTypes from '../interfaces/eventTypes'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'Schedule',
   setup () {

    const $q = useQuasar()
    const server = 'http://localhost:3000';
    const router = useRouter();
    const user = JSON.parse(localStorage.getItem('USER'))

    let person = ref('');
    let address = ref('');

    let formattedDate = date.formatDate(Date.now(), 'YYYY/MM/DD');
    let selectedDate = ref(formattedDate);
    let calendarOption = (selectedDate) => {
      return selectedDate >= date.formatDate(Date.now(), 'YYYY/MM/DD');
    }

    let accidentOptions = (selectedDate) => {
      return selectedDate <= date.formatDate(Date.now(), 'YYYY/MM/DD');
    }

    let licenceOptions = ref([]);
    let licence = ref('');
    let selected = ref(null);

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
        $q.notify({
          progress: true,
          message: `No cars tp choose from!`,
          color: 'negative',
          actions: [
            { label: 'Ok', color: 'white', handler: () => { /* ... */ } }
          ]
        })      
      })

    let cost = ref();
    let selectedCar = ref(null)

    axios.get(`${server}/api/mechanic/generate`, {
      headers: {
        "authorization": localStorage.getItem('AUTH_TOKEN')
      }      
    })
      .then((res) => {
        person.value = res.data.firstName + ' ' + res.data.lastName;
        address.value = res.data.address;
      })
      .catch((err) => {
        $q.notify({
          progress: true,
          message: `No mechanic available at the moment!`,
          color: 'negative',
          actions: [
            { label: 'Ok', color: 'white', handler: () => { /* ... */ } }
          ]
        })
      })

    const submitDateForm = () => {
      let cars = JSON.parse(localStorage.getItem('CARS'));
      selectedCar.value = cars.find(item => item.licence === licence.value)

      if (selected.value.includes('RCA')) {
        axios
          .patch(`${server}/api/cars/updateDate`, {
            carId: selectedCar.value.id,
            rca: new Date(selectedDate.value).toUTCString()
          }, {
            headers: {
              "authorization": localStorage.getItem('AUTH_TOKEN')
            }            
          })
          .then((res) => {
            $q.notify({
              progress: true,
              message: 'RCA expiration date updated successfully!',
              color: 'positive'
            })
            setTimeout(() => {
              router.push('/')
            }, 6000)
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
          .post(`${server}/api/events/addOne`, {
            carLicence: selectedCar.value.licence,
            name: selected.value,
            userId: user.id,
            date: new Date(selectedDate.value).toUTCString(),
            type: EventTypes.RCA,
            person: person.value,
            address: address.value
          }, {
            headers: {
              "authorization": localStorage.getItem('AUTH_TOKEN')
            }
          })
          .then((res) => {
            router.push('/')
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
      } else if (selected.value.includes('ITP')) {
        axios
          .patch(`${server}/api/cars/updateDate`, {
            carId: selectedCar.value.id,
            itp: new Date(selectedDate.value).toUTCString()
          }, {
            headers: {
              "authorization": localStorage.getItem('AUTH_TOKEN')
            }
          })
          .then((res) => {
            $q.notify({
              progress: true,
              message: 'ITP expiration date updated successfully!',
              color: 'positive'
            })
            setTimeout(() => {
              router.push('/')
            }, 6000)

          })
          .catch((err) => {
            $q.notify({
              progress: true,
              message: `Something went wrong!`,
              color: 'negative',
              actions: [
                { label: 'Ok', color: 'white', handler: () => { /* ... */ } }
              ]
            })          })
        axios
          .post(`${server}/api/events/addOne`, {
            carLicence: selectedCar.value.licence,
            name: selected.value,
            userId: user.id,
            date: new Date(selectedDate.value).toUTCString(),
            type: EventTypes.ITP,
            person: person.value,
            address: address.value
          }, {
            headers: {
              "authorization": localStorage.getItem('AUTH_TOKEN')
            }
          })
          .then((res) => {
            router.push('/')
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
      } else {
        axios
          .post(`${server}/api/events/addOne`, {
            carLicence: selectedCar.value.licence,
            name: selected.value,
            userId: user.id,
            date: new Date(selectedDate.value).toUTCString(),
            type: EventTypes.ACCIDENT,
            cost: cost.value,
            person: person.value,
            address: address.value
          }, {
            headers: {
              "authorization": localStorage.getItem('AUTH_TOKEN')
            }            
          })
          .then((res) => {
            $q.notify({
              progress: true,
              message: 'Accident registered successfully!',
              color: 'positive'
            })
            setTimeout(() => {
              router.push('/')
            }, 6000)

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
    }

    return {
      selectedCar,
      selectedDate,
      calendarOption,
      accidentOptions,
      licenceOptions,
      licence,
      cost,
      submitDateForm,
      header: ref('Hello, ' + user.username),
      selected,
      options: [
        'RCA renewal', 'ITP renewal', 'Accident'
      ],
      dateForm: ref(null),
      accidentForm: ref(null),
      person, 
      address
    }
  }

})
</script>

<style lang="scss" scoped>

  .dashboard {
    padding: 1.5em;
    width: 100%;

  }

  .header {
    font-size: 2em;
  } 

  .header-icon {
    font-size: 2em;
  }

  .name__container {
    width: 100%;
    border-radius: 22px;
    height: fit-content;
    max-height: 25vh;
  }

  .select {
    width: 50% !important;
  }

  .select {
    margin-top: 2em !important;
    font-size: 1em;
    margin: 1em;
  }

  .form {
    width: 100%;
    margin-top: 2em;
    padding: 2em;
    border-radius: 22px;
    color: $dark;
    font-size: 1em;
  }

  .q-field {
    width: 100%;
    margin-top: 1em;
  }

  .btn-submit {
    height: min-content;
    border-radius: 10px;
    font-size: 1em;
  }

  .cost {
    margin-top: 0em !important;
  }


    @media (max-width: $breakpoint-sm-max) {

    .q-field {
      margin-top: 1em;
      width: 100%;

      &__control {
        width: 100%;
        
      }
    }

    .cost {
      margin-bottom: 1em !important;
    }

    .select {
      width: 90% !important;
      font-size: .8em;
    }

    .btn-submit {
      margin-left: 0em !important;
      height: min-content;
      border-radius: 10px;
      margin: .5em;
      font-size: 1em;

      &-accident {
        margin-top: 1em;
      }
  }
  }
</style>
