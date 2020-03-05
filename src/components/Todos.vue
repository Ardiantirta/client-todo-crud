<template>
  <b-container>
    <h1 class="text-center">Todo List</h1>
    <div class="form">
      <input type="text" v-model="limit">
      <button type="submit" @click="fetchTodos(page, limit)">Search</button>
      <b-link to="/todo/new">New Todo</b-link>
    </div>
    <div v-if="todos.length > 0">
      <b-list-group v-for="(todo, index) in todos" :key="index">
        <b-list-group-item
          :class="{'completed': todo.completed}"
        >
          <b
            @click="updateStatus(todo.id, todo.completed, index)"
          >{{ todo.title }}</b>
          <div class="text-right">
            <b-button @click="goToPage('todo/detail/', todo.id)" variant="info">Details</b-button>
            <b-button @click="goToPage('todo/edit/', todo.id)" variant="">Edit</b-button>
            <b-button @click="deleteItem(todo.id)" variant="danger">Delete</b-button>
          </div>
        </b-list-group-item>
      </b-list-group>
      <div>
        <b-pagination-nav :link-gen="linkGen" :limit="10" :number-of-pages="max_page" use-router @change="fetchTodos(($route.query.page? $route.query.page: 1), limit)"></b-pagination-nav>
      </div>
    </div>
    <div v-else>
      <span>no todo were found.</span>
    </div>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      todos: [],
      page: this.$route.query.page ? this.$route.query.page : 1,
      limit: 20,
      min_page: 1,
      max_page: 1
    }
  },
  methods: {
    fetchTodos (pageParams, limitParams) {
      this.$api.get('todos', {
        params: {
          page: pageParams,
          limit: limitParams
        }
      })
        .then((response) => {
          this.todos = response.data.data.data
          this.min_page = response.data.data.min_page
          this.max_page = response.data.data.max_page
          console.log(`api hit`)
        }).catch((err) => {
          console.log(err)
        })
    },
    updateStatus (id, completeStatus, index) {
      this.$api.put(`todo/${id}`, {
        completed: !completeStatus
      }).then((response) => {
        this.fetchTodos(this.page, this.limit)
        console.log(`api update status`)
      }).catch((err) => {
        console.log(err)
      })
    },
    goToPage (path, objId) {
      this.$router.push({ path: `${path}${objId}` })
    },
    deleteItem (objId) {
      this.$api.delete(`todo/${objId}`)
        .then((response) => {
          console.log(`api delete success`)
          this.fetchTodos(this.page, this.limit)
        }).catch((err) => {
          console.log(err)
        })
    },
    linkGen (pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    }
  },
  mounted () {
    this.fetchTodos(this.page, this.limit)
  }
}
</script>

<style scoped>
  .completed {
    text-decoration: line-through;
    background-color: #3fff38
  }
  .form {
    margin: 20px;
    text-align: center;
  }
</style>
