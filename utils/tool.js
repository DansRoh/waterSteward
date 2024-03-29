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

// 身份证校验 410726198705305846
export function validateIdNumber(idCard) {
	// 清除空格
	idCard = idCard.replace(/\s/g, '');
	// 身份证号码长度应该为 18
	if (idCard.length !== 18) {
		return false;
	}
	// 身份证号码中的前 17 位应该为数字
	if (!/^\d{17}(\d|x)$/i.test(idCard)) {
		return false;
	}
	// 校验身份证号码中的最后一位
	// 加权因子
	const factors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
	// 校验码
	const parityBit = ['1', '0', 'x', '9', '8', '7', '6', '5', '4', '3', '2'];
	let sum = 0;
	for (let i = 0; i < 17; i++) {
		sum += parseInt(idCard.charAt(i)) * factors[i];
	}
	if (parityBit[sum % 11] !== idCard.charAt(17).toLowerCase()) {
		return false;
	}
	return true;
}

// 时间格式转换
export function formatDateTime(dateTimeString, type) {
	const date = new Date(dateTimeString);
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // padStart方法用于补齐数字长度
	const day = date.getDate().toString().padStart(2, '0');
	const hours = date.getHours();
	const minutes = date.getMinutes();

	if (type === 1) {
		return "" + year + month + day
	}
	return `${year}年${month}月${day}日 ${hours}:${minutes.toString().padStart(2, '0')}`;
}

// return当前时间以YYYY-MM格式
export function formatCurDate() {
	const currentDate = new Date();

	// 获取年份和月份
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');

	// 构造'YYYY-MM'格式的字符串
	return `${year}-${month}`;
}

// 根据时间戳计算相差天数
export function getDaysBetweenTimestamps(timestamp1, timestamp2) {
	const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
	const timeDifference = Math.abs(timestamp1 - timestamp2); // difference in milliseconds
	return Math.floor(timeDifference / oneDay);
}

// 计算出指定年月的最后一天
export function getMonthLastDay(date) {
	const currentDate = new Date(date);

	// 获取当前月份的第一天
	const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

	// 获取下一个月份的第一天
	const firstDayOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

	// 获取当前月份的最后一天
	const lastDayOfMonth = new Date(firstDayOfNextMonth - 1);

	// 输出当前月份的最后一天
	return lastDayOfMonth
}
// 时间格式MM-dd hh:mm:ss
export function formatDateTime01(date) {
	const now = new Date(date)
	const month = now.getMonth() + 1;
	const day = now.getDate();
	const hour = now.getHours();
	const minute = now.getMinutes();
	const second = now.getSeconds();
	const monthStr = (month < 10 ? "0" : "") + month;
	const dayStr = (day < 10 ? "0" : "") + day;
	const hourStr = (hour < 10 ? "0" : "") + hour;
	const minuteStr = (minute < 10 ? "0" : "") + minute;
	const secondStr = (second < 10 ? "0" : "") + second;
	const timeStr = monthStr + "-" + dayStr + " " + hourStr + ":" + minuteStr + ":" + secondStr;
	return timeStr
}

// 对象数组根据时间字段进行排序 data--进行排序的对象，  key--表示时间的字段名,    type----排序类型，0:顺时针， 1:逆时针
export function sortTime(data, key, type) {
	data.sort(function(a, b) {
		const dateA = new Date(a[key]);
		const dateB = new Date(b[key]);
		if (type === 0) {
			return dateA - dateB;
		} else {
			return dateB - dateA
		}
	});
	return data;
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