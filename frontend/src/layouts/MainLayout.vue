<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-white shadow-5">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" dense icon="r_menu" class="text-accent menu" size='lg'/>

        <q-toolbar-title>
          <q-avatar  class="header-logo">
            <img
              onclick="handleLogoClick"
              src="../../public/full-logo.svg">          
          </q-avatar>
        </q-toolbar-title>


        <q-btn flat @click="drawerRight = !drawerRight" dense icon="o_event" class="text-accent menu" size='lg'/>
      </q-toolbar>
    </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above

        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay
        rounded

        :width="180"
        :breakpoint="599"
        class="bg-grey-1 inset-shadow text-dark drawer"
      >
        <q-scroll-area class="fit drawer-bg shadow-5">
          <q-list padding>
            <q-item clickable v-ripple rounded to='/' exact>
              <q-item-section avatar>
                <q-icon name="o_cottage"/>
              </q-item-section>
              <q-item-section>
                Home
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple rounded to='/schedule' exact >
              <q-item-section avatar>
                <q-icon name="o_edit_calendar"/>
              </q-item-section>
              <q-item-section>
                Schedule
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple rounded to='/map/map' >
              <q-item-section avatar>
                <q-icon name="o_map"/>
              </q-item-section>
              <q-item-section>
                Map
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple rounded to='/cars' >
              <q-item-section avatar>
                <q-icon name="o_directions_car"/>
              </q-item-section>
              <q-item-section>
                Cars
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple rounded to='/login' class="text-dark">
              <q-item-section avatar>
                <q-icon name="o_logout"/>
              </q-item-section>
              <q-item-section>
                Logout
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-drawer
        side="right"
        v-model="drawerRight"
        show-if-above
        :width="340"
        :breakpoint="599"
        class="bg-grey-2"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-md flex flex-center flex-row items-center self-center content-center">
              <q-date
                v-model="date"
                color="accent"
                minimal
                dark
                shadow-0
                :events=events
              />

              <div class="expansion-item q-pa-sm q-mt-md bg-white expansion-item">
                <q-expansion-item
                  class="item text-primary bg-white"
                  show-if-above
                  width="350"
                >
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-icon color="grey-6" name="o_event" />
                    </q-item-section>

                    <q-item-section>
                      <strong>Events</strong>
                      <span class="item__content bg-white"><strong>{{events.length ?? No}} </strong> upcoming events.</span>
                    </q-item-section>
                  </template>
                  <q-card>
                    <q-card-section
                      v-for="event in events" :key="event.id" 
                      class="bg-white">
                      <event-card 
                        v-bind:name=event.name
                        v-bind:licence=event.licence
                        v-bind:date=event.date
                        v-bind:person=event.person
                        v-bind:address=event.address
                      />
                    </q-card-section>
                    <q-card-section class="justify-end items-end content-end full-width">
                      <q-btn
                        no-caps
                        flat
                        rounded
                        color='accent'
                        icon="o_add"
                        label='Add new'
                        to="/schedule"
                        exact>
                      </q-btn>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </div>
              <div class="expansion-item q-pa-sm q-mt-md bg-white expansion-item">
                <q-expansion-item
                  class="item text-primary"
                  style="border-radius: 15px"
                  v-bind:content="places.length + ' places saved so far.'"
                  show-if-above
                  width="350"
                >
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-icon color="grey-6" name="o_home_work" />
                    </q-item-section>

                    <q-item-section>
                      <strong>Places</strong>
                      <span class="item__content"><strong>{{places.length}}</strong> places saved so far.</span>
                    </q-item-section>
                  </template>

                  <q-card>
                    <q-card-section
                      v-for="place in places" :key="place.id" 
                      class="bg-white">
                      <place-card
                        v-bind:name=place.name
                        v-bind:address=place.address
                        v-bind:placeType=place.type
                      />
                    </q-card-section>
                    <q-card-section class="justify-end items-end content-end full-width">
                      <q-btn
                        no-caps
                        flat
                        rounded
                        color='accent'
                        icon="o_add"
                        label='Add new'
                        @click='handleNewPlace'>
                      </q-btn>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </div>

          </div>
        </q-scroll-area>
      </q-drawer>


    <q-page-container>
      <router-view />
    </q-page-container>



    <q-footer class="footer text-dark">
      <q-toolbar>

        <div class="row justify-center items-center content-center full-height full-width text-center">
          <span> Designed using <q-icon name="fab fa-figma"></q-icon> <q-icon name="o_more_vert" class="text-accent"></q-icon>  <q-icon name='ion-logo-github' class="color-accent"></q-icon> <a href="https://github.com/barsanescudiana/carctrl">Github repo</a>  <q-icon name="o_more_vert" class="text-accent"></q-icon> <q-icon name="ion-globe"></q-icon> Also available <a href="https://carctrl-ec0b7.web.app/">here</a>! </span>
        </div>
      </q-toolbar>
    </q-footer>



  </q-layout>
</template>

<script>

import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import EventCard from '../components/eventCard.vue';
import PlaceCard from '../components/placeCard.vue';
import PlaceType from '../interfaces/placeType.interface';
import axios from 'axios';
import { date, useQuasar } from 'quasar';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EventCard,
    PlaceCard
  },

  setup () {
    const $q = useQuasar();
    const router = useRouter();
    const user = ref();
    user.value = JSON.parse(localStorage.getItem('USER'))

    let events = ref([]); 
    let places = ref([]);

    const server = 'http://localhost:3000';
    const userId = user.value.id;
    const axiosConfig = {
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          'authorization': localStorage.getItem('AUTH_TOKEN')
      }
    };

    const formatDateFromFirebase = (now) => {
      const date = new Date(now).toLocaleDateString('en-US').split('/')
      const today = date.join('/');
      return today;
    }

    const getEvents = () => {
      axios.get(`${server}/api/events/all/${userId}`, axiosConfig)
        .then((res) => {
          handleEvents(res.data);
        })
        .catch((err) => {
          $q.notify({
            progress: true,
            message: `No events planned so far!`,
            color: 'negative',
            actions: [
              { label: 'Ok', color: 'white', handler: () => { /* ... */ } }
            ]
          })
        })
    }

    const handleEvents = (eventsArray) => {
      eventsArray.map(item => {
        item.date = formatDateFromFirebase(new Date(item.date._seconds*1000));
        events.value.push(item);
      })
      events.value.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      events.value = events.value.filter(event => new Date(event.date).getTime() > new Date().getTime());
    }

    getEvents();

    const handleSchedule = () => {
      router.push(`/schedule/${userId}`)
    }

    const getPlaceType = (type) => {
      switch(type) {
        case 'HOME': 
          return PlaceType.HOME;
        case 'WORK':
          return PlaceType.OFFICE;
        case 'HOSPITAL': 
          return PlaceType.HOSPITAL;
        case 'STORE': 
          return PlaceType.STORE;
        case 'OTHER': 
          return PlaceType.OTHER;
      }
    }

    axios
      .get(`${server}/api/places/all/${user.value.id}`, axiosConfig)
      .then((res) => {
        res.data.forEach((place) => {
          places.value.push({
            id: place.id,
            name: place.name,
            address: place.address,
            type: getPlaceType(place.type)
          })
        })
      })
      .catch((err) => {
        $q.notify({
          progress: true,
          message: `No places added so far!`,
          color: 'negative',
          actions: [
            { label: 'Ok', color: 'white', handler: () => { /* ... */ } }
          ]
        })
      })

    const handleNewPlace = () => {
      router.push('/map/place');
    }

    const handleLogoClick = () => {
      router.push('/')
    }
    return {
      handleSchedule,
      handleNewPlace,
      handleLogoClick,
      router,
      user,
      drawer: ref(false),
      drawerRight: ref(false),
      miniState: ref(true),
      date: ref(date.formatDate(new Date(), 'YYYY/MM/DD')),
      events,
      places,
    }

  },

})
</script>
<style lang="scss" scoped>
  @import url("https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;600;700&display=swap");
  @import "../css/quasar.variables.scss";

  .header-logo {
    height: 16vh;
    width: 5em;
  }

  .drawer {
    background-color: $light-gray;
    font-family: 'Lexend Deca', sans-serif;
  }

  .q-scrollarea__content {
    box-shadow: 1px 4px 7px rgba(0, 0, 0, 0.25);
  }

  .q-item {
    margin: .3em;
    color: $primary;
    &:hover {

      background-color: $grey-2;
      border-radius: 15px;
    }

  }

  .q-router-link--active {
    background-color: #1abc9c30;
    border-radius: 15px;
    color: $primary;

  }

  .menu {
    border-radius: 15px;
    margin: .3em;

      .q-icon {
        color: $grey-7;
        font-size: 1.5em;
      }
  }

  .footer {
    background-color: #F7F8F8;
    height: fit-content !important;
    font-size: .9em;
  }

  .expansion-item {
    border-radius: 15px;
    max-width: 340px;

    .item {
      width: 280px;
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

  .q-toolbar {
    height: 8vh;
  }

  @media (min-width: $breakpoint-xs-max) {
    .menu{
      display: none; 
    }
  }

</style>