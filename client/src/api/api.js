import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5055/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// ========== TOURS ==========
export const getTours = (status, agencyId) => {
    let url = '/tours';

    // Build query string dynamically
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (agencyId) params.append('agencyId', agencyId);

    if ([...params].length > 0) {
        url += `?${params.toString()}`;
    }

    return api.get(url);
};

export const getTourById = (id) => api.get(`/tours/${id}`);
export const createTour = (data) => api.post('/tours', data);
export const updateTour = (id, data) => api.put(`/tours/${id}`, data);
export const deleteTour = (id) => api.delete(`/tours/${id}`);
export const approveTour = (id) => api.put(`/tours/${id}/approve`);
export const rejectTour = (id) => api.put(`/tours/${id}/reject`);

// ========== BOOKINGS ==========
export const getBookings = (filters = {}) => {
    const params = new URLSearchParams(filters);
    const url = `/bookings${params.toString() ? '?' + params.toString() : ''}`;
    return api.get(url);
};

export const getBookingById = (id) => api.get(`/bookings/${id}`);
export const createBooking = (data) => api.post('/bookings', data);
export const updateBookingStatus = (id, data) => api.patch(`/bookings/${id}`, data);
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);

// ========== USERS ==========
export const getUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);
export const createUser = (data) => api.post('/users', data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const loginUser = (credentials) => api.post('/users/login', credentials);

// ========== COMPLAINTS ==========
export const getComplaints = () => api.get('/complaints');
export const createComplaint = (data) => api.post('/complaints', data);
export const updateComplaint = (id, data) => api.patch(`/complaints/${id}`, data);

export default api;
