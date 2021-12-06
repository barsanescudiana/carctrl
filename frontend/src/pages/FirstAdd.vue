<template>
  <q-page class="page bg-grey-2">
    <div>
      <add-navigation
        firstIcon="r_check_circle_outline"
        secondIcon="r_check_circle_outline">
      </add-navigation>

      <div class="form__container text-dark">
        <q-form ref='addForm'>
          <div class="section">
            <div class='title text-weight-bold '> Car information </div>
            <div class="full-width row wrap justify-between items-start content-start ">
              <div class="col col-md">
                <div class="label"> Brand </div>
                <q-input 
                  outlined 
                  v-model="brand" 
                  dense
                  lazy-rules
                  :rules="[ 
                    value => value && value.length > 0 || 'Brand is required!', 
                  ]"
                />  
              </div>
              <div class="col col-md">
                <div class="label"> Model </div>
                <q-input 
                  outlined 
                  v-model="model" 
                  dense
                  lazy-rules
                  :rules="[ 
                    value => value && value.length > 0 || 'Model is required!', 
                  ]"
                />
              </div>
            </div>
            <div class="full-width row wrap justify-between items-start content-start ">
              <div class="col col-md-7">
                <div class="label"> Color <q-icon name="o_info" color="grey-5">
                    <q-tooltip anchor="center right" self="center left" :offset="[10, 10]" max-width="40em">
                      Default selected color is white, please make sure you select the correct color of your car before going to next section.
                    </q-tooltip>
                  </q-icon> </div>
                  <div class="row">
                    
                    <div class="text-grey-5 info">  </div>
                  </div>
                  <q-radio keep-color v-model="color" val="White" color="grey-2" >
                    <q-tooltip>
                      White
                    </q-tooltip>
                  </q-radio>
                  <q-radio keep-color v-model="color" val="Grey" color="grey-5" >
                    <q-tooltip>
                      Grey
                    </q-tooltip>
                  </q-radio>
                  <q-radio keep-color v-model="color" val="Black" color="black" >
                    <q-tooltip>
                      Black
                    </q-tooltip>
                  </q-radio>
                  <q-radio keep-color v-model="color" val="Blue" color="blue" >
                    <q-tooltip>
                      Blue
                    </q-tooltip>
                  </q-radio>
                  <q-radio keep-color v-model="color" val="Green" color="green">
                    <q-tooltip>
                      Green
                    </q-tooltip>
                  </q-radio>
                  <q-radio keep-color v-model="color" val="Yellow" color="yellow">
                    <q-tooltip>
                      Yellow
                    </q-tooltip>
                  </q-radio>
                  <q-radio keep-color v-model="color" val="Orange" color="orange">
                    <q-tooltip>
                      Orange
                    </q-tooltip>
                  </q-radio>
                  <q-radio keep-color v-model="color" val="Red" color="red" >
                    <q-tooltip>
                      Red
                    </q-tooltip>
                  </q-radio>
                  <q-radio keep-color v-model="color" val="Purple" color="purple">
                    <q-tooltip>
                      Purple
                    </q-tooltip>
                  </q-radio>
              </div>
              <div class="col col-md">
                <div class="label"> Licence plate </div>
                <q-input 
                  outlined 
                  v-model="licence" 
                  dense
                  lazy-rules
                  :rules="[ 
                    value => value && value.length > 0 || 'Licence plate is required', 
                  ]"                  
                />
              </div>
            </div>
          </div>
          <div class="section">
            <div class="title text-weight-bold"> Expiration dates </div>
            <div class="full-width row wrap justify-between items-start content-start ">
              <div class="col col-md">
                <div class="label"> RCA </div>
                 <q-input outlined dense v-model="rca" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="o_event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                        <q-date 
                          v-model="rca"
                          :options="calendarOption">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col col-md">
                <div class="label"> ITP </div>
                 <q-input outlined dense v-model="itp" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="o_event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                        <q-date 
                          v-model="itp"
                          :options="calendarOption">
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
          </div>
          <div class="row wrap justify-end items-end content-end ">
            <div
              @click="handleNextSection"
              class="button bg-white row justify-center items-center content-center">
              <div>
                <div class="text-grey-5"> Go to next section </div>
                <div class="text-dark"> Engine information</div>
              </div>
              <q-icon color="primary" name="r_navigate_next" class="next--icon"></q-icon>
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
import { date } from 'quasar';
import {useRouter} from 'vue-router'

export default {
  components: {
    AddNavigation,
  },

  setup() {

    const router = useRouter();

    let addForm = ref('addForm')
    let brand = ref('');
    let model = ref('');
    let color = ref('White');
    let licence = ref('');
    let rca = ref(date.formatDate(new Date(), 'YYYY/MM/DD'));
    let itp = ref(date.formatDate(new Date(), 'YYYY/MM/DD'));
    let car = {};

    let calendarOption = (selectedDate) => {
      return selectedDate >= date.formatDate(Date.now(), 'YYYY/MM/DD');
    }

    if(JSON.parse(localStorage.getItem('TO_ADD'))) {
      car = JSON.parse(localStorage.getItem('TO_ADD'));
      brand.value = car.brand;
      model.value = car.model;
      color.value = car.color;
      licence.value = car.licence.toUpperCase();
      rca.value = date.formatDate(new Date(car.rca), 'YYYY/MM/DD');
      itp.value = date.formatDate(new Date(car.itp), 'YYYY/MM/DD');
    }

    const handleNextSection = () => {
      car = {
        brand: brand.value,
        model: model.value,
        color: color.value,
        licence: licence.value.toUpperCase(),
        rca: new Date(rca.value).toLocaleDateString('en-US'),
        itp: new Date(itp.value).toLocaleDateString('en-US')
      }
      
      localStorage.setItem('TO_ADD', JSON.stringify(car));
      addForm.value.submit();
      router.push('/cars/add/second');
    }

    return {
      brand,
      model,
      color,
      licence,
      rca,
      itp,
      addForm,
      handleNextSection,
      calendarOption,
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
      padding: 1em;
    }

    .button {
      padding: .8em;
      margin-top: 1em;
      border-radius: 10px;
      cursor: pointer;
    }

    .next--icon {
      font-size: 1.5em;
    }

    .info {
      font-size: .7em;
    }

    .q-tooltip {
      background-color: $grey-5;
    }

    .label {
      padding: .2em;
      font-size: 1em;
    }
  }

  @media (max-width: $breakpoint-sm-max) {
    .page {
      padding: 1em !important;
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