import { getAuthToken } from "../services/auth.storage";

async function request({ reqPATH = "", method = "GET", data = null }) {
  let url = `http://localhost:3000${reqPATH}`;
  const token = getAuthToken();
  const option = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) option.headers.Authorization = `Bearer ${token}`;

  if (data && (method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE")) {
    option.body = JSON.stringify(data);
  }

  if ( method === "GET") {
    const searchParams = new URLSearchParams(data);
    if(searchParams){
      url += `?${searchParams}`;
    }
  }
  return fetch(url, option);
}

export { request };
 