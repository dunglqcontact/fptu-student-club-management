export async function getUserRank(token) {
  try {
    const response = await fetch(
      "https://club-management-service.azurewebsites.net/api/v1/users/rank",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error.code);
  }
}

export async function getClubRank(token) {
  try {
    const response = await fetch(
      "https://club-management-service.azurewebsites.net/api/v1/clubs/rank",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error.code);
  }
}
