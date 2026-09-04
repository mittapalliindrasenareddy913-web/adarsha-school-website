// Production REST API Service Layer for Adarsha E.M. School
// Connects React Public Website and Admin CMS directly to the Node.js + Express + MongoDB Backend.

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function fetchAPI(endpoint, options = {}) {
  const defaultOptions = {
    credentials: 'include', // Ensures HttpOnly JWT cookies are sent with requests
    headers: {}
  };

  if (options.body && !(options.body instanceof FormData)) {
    defaultOptions.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    });
  } catch (netErr) {
    console.error(`[API Fetch Error on ${endpoint}]`, netErr);
    throw new Error(`Unable to connect to backend server at ${API_BASE_URL}. Please ensure the Node.js backend server is running.`);
  }

  let data;
  try {
    data = await response.json();
  } catch (jsonErr) {
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication expired. Please log in to the admin panel again.');
      }
      throw new Error(`Server error (HTTP ${response.status})`);
    }
    throw new Error('Invalid response received from server.');
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentication expired. Please log in to the admin panel again.');
    }
    throw new Error(data?.message || `API Request Failed (HTTP ${response.status})`);
  }
  return data;
}

export const api = {
  // ==========================================
  // PUBLIC WEBSITE ENDPOINTS
  // ==========================================
  async getSiteSettings() {
    const res = await fetchAPI('/public/settings');
    return res.data;
  },

  async getAnnouncements() {
    const res = await fetchAPI('/public/announcements');
    return res.data;
  },

  async getAnnouncementBySlug(slug) {
    const res = await fetchAPI(`/public/announcements/${slug}`);
    return res.data;
  },

  async getEvents() {
    const res = await fetchAPI('/public/events');
    return res.data;
  },

  async getEventBySlug(slug) {
    const res = await fetchAPI(`/public/events/${slug}`);
    return res.data;
  },

  async getGallery() {
    const res = await fetchAPI('/public/gallery');
    return res.data;
  },

  async getFaculty() {
    const res = await fetchAPI('/public/faculty');
    return res.data;
  },

  async getAchievements() {
    const res = await fetchAPI('/public/achievements');
    return res.data;
  },

  async getFacilities() {
    const res = await fetchAPI('/public/facilities');
    return res.data;
  },

  async getAcademics() {
    const res = await fetchAPI('/public/academics');
    return res.data;
  },

  async submitAdmissionEnquiry(formData) {
    return await fetchAPI('/admissions', {
      method: 'POST',
      body: formData
    });
  },

  async submitContactEnquiry(formData) {
    return await fetchAPI('/contact', {
      method: 'POST',
      body: formData
    });
  },

  // ==========================================
  // AUTHENTICATION ENDPOINTS
  // ==========================================
  async adminLogin(email, password) {
    return await fetchAPI('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
  },

  async adminLogout() {
    return await fetchAPI('/auth/logout', {
      method: 'POST'
    });
  },

  async adminCheckAuth() {
    return await fetchAPI('/auth/me');
  },

  // ==========================================
  // ADMIN DASHBOARD & CMS ENDPOINTS
  // ==========================================
  async adminGetDashboardStats() {
    return await fetchAPI('/admin/dashboard-stats');
  },

  // Announcements
  async adminGetAnnouncements() {
    return await fetchAPI('/admin/announcements');
  },
  async adminCreateAnnouncement(data) {
    return await fetchAPI('/admin/announcements', { method: 'POST', body: data });
  },
  async adminUpdateAnnouncement(id, data) {
    return await fetchAPI(`/admin/announcements/${id}`, { method: 'PUT', body: data });
  },
  async adminDeleteAnnouncement(id) {
    return await fetchAPI(`/admin/announcements/${id}`, { method: 'DELETE' });
  },

  // Events
  async adminGetEvents() {
    return await fetchAPI('/admin/events');
  },
  async adminCreateEvent(data) {
    return await fetchAPI('/admin/events', { method: 'POST', body: data });
  },
  async adminUpdateEvent(id, data) {
    return await fetchAPI(`/admin/events/${id}`, { method: 'PUT', body: data });
  },
  async adminDeleteEvent(id) {
    return await fetchAPI(`/admin/events/${id}`, { method: 'DELETE' });
  },

  // Media (Photos & Videos)
  async adminGetMedia(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await fetchAPI(`/admin/media${query ? `?${query}` : ''}`);
  },
  async adminUploadMedia(formData) {
    return await fetchAPI('/admin/media/upload', {
      method: 'POST',
      body: formData
    });
  },
  async adminUpdateMedia(id, data) {
    return await fetchAPI(`/admin/media/${id}`, { method: 'PUT', body: data });
  },
  async adminDeleteMedia(id) {
    return await fetchAPI(`/admin/media/${id}`, { method: 'DELETE' });
  },

  // Gallery Albums
  async adminGetGalleryAlbums() {
    return await fetchAPI('/admin/gallery');
  },
  async adminCreateGalleryAlbum(data) {
    return await fetchAPI('/admin/gallery', { method: 'POST', body: data });
  },
  async adminUpdateGalleryAlbum(id, data) {
    return await fetchAPI(`/admin/gallery/${id}`, { method: 'PUT', body: data });
  },
  async adminDeleteGalleryAlbum(id) {
    return await fetchAPI(`/admin/gallery/${id}`, { method: 'DELETE' });
  },

  // Faculty
  async adminGetFaculty() {
    return await fetchAPI('/admin/faculty');
  },
  async adminCreateFaculty(data) {
    return await fetchAPI('/admin/faculty', { method: 'POST', body: data });
  },
  async adminUpdateFaculty(id, data) {
    return await fetchAPI(`/admin/faculty/${id}`, { method: 'PUT', body: data });
  },
  async adminDeleteFaculty(id) {
    return await fetchAPI(`/admin/faculty/${id}`, { method: 'DELETE' });
  },

  // Achievements
  async adminGetAchievements() {
    return await fetchAPI('/admin/achievements');
  },
  async adminCreateAchievement(data) {
    return await fetchAPI('/admin/achievements', { method: 'POST', body: data });
  },
  async adminUpdateAchievement(id, data) {
    return await fetchAPI(`/admin/achievements/${id}`, { method: 'PUT', body: data });
  },
  async adminDeleteAchievement(id) {
    return await fetchAPI(`/admin/achievements/${id}`, { method: 'DELETE' });
  },

  // Facilities
  async adminGetFacilities() {
    return await fetchAPI('/admin/facilities');
  },
  async adminCreateFacility(data) {
    return await fetchAPI('/admin/facilities', { method: 'POST', body: data });
  },
  async adminUpdateFacility(id, data) {
    return await fetchAPI(`/admin/facilities/${id}`, { method: 'PUT', body: data });
  },
  async adminDeleteFacility(id) {
    return await fetchAPI(`/admin/facilities/${id}`, { method: 'DELETE' });
  },

  // Academics
  async adminGetAcademics() {
    return await fetchAPI('/admin/academics');
  },
  async adminCreateAcademic(data) {
    return await fetchAPI('/admin/academics', { method: 'POST', body: data });
  },
  async adminUpdateAcademic(id, data) {
    return await fetchAPI(`/admin/academics/${id}`, { method: 'PUT', body: data });
  },
  async adminDeleteAcademic(id) {
    return await fetchAPI(`/admin/academics/${id}`, { method: 'DELETE' });
  },

  // Enquiries
  async adminGetUnreadCounts() {
    return await fetchAPI('/admissions/admin/unread-count');
  },
  async adminGetAdmissionEnquiries(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await fetchAPI(`/admissions/admin${query ? `?${query}` : ''}`);
  },
  async adminMarkAdmissionRead(id) {
    return await fetchAPI(`/admissions/admin/${id}/read`, { method: 'PATCH' });
  },
  async adminUpdateAdmissionStatus(id, payload) {
    const body = typeof payload === 'string' ? { status: payload } : payload;
    return await fetchAPI(`/admissions/admin/${id}`, { method: 'PATCH', body });
  },
  async adminDeleteAdmissionEnquiry(id) {
    return await fetchAPI(`/admissions/admin/${id}`, { method: 'DELETE' });
  },

  async adminGetContactEnquiries(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await fetchAPI(`/contact/admin${query ? `?${query}` : ''}`);
  },
  async adminMarkContactRead(id) {
    return await fetchAPI(`/contact/admin/${id}/read`, { method: 'PATCH' });
  },
  async adminUpdateContactStatus(id, payload) {
    const body = typeof payload === 'string' ? { status: payload } : payload;
    return await fetchAPI(`/contact/admin/${id}`, { method: 'PATCH', body });
  },
  async adminDeleteContactEnquiry(id) {
    return await fetchAPI(`/contact/admin/${id}`, { method: 'DELETE' });
  },

  // Settings
  async adminGetSettings() {
    return await fetchAPI('/admin/settings');
  },
  async adminUpdateSettings(data) {
    return await fetchAPI('/admin/settings', { method: 'PUT', body: data });
  }
};
