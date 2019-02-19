<template>
    <div class="home">
        <h1>My Todos</h1>
        <div class="input-holder" >
            <input placeholder="+ add new" v-model="newTodoMsg" tabindex="0" @input="resetClass()" v-bind:class="{ invalid: inputInvalid }" />
            <div class="color-types-holder">
                <div class="color-type" tabindex="0" @keyup="onNewTodoKeyUp($event, value)" @click="addNewTodo(value)" v-for="value in todoColorTypes" v-bind:style="{ backgroundColor: value }"></div>
            </div>
        </div>
        <div class="todo-holder">
            <TodoItem v-for="todo in todos" :key="todo.id" v-on:mark-todo-as-done="markTodoAsDone(todo.id)"   v-bind:title="todo.title" v-bind:dt="todo.date" v-bind:color="todo.color" v-bind:done="false"></TodoItem>
        </div>
        <div class="todo-holder done-list">
            <h2>Done</h2>
            <TodoItem v-for="todo in doneTodos"  v-bind:title="todo.title" v-bind:dt="todo.date" v-bind:color="todo.color" v-bind:done="true"></TodoItem>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Todo} from "../data/todo";
    import TodoItem from "../components/TodoItem"; // @ is an alias to /src

    @Component({
        components: {
            TodoItem
        },
    })
    export default class Home extends Vue {

        private initialTodos: Array<Todo | any> = [
            {
                "title": "Grocery shopping",
                "date": "08/20/2018",
                "color": "orange"
            },
            {
                "title": "Go to the beach",
                "date": "08/11/2018",
                "color": "blue"
            },
            {
                "title": "Call grandma",
                "date": "09/01/2018",
                "color": "green"
            },
            {
                "title": "Buy gift for Valerie",
                "date": "09/01/2018",
                "color": "green",
                "done": true
            }
        ];

        private colorTypes: Array<string> = [
            'orange',
            'blue',
            'green',
            'grey'
        ];

        newTodoMsg: string = '';
        inputInvalid: boolean = false;
        

        created() {
            const initialTodos: Array<Todo | any> = ([] as Array<any>).concat(this.initialTodos);
            initialTodos.forEach(todo => {
                todo.id = `ID_${Math.floor(Math.random() * 10e6)}`;
            });
            this.$store.dispatch('dispatchAddInitialTodos', this.initialTodos);
        }

        get todos() {
            return  this.$store.getters.getTodos;
        }

        get doneTodos() {
            return  this.$store.getters.getDoneTodos;
        }

        get todoColorTypes() {
            return this.colorTypes;
        }
        addNewTodo(color: string) {
            this.newTodoMsg = this.newTodoMsg.trim();
            if (this.newTodoMsg !== '') {
                const dt = new Date();
                this.$store.dispatch('dispatchAddNewTodo', {
                    "id": `ID_${Math.floor(Math.random() * 10e6)}`,
                    "title": this.newTodoMsg,
                    "date": `${dt.getMonth() + 1 > 9 ? dt.getMonth() + 1 : '0' + (dt.getMonth() + 1)}/${dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate() }/${dt.getFullYear()}`,
                    "color": color
                });
                this.newTodoMsg = '';
                this.inputInvalid = false;
            } else {
                this.inputInvalid = true;
            }
        }
        onNewTodoKeyUp($event:  KeyboardEvent, color: string) {
            if ($event.keyCode && $event.keyCode === 13) {
                this.addNewTodo(color);
            }
        }
        markTodoAsDone(key: string) {
            this.$store.dispatch('markTodoAsDone', key);
        }
        resetClass() {
            this.inputInvalid = false;
        }
    }
</script>
<style scoped lang="scss">
    .home {
        display: flex;
        margin: 10vh auto 0 auto;
        width: 100%;
        max-width: 500px;
        flex-flow: column wrap;
        h1 {
            text-align: left;
            width: 100%;
            font-size: large;
            margin-bottom: 20px;
        }
        h2 {
            text-align: left;
            width: 100%;
            font-size: medium;
            margin-bottom: 10px;
            font-weight: 500;
        }
        .input-holder {
            border-radius: 20px;
            height: 48px;
            background: rgba(0,0,0,0.033);
            position: relative;
            display: flex;
            flex-flow: row wrap;
            input {
                order: 1;
                flex: 1;
                background: rgba(0,0,0,0.0);
                border: none;
                box-shadow: none;
                padding: 0 5px 0 15px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow-x: hidden;
                font-size: medium;
                color: #909090;
                outline: none;
                outline-offset: 1px;
                &::placeholder,
                &::-webkit-input-placeholder {
                    font-size: small;
                    color: #A0A0A0;
                }
                &:not(.invalid):focus {
                  outline: 1px dashed rgba(0,0,0,0.30);
                }
                &.invalid {
                    outline: 1px dashed rgba(red,0.50);
                }
            }
            .color-types-holder {
                padding: 0 10px;
                order: 2;
                flex: initial;
                display: flex;
                flex-flow: row;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                .color-type {
                    width: 24px;
                    height: 24px;
                    margin: 0 5px 0 0;
                    border-radius: 50%;
                    background: rgba(0,0,0,0.10);
                    position: relative;
                    outline-offset: 2px;
                    &:hover {
                        outline: 1px dashed rgba(0,0,0,0.15);
                    }
                    &:focus {
                        outline: 1px dashed rgba(0,0,0,0.30);
                    }
                }
            }
        }
        .todo-holder {
            display: flex;
            flex-flow: column wrap;
            margin: 10px 0;
            .todo {
                border-radius: 10px;
                height: 48px;
                background: rgba(0,0,0,0.05);
                position: relative;
                display: flex;
                flex-flow: row wrap;
                margin: 5px 0;
                &.done {
                    background: rgba(0,0,0,0.025);
                    .todo-label {
                        color: #C0C0C0;
                    }
                    .todo-type {
                        .todo-expiry {
                            color: #C0C0C0;
                        }
                        .todo-color-type {
                            opacity: 0.60;
                            text-align: center;
                            cursor: default;
                            i {
                                font-size: small;
                                line-height: 24px;
                                color: #fff;
                            }
                        }
                    }
                }
                .todo-label {
                    order: 1;
                    flex: 1;
                    background: rgba(0,0,0,0.0);
                    border: none;
                    box-shadow: none;
                    padding: 0 5px 0 15px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow-x: hidden;
                    font-size: medium;
                    color: #565656;
                    outline: none;
                    line-height: 48px;
                    margin: 0;
                }
                .todo-type {
                    padding: 0 10px;
                    order: 2;
                    flex: initial;
                    display: flex;
                    flex-flow: row;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    .todo-expiry {
                        color: #909090;
                        font-size: small;
                    }
                    .todo-color-type {
                        width: 24px;
                        height: 24px;
                        margin: 0 5px 0 15px;
                        border-radius: 5px;
                        background: rgba(0,0,0,0.10);
                    }
                }
            }
        }
    }
</style>