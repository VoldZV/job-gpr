import {v1} from "uuid";

// import {TodolistType} from "../../Types/state-types";
// import {
//     addTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC,
//     todolistReducer
// } from "./todolist-reducer";
//
//
// let todolistId1 = v1()
// let todolistId2 = v1()
//
//
// let initialState: TodolistType[]
//
// beforeEach(() => {
//     initialState = [
//         {id: todolistId1, title: 'What to Buy', filter: 'all'},
//         {id: todolistId2, title: 'What to Learn', filter: 'all'},
//     ]
// })
//
// test('correct todolist should be added', () => {
//     const newTodolistId = v1()
//     const newState = todolistReducer(initialState, addTodolistAC(newTodolistId, 'NewTodolist'))
//
//     expect(newState.length).toBe(3)
//     expect(newState[0].id).toBe(todolistId1)
//     expect(newState[2].id).toBe(newTodolistId)
//     expect(newState[2].title).toBe('NewTodolist')
// })
//
// test('correct todolist should be removed', () => {
//     const newState = todolistReducer(initialState, removeTodolistAC(todolistId2))
//
//     expect(newState.length).toBe(1)
//     expect(newState[0].id).toBe(todolistId1)
//     expect(newState[0].title).toBe('What to Buy')
//     expect(newState[0].filter).toBe('all')
// })
//
// test('todolist title should be changed', () => {
//     const newState = todolistReducer(initialState, changeTodolistTitleAC(todolistId1, 'NewTitle'))
//
//     expect(newState.length).toBe(2)
//     expect(newState[0].id).toBe(todolistId1)
//     expect(newState[1].id).toBe(todolistId2)
//     expect(newState[0].title).toBe('NewTitle')
//     expect(newState[1].title).toBe('What to Learn')
// })
//
// test('todolist filter should be changed', () => {
//     const newState = todolistReducer(initialState, changeTodolistFilterAC(todolistId2, 'completed'))
//
//     expect(newState.length).toBe(2)
//     expect(newState[0].id).toBe(todolistId1)
//     expect(newState[1].id).toBe(todolistId2)
//     expect(newState[0].title).toBe('What to Buy')
//     expect(newState[1].title).toBe('What to Learn')
//     expect(newState[0].filter).toBe('all')
//     expect(newState[1].filter).toBe('completed')
// })