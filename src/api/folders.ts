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
