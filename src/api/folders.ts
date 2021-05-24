import request from "@/utils/request"

export const addFolderApi = (data: any) =>
  request({
    url: '/api/v1/folders',
    method: 'post',
    data
  })

export const getFoldersApi = () =>
  request({
    url: '/api/v1/folders',
    method: 'get'
  })

export const deleteFoldersApi = (id: number) =>
  request({
    url: `/api/v1/folders/${id}`,
    method: 'delete'
  })

export const updateFoldersApi = (data: any, id: number) =>
  request({
    url: `/api/v1/folders/${id}`,
    method: 'put',
    data
  })
