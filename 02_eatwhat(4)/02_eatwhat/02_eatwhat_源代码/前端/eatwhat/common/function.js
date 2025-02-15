function numFilter(value) {

	let realVal = parseFloat(value).toFixed(2)

	return realVal
}

function RandomNumber(max) {
	//随机数函数
	const randomNumber = Math.floor(Math.random() * max);

	return randomNumber;
}

function timer() {
	var d = new Date();

	var hour = d.getHours(); //得到小时数

	var minute = d.getMinutes(); //得到分钟数

	var second = d.getSeconds(); //得到秒数

	d = hour + ':' + minute + ':' + second

	return d;
}

function temptoeat(time, value) {

	if (time < '10:00:00' && time > '4:00:00') {
		console.log('1')
		return '早餐'
	} else if (time < '15:00:00'&& time > '10:00:00') {
		if (value == '雨') {
			return '面'
		} else {
			return '午餐'
			console.log('2')
		}
	} else if (time < '21:00:00'&& time > '15:00:00') {
		if (value == '雨') {
			return '面'
		} else {
			return '晚餐'
		}
	} else {
		const num = Math.floor(Math.random() * 10);
		if (num <= 3) {
			return '烧烤'
		} else if (num <= 6) {
			return '烤鱼'
		} else {
			return '大排档'
		}
	}
}

function setData(obj) {
		let that = this;
		let keys = [];
		let val, data;
		Object.keys(obj).forEach(function(key) {
			keys = key.split(".");
			val = obj[key];
			data = that.$data;
			keys.forEach(function(key2, index) {
				if (index + 1 == keys.length) {
					that.$set(data, key2, val);
				} else {
					if (!data[key2]) {
						that.$set(data, key2, {});
					}
				}
				data = data[key2];
			});
		});
	}


	export default {
		numFilter,
		RandomNumber,
		timer,
		temptoeat,
		setData
	}