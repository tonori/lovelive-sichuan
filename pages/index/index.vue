<template>
	<view class="content" :style="{height: windowHeight + 'px'}">
		<image class="bg" src="https://mp-2c99f6c1-3ff7-4d9a-8efd-ec1c8e02128a.cdn.bspapp.com/static/page_main.jpg">
		</image>
		<view class="options">


			<view class="miu-btn-view">
				<image class="miu-btn"
					src="https://mp-2c99f6c1-3ff7-4d9a-8efd-ec1c8e02128a.cdn.bspapp.com/static/btn_miu.png"></image>
				<button type="primary" open-type="getUserInfo"
					@getuserinfo="({ userInfo }) => start('muse')(userInfo)">muse</button>
			</view>

			<view class="aqours-btn-view">
				<image class="aqours-btn"
					src="https://mp-2c99f6c1-3ff7-4d9a-8efd-ec1c8e02128a.cdn.bspapp.com/static/btn_aqours.png"></image>
				<button type="primary" open-type="getUserInfo"
					@getuserinfo="({ userInfo }) => start('aqours')(userInfo)">aqours</button>
			</view>

			<view class="lian-btn-view">
				<image class="lian-btn"
					src="https://mp-2c99f6c1-3ff7-4d9a-8efd-ec1c8e02128a.cdn.bspapp.com/static/btn_lian.png"></image>
				<button type="primary" open-type="getUserInfo"
					@getuserinfo="({ userInfo }) => start('lian')(userInfo)">lian</button>
			</view>

			<view class="liella-btn-view">
				<image class="liella-btn"
					src="https://mp-2c99f6c1-3ff7-4d9a-8efd-ec1c8e02128a.cdn.bspapp.com/static/btn_liella.png"></image>
				<button type="primary" open-type="getUserInfo"
					@getuserinfo="({ userInfo }) => start('liella')(userInfo)">liella</button>
			</view>

			<view class="hx-btn-view">
				<image class="hx-btn"
					src="https://mp-2c99f6c1-3ff7-4d9a-8efd-ec1c8e02128a.cdn.bspapp.com/static/btn_hx.png"></image>
				<button type="primary" open-type="getUserInfo"
					@getuserinfo="({ userInfo }) => start('hx')(userInfo)">hx</button>
			</view>
		</view>
	</view>
</template>
<!--  -->
<script setup lang="ts">
	import { ref } from 'vue';
	import { onLoad } from "@dcloudio/uni-app"
	const start = (team : string) => (userInfo : UniApp.GetUserInfoRes) => {
		uni.setStorage({
			key: 'userInfo',
			data: userInfo
		})

		uni.navigateTo({
			url: `/pages/form/index?team=${team}`,
		})/*  */
	}

	const windowHeight = ref(0);

	onLoad((option) => {
		uni.getSystemInfo({
			success: (res) => {
				let width = res.windowWidth;
				let height = res.windowHeight;
				windowHeight.value = height;
				console.log('width', width);
				console.log('height', height);
			}
		});
	})
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		height: 100%;
	}

	.bg {
		width: 100%;
		height: 100%;
		margin-top: 0rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.title {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 50rpx;
	}

	.options {
		position: absolute;
		left: 300rpx;
		top: 600rpx;
	}

	.options>button {
		margin: 20rpx 0;
	}

	.img-btn-view {
		position: relative;
	}

	.miu-btn-view>button {
		background-color: transparent;
		color: transparent;
		width: 270rpx;
		height: 180rpx;
		left: -210rpx;
		top: -50rpx;
	}

	.miu-btn {
		position: absolute;
		width: 530rpx;
		height: 240rpx;
		left: -345rpx;
		top: -75rpx;
	}

	.aqours-btn-view>button {
		background-color: transparent;
		color: transparent;
		width: 270rpx;
		height: 180rpx;
		left: 105rpx;
		top: -230rpx;
	}

	.aqours-btn {
		position: absolute;
		width: 400rpx;
		height: 200rpx;
		left: 40rpx;
		top: -50rpx;
	}

	.lian-btn-view>button {
		background-color: transparent;
		color: transparent;
		width: 270rpx;
		height: 180rpx;
		left: -52rpx;
		top: 45rpx;
	}

	.lian-btn {
		position: absolute;
		width: 400rpx;
		height: 200rpx;
		left: -120rpx;
		top: 400rpx;
	}

	.liella-btn-view>button {
		background-color: transparent;
		color: transparent;
		width: 270rpx;
		height: 180rpx;
		left: 105rpx;
		top: -365rpx;
	}

	.liella-btn {
		position: absolute;
		width: 400rpx;
		height: 200rpx;
		left: 40rpx;
		top: 175rpx;
	}

	.hx-btn-view>button {
		background-color: transparent;
		color: transparent;
		width: 260rpx;
		height: 180rpx;
		left: -207rpx;
		top: -545rpx;
	}

	.hx-btn {
		position: absolute;
		width: 317rpx;
		height: 200rpx;
		left: -230rpx;
		top: 175rpx;
	}
</style>