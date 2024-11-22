const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = async (endpoint, options = {}) => {
  const config = {
    ...options,
    headers: { ...options.headers },
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    return response.json();
  } catch (error) {
    console.error("Network error:", error);
    return { error: error.message };
  }
};
