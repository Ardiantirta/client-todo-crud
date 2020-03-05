<template>
  <b-container>
    <h1 class="text-center">Edit Todo</h1>
    <b-form @submit="saveTodo">
      <b-form-group
        label="Title:"
        label-for="input-1"
        description=""
      >
        <b-form-input
          id="input-1"
          v-model="form.title"
          type="text"
          required
          placeholder="Todo title"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description:" label-for="input-2">
        <b-form-textarea
          id="input-2"
          v-model="form.description"
          required
          rows="6"
          placeholder="Enter Todo Description"
        ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="button" @click="$router.push({ path: '/todo' })" variant="">Cancel</b-button>
    </b-form>
  </b-container>
</template>
<script>
export default {
  data () {
    return {
      id: 0,
      form: {
        title: '',
        description: '',
        completed: false
      }
    }
  },
  methods: {
    fetchTodoById (objId) {
      this.$api.get(`/todo/${objId}`)
        .then((response) => {
          let temp = response.data.data.data
          this.form.title = temp.title
          this.form.description = temp.description
          this.form.completed = temp.completed
          this.id = objId
          console.log('api get sukses')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    saveTodo (evt) {
      evt.preventDefault()
      if (this.form.title.length < 10) {
        return false
      }

      if (this.form.description.length < 20) {
        return false
      }
      this.$api.put(`/todo/${this.id}`, {
        title: this.form.title,
        description: this.form.description
      }).then((response) => {
        console.log(`api edit todo`)
        this.$router.push({ path: '/todo' })
      }).catch((err) => {
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
