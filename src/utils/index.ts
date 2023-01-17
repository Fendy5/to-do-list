/**
 * @Author fendy
 * @CreateTime 2022/11/13 00:56
 * @Description
 */

// 复制文本
export const copyText = (content: string) => {
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.setAttribute('value', content)
  input.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
  }
  document.body.removeChild(input)
}

// 是否为移动端
export const isMobile = () => /Mobi|Android|iPhone/i.test(navigator.userAgent)
