<template>
  <b-container>
    <h1 class="text-center">Detail Todo</h1>
    <b-row class="mb-3">
      <b-col cols="3"><b>ID</b></b-col>
      <b-col cols="9">: {{todoObj.id}}</b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col cols="3"><b>Title</b></b-col>
      <b-col cols="9">: {{todoObj.title}}</b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col cols="3"><b>Description</b></b-col>
      <b-col cols="9">: {{todoObj.description}}</b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col cols="3"><b>Completed</b></b-col>
      <b-col cols="9">: {{todoObj.completed ? 'Complete': 'Not Complete'}}</b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col cols="3"><b>Created At</b></b-col>
      <b-col cols="9">: {{todoObj.created_at}}</b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col cols="3"><b>Updated At</b></b-col>
      <b-col cols="9">: {{todoObj.updated_at}}</b-col>
    </b-row>
    <b-button type="button" @click="$router.push({ path: '/todo' })" variant="">Back to List</b-button>
  </b-container>
</template>
<script>
import moment from 'moment'

export default {
  data () {
    return {
      todoObj: {}
    }
  },
  methods: {
    fetchTodoById (objId) {
      this.$api.get(`todo/${objId}`)
        .then((response) => {
          let temp = response.data.data.data
          temp.created_at = moment(temp.created_at).format('dddd, DD-MM-YYYY HH:mm:ss')
          temp.updated_at = moment(temp.updated_at).format('dddd, DD-MM-YYYY HH:mm:ss')
          this.todoObj = temp
          console.log(temp)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.fetchTodoById(this.$route.params.id)
  },
  components: {

  }
}
</script>
