<template>
  <v-app>
    <v-row>
      <v-col cols="2">
        <navbar></navbar>
      </v-col>
      <v-col cols="10">
        <v-app-bar color="white">
          <div v-for="list in lists" :key="list.name">
            <v-btn
              @click="changeCom(list.value)"
              outlined
              color="blue-grey darken-2"
              small
            >{{list.name}}</v-btn>
          </div>
        </v-app-bar>
        <component v-bind:is="selected"></component>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar";
import Trap from '../components/Integ/Trap'
import Comtrap from '../components/Integ/Comtrap'
import Simrule13 from '../components/Integ/Simpson13'
import Comsim from '../components/Integ/Comsimpson'
import Simrule38 from '../components/Integ/Simpson38'


export default {
  components: {
    navbar: Navbar,
    trap:Trap,
    comtrap:Comtrap,
    simrule13:Simrule13,
    comsimrule:Comsim,
    simrule38:Simrule38
  },
  data() {
    return {
      lists: [
        { name: "Trapezoidal", value: "trap" },
        { name: "Composite Trapezoidal", value: "comtrap" },
        { name: "Simpson's rule 1/3", value: "simrule13" },
        { name: "Composite Simpson's rule", value: "comsimrule" },
        { name: "Simpson's rule 3/8", value: "simrule38" },
      ],
      selected: "default"
    };
  },
  methods: {
    changeCom(value) {
      this.selected = value;
    }
  }
};
</script>