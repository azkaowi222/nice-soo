const getUser = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8000/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export default getUser;
