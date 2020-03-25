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
                      <p>(x,f(x)): {{m.poly}}</p>
                      <p>X: {{m.x}}</p>
                      <p>result (L): {{m.resultL}}</p>
                      <p>result (X): {{m.resultX}}</p>
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
              <h1>Lagrange Interpolation</h1>
            </v-col>
          </v-row>
        </v-card-title>

        <v-row>
          <v-col>
            <v-text-field v-model="sizeofmatrix" label="Number of Variable"></v-text-field>
          </v-col>
          <v-col>
            <v-btn @click="create">Create</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-btn @click="postSecant">Submit</v-btn>
         <v-btn @click="insertBisection">Upload</v-btn>
        </v-row>
      </v-container>

      <v-row>
        <v-container>
          <v-col cols="3">
            <h6>X & F(x)</h6>
            <v-div v-for="(row,index) of rows" :key="index">
              <v-div v-for="(col,index) of cols" :key="index">
                <input @click="check(row,col)" v-bind:id="'a'+row+','+col" class="mini" />
              </v-div>
              <br />
            </v-div>
          </v-col>

          <v-col>
            <v-text-field v-model="x" label="X"></v-text-field>
          </v-col>
        </v-container>
      </v-row>

      <v-row>
        <v-container>
          <v-btn @click="initmatrix">Submit</v-btn>
        </v-container>
      </v-row>
    </v-card>

    <v-card v-if="getresult == true">
      <v-card-title>Result</v-card-title>
      <v-card-text>{{resultx}}</v-card-text>
    </v-card>

    <v-card max-width="auto">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th v-for="(answer,index) of answers" :key="index">{{'L'+index}}</th>
            </tr>
          </thead>
          <tbody>
            <td v-for="(answer,index) of answers" :key="index">
              <tr>{{ answer }}</tr>
            </td>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      getresult: false,
      rows: null,
      x: null,
      cols: 2,
      sizeofmatrix: null,
      answers: null,
      resultx: null,
      mongo:null
    };
  },
  methods: {
    create() {
      let size = parseInt(this.sizeofmatrix);
      this.rows = size;
    },
    check() {
      let temp = document.getElementById("1,1").value;
      console.log(temp);
    },
    async initmatrix() {
      let size = parseInt(this.sizeofmatrix);
      let arrayx = new Array(size);
      let x = parseInt(this.x);
      for (let i = 0; i < size; i++) {
        arrayx[i] = new Array(2);
      }
      for (let j = 0; j < size; j++) {
        for (let k = 0; k < 2; k++) {
          console.log(`x${j},${k}`);
          arrayx[j][k] = parseInt(
            document.getElementById(`a${j + 1},${k + 1}`).value
          );
        }
      }
      await axios
        .post("/inter/lagrange", {
          poly: arrayx,
          x: x
        })
        .then(res => {
          this.getresult = true;
          this.answers = res.data.resultL;
          this.resultx = res.data.resultX;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async insertBisection() {
      let size = parseInt(this.sizeofmatrix);
      let arrayx = new Array(size);
      let x = parseInt(this.x);

      for (let i = 0; i < size; i++) {
        arrayx[i] = new Array(2);
      }
      for (let j = 0; j < size; j++) {
        for (let k = 0; k < 2; k++) {
          console.log(`x${j},${k}`);
          arrayx[j][k] = parseInt(
            document.getElementById(`a${j + 1},${k + 1}`).value
          );
        }
      }
      await axios
        .post("/interdb/pushlagrange", {
          poly: arrayx,
          x: x,
          resultL: this.answers,
          resultX:this.resultx
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
      this.answers = data.resultL;
      this.resultx = data.resultX
    }
  },
  created: async function() {
    await axios
      .post("/interdb/getalllagrange", {})
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

.mini {
  max-width: 80px;
  height: 50px;
  border-style: solid;
}
</style>