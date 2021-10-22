import Axios from 'axios';

const auth_key = 'auth-shop';
let auth = JSON.parse(localStorage.getItem(auth_key));
const user = auth ? auth.user : '';
const jwt = auth ? auth.jwt : '';
const api_endpoint = process.env.VUE_APP_SHOP_ENDPOINT || 'http://localhost:8000';

export default {
    isAuthen() {
        return user !== '' && jwt !== '';
    },
    getApiHeader() {
        if (jwt !== '') {
            return {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            };
        }
        return {};
    },
    getUser() {
        return user;
    },

    getJwt() {
        return jwt;
    },
    async login({ email, password }) {
        try {
            let url = `${api_endpoint}/api/auth/login`;
            let body = {
                email: email,
                password: password,
            };
            let res = await Axios.post(url, body);
            if (res.status === 200) {
                localStorage.setItem(auth_key, JSON.stringify(res.data));
                return {
                    success: true,
                    user: res.data.user,
                    jwt: res.data.jwt,
                };
            } else {
                console.log('Login Fail', res);
            }
        } catch (e) {
            if (e.response.status == 401) {
                return {
                    success: false,
                    error: { error: ['Wrong Email Or Password'] },
                };
            }
            return {
                success: false,
                error: e.response.data,
            };
        }
    },

    async register({ email, password, firstname, lastname, address }) {
        try {
            let url = `${api_endpoint}/api/auth/register`;
            let body = {
                email: email,
                firstname: firstname,
                lastname: lastname,
                password: password,
                address: address,
            };
            let res = await Axios.post(url, body);
            console.log(res);
            if (res.status === 200) {
                localStorage.setItem(auth_key, JSON.stringify(res.data));
                return {
                    success: true,
                    user: res.data.user,
                    jwt: res.data.jwt,
                };
            } else {
                console.log('Register Fail', res);
            }
        } catch (e) {
            if (e.response.status == 400)
                return {
                    success: false,
                    error: e.response.data,
                };
        }
    },

    logout() {
        localStorage.removeItem(auth_key);
    },

    async fetchUser({ id }) {
        let url = api_endpoint + '/users/' + id;
        let header = this.getApiHeader();
        let res = await Axios.get(url, header);
        return res.data;
    },
};

// export const
