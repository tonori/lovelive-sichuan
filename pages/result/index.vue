<template>
	<view class="content" :style="{height: windowHeight + 'px'}">
		<image class="bg" :src="result.image"></image>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { onLoad, onShow, onUnload, onHide, onShareAppMessage } from '@dcloudio/uni-app'
	import Result from '@/data/result.json'

	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = false;
	innerAudioContext.loop = true;

	const windowHeight = ref(0);
	const result = ref<{
		name : string;
		image : string;
	}>()

	// #ifdef MP-QQ
	onShareAppMessage(() => ({
		shareTemplateId: '95A06A1683C80BECC99BE5CC7B6D706B',
		shareTemplateData: {
			"bottomBtnTxt": "我也试试",
		},
		path: '/pages/index/index',
		title: `我在 LoveLive 的世界里是${result.value.name}!`,
		imageUrl: "https://mp-2c99f6c1-3ff7-4d9a-8efd-ec1c8e02128a.cdn.bspapp.com/static/image/share_main.jpg"
	}))
	// #endif

	onLoad(({ team, property }) => {
		uni.getSystemInfo({
			success: (res) => {
				let height = res.windowHeight;
				windowHeight.value = height;
			}
		});
		if (team && property) {
			result.value = Result[team][property]
			innerAudioContext.src = "https://mp-2c99f6c1-3ff7-4d9a-8efd-ec1c8e02128a.cdn.bspapp.com/static/audio/" + team + ".mp3";
		} else {
			uni.showModal({
				title: "结果不正确，请重新作答",
				confirmText: '返回首页'
			})
		}
	})

	onShow(() => {
		innerAudioContext.play();
	})

	onUnload(() => {
		innerAudioContext.stop()
	})

	onHide(() => {
		innerAudioContext.stop()
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
</style>