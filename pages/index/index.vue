<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<text class="title">你更像lovelive的谁</text>
		<button type="primary" open-type="getUserInfo"
			@getuserinfo="({ userInfo }) => start('muse')(userInfo)">μ's</button>
		<button type="primary" open-type="getUserInfo"
			@getuserinfo="({ userInfo }) => start('aqours')(userInfo)">Aqours</button>
		<button type="primary" open-type="getUserInfo" @getuserinfo="start">开始测试</button>
	</view>
</template>

<script setup lang="ts">
	const start = (team : string) => (userInfo : UniApp.GetUserInfoRes) => {
		uni.setStorage({
			key: 'userInfo',
			data: userInfo
		})

		uni.navigateTo({
			url: `/pages/form/index?team=${team}`,
		})
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.title {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 50rpx;
	}
</style>