export async function getClubCode(token, userId) {
  try {
    const response = await fetch(
      `https://club-management-service.azurewebsites.net/api/v1/members?userId=${userId}&roleId=1`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.ok) {
      const resData = await response.json();
      return resData.data[0].clubId;
    }
  } catch (error) {
    console.log(error);
  }
}
