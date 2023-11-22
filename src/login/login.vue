<template>
	<div class="login-container">
		<el-form :model="loginForm" label-width="80px" ref="loginForm" @submit.native.prevent="login"
			label-position="left">
			<el-form-item label="用户名" prop="username" :rules="usernameRules">
				<el-input v-model="loginForm.username" size="small" placeholder="请输入用户名" class="input-field"
					style="font-weight: bold;"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password" :rules="passwordRules">
				<el-input type="password" v-model="loginForm.password" placeholder="请输入密码" class="input-field"
					style="font-weight: bold; color: #fffae8;"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" native-type="submit" class="custom-login-button">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		data() {
			return {
				loginForm: {
					username: '',
					password: ''
				},
				usernameRules: [{
					required: true,
					message: '请输入用户名',
					trigger: 'blur'
				}],
				passwordRules: [{
					required: true,
					message: '请输入密码',
					trigger: 'blur'
				}]
			};
		},
		methods: {
			login() {
				this.$refs.loginForm.validate((valid) => {
					if (valid) {
						const loginData = {
							username: this.loginForm.username,
							password: this.loginForm.password
						};

						axios.post('http://localhost:10086/user/login', loginData)
							.then((response) => {
								if (response.data === 'Login successful') {
									this.$message.success('登录成功');
									this.$emit('loginSuccess'); // 发送登录成功事件
								} else {
									this.$message.error('登录失败,用户名或密码错误请重新尝试');
								}
							})
							.catch((error) => {
								this.$message.error('登录失败');
							});
					} else {
						this.$message.error('请填写必要信息');
					}
				});
			}
		}
	};
</script>

<style scoped>
	.login-container {
		margin-left: 25rem;
	}

	.input-field {
		width: 30rem;
	}

	@media (max-width: 767px) {
		.login-container {
			margin-top: 50px;
			margin-left: 1rem;
		}

		.input-field {
			width: 100%;
		}
	}

	.custom-login-button {
		background-color: rgba(0, 0, 0, 0.1);
		border-color: transparent;
		color: #fff;
	}

	.custom-login-button:hover {
		background-color: rgba(0, 0, 0, 0.2);
	}
</style>