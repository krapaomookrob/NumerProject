<template>
  <v-app>
    <v-card>
      <v-sheet class="mx-auto">
        <v-slide-group multiple show-arrows>
          <v-slide-item v-for="m in mongo" :key="m._id">
            <v-card @click="settoans(m)">
              <v-card-title>{{m.exp}}</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <p>A: {{m.A}}</p>
                      <p>B: {{m.B}}</p>
                      <p>N: {{m.n}}</p>
                      <p>result: {{m.result}}</p>
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
              <h1>Simpson 1/3's Rule</h1>
            </v-col>
          </v-row>
        </v-card-title>

        <v-row>
          <v-col>
            <v-text-field v-model="equ" label="Equation"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="a" label="A"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="b" label="B"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="n" label="N"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-btn @click="postBisection">Submit</v-btn>
          <v-btn @click="insertBisection">Upload</v-btn>
        </v-row>
      </v-container>
      <v-card max-width="auto" v-if="getresult==true">
        <v-card-title>
          <h3>Result</h3>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="3">
              <p>{{answers}}</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      getresult: false,
      a: null,
      b: null,
      n: null,
      equ: null,
      answers: null,
      mongo:null
    };
  },
  methods: {
    async postBisection() {
      let a = parseFloat(this.a);
      let b = parseFloat(this.b);
      let n = parseFloat(this.n);
      await axios
        .post("/integration/sim13", {
          A: a,
          B: b,
          n: n,
          exp: this.equ
        })
        .then(res => {
          this.getresult = true;
          this.answers = res.data.result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async insertBisection() {
      let a = parseFloat(this.a);
      let b = parseFloat(this.b);
      let n = parseFloat(this.n);
      await axios
        .post("/ingdb/pushsim13", {
          A: a,
          B: b,
          n: n,
          exp: this.equ,
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
      this.getresult = true;
      this.answers = data.result;
      this.n = data.n
      this.a = data.A;
      this.b = data.B;
      this.equ = data.exp;
    }
  },
  created: async function() {
    await axios
      .post("/ingdb/getallsim13", {})
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