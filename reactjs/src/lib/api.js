const baseUrl = "http://127.0.0.1:8000";

export async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
}

export async function getToken(data) {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(`${baseUrl}/token-auth/`, settings);
  return response.json();
}

export async function getUsername(data) {
  console.log("getUsername" + JSON.stringify(data));
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
  };

  const response = await fetch(`${baseUrl}/core/current_user/`, settings);
  return response.json();
}

export async function registerUser(data) {
  console.log("registerUser" + JSON.stringify(data));
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(`${baseUrl}/users/`, settings);
  return response.json();
}
