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
import FWOH from '../components/FWOH'
import BWOH from '../components/BWOH'
import OH2 from '../components/Derv/OH2'
import OH4 from '../components/Derv/OH4'
import FWOH2 from '../components/Derv/FWOH2'
import BWOH2 from '../components/Derv/BWOH2'
import Euler from '../components/Derv/Euler'
import Heun from '../components/Derv/Heun'
import Modi from '../components/Derv/Modieuler'


export default {
  components: {
    navbar: Navbar,
    fwoh:FWOH,
    bwoh:BWOH,
    oh2:OH2,
    oh4:OH4,
    fwoh2:FWOH2,
    bwoh2:BWOH2,
    euler:Euler,
    heun:Heun,
    moeuler:Modi
  },
  data() {
    return {
      lists: [
        { name: "FW O(h)", value: "fwoh" },
        { name: "BW O(h)", value: "bwoh" },
        { name: "O(h^2)", value: "oh2" },
        { name: "O(h^4)", value: "oh4" },
        { name: "FW O(h^2)", value: "fwoh2" },
        { name: "BW O(h^2)", value: "bwoh2" },
        { name: "Euler's Method", value: "euler" },
        { name: "Heun's Method", value: "heun" },
        { name: "Modified Euler", value: "moeuler" },
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