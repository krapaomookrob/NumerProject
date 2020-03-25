<template>
  <v-app>
    <v-card>
      <v-sheet class="mx-auto">
        <v-slide-group multiple show-arrows>
          <v-slide-item v-for="m in mongo" :key="m._id">
            <v-card @click="settoans(m)">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <p>(x,f(x)): {{m.linear}}</p>
                      <p>X: {{m.x}}</p>
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
              <h1>Regression</h1>
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

    <v-card max-width="auto" v-if="getresult==true">
      <v-card-title>Result</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <h4>Equation</h4>
            <p>{{equresult}}</p>
          </v-col>

          <v-col cols="3">
            <h4>f(x)</h4>
            <p>{{answers}}</p>
          </v-col>

          <v-col cols="3">
            <h4>A-0</h4>
            <p>{{Aequ[0]}}</p>
          </v-col>

          <v-col cols="3">
            <h4>A-1</h4>
            <p>{{Aequ[1]}}</p>
          </v-col>
        </v-row>
      </v-card-text>
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
      points: null,
      equresult: null,
      Aequ: null,
      mongo: null,
      result:null
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
        .post("/sqr/reg", {
          linear: arrayx,
          x: x
        })
        .then(res => {
          this.getresult = true;
          this.points = res.data.result.points;
          this.answers = res.data.value;
          this.equresult = res.data.result.string;
          this.Aequ = res.data.result.equation;
          this.result = res.data.result
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
        .post("/regdb/pushreg", {
          linear: arrayx,
          x: x,
          value:this.answers,
          result:this.result
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
      this.points = data.result.points;
      this.answers = data.value;
      this.equresult = data.result.string;
      this.Aequ = data.result.equation;
    }
  },
  created: async function() {
    await axios
      .post("/regdb/getallreg", {})
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