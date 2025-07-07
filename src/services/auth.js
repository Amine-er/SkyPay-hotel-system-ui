export const login = async ({ username, password }) => {
  const formData = new URLSearchParams();
  formData.append('client_id', 'hotel-frontend');
  formData.append('username', username);
  formData.append('password', password);
  formData.append('grant_type', 'password');

  const realmUrl = import.meta.env.VITE_KEYCLOAK_REALM_URL;

  const response = await fetch(realmUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error_description || 'Login failed.');
  }

  return await response.json();
};
