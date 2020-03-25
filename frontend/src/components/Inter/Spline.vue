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
                      <p>x-mark: {{m.xmark}}</p>
                      <p>x: {{m.x}}</p>
                      <p>f(x): {{m.fx}}</p>
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
              <h1>Spline Interpolation</h1>
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
      <v-card-text>{{answers}}</v-card-text>
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
      mongo: null
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
      let arrayy = new Array(size);
      let x = parseInt(this.x);

      for (let i = 0; i < size; i++) {
        arrayx[i] = parseInt(document.getElementById(`a${i + 1},1`).value);
      }

      for (let j = 0; j < size; j++) {
        arrayy[j] = parseInt(document.getElementById(`a${j + 1},2`).value);
      }

      await axios
        .post("/inter/spline", {
          x: arrayx,
          fx: arrayy,
          xmark: x
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
      let size = parseInt(this.sizeofmatrix);
      let arrayx = new Array(size);
      let arrayy = new Array(size);
      let x = parseInt(this.x);

      for (let i = 0; i < size; i++) {
        arrayx[i] = parseInt(document.getElementById(`a${i + 1},1`).value);
      }

      for (let j = 0; j < size; j++) {
        arrayy[j] = parseInt(document.getElementById(`a${j + 1},2`).value);
      }
      await axios
        .post("/interdb/pushspline", {
          x: arrayx,
          fx: arrayy,
          xmark: x,
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
    }
  },
  created: async function() {
    await axios
      .post("/interdb/getallspline", {})
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