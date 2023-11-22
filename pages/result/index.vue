<template>
	<view>
		{{ result }}
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app'
	import Result from '@/data/result.json'

	const result = ref<string>()

	onLoad(({ team, property }) => {
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

</style>