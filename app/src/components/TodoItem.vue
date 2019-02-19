<template>
    <div class="todo">
        <label class="todo-label">{{title}}</label>
        <div class="todo-type">
            <label class="todo-expiry">{{dt}}</label>
            <div class="todo-color-type" v-bind:style="{ backgroundColor: color }"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        props: {
            title: String,
            dt: String,
            color: String
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
</style>
