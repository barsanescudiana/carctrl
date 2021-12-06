<template>
  <q-page class="page bg-grey-2">
    <div>
      <add-navigation
        firstIcon="r_check_circle"
        secondIcon="r_check_circle_outline">
      </add-navigation>

      <div class="form__container text-dark">
        <q-form ref='addForm'>
          <div class="section">
            <div class='title text-weight-bold '> Engine information </div>
            <div class="row wrap justify-between items-start content-start ">
              <div class="form--fields col">
                <div class="row">
                  <div class="col col-md">
                      <div class="label"> Fuel </div>
                      <q-select 
                        outlined 
                        v-model="fuel"
                        :options="fuelOptions" 
                        dense
                        lazy-rules
                        :rules="[ 
                          value => value && value.length > 0 || 'Fuel type is required!', 
                        ]"
                      />
                    </div>
                  <div class="col col-md">
                    <div class="label"> Tank capacity </div>
                    <q-input 
                      outlined 
                      v-model="tankCapacity"
                      type='number' 
                      min="0"
                      dense
                      lazy-rules
                      :rules="[ 
                        value => value && value.length > 0 || 'Tank capacity is required!', 
                      ]"
                    />  
                  </div>
                </div>
                <div class="row">
                  <div class="col col-md">
                      <div class="label"> Engine output </div>
                      <div class="row justify-between">
                        <q-input
                          class="col-5" 
                          outlined 
                          v-model="engineOutput"
                          type='number'
                          min="0" 
                          dense
                          lazy-rules
                          :rules="[ 
                            value => value && value.length > 0 || 'Optput value is required!', 
                          ]"
                        />
                        <q-select
                          class="col-6" 
                          outlined 
                          v-model="outputMeasure"
                          :options="measureOptions" 
                          dense
                          lazy-rules
                          :rules="[ 
                            value => value && value.length > 0 || 'Measurement unit is required!', 
                          ]"
                        /> 
                      </div>
                    </div>
                  <div class="col col-md">
                    <div class="label"> Average consumption </div>
                    <q-input 
                      outlined 
                      v-model="avg"
                      type='number'
                      min='0' 
                      dense
                      lazy-rules
                      :rules="[ 
                        value => value && value.length > 0 || 'Average conspumtion is required!', 
                      ]"
                    />  
                  </div>
                </div>
                <div class="row">
                  <div class="col col-md">
                    <div class="label"> KM </div>
                    <q-input 
                      outlined 
                      v-model="km"
                      type='number'
                      min='0'
                      dense
                      lazy-rules
                      :rules="[ 
                        value => value && value.length >= 0 || 'Number of KM is required!', 
                      ]"
                    />
                  </div>
                </div>


              </div>
              <div class="summary col bg-grey-1">
                <div class="title text-primary text-weight-bold"> Summary </div>
                <div class="item row">
                  <q-icon name="ion-git-branch" color="grey-5"></q-icon>
                  <div class="text-weight-bold"> {{ fuel }} </div>
                </div>
                <div class="item row">
                  <q-icon name="o_shopping_bag" color="grey-5"></q-icon>
                  <div class="row"> {{ "Tank capacity of " + tankCapacity + " cmc"}}</div>
                </div>
                <div class="item row">
                  <q-icon name="o_offline_bolt" color="grey-5"></q-icon>
                  <div class="row"> {{ "Engine output of " + engineOutput + " " + outputMeasure}}</div>
                </div>
                <div class="item row">
                  <q-icon name="o_local_gas_station" color="grey-5"></q-icon>
                  <div class="row"> {{ "Average consumption of " + avg + " L/100KM" }}</div>
                </div>
                <div class="item row">
                  <q-icon name="o_edit_road" color="grey-5"></q-icon>
                  <div class="row"> {{ "A total of " + km + " KM so far" }}</div>
                </div>
              </div>
              </div>
          </div>

            <div class="row wrap justify-between items-end content-end footer-nav ">
              <div
                @click="handleBackSection"
                class="button bg-white row justify-center items-center content-center">
                <q-icon color="primary" name="r_navigate_before" class="back--icon"></q-icon>
                <div class="text-right">
                  <div class="text-grey-5"> Go to previous section </div>
                  <div class="text-dark"> Car information</div>
                </div>
              </div>
              <div
                @click="handleNextSection"
                class="button bg-primary row justify-center items-center content-center">
                <div>
                  <div class="text-white"> Complete form </div>
                </div>
                <q-icon color="white" name="r_navigate_next" class="next--icon"></q-icon>
              </div>
            </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import  AddNavigation  from '../components/addNavigation.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useQuasar } from 'quasar'

export default {
  components: {
    AddNavigation,
  },

  setup() {
    // inside of a Vue file

    const $q = useQuasar()

    const router = useRouter();
    const user = JSON.parse(localStorage.getItem('USER'))
    const server = 'http://localhost:3000'

    const fuelOptions = ['Petrol', 'Diesel', 'GPL']
    const measureOptions = ['hp', 'kW']

    let tankCapacity = ref(0);
    let fuel = ref(fuelOptions[0]);
    let engineOutput = ref(0);
    let outputMeasure = ref(measureOptions[0]);
    let avg = ref(0);
    let km = ref(0);

    let addForm = ref();

    let car = {};

    if(JSON.parse(localStorage.getItem('TO_ADD_SECOND'))) {
      car = JSON.parse(localStorage.getItem('TO_ADD_SECOND'));
      tankCapacity.value = parseInt(car.tankCapacity);
      fuel.value = fuelOptions[fuelOptions.indexOf(car.fuel)];
      engineOutput.value = parseInt(car.engineOutput);
      outputMeasure.value = car.outputMeasure;
      avg.value = parseFloat(car.avg);
      km.value = parseFloat(car.km);
    }

    const handleBackSection = () => {
      car = {
        tankCapacity: parseInt(tankCapacity.value),
        fuel: fuel.value,
        engineOutput: parseInt(engineOutput.value),
        outputMeasure: outputMeasure.value,
        avg: parseFloat(avg.value),
        km: parseInt(km.value),
      }
      
      localStorage.setItem('TO_ADD_SECOND', JSON.stringify(car));
      router.push('/cars/add/first')
    }

    const handleNextSection = () => {
      let carToAdd = JSON.parse(localStorage.getItem("TO_ADD"));
      carToAdd = {
        ...carToAdd,
        tankCapacity: parseInt(tankCapacity.value),
        fuel: fuel.value,
        engineOutput: parseInt(engineOutput.value),
        engineOutputMeasure: outputMeasure.value,
        avgConsumption: avg.value,
        km: parseInt(km.value),
        userId: user.id,
      }

      axios
        .post(`${server}/api/cars/addOne`, 
          carToAdd, {
            headers: {
              "authorization": localStorage.getItem('AUTH_TOKEN')
            }
          }
        )
        .then((res) => {
          let carDetails = " " + carToAdd.brand.charAt(0).toUpperCase() + carToAdd.brand.slice(1) + " " + carToAdd.model.charAt(0).toUpperCase() + carToAdd.model.slice(1) + " - " + carToAdd.licence.toUpperCase() 
          localStorage.setItem('DETAILS', carDetails)
          $q.notify({
            progress: true,
            message: 'Car added successfully!',
            color: 'positive'
          })
          setTimeout(() => {
            router.push('/cars/add/success')
          }, 5000)
          
        })
        .catch((err) => {
          $q.notify({
            progress: true,
            message: 'Car already added! You cannot add more cars with the same licence plate!',
            color: 'negative'
          })
        })
      
    }

    return {
      tankCapacity,
      fuel,
      fuelOptions,
      engineOutput,
      outputMeasure,
      measureOptions,
      avg,
      km,
      addForm,
      handleNextSection,
      handleBackSection,
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
      margin-top: 1em;
      padding: 1em;
      border-radius: 22px;
      background-color: white;
      
    }

    .title {
      font-size: 1.3em;
      margin-bottom: 1em;
      padding-top: .5em;
      padding-left: .5em;
    }

    .col {
      padding: .5em;
    }

    .button {
      padding: .8em;
      margin-top: 1em;
      border-radius: 10px;
      cursor: pointer;
      min-height: 4.5em;
    }

    .next--icon {
      font-size: 1.5em;
    }

    .back--icon {
      font-size: 1.5em;
      margin-right: .2em;
    }

    .info {
      font-size: .7em;
    }

    .q-tooltip {
      background-color: $grey-5;
    }

    .label {
      padding: .2em;
      font-size: .8em;
    }

    .summary {
      padding: .5em;
      border-radius: 22px;
      margin: 1em;

      .title {
        margin-bottom: .8em;
      }

      .item {
        margin-left: 1em;
        margin-top: 1em;
        font-size: .9em;

        &:last-child {
          margin-bottom: 2em;
        }
        
        .q-icon {
          font-size: 1.7em;
          margin-right: .3em;
        }
      }
    }
  }

  @media (max-width: $breakpoint-sm-max) {
    .page {
      padding: 1em !important;
    }

    .summary {
      display: none;
    }

    .button {
      padding: .8em;
      margin-top: 1em;
      border-radius: 10px;
      cursor: pointer;
      min-height: 2.5em;
      font-size: .8em;
    }
  }

</style>