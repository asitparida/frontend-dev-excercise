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
            return state.todos.filter((x: Todo) => !x.done).sort((x: Todo, y: Todo) => {
                return (new Date(x.date)).getTime() - (new Date(y.date)).getTime();
            });
        },
        getDoneTodos: (state) => {
            return state.todos.filter((x: Todo) => x.done).sort((x: Todo, y: Todo) => {
                x.updated = x.updated || new Date(x.date);
                y.updated = y.updated || new Date(y.date);
                return (new Date(x.updated)).getTime() - (new Date(y.updated)).getTime();
            });
        }
    },
    mutations: {
        clearTodos: (state) => {
            Vue.set(state, 'todos', []);
        },
        commitNewTodo: (state, payload: Todo) => {
            Vue.set(state, 'todos', [...state.todos, payload]);
        },
        commitTodoAsDone: (state, payload: string) => {
            state.todos.forEach((todo: Todo) => {
                if (todo.id === payload) {
                    todo.done = true;
                    todo.updated = new Date();
                }
            });
            Vue.set(state, 'todos', [...state.todos]);
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
        },
        markTodoAsDone:(context, payload: string) => {
            context.commit('commitTodoAsDone', payload);
        }
    }
})
