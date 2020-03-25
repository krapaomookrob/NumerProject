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
                      <p>x: {{m.x}}</p>
                      <p>h: {{m.h}}</p>
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
              <h1>FW O(h^2)</h1>
            </v-col>
          </v-row>
        </v-card-title>

        <v-row>
          <v-col>
            <v-text-field v-model="equ" label="Equation"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="x" label="X"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="h" label="H"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-btn @click="postBisection">Submit</v-btn>
          <v-btn @click="insertBisection">Upload</v-btn>
        </v-row>
      </v-container>
      <v-card max-width="auto" v-if="getresult == true">
        <v-card-title>
          <h3>Result</h3>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="3">
              <h5>f'(x)</h5>
              <p>{{answers.f1}}</p>
            </v-col>
            <v-col cols="3">
              <h5>f''(x)</h5>
              <p>{{answers.f2}}</p>
            </v-col>
            <v-col cols="3">
              <h5>f'(x)</h5>
              <p>{{answers.f3}}</p>
            </v-col>
            <v-col cols="3">
              <h5>f''(x)</h5>
              <p>{{answers.f4}}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <h5>Error: f'(x)</h5>
              <p>{{answers.e1}}</p>
            </v-col>
            <v-col cols="3">
              <h5>Error: f''(x)</h5>
              <p>{{answers.e2}}</p>
            </v-col>
            <v-col cols="3">
              <h5>Error: f'(x)</h5>
              <p>{{answers.e3}}</p>
            </v-col>
            <v-col cols="3">
              <h5>Error: f''(x)</h5>
              <p>{{answers.e4}}</p>
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
      x: null,
      h: null,
      equ: null,
      answers: null,
       mongo: null
    };
  },
  methods: {
    async postBisection() {
      let x = parseFloat(this.x);
      let h = parseFloat(this.h);
      await axios
        .post("/derv/fwoh2", {
          x: x,
          h: h,
          exp: this.equ
        })
        .then(res => {
          this.getresult = true;
          console.log(res.data);
          this.answers = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async insertBisection() {
      let x = parseFloat(this.x);
      let h = parseFloat(this.h);
      await axios
        .post("/dervdb/pushfwoh2", {
          x: x,
          h: h,
          exp: this.equ,
          ans:this.answers
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
      this.answers = data.ans;
      this.x = data.x;
      this.h = data.h;
      this.equ = data.exp
    }
  },
  created: async function() {
    await axios
      .post("/dervdb/getallfwoh2", {})
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