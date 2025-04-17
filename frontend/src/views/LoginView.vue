<template>
    <div class="auth-container">
        <h2>Login</h2>
        <form @submit.prevent="login" class="auth-form">
            <input v-model="credentials.username" placeholder="Username" required />
            <input v-model="credentials.password" type="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
        <p>Not registered? <router-link to="/register">Register</router-link></p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            credentials: {username: '', password: ''}
        };
    },
    methods:
    {
        async login() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/token/', this.credentials);
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                this.$router.push('/')
            } catch (error) {
                alert('Login failed')
            };
        }
    }
};
</script>

<style scoped>
    .auth-container {
        max-width: 400px;
        margin: 100px auto;
        padding: 30px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        text-align: center;
    }

    h2 {
        color: #2c3e50;
        margin-bottom: 20px;
    }

    .auth-form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    input {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 10px;
        font-size: 16px;
        transition: border-color 0.3s;
    }

    input:focus {
        border-color: #42b983;
        outline: none;
    }

    button {
        padding: 12px;
        background: #42b983;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        transition: background 0.3s;
    }

    button:hover {
        background: #359c6d;
    }
</style>