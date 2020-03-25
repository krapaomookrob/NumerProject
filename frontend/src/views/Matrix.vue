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
import Cramer from "../components/Cramer"
import Gausseli from '../components/Gausseli'
import Gaussjordan from '../components/Gaussjordan'
import Invert from '../components/Invert'
import LU from '../components/LU'
import Cho from '../components/Chol'
import Jacobi from '../components/Jacobi'
import Conju from '../components/Conju'
import Seidel from '../components/Seidel'

export default {
  components: {
    navbar: Navbar,
    cramer:Cramer,
    gausseli:Gausseli,
    gaussjd:Gaussjordan,
    mxinv:Invert,
    lu:LU,
    cho:Cho,
    jacobi:Jacobi,
    conju:Conju,
    seidel:Seidel
  },
  data() {
    return {
      lists: [
        { name: "Cramer's Rule", value: "cramer" },
        { name: "Gauss Elimination", value: "gausseli" },
        { name: "Gauss Jordan", value: "gaussjd" },
        { name: "Matrix Inversion", value: "mxinv" },
        { name: "LU Decomposition", value: "lu" },
        { name: "Cholesky Decomposition", value: "cho" },
        { name: "Jacobi Iteration", value: "jacobi" },
        { name: "Gauss Seidel Iteration", value: "seidel" },
        { name: "Conjugate Gradient", value: "conju" },
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