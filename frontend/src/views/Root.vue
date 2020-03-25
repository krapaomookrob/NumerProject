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
import Bisec from "../components/Bisec";
import False from "../components/False";
import Default from "../components/Default";
import Onepoint from "../components/Onepoint"
import Newton from "../components/Newton"
import Secant from "../components/Secant"
export default {
  components: {
    navbar: Navbar,
    bisec: Bisec,
    default: Default,
    falsepo: False,
    onepoint:Onepoint,
    newton:Newton,
    secant:Secant
  },
  data() {
    return {
      lists: [
        { name: "bisection", value: "bisec" },
        { name: "falsepositon", value: "falsepo" },
        { name: "one-point iteration", value: "onepoint" },
        { name: "newton's", value: "newton" },
        { name: "secant", value: "secant" }
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