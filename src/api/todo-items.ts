import request from "@/utils/request"

export const updateItemsApi = (data: any, id: string) =>
  request({
    url: `/api/v1/todo-items/${id}`,
    method: 'put',
    data
  })

export const getTodoListApi = (params: any) =>
  request({
    url: '/api/v1/todo-items',
    method: 'get',
    params
  })
