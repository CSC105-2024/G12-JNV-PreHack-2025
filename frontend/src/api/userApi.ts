import api from './axiosInstance'

// --- Auth & User ---
export async function register(data: any) {
  return api.post('/user/register', data)
}

export async function login(data: any) {
  return api.post('/user/login', data)
}

export async function getProfile() {
  return api.get('/user/account')
}

export async function updateProfile(data: any) {
  return api.put('/user/account', data)
}

// --- Activity ---
export async function getActivities() {
  return api.get('/activity')
}

export async function createActivity(data: any) {
  return api.post('/activity', data)
}

// --- Participation ---
export async function joinActivity(activityId: string) {
  const userId = localStorage.getItem('userId')

  // 🔍 เช็กและ log
  if (!userId || !activityId) {
    console.warn('❌ joinActivity: userId or activityId is missing', { userId, activityId })
    throw new Error('User not logged in or activity ID missing')
  }

  return api.post('/participations', {
    userId,
    activityId,
    status: 'joined'
  })
}

export async function cancelParticipation(activityId: string) {
  const userId = localStorage.getItem('userId')
  if (!userId) throw new Error('User not logged in')

  // 🔍 เช็กว่า activityId ไม่ว่าง
  if (!activityId) throw new Error('Activity ID missing')

  const { data } = await api.get(`/participations/user/${userId}`)
  const found = data.find((p: any) => p.activityId === activityId)
  if (!found) throw new Error('Participation not found')

  return api.delete(`/participations/${found.id}`)
}

export async function getMyActivities() {
  const userId = localStorage.getItem('userId')
  if (!userId) throw new Error('User not logged in')
  return api.get(`/participations/user/${userId}`)
}

export async function getMyPastActivities() {
  const userId = localStorage.getItem('userId')
  if (!userId) throw new Error('User not logged in')
  return api.get(`/participations/user/${userId}`, {
    params: { pastOnly: true }
  })
}

// --- Review ---
export async function createReview(data: any) {
  return api.post('/review', data)
}

export async function getReviews(activityId: string) {
  return api.get('/review', { params: { activityId } })
}

export async function deleteReview(id: string) {
  return api.delete(`/review/${id}`)
}

// --- Request ---
export async function getAllRequests() {
  return api.get('/request')
}

export async function createRequest(data: any) {
  return api.post('/request', data)
}

