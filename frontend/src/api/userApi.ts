import api from './axiosInstance';

// --- Auth & User ---
export async function register(data: any) {
  return api.post('/user/register', data);
}

export async function login(data: any) {
  return api.post('/user/login', data);
}

export async function getProfile() {
  return api.get('/user/account');
}

export async function updateProfile(data: any) {
  return api.put('/user/account', data);
}

// --- Activity ---
export async function getActivities() {
  return api.get('/activity');
}

export async function createActivity(data: any) {
  return api.post('/activity', data);
}

// --- Participation (เพิ่มฟังก์ชันที่ขาด) ---
export async function joinActivity(activityId: string) {
  // สมมติ endpoint: POST /activity/:id/join
  return api.post(`/activity/${activityId}/join`);
}

export async function cancelParticipation(activityId: string) {
  // สมมติ endpoint: POST /activity/:id/cancel
  return api.post(`/activity/${activityId}/cancel`);
}

export async function getMyActivities() {
  // สมมติ endpoint: GET /activity/my
  return api.get('/activity/my');
}

export async function getMyPastActivities() {
  // สมมติ endpoint: GET /activity/mypast
  return api.get('/activity/mypast');
}

// --- Review ---
export async function createReview(data: any) {
  return api.post('/review', data);
}

export async function getReviews(activityId: string) {
  return api.get('/review', { params: { activityId } });
}

export async function deleteReview(id: string) {
  return api.delete(`/review/${id}`);
}

// เพิ่มใน userApi.ts
export async function getAllRequests() {
    return api.get('/requests');  // ปรับ endpoint ตาม backend จริง
  }
  
  export async function createRequest(data: any) {
    return api.post('/requests', data);  // ปรับ endpoint ตาม backend จริง
  }
  