const API_URL = 'http://localhost:5500/api/v1';

document.querySelector('#register-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.querySelector('#register-name').value;
    const email = document.querySelector('#register-email').value;
    const password = document.querySelector('#register-password').value;

    const response = await axios.post(`${API_URL}/register`, { name,email, password });
    localStorage.setItem('token', response.data.token);

    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

    try {
        window.location.href = './som.html';
    } catch (error) {
        console.error(error);
    }
});