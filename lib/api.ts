export const API_BASE = "http://localhost:8000";

export const api = {
  register: `${API_BASE}/copyright/register/`,
  moderateList: `${API_BASE}/moderate/list`,
  approve: (id: number) => `${API_BASE}/moderate/${id}/approve`,
  publicRecords: `${API_BASE}/public-records`,
  purchase: (id: number) => `${API_BASE}/license/${id}/purchase`,
  record: (id: number) => `${API_BASE}/record/${id}`,
  registerUser: `${API_BASE}/auth/register`,
  loginUser: `${API_BASE}/auth/token`,
};
