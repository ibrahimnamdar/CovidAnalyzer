const baseUrl = "https://covidanalyzerai.herokuapp.com";

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

export async function getTweetScores() {
  const settings = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
  };
  const response = await fetch(
    `${baseUrl}/tweetScores/get_tweet_scores/`,
    settings
  );
  return response.json();
}

export async function getFrequentEntities() {
  const settings = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
  };
  const response = await fetch(
    `${baseUrl}/tweetScores/get_frequent_entities/`,
    settings
  );
  return response.json();
}

export async function getLatestTweets() {
  const settings = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
  };
  const response = await fetch(
    `${baseUrl}/tweets?format=json&limit=100`,
    settings
  );
  return response.json();
}

export async function getMostUsedWords() {
  const settings = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
  };
  const response = await fetch(
    `${baseUrl}/tweetScores/get_most_used_words/`,
    settings
  );
  return response.json();
}

export async function getSearchData(keyword) {
  const settings = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
  };
  const response = await fetch(
    `${baseUrl}/tweets/search?keyword=${keyword}`,
    settings
  );
  return response.json();
}

export async function getUsername(data) {
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
