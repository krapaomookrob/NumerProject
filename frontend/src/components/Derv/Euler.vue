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
                      <p>diff: {{m.diff}}</p>
                      <p>startx: {{m.startx}}</p>
                      <p>endx: {{m.endx}}</p>
                      <p>y: {{m.y}}</p>
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
              <h1>Euler's Method</h1>
            </v-col>
          </v-row>
        </v-card-title>

        <v-row>
          <v-col>
            <v-text-field v-model="equ" label="Equation"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="equdiff" label="Equation (diff)"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="startx" label="Start X"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="endx" label="End X"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="y0" label="Y(0)"></v-text-field>
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

      <v-card max-width="auto">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th v-for="item in headers" :key="item.text">{{item.text}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="answer in answers" :key="answer.currentx">
                <td>{{ answer.currentx }}</td>
                <td>{{ answer.y }}</td>
                <td>{{ answer.realy }}</td>
                <td>{{ answer.e }}</td>
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
      endx: null,
      equdiff: null,
      startx: null,
      h: null,
      y0: null,
      equ: null,
      answers: null,
      headers: [
        { text: "Current X" },
        { text: "Y" },
        { text: "Real Y" },
        { text: "Error" }
      ],
      mongo:null
    };
  },
  methods: {
    async postBisection() {
      let startx = parseFloat(this.startx);
      let endx = parseFloat(this.endx);
      let y = parseFloat(this.y0);
      let h = parseFloat(this.h);
      await axios
        .post("/derv/euler", {
          y: y,
          h: h,
          startx: startx,
          endx: endx,
          exp: this.equ,
          diff: this.equdiff
        })
        .then(res => {
          this.answers = res.data.result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async insertBisection() {
      let startx = parseFloat(this.startx);
      let endx = parseFloat(this.endx);
      let y = parseFloat(this.y0);
      let h = parseFloat(this.h);
      await axios
        .post("/dervdb/pusheuler", {
          y: y,
          h: h,
          startx: startx,
          endx: endx,
          exp: this.equ,
          diff: this.equdiff,
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
      this.startx = data.startx;
      this.endx = data.endx
      this.equdiff = data.diff
      this.y = data.y
      this.h = data.h;
      this.equ = data.exp;
    }
  },
  created: async function() {
    await axios
      .post("/dervdb/getalleuler", {})
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