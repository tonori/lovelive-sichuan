1<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { onLoad, onShow, onUnload, onHide, onShareAppMessage } from "@dcloudio/uni-app"

	import Questions from "@/data/questions.json"
	import ImageBg from "@/data/team_image.json"

	type Question = {
		question : string;
		options : string[];
	}

	// #ifdef MP-QQ
	onShareAppMessage(() => ({
		shareTemplateId: '95A06A1683C80BECC99BE5CC7B6D706B',
		shareTemplateData: {
			"bottomBtnTxt": "我也试试",
		},
		path: `/pages/form/index?team=${team.value}`,
		title: `我穿越到了 ${team.value} 的世界里！我竟然是...`,
		imageUrl: "https://mp-2c99f6c1-3ff7-4d9a-8efd-ec1c8e02128a.cdn.bspapp.com/static/image/share_main.jpg"
	}))
	// #endif

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

	const calcLiella = () => {
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
					result = 'S'
				}
				else {
					result = 'N'
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

			if (index + 1 === 12) {
				let result : string
				if (score >= 2) {
					result = 'J'
				}
				else {
					result = 'P'
				}
				score = 0
				return pre + result
			}
			return pre
		}, '')
	}

	const calcHx = () => {
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

			if (index + 1 === 12) {
				let result : string
				if (score >= 2) {
					result = 'J'
				}
				else {
					result = 'P'
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
			case 'liella':
				result = calcLiella()
				break
			case 'hx':
				result = calcHx()
				break
			default:
				break;
		}
		uni.redirectTo({
			url: `/pages/result/index?team=${team.value}&property=${result}`,
		})
	}

	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = false;
	innerAudioContext.loop = true;

	const windowHeight = ref(0);
	const bg = ref<string>()

	onLoad((option) => {
		uni.getSystemInfo({
			success: (res) => {
				let width = res.windowWidth;
				let height = res.windowHeight;
				windowHeight.value = height;
			}
		});

		team.value = option.team

		if (option.team && Questions[option.team] && ImageBg[option.team]) {
			questions.value = Questions[option.team]
			bg.value = ImageBg[option.team];
			innerAudioContext.src = "https://mp-2c99f6c1-3ff7-4d9a-8efd-ec1c8e02128a.cdn.bspapp.com/static/audio/" + option.team + ".mp3";
		} else {
			uni.showModal({
				title: "队伍选择有误，请重新选择",
				confirmText: "返回首页"
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

<template>
	<view class="content" :style="{height: windowHeight + 'px'}">
		<image class="bg" :src="bg"></image>
		<view class="options">
			<swiper v-if="questions.length" disable-touch circular :current="currentQuestionIndex">
				<swiper-item v-for="({ question, options }, index) in questions" :key="question">
					<view class="form__item" required>
						<view class="form__item__question">
							<text class="question__text">{{ question }}</text>
							<radio-group class="question__options" @change="({ detail }) => answer[index] = detail.value">
								<label v-for="(option, index) in options" :key="option">
									<radio :value="propertys[index]" />
									<text>{{ option }}</text>
								</label>
							</radio-group>
						</view>
						<!-- 						<button type="primary" class="next-button" @tap="isLastQuestion ? submit() : next()"
							:disabled="!answer[index]">{{ isLastQuestion ? '提交' : '下一题' }}</button> -->
						<view class="img-btn-view">
							<image class="img-btn"
								src="https://mp-2c99f6c1-3ff7-4d9a-8efd-ec1c8e02128a.cdn.bspapp.com/static/image/btn_next.webp">
							</image>
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
		position: absolute;
		top: 10rpx;
	}

	.question {
		&__text {
			font-size: 50rpx;
			font-weight: 800;
			margin-bottom: 30rpx;
			display: block;
		}

		&__options {
			padding: 80rpx 0 0;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			top:30rpx;
		}
	}

	.form {
		&__item {
			padding: 100rpx 30rpx 0;
			height: 85%;
			display: flex;
			flex-direction: column;
			
			&__question {
				padding: 30rpx 0 0;
				flex: 1;
				display: flex;
				flex-direction: column;
			}
		}
	}

	.next-button {
		margin-top: 60rpx;
		margin-bottom: 60rpx;
		width: 100%;
		padding: 10rpx 0;
	}

	.img-btn-view {
		position: relative; 
		height: 300rpx;
	}

	.img-btn-view>button {
		background-color: transparent;
		color: transparent;
		width: 500rpx;
		height: 100rpx;
		left: 5rpx;
		top: 140rpx;
	}

	.img-btn {
		position: absolute;
		width: 500rpx;
		height: 100rpx;
		left: 100rpx;
		top: 200rpx;
	}
</style>