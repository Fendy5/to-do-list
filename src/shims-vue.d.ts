declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
declare module "*.svg" {
  const content: any
  export default content
}

declare interface ImageResponse {
  code: number
  image_url: string
  message: string
}

export interface RequireContext { resolve: Function, keys: Function, id: string | number | null }
