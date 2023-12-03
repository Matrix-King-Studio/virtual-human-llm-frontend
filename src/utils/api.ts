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


//封装保存消息日志的接口
export function saveInfo(user_id,role,content,status,rebuid){
	return axios.post("/conversation/save/",{
		user_id,
		role,
		content,
		status,
		rebuid
	})

}

// 调用获取消息日志的接口
export function historyInfo(user_id,days){
	return axios.post("/conversation/read/",{
		user_id,
		days
	})
}


//更新状态接口
export function update(user_id,status,time){
	return axios.post("/conversation/update/",{
		user_id,
		status,
		time
	})
}

export function updateContent(user_id,status, content,time){
	return axios.post("/conversation/update/",{
		user_id,
		status,
		content,
		time
	})
}