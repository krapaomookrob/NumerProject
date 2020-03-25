<template>
  <v-app>
    <v-card>
      <v-sheet class="mx-auto">
        <v-slide-group multiple show-arrows>
          <v-slide-item v-for="m in mongo" :key="m._id">
            <v-card @click="settoans(m)">
              <v-card-title>{{m.equation}}</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <p>x0: {{m.x0}}</p>
                      <p>x1: {{m.x1}}</p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-card>
    <v-card class="card">
      <v-container>
        <v-card-title>
          <v-row>
            <v-col>
              <h1>Secant</h1>
            </v-col>
          </v-row>
        </v-card-title>

        <v-row>
          <v-col>
            <v-text-field v-model="equ" label="Equation"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="x0" label="X0"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="x1" label="X1"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-btn @click="postSecant">Submit</v-btn>
          <v-btn @click="insertBisection">Upload</v-btn>
        </v-row>
      </v-container>
      <v-card max-width="auto">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th v-for="item in headers" :key="item.text">{{item.text}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="answer in answers" :key="answer.iteration">
                <td>{{ answer.iteration }}</td>
                <td>{{ answer.x0 }}</td>
                <td>{{ answer.x1 }}</td>
                <td>{{ answer.xnew }}</td>
                <td>{{ answer.err }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-card>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      x0: null,
      x1: null,
      equ: null,
      headers: [
        { text: "Iteration" },
        { text: "X0" },
        { text: "X1" },
        { text: "X" },
        { text: "Error" }
      ],
      answers: [],
      mongo: null
    };
  },
  methods: {
    async postSecant() {
      await axios
        .post("/roe/secant", {
          x0: this.x0,
          x1: this.x1,
          equation: this.equ
        })
        .then(res => {
          console.log(res);
          this.answers = res.data.result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async insertBisection() {
      await axios
        .post("/roedb/pushsecant", {
          x0: this.x0,
          x1: this.x1,
          equation: this.equ,
          result: this.answers
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    settoans(data) {
      this.x0 = data.x0;
      this.x1 = data.x1;
      this.equ = data.equation;
      this.answers = data.result;
    }
  },
  created: async function() {
    await axios
      .post("/roedb/getallsecant", {})
      .then(response => {
        this.mongo = response.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.card {
  margin-top: 5%;
}
</style>