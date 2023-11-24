import axios from '../utils/request'

// 封装登录的接口
export function sign(username, password) {
	return axios.post("/auth/login/", {
		username,
		password
	})
}
// 封装注册的接口
export function registration(username, email, password1, password2) {
	return axios.post("/auth/registration/", {
		username,
		email,
		password1,
		password2
	}
	)
}

// 封装读取用户信息的接口
export function user() {
	return axios.get("/auth/user/");
}