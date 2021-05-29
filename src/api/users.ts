import request from "@/utils/request"

export const login = (data: any) =>
  request({
    url: '/api/v1/login',
    method: 'post',
    data
  })

export const register = (data: any) =>
  request({
    url: '/api/v1/register',
    method: 'post',
    data
  })

export const getUserInfo = () =>
  request({
    url: '/api/v1/users/info',
    method: 'get'
  })
