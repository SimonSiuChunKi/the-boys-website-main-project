export const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
}
export const handleLogout = (navigate) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
};