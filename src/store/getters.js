const getters = {
  username: state => state.User.username,
  password: state => state.User.password,
  token: state => state.User.token,
  plan: state => state.Plan.plan,
  book: state => state.Book.book,
  article: state => state.Article.article,
  color: state => state.Color.color
}
export default getters
