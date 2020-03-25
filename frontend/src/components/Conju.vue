<template>
  <v-app>
    <v-card>
      <v-sheet class="mx-auto">
        <v-slide-group multiple show-arrows>
          <v-slide-item v-for="m in mongo" :key="m._id">
            <v-card @click="settoans(m)">
              <v-card-title>Matrix A{{m.matrixA}}</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <p>Matrix B: {{m.matrixB}}</p>
                      <p>init: {{m.initmatrix}}</p>
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
              <h1>Conjugate Gradient</h1>
            </v-col>
          </v-row>
        </v-card-title>

        <v-row>
          <v-col>
            <v-text-field v-model="sizeofmatrix" label="Size of Matrix"></v-text-field>
          </v-col>
          <v-col>
            <v-btn @click="create">Create</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-btn @click="postSecant">Submit</v-btn>
          <v-btn @click="insertCramer">Upload</v-btn>
        </v-row>
      </v-container>

      <v-row>
        <v-container>
          <v-col cols="3">
            <h6>Matrix : A</h6>
            <v-div v-for="(row,index) of rows" :key="index">
              <v-div v-for="(col,index) of cols" :key="index">
                <input @click="check(row,col)" v-bind:id="'a'+row+','+col" class="mini" />
              </v-div>
              <br />
            </v-div>
          </v-col>

          <v-col cols="3">
            <v-div>
              <p>=</p>
            </v-div>
          </v-col>

          <v-col>
            <h6>Matrix : B</h6>
            <v-div v-for="(col,index) of cols" :key="index">
              <input @click="check(row,col)" v-bind:id="'b'+col" class="mini" />
              <br />
            </v-div>
          </v-col>

          <v-col>
            <h6>Matrix : Init</h6>
            <v-div v-for="(col,index) of cols" :key="index">
              <input @click="check(row,col)" v-bind:id="'i'+col" class="mini" />
              <br />
            </v-div>
          </v-col>
        </v-container>
      </v-row>

      <v-row>
        <v-container>
          <v-btn @click="initmatrix">Submit</v-btn>
        </v-container>
      </v-row>
    </v-card>

    <v-card max-width="auto">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>Iteration</th>
              <th>Error</th>
              <th v-for="(decoy,index) of decoys" :key="index">{{'x'+index}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i,index) of iteration" :key="index">
              <td>{{ i }}</td>
              <td>{{err[index]}}</td>
              <td v-for="answer in answers" :key="answer.key">{{answer.x[i]}}</td>
              <br />
            </tr>
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
      rows: null,
      cols: null,
      sizeofmatrix: null,
      answers: null,
      decoys: null,
      num: 0,
      iteration: null,
      err: null,
      mongo: null
    };
  },
  methods: {
    create() {
      let size = parseInt(this.sizeofmatrix);
      this.num = size;

      let de = [];

      for (let u = 0; u < size; u++) {
        de.push(`x${u + 1}`);
      }

      this.decoys = de;

      this.rows = size;
      this.cols = size;
    },
    async initmatrix() {
      let size = parseInt(this.sizeofmatrix);

      let arrayx = new Array(size);
      let arrayy = [];
      let arrayi = [];

      for (let i = 0; i < size; i++) {
        arrayx[i] = new Array(size);
      }

      for (let j = 0; j < size; j++) {
        for (let k = 0; k < size; k++) {
          console.log(`x${j},${k}`);
          arrayx[j][k] = parseInt(
            document.getElementById(`a${j + 1},${k + 1}`).value
          );
        }
      }

      for (let l = 0; l < size; l++) {
        arrayy[l] = parseInt(document.getElementById(`b${l + 1}`).value);
        arrayi[l] = parseInt(document.getElementById(`i${l + 1}`).value);
      }

      console.log(arrayy);
      console.log(arrayx);

      await axios
        .post("/matrix/conju", {
          matrixA: arrayx,
          matrixB: arrayy,
          size: size,
          init: arrayi
        })
        .then(res => {
          console.log(res);
          this.iteration = res.data.iteration;
          this.err = res.data.err;
          this.answers = res.data.x;
        })
        .catch(err => {
          console.log(err);
        });
    },
    settoans(data) {
      let de = [];
      for (let u = 0; u < data.size; u++) {
        de.push(`x${u + 1}`);
      }
      this.decoys = de;
      this.iteration = data.iteration;
      this.err = data.err;
      this.answers = data.x;
    },
    async insertCramer() {
      let size = parseInt(this.sizeofmatrix);

      let arrayx = new Array(size);
      let arrayy = [];
      let arrayi = [];

      for (let i = 0; i < size; i++) {
        arrayx[i] = new Array(size);
      }

      for (let j = 0; j < size; j++) {
        for (let k = 0; k < size; k++) {
          console.log(`x${j},${k}`);
          arrayx[j][k] = parseInt(
            document.getElementById(`a${j + 1},${k + 1}`).value
          );
        }
      }

      for (let l = 0; l < size; l++) {
        arrayy[l] = parseInt(document.getElementById(`b${l + 1}`).value);
        arrayi[l] = parseInt(document.getElementById(`i${l + 1}`).value);
      }

      console.log(arrayy);
      console.log(arrayx);

      await axios
        .post("/matrixdb/pushconju", {
          matrixA: arrayx,
          matrixB: arrayy,
          size: size,
          initmatrix: arrayi,
          iteration: this.iteration,
          x: this.answers,
          err: this.err
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created: async function() {
    await axios
      .post("/matrixdb/getallconju", {})
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