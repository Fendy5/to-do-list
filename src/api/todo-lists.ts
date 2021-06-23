import request from "@/utils/request"

export const getTodoListsApi = (params: any) =>
  request({
    url: '/api/v1/todo-lists',
    method: 'get',
    params
  })

export const getTodoDetailApi = (id: string) =>
  request({
    url: `/api/v1/todo-lists/${id}`,
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
