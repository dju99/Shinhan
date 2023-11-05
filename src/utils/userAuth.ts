export const userAuth = () => {
  const token = localStorage.getItem("login-token");
  return !!token; // token이 존재하면 true, 그렇지 않으면 false 반환
};
