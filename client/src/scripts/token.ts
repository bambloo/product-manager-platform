export function validate_token() {
  const user_token = localStorage.getItem('user-token')
  if (!user_token) {
    return Promise.resolve()
  }
  return Promise.resolve()
}
