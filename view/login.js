const API_URL = 'http://localhost:5500/api/v1';

document.querySelector('#login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    const response = await axios.post(`${API_URL}/login`, { email, password });

    localStorage.setItem('token', response.data.token);

    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

    try {
        window.location.href = './som.html';
    } catch (error) {
        console.log(error);
    }
});
