1<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { onLoad } from "@dcloudio/uni-app"

	import Questions from "@/data/questions.json"
	import ImageBg from "@/data/team_image.json"

	type Question = {
		question : string;
		options : string[];
	}

	const team = ref<string>()
	const questions = ref<Question[]>([])
	const answer = ref([])
	const currentQuestionIndex = ref(0)
	const propertys = ref(["A", "B", "C", "D"])

	const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1)

	const calcMuse = () => {
		let score = 0
		return answer.value.reduce((pre, cur, index) => {
			score += cur === 'A' ? 1 : 0
			if (index + 1 === 6) {
				let result : string
				if (score <= 2) {
					result = 'B'
				}
				if (score === 3 || score === 4) {
					result = 'G'
				}
				if (score >= 5) {
					result = 'R'
				}
				score = 0
				return result
			}


			if (index + 1 === 12) {
				let result : string
				if (score <= 2) {
					result = 'Z'
				}
				if (score === 3 || score === 4) {
					result = 'Y'
				}
				if (score >= 5) {
					result = 'X'
				}
				score = 0
				return pre + result
			}

			return pre
		}, '')
	}

	const calcAqours = () => {
		let score = 0
		return answer.value.reduce((pre, cur, index) => {
			score += cur === 'A' ? 1 : 0
			if (index + 1 === 4) {
				let result : string
				if (score >= 3) {
					result = 'R'
				}
				if (score === 2) {
					result = 'G'
				}
				if (score <= 1) {
					result = 'B'
				}
				score = 0
				return result
			}


			if (index + 1 === 9) {
				let result : string
				if (score >= 4) {
					result = 'X'
				}
				if (score === 2 || score === 3) {
					result = 'Y'
				}
				if (score <= 1) {
					result = 'Y'
				}
				score = 0
				return pre + result
			}

			return pre
		}, '')
	}

	const calcLian = () => {
		let score = 0
		return answer.value.reduce((pre, cur, index) => {
			score += cur === 'A' ? 1 : 0
			if (index + 1 === 3) {
				let result : string
				if (score >= 2) {
					result = 'E'
				}
				else {
					result = 'I'
				}
				score = 0
				return result
			}
			
			if (index + 1 === 6) {
				let result : string
				if (score >= 2) {
					result = 'N'
				}
				else {
					result = 'S'
				}
				score = 0
				return pre + result
			}
	
			if (index + 1 === 9) {
				let result : string
				if (score >= 2) {
					result = 'F'
				}
				else {
					result = 'T'
				}
				score = 0
				return pre + result
			}
	
			return pre
		}, '')
	}
	
	const next = () => {
		currentQuestionIndex.value += 1
	}

	const submit = () => {
		let result : string;
		switch (team.value) {
			case 'muse':
				result = calcMuse()
				break
			case 'aqours':
				result = calcAqours()
				break
			case 'lian':
				result = calcLian()
				break
			default:
				break;
		}
		uni.redirectTo({
			url: `/pages/result/index?team=${team.value}&property=${result}`,
		})
	}

	const windowHeight = ref(0);
	const bg = ref<string>()
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
		team.value = option.team
		if (option.team && Questions[option.team] && ImageBg[option.team]) {
			questions.value = Questions[option.team]
			bg.value = ImageBg[option.team];
		} else {
			uni.showModal({
				title: "队伍选择有误，请重新选择",
				confirmText: "返回首页"
			})
		}
	})
</script>

<template>
	<view class="content" :style="{height: windowHeight + 'px'}">
		<image class="bg" :src="bg"></image>
		<view class="options">
			<swiper v-if="questions.length" disable-touch circular :current="currentQuestionIndex">
				<swiper-item v-for="({ question, options }, index) in questions" :key="question">
					<view class="form__item" required>
						<text class="question__text">{{ question }}</text>
						<radio-group class="question__options" @change="({ detail }) => answer[index] = detail.value">
							<label v-for="(option, index) in options" :key="option">
								<radio :value="propertys[index]" />
								<text>{{ option }}</text>
							</label>
						</radio-group>
						<!-- <button type="primary" class="next-button" @tap="isLastQuestion ? submit() : next()"
							:disabled="!answer[index]">{{ isLastQuestion ? '提交' : '下一题' }}</button> -->
						<view class="img-btn-view">
							<image class="img-btn" src="/static/btn_next.png"></image>
							<button type="primary" class="next-button" @tap="isLastQuestion ? submit() : next()"
								:disabled="!answer[index]">{{ isLastQuestion ? '提交' : '下一题' }}</button>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<style scoped lang="scss">
	swiper {
		height: 100vh;
		width: 100vw;
	}
	
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
	
	.options {
		position:absolute;
		// left:300rpx;
		top:10rpx;
	}
	
	.question {
		&__text {
			font-size: 50rpx;
			font-weight: 800;
			margin-bottom: 30rpx;
			display: block;
		}

		&__options {
			display: grid;
			grid-row-gap: 30rpx;
		}
	}

	.form {
		&__item {
			padding: 40rpx 30rpx 0;
		}
	}

	.next-button {
		margin-top: 60rpx;
		padding: 10rpx 0;
	}
	
	.img-btn-view {
		position: relative;
	}
	
	.img-btn-view > button {
		background-color: transparent;
		color: transparent;
		width:500rpx;
		height:100rpx;
		left:0rpx;
		top:0rpx;
	}
	.img-btn {
		position:absolute;
		width:500rpx;
		height:100rpx;
		left:100rpx;
		top:0rpx;
	}
</style>