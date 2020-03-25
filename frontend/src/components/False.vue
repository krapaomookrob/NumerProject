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
                      <p>xl: {{m.xl}}</p>
                      <p>xr: {{m.xr}}</p>
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
              <h1>False Position</h1>
            </v-col>
          </v-row>
        </v-card-title>

        <v-row>
          <v-col>
            <v-text-field v-model="equ" label="Equation"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="xl" label="XL"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="xr" label="XR"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-btn @click="postFalse">Submit</v-btn>
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
                <td>{{ answer.xL }}</td>
                <td>{{ answer.xR }}</td>
                <td>{{ answer.xM }}</td>
                <td>{{ answer.Error }}</td>
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
      xl: null,
      xr: null,
      equ: null,
      headers: [
        { text: "Iteration" },
        { text: "XL" },
        { text: "XR" },
        { text: "XM" },
        { text: "Error" }
      ],
      answers: [],
      mongo:null
    };
  },
  methods: {
    async postFalse() {
      await axios
        .post("/roe/false", {
          xL: this.xl,
          xR: this.xr,
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
        .post("/roedb/pushfalse", {
          xl: this.xl,
          xr: this.xr,
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
    settoans(data){
      this.xl = data.xl
      this.xr = data.xr
      this.equ = data.equation
      this.answers = data.result;
    }
  },
  created: async function() {
    await axios
      .post("/roedb/getallfalse", {})
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