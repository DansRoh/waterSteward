// 请求封装
export const request = (url, method = 'GET', data = {}) => {
	let baseURL = 'https://iheshui.civilizationdata.com'
	url = baseURL + url
	let timeout = 60000
	const header = {
		'Content-Type': 'application/json',
		'Accept': 'application/json;version=1'
	}
	if (method === 'upload') {
		method = "POST"
		header['Content-Type'] = 'multipart/form-data'
	}
	return new Promise((resolve, reject) => {
		
		uni.request({
			url,
			method,
			data,
			header: {...header, 'Authorization': 'Token ' + uni.getStorageSync("token")},
			timeout,
			success(res) {
				resolve(res)
			},
			fail(err) {
				resolve(err)
			}
		})
	})
}