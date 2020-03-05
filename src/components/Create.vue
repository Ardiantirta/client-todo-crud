<template>
  <b-container>
    <h1 class="text-center">New Todo</h1>
    <b-form @submit="createTodo">
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
      form: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    createTodo (evt) {
      evt.preventDefault()
      if (this.form.title.length < 10) {
        return false
      }

      if (this.form.description.length < 20) {
        return false
      }
      this.$api.post(`/todo`, {
        title: this.form.title,
        description: this.form.description
      }).then((response) => {
        console.log(`api create todo`)
        this.$router.push({ path: '/todo' })
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {

  },
  components: {

  }
}
</script>
