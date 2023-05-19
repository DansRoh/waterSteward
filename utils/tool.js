// 一些常用方法的封装


// 调用微信支付
export const requestPaymentFun = (prepayId, nonceStr, timeStamp, signType, paySign) => {
	return new Promise((resolve, reject) => {
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: String(timeStamp),
			nonceStr,
			package: prepayId,
			signType,
			paySign,
			success: function(res) {
				resolve(res);
			},
			fail: function(err) {
				reject(err);
			}
		});
	});
}

// 页面滚动至指定目标
export const rollTarget = (targetName, that) => {
	const query = uni.createSelectorQuery().in(that)
	query.select(targetName).boundingClientRect((rect) => {
		if (!rect) return
		const screenHeight = uni.getSystemInfoSync().windowHeight
		if (rect.top < 0 || rect.top > screenHeight - 110) {
			uni.pageScrollTo({
				scrollTop: rect.top,
				duration: 300
			})
		}
	}).exec()
}

// 手机号校验
export function isValidPhoneNumber(phoneNumber) {
	const regex = /^1[3-9]\d{9}$/;
	return regex.test(phoneNumber);
}

// 时间格式转换
export function formatDateTime(dateTimeString) {
	const date = new Date(dateTimeString);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();

	return `${year}年${month}月${day}日 ${hours}:${minutes.toString().padStart(2, '0')}`;
}

// 防抖函数
export const debounce = (func, delay) => {
	let timer = null;
	return function(...args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
}

// 节流函数
export function throttle(func, delay) {
	let lastTime = 0;

	return function(...args) {
		const currentTime = new Date().getTime();
		if (currentTime - lastTime > delay) {
			func.apply(this, args);
			lastTime = currentTime;
		}
	};
}