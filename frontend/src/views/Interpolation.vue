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
import Poly from '../components/Inter/Poly';
import Lagrange from '../components/Inter/Lagrane'
import Spline from '../components/Inter/Spline'

export default {
  components: {
    navbar: Navbar,
    interpoly:Poly,
    lagrange:Lagrange,
    spline:Spline
  },
  data() {
    return {
      lists: [
        { name: "Newton Interpolation", value: "interpoly" },
        { name: "Lagrange Interpolation", value: "lagrange" },
        { name: "Spline Interpolation", value: "spline" }
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