<template>
    <div class="todo" v-bind:class="{ done: done }">
        <label class="todo-label">{{title}}</label>
        <div class="todo-type">
            <label class="todo-expiry">{{dt}}</label>
            <template v-if="done">
                <div class="todo-color-type" v-bind:style="{ backgroundColor: color }">
                    <i class="material-icons" >done</i>
                </div>
            </template>
            <template v-if="!done">
                <div class="todo-color-type" v-bind:style="{ backgroundColor: color }" v-on:click="$emit('mark-todo-as-done')"></div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        props: {
            title: String,
            dt: String,
            color: String,
            done: Boolean
        }
    })
    export default class TodoItem extends Vue {
    }
</script>

<style scoped lang="scss">
    .todo {
        border-radius: 10px;
        height: 48px;
        background: rgba(0,0,0,0.05);
        position: relative;
        display: flex;
        flex-flow: row wrap;
        margin: 5px 0;
        animation: appear-in 0.3s linear 0s forwards;
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
                    opacity: 0.50;
                    text-align: center;
                    cursor: default;
                    i {
                        opacity: 1;
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
            .todo-expiry {
                color: #909090;
                font-size: small;
            }
            .todo-color-type {
                cursor: pointer;
                width: 24px;
                height: 24px;
                margin: 0 5px 0 15px;
                border-radius: 5px;
                background: rgba(0,0,0,0.10);
            }
        }
    }
    @keyframes appear-in {
        0% {
            opacity: 0;
            transform: translateY(-10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }
</style>
