const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    const message = `Error: ${response.status}`;
    throw new Error(message);
  }

  return response.json();
};

export { apiClient };
