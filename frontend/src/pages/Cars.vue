<template>
  <q-page class="flex flex-start bg-grey-2">
    <div class="fit column wrap justify-start items-start content-start dashboard">
      <div class="name__container bg-primary q-pa-lg text-white">
        <div class="row">
          <div class="column col header text-weight-bold"> 
            {{ this.header }}
          </div>
          <q-icon class="column col-1 icon" name="o_directions_car"></q-icon>
        </div>
      </div>
      <div class="table__container bg-white">
        <div class="header__container row flex justify-between items-center content-center">
          <div class="title col"> Your cars </div>  
          <q-btn
            no-caps
            fit
            color="accent"
            unelevated 
            to='/cars/add/first' exact
            icon="r_add"
            class="add--button col"
            label="Add new car">

          </q-btn>
        </div>
        <q-table
          class="bg-white"
          style="width: 100%"
          flat
          no-caps
          virtual-scroll
          color="grey-5"
          :rows="rows"
          row-key="licence"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="brand" :props="props">
                {{ props.row.brand }}
              </q-td>
              <q-td key="model" :props="props">
                  {{ props.row.model }}
              </q-td>
              <q-td key="licence" :props="props">
                  {{ props.row.licence }}
              </q-td>              
              <q-td key="km" :props="props" auto-width>
                {{ this.formatKm(props.row.km)}} 
              </q-td>
              <q-td key="color" :props="props">
                <q-img 
                  v-if="props.row.color === 'Black'"
                  src="../assets/colors/black.svg"/>
                <q-img 
                  v-if="props.row.color === 'Blue'"
                  src="../assets/colors/blue.svg"/>
                <q-img 
                  v-if="props.row.color === 'Green'"
                  src="../assets/colors/green.svg"/>
                <q-img 
                  v-if="props.row.color === 'Grey'"
                  src="../assets/colors/grey.svg"/>
                <q-img 
                  v-if="props.row.color === 'Red'"
                  src="../assets/colors/red.svg"/>
                <q-img 
                  v-if="props.row.color === 'Yellow'"
                  src="../assets/colors/yellow.svg"/>
                <q-img 
                  v-if="props.row.color === 'Orange'"
                  src="../assets/colors/orange.svg"/>
                <q-img 
                  v-if="props.row.color === 'Purple'"
                  src="../assets/colors/purple.svg"/>
                <q-img 
                  v-if="props.row.color === 'White'"
                  src="../assets/colors/white.svg"/>                  
              </q-td>
              <q-td auto-width key="status" :props="props">
                <q-img 
                  v-if="props.row.status === 'RCA expired'"
                  src="../assets/statuses/rca.svg"/>
                <q-img 
                  v-if="props.row.status === 'ITP expired'"
                  src="../assets/statuses/itp.svg"/>
                <q-img 
                  v-if="props.row.status === 'Documents expired'"
                  src="../assets/statuses/docs.svg"/>
                <q-img 
                  v-if="props.row.status === 'All good'"
                  src="../assets/statuses/all.svg"/>

              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'
import Colors from '../constants/color.constants'
import { blue } from '../assets/colors/blue.svg'

export default defineComponent({
  name: 'Schedule',
   setup () {

    const server = 'http://localhost:3000';
    const user = JSON.parse(localStorage.getItem('USER'));

    const getColorBadge = (color) => {
      switch(color.toLowerCase()) {
        case 'blue': 
          return "../assets/colors/blue.svg";
      }
    }

    const formatKm = (km) => {
      return parseInt(parseInt(km)/1000) + 'K'
    }

    const colors = {
      blue: "../assets/colors/blue.svg",
      green: "../assets/colors/green.svg"
    }

    const columns = [
      {
        name: 'name',
        required: true,
        label: 'Brand',
        align: 'left',
        field: row => row.brand,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'Model', align: 'start', label: 'Model', field: 'model', sortable: true },
      { name: 'Color', align: 'start', label: 'Color', field: 'color', sortable: true, format: val => getColorBadge(val) },
      { name: 'KM', align: 'start' ,label: 'KM', field: 'km', sortable:  true, format: val => `${parseInt(parseInt(val)/1000)}K` },
      { name: 'Status', label: 'Status', field: 'status', sortable: true },
      { name: 'Licence plate', label: 'Licence plate', field: 'licence', sortable: true },
    ]

    let rows = ref([]);

    const getCarStatus = (car) => {
      let status = '';
      if (new Date(car.itp).getTime() < new Date().getTime() && new Date(car.rca).getTime() < new Date().getTime())
        status = 'Documents expired'
      else if (new Date(car.itp).getTime() < new Date().getTime()) {
        status = 'ITP expired'
      } else if (new Date(car.rca).getTime() < new Date().getTime()) {
        status = 'RCA expired'
      } else {
        status = 'All good';
      }

      return status;
    }

    axios
      .get(`${server}/api/cars/all/${user.id}`, {
        headers: {
          "authorization": localStorage.getItem('AUTH_TOKEN')
        }
      })
      .then((res) => {
        res.data.map(car => {
          rows.value.push({
            brand: car.brand,
            model: car.model,
            licence: car.licence,
            km: car.km,
            color: car.color,
            status: getCarStatus(car),

          })
        })
      })
      .catch((err) => {
        $q.notify({
          progress: true,
          message: `No cars found!`,
          color: 'negative',
          actions: [
            { label: 'Ok', color: 'white', handler: () => { /* ... */ } }
          ]
        })
      })

    let selectedCar = ref();

    return {
      header: ref('Hello, ' + user.username),
      columns,
      rows,
      selectedCar,
      formatKm,
      getColorBadge,
      colors,
      blue
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

  .icon {
    font-size: 2em;
  }

  .header {
    font-size: 2em;
  }

  .table__container {
    margin-top: 1.5em;
    width: 100%;
    border-radius: 22px;
    padding: 1em;
  }

  .header__container {
    padding: 1em;

    .title {
      font-size: 1.2em;
    }

    .add--button {
      border-radius: 7px;
      font-size: .8em;
      padding: .5em;
    }
  }

  .q-table__container {
    padding: 2em;
  }

  .q-img {
    width: 5em;
  }

  .q-table {
    font-size: 1em;
  }

  .q-btn {
    width: 50%
  }

</style>
