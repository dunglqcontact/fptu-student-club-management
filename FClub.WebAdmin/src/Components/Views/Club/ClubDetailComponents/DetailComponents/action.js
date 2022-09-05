export async function GetClubDetails(token, clubId) {
  try {
    const response = await fetch(
      "https://club-management-service.azurewebsites.net/api/v1/clubs?id=" +
        clubId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data[0];
    }
  } catch (error) {
    console.log(error);
  }
}

export async function GetManager(token, clubId) {
  try {
    const response = await fetch(
      `https://club-management-service.azurewebsites.net/api/v1/members?ClubId=${clubId}&RoleId=1&includeProperties=User`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data.data[0].user.name;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function GetTotalMember(token, clubId) {
  try {
    const response = await fetch(
      `https://club-management-service.azurewebsites.net/api/v1/members/count?ClubId=${clubId}`,
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
    console.log(error);
  }
}

export async function GetClubMember(token, clubId) {
  try {
    const response = await fetch(
      `https://club-management-service.azurewebsites.net/api/v1/members?clubId=${clubId}&includeProperties=User`,
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
    console.log(error);
  }
}
