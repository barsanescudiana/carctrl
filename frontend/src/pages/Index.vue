<template>
  <q-page class="flex flex-start bg-grey-2">
     <div class="fit column wrap justify-center items-start content-start dashboard">
       <div class="name__container bg-primary q-pa-lg text-white">
         <div class="row">
            <div class="column col text-h3 text-weight-bold"> 
              {{ this.header }}
            </div>
            <q-icon class="column col-1" name="o_cottage" size="xl"></q-icon>
         </div>
       </div>
       <div class="carousel__container fit row wrap justify-center items-center content-center bg-grey-2">
        <q-responsive ratio="1.5" class="col bg-grey-2" style="min-height: 25em; max-width: 40em;">
          <q-carousel
            v-model="slide"
            transition-prev="scale"
            transition-next="scale"
            swipeable
            animated
            control-color="accent"
            navigation
            padding
            arrows
            :offset="[16, 8]"
            class="column col rounded-borders bg-grey-2"
          >
            <q-carousel-slide 
              v-for="car in cars" 
              :key="car.licence" 
              :name=cars.indexOf(car).toString()
              class="slider justify-center items-center content-center bg-grey-2">
              <CarCard v-bind:car=car></CarCard>
            </q-carousel-slide>
          </q-carousel>
        </q-responsive>
      </div>
     </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import CarCard from '../components/carCard.vue'
import EventCard from '../components/eventCard.vue'
import axios from 'axios';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'PageIndex',
  components: {
    CarCard,
  },
  setup () {
    const $q = useQuasar();  
    const user = JSON.parse(localStorage.getItem('USER'));
    const cars = ref([]);
    const server = 'http://localhost:3000';

    axios.get(`${server}/api/cars/recent/${user.id}`, {
      headers: {
        'authorization': localStorage.getItem('AUTH_TOKEN')
      }
    }).then((res) => {
      handleCars(res.data);
    })

    const handleCars = (carsArray) => {
      carsArray.map((car) => {
        car.rca = new Date(car.rca).toUTCString();
        car.itp = new Date(car.itp).toUTCString();
        cars.value.push(car);
      })
    }

    const columns = [
      { name: 'Licence plate', label: 'Licence plate', field: 'licence', sortable: true },
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
      { name: 'Color', align: 'start', label: 'Color', field: 'color', sortable: true },
      { name: 'KM', align: 'start' ,label: 'KM', field: 'km', sortable:  true, format: val => `${parseInt(parseInt(val)/1000)}K` },
      
    ]
    
    return {
      cars,
      text: ref(''),
      user: ref(user),
      header: ref('Hello, ' + user.username),
      slide: ref('0'),
      columns,
      pagination: {
        page: 1,    
        rowsPerPage: 0 // 0 means all rows    
      },
    }
  }
})
</script>

<style lang="scss" scoped>
  .name__container {
    width: 100%;
    border-radius: 22px;
    height: fit-content;
    max-height: 25vh;
  }

  .carousel__container {
    max-width: 100%;
    width: fit-content
  }

  .dashboard {
    padding-top: 1.5em;
    padding-left: 1.5em;
  }

  .title {
    font-size: 1.5em;
    color: $dark;
    font-weight: bold;
    margin-bottom: 1em;
  }

  .expansion-item {
    display: none;
  }

  @media (max-width: $breakpoint-xs-max) {
    .dashboard {
      padding: 1.3em;
    }
    .q-icon {
      width: 20%
    }

    .carousel__container {
      display: flex;
    }

    .recent__table {
      background-color: white;
      padding: 1em;
      margin-top: 1em;
      border-radius: 15px;
    }

    .q-responsive {
      .q-responsive__content {
        .q-panel-parent {
          background-color: $grey-2 !important;
        }
      }    
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

  @media(max-width: $breakpoint-md-min) {

  }
</style>