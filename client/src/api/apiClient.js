const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = async (endpoint, options = {}) => {
  const config = {
    ...options,
    headers: { ...options.headers },
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      let errorMessage;

      switch (response.status) {
        case 401:
          errorMessage = "You must be logged in to access this resource.";
          break;
        case 403:
          errorMessage = "You do not have permission to perform this action.";
          break;
        case 404:
          errorMessage = "The requested resource could not be found.";
          break;
        case 500:
          errorMessage = "A server error occurred. Please try again later.";
          break;
        default:
          errorMessage = "An unexpected error occurred. Please try again.";
      }

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (err) {
        console.error("Failed to parse error response:", err);
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    if (error.name === "TypeError") {
      console.error("Network error:", error);
      throw new Error("Network error: Please check your internet connection.");
    }

    console.error("API Client error:", error);
    throw new Error(error.message || "An unexpected error occurred.");
  }
};
