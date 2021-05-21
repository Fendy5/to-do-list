export const isValidateEmail = (email: string) => {
  const reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/
  return reg.test(email)
}

export const isValidatePassword = (password: string) => {
  return password.length >= 8
}
