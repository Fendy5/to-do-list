import request from "@/utils/request"

export const getTodoListsApi = (params: any) =>
  request({
    url: '/api/v1/todo-lists',
    method: 'get',
    params
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
    url: `/api/v1/folders/${id}`,
    method: 'put',
    data
  })
