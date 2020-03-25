<template>
  
    <v-navigation-drawer permanent  left >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Numerical Method</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>

          <v-list-item-content>
            <v-list-item-title @click="changePage(item.name)"  >{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  
</template>

<script>
import router from "../router";
export default {
  data() {
    return {
      items: [
        { title: "Roots of Equation" ,name:'roe'},
        { title: "Linear of Algebraic Equation",name:'matrix' },
        { title: "Interpolation and Extrapolation",name:'inter' },
        { title: "Least-Squares Regression",name:'reg' },
        { title: "Integration",name:'ing' },
        { title: "Derivative",name:'derv' },
      ],
      right: null
    };
  },
  methods: {
    changePage(comname){
      router.push({name:comname})
    }
  },
};
</script>