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
                      <p>x: {{m.xnew}}</p>
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
              <h1>Newton's</h1>
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
        </v-row>

        <v-row>
          <v-btn @click="postNew">Submit</v-btn>
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
                <td>{{ answer.xold }}</td>
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
      x: null,
      equ: null,
      headers: [
        { text: "Iteration" },
        { text: "X Old" },
        { text: "X New" },
        { text: "Error" }
      ],
      answers: [],
      mongo: null
    };
  },
  methods: {
    async postNew() {
      await axios
        .post("/roe/newton", {
          xnew: this.x,
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
        .post("/roedb/pushonepoint", {
          xnew: this.x,
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
      this.x = data.xnew;
      this.equ = data.equation;
      this.answers = data.result;
    }
  },
  created: async function() {
    await axios
      .post("/roedb/getallonepoint", {})
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