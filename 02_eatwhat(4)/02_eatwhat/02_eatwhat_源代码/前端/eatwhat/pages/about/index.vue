<template>
    <!-- index.wxml -->
    <view>
        <view class="updateList" v-for="(update, index) in updateList" :key="index">
            <view class="version">亲爱的用户， {{ update.version }}</view>

            <view class="date">{{ update.date }}</view>

            <view class="itemList" v-for="(item, index1) in update.updateItems" :key="index1">{{ item }}</view>
        </view>
        <view class="author">
            <image src="/static/eatimg.gif"></image>
        </view>
    </view>
</template>

<script>
//index.js
var util = require('../../unil/util.js');
export default {
    data() {
        return {
            updateList: [
                {
                    updateItems: [
                        '感谢您一直以来对我们的支持和信任。我们一直致力于为您提供更好的服务，帮助您找到满意的食物，享受美好的用餐时光。',
                        '今天，我们想对您表达最诚挚的感谢和祝福。愿您每天都能享受到美食的乐趣，品尝到更多的美味佳肴，与家人和朋友一起分享美食的快乐。',
                        '同时，我们也希望您能够关注我们的最新动态和优惠活动，以便更好地了解我们的服务和优惠信息。如果您有任何建议或意见，欢迎随时与我们联系，我们将竭诚为您服务。',
                        '最后，再次感谢您对我们的支持和信任，祝您用餐愉快！'
                    ]
                }
            ],

            update: {
                version: '',
                date: '',
                updateItems: []
            }
        };
    },
    onLoad: function () {},
    methods: {}
};
</script>
<style>


.updateList {
    margin: 30rpx;
    padding-bottom: 30rpx;
    border-bottom: 1rpx solid #e5e5e5;
}

.version {
    color: #353535;
    font-size: 50rpx;
    line-height: 48rpx;
}

.date {
    font-size: 30rpx;
    color: #888;
    line-height: 50rpx;
    margin-bottom: 20rpx;
}

.itemList {
    text-align: left;
    font-size: 30rpx;
    color: #353535;
    line-height: 70rpx;
}

.author {
    bottom: 0;
    width: 100%;
    color: #888;
    font-size: 40rpx;
    text-align: center;
}

.author image {
    width: 500rpx;
    height: 150rpx;
    margin: 0 auto;
    margin-bottom: 50rpx;
}
</style>
