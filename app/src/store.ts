import Vue from 'vue'
import Vuex from 'vuex'
import { Todo } from "@/data/todo";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todos: []
    },
    getters: {
        getTodos: (state) => {
            return state.todos.sort((x: Todo, y: Todo) => {
                return (new Date(y.date)).getTime() - (new Date(x.date)).getTime();
            });
        }
    },
    mutations: {
        clearTodos: (state) => {
            Vue.set(state, 'todos', []);
        },
        commitNewTodo: (state, payload: Todo) => {
            Vue.set(state, 'todos', [...state.todos, payload]);
        }
    },
    actions: {
        dispatchAddNewTodo: (context, payload: Todo) => {
            context.commit('commitNewTodo', payload);
        },
        dispatchAddInitialTodos: (context, payload: Array<Todo>) => {
            context.commit('clearTodos');
            payload.forEach((todo) => {
                context.commit('commitNewTodo', todo);
            });
        }
    }
})
