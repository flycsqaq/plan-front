export function getDate(time = new Date()) {
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  return `${year}-${month}-${day}`
}
