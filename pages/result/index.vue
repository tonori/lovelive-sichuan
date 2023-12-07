<template>
	<view class="content" :style="{height: windowHeight + 'px'}">
		<image class="bg" :src="result"></image>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app'
	import Result from '@/data/result.json'

	const windowHeight = ref(0);
	const result = ref<string>()

	onLoad(({ team, property }) => {
		uni.getSystemInfo({
			success: (res) => {
				let width = res.windowWidth;
				let height = res.windowHeight;
				windowHeight.value = height;
				console.log('width', width);
				console.log('height', height);
			}
		});
		if (team && property) {
			result.value = Result[team][property]
		} else {
			uni.showModal({
				title: "结果不正确，请重新作答",
				confirmText: '返回首页'
			})
		}
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