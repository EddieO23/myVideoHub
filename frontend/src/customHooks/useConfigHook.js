export const useConfig = () => {
  const token = localStorage.getItem('token');
  const configWithJwt = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return {configWithJwt}
};
