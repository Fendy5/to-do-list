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

export const uploadAvatarApi = (data: any) =>
  request({
    baseURL: '/image-api',
    url: '/api/v1/upload',
    method: 'post',
    data
  })

export const updateAvatarApi = (data: any) =>
  request({
    url: '/api/v1/users/avatar',
    method: 'post',
    data
  })

export const updateUserApi = (data: any) =>
  request({
    url: '/api/v1/users',
    method: 'post',
    data
  })

export const forgetApi = (data: any) =>
  request({
    url: '/api/v1/forget',
    method: 'post',
    data
  })

export const updatePasswordApi = (data: any) =>
  request({
    url: '/api/v1/update-password',
    method: 'put',
    data
  })

