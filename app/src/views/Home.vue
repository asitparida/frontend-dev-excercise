<template>
    <div class="home">
        <h1>My Todos</h1>
        <div class="input-holder">
            <input placeholder="+ add new"/>
            <div class="color-types-holder">
                <div class="color-type" v-for="value in todoColorTypes" v-bind:style="{ backgroundColor: value }"></div>
            </div>
        </div>
        <div class="todo-holder">
            <div class="todo" v-for="value in todos">
                <label class="todo-label">{{value.title}}</label>
                <div class="todo-type">
                    <label class="todo-expiry">{{value.date}}</label>
                    <div class="todo-color-type" v-bind:style="{ backgroundColor: value.color }"></div>
                </div>
            </div>
        </div>
        <div class="todo-holder done-list">
            <h2>Done</h2>
            <div class="todo done" v-for="value in todos">
                <label class="todo-label">{{value.title}}</label>
                <div class="todo-type">
                    <label class="todo-expiry">{{value.date}}</label>
                    <div class="todo-color-type" v-bind:style="{ backgroundColor: value.color }">
                        <i class="material-icons">check</i>
                    </div>
                </div>
            </div>
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

        private initialTodos: Array<Todo> = [
            {
                "title": "Grocery shopping",
                "date": "20/08/2018",
                "color": "orange"
            },
            {
                "title": "Go to the beach",
                "date": "11/08/2018",
                "color": "blue"
            },
            {
                "title": "Call grandma",
                "date": "01/09/2018",
                "color": "green"
            }
        ];

        private colorTypes: Array<string> = [
            'orange',
            'blue',
            'green',
            'grey'
        ];

        created() {
            // TODO: push list of existing todos to the store
        }

        get todos() {
            return this.initialTodos;
            // TODO: get data from the store and display a todo item for each todo in the store
        }

        get todoColorTypes() {
            return this.colorTypes;
        }

        addNewTodo() {
            // TODO: add a new todo to the store
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
                &::placeholder,
                &::-webkit-input-placeholder {
                    font-size: small;
                    color: #A0A0A0;
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