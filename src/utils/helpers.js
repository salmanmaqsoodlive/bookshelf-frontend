export default function isAuthenticated() {
  const user = localStorage.getItem("user");
  const accessToken = localStorage.getItem("access_token");
  return user && accessToken ? true : false;
}
