/**
 * @Author fendy
 * @CreateTime 2022/10/3 23:02
 * @Description
 */
export interface ReuseToDoListProp {
  name: string
  list_id: string
  folder_id: string
  is_top: boolean
}

export interface TodoItemProp {
  id: string
  done: boolean | null
  allDone?: []
  label: string
  editAble: boolean
  isParent?: boolean
  children?: TodoItemProp[]
}
