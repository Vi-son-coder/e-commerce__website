async function request({ reqPATH = "", method = "GET", data = null }) {
  let url = `http://localhost:3000${reqPATH}`;
  const option = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data && (method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE")) {
    option.body = JSON.stringify(data);
  }

  if ( method === "GET") {
    const searchParams = new URLSearchParams(data);
    if(searchParams){
      url += `?${searchParams}`;
    }
  }
  try {
    const res = await fetch(url, option);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export { request };
 