export default function isAuthenticated() {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    const accessToken = localStorage.getItem("access_token");
    return user && accessToken ? true : false;
  }
}
