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
              <h1>Cramer's Rule</h1>
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
              <th v-for="(answer,index) of answers" :key="index">{{'x'+index}}</th>
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
      rows: null,
      cols: null,
      sizeofmatrix: null,
      answers: null,
      mongo: null
    };
  },
  methods: {
    create() {
      let size = parseInt(this.sizeofmatrix);

      this.rows = size;
      this.cols = size;
    },
    check() {
      let temp = document.getElementById("1,1").value;
      console.log(temp);
    },
    async initmatrix() {
      let size = parseInt(this.sizeofmatrix);
      let arrayx = new Array(size);
      let arrayy = [];

      for (let i = 0; i < size; i++) {
        arrayx[i] = new Array(size);
      }

      for (let j = 0; j < size; j++) {
        for (let k = 0; k < size; k++) {
          console.log(`x${j},${k}`);
          arrayx[j][k] = parseFloat( document.getElementById(`a${j + 1},${k + 1}`).value);
        }
      }

      for (let l = 0; l < size; l++) {
        arrayy[l] = parseFloat(document.getElementById(`b${l + 1}`).value) ;
      }

      console.log(arrayy);
      console.log(arrayx);

      await axios
        .post("/matrix/cramer", {
          matrixA: arrayx,
          matrixB: arrayy
        })
        .then(res => {
          console.log(res);
          this.answers = res.data.result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    settoans(data) {
      this.answers = data.result;
    },
    async insertCramer() {
      let size = parseInt(this.sizeofmatrix);
      let arrayx = new Array(size);
      let arrayy = [];

      for (let i = 0; i < size; i++) {
        arrayx[i] = new Array(size);
      }

      for (let j = 0; j < size; j++) {
        for (let k = 0; k < size; k++) {
          console.log(`x${j},${k}`);
          arrayx[j][k] = document.getElementById(`a${j + 1},${k + 1}`).value;
        }
      }

      for (let l = 0; l < size; l++) {
        arrayy[l] = document.getElementById(`b${l + 1}`).value;
      }

      await axios
        .post("/matrixdb/pushcramer", {
          matrixA: arrayx,
          matrixB: arrayy,
          result: this.answers
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
      .post("/matrixdb/getallcramer", {})
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