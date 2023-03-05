import request from "@/utils/request"
import { ReuseToDoListProp } from '@/types/todo-list'

export const getTodoListsApi = (params: any) =>
  request({
    url: '/api/v1/todo-lists',
    method: 'get',
    params
  })

export const getTodoDetailApi = (id: string) =>
  request({
    url: `/api/v1/get-list/${id}`,
    method: 'get'
  })

export const addTodoListsApi = (data: any) =>
  request({
    url: '/api/v1/todo-lists',
    method: 'post',
    data
  })

export const deleteTodoListsApi = (id: string) =>
  request({
    url: `/api/v1/todo-lists/${id}`,
    method: 'delete'
  })

export const updateTodoListsApi = (data: any, id: string) =>
  request({
    url: `/api/v1/todo-lists/${id}`,
    method: 'put',
    data
  })

export const updateItemsApi = (data: any, id: string) =>
  request({
    url: `/api/v1/todo-items/${id}`,
    method: 'put',
    data
  })

// 获取今天的ToDoList Id
export const getTodayListApi = () =>
  request({
    url: `/api/v1/get-today`,
    method: 'get'
  })

// 置顶api
export const topApi = (id: string, data: { cancel: boolean }) =>
  request({
    url: `/api/v1/todo-lists/top/${id}`,
    method: 'put',
    data
  })

export const reuseTodoListApi = (data: ReuseToDoListProp) =>
  request({
    url: `/api/v1/reuse-todo-list`,
    method: 'post',
    data
  })

// 获取TODOList详情，不含文件夹
export const getTodoListApi = (id: string) =>
  request({
    url: `/api/v1/get-list/${id}`,
    method: 'get'
  })

// 获取TODOList详情，不含文件夹
export const setTodoAuthApi = (id: string, data: { auth: number | null }) =>
  request({
    url: `/api/v1/todo-auth/${id}`,
    method: 'put',
    data
  })







