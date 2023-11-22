<template>
	<div class="register-container">
		<el-form :model="registerForm" label-width="80px" ref="registerForm" @submit.native.prevent="register">
			<el-form-item label="用户名" prop="username" :rules="usernameRules">
				<el-input v-model="registerForm.username" size="small" placeholder="请输入用户名"
					class="input-field"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password" :rules="passwordRules">
				<el-input type="password" v-model="registerForm.password" placeholder="请输入密码"
					class="input-field"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email" :rules="emailRules">
				<el-input v-model="registerForm.email" size="small" placeholder="请输入邮箱" class="input-field"></el-input>
			</el-form-item>
			<el-form-item label="验证码" prop="verificationCode" :rules="verificationCodeRules">
				<el-input v-model="registerForm.verificationCode" size="small" placeholder="请输入验证码"
					class="input-field"></el-input>
			</el-form-item>
			<!-- 发送验证码 -->
			<el-form-item>
				<el-button @click="sendVerificationCode" :disabled="verificationCodeSent"
					class="custom-login-button">发送验证码</el-button>
			</el-form-item>

			<!-- 注册 -->
			<el-form-item>
				<el-button type="primary" native-type="submit" class="custom-login-button">注册</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import axios from 'axios';
	import {
		MessageBox,
		Message
	} from 'element-ui';

	export default {
		data() {
			return {
				registerForm: {
					username: '',
					password: '',
					email: '',
					verificationCode: '',
				},
				usernameRules: [{
					required: true,
					message: '请输入用户名',
					trigger: 'blur'
				}, ],
				passwordRules: [{
					required: true,
					message: '请输入密码',
					trigger: 'blur'
				}, ],
				emailRules: [{
						required: true,
						message: '请输入邮箱',
						trigger: 'blur'
					},
					{
						validator: validateEmail,
						trigger: 'blur'
					},
				],
				verificationCodeRules: [{
					required: true,
					message: '请输入验证码',
					trigger: 'blur'
				}, ],
				verificationCodeSent: false,
			};
		},
		methods: {
			register() {
				this.$refs.registerForm.validate((valid) => {
					if (valid) {
						const registerData = {
							username: this.registerForm.username,
							password: this.registerForm.password,
							email: this.registerForm.email,
							verificationCode: this.registerForm.verificationCode,
						};

						axios.post('http://localhost:10086/user/register', registerData)
							.then((response) => {
								if (response.data === 'Registration successful') {
									this.loginAfterRegistration();
									Message.success('注册成功');
								} else if (response.data === 'Username or email already exists') {
									this.showUsernameOrEmailExistsDialog();
								} else {
									Message.error('注册失败');
								}
							})
							.catch((error) => {
								Message.error('注册失败');
							});
					} else {
						Message.error('请填写必要信息');
					}
				});
			},
			sendVerificationCode() {
				axios.post('http://localhost:10086/user/sendVerificationCode', {
						email: this.registerForm.email,
					})
					.then((response) => {
						if (response.data === 'Verification code sent') {
							Message.success('验证码已发送，请检查邮箱。注意有效期10分钟');
							this.verificationCodeSent = true;
							setTimeout(() => {
								this.verificationCodeSent = false;
							}, 600000); // 10分钟后重置验证码发送标志
						} else {
							Message.error('发送验证码失败');
						}
					})
					.catch((error) => {
						Message.error('发送验证码失败');
					});
			},
			showUsernameOrEmailExistsDialog() {
				MessageBox.alert('用户名或邮箱已存在，请使用其他用户名或邮箱。', '用户名/邮箱已注册', {
					confirmButtonText: '确定',
					callback: (action) => {
						// 用户点击确定后的操作
					},
				});
			},
			loginAfterRegistration() {
				// 在注册成功后的操作，可以进行自动登录等逻辑
			},
		},
	};

	function validateEmail(rule, value, callback) {
		const allowedDomains = ['qq.com'];
		const genericRegex = /.+@.+\..+/;

		if (!value) {
			callback();
		} else if (genericRegex.test(value) && allowedDomains.some((domain) => value.endsWith('@' + domain))) {
			callback();
		} else {
			callback(new Error('请输入有效的邮箱地址(QQ邮箱)'));
		}
	}
</script>

<style scoped>
	.register-container {
		margin-left: 25rem;
	}

	.input-field {
		width: 30rem;
	}

	@media (max-width: 767px) {
		.register-container {
			margin-top: 50px;
			margin-left: 1rem;
		}

		.input-field {
			width: 100%;
		}
	}

	.custom-login-button {
		background-color: rgba(0, 0, 0, 0.1);
		/* 亚克力颜色 */
		border-color: transparent;
		/* 去掉边框颜色 */
		color: #fff;
		/* 修改文字颜色为白色 */
	}

	.custom-login-button:hover {
		background-color: rgba(0, 0, 0, 0.2);
		/* 鼠标悬停时的颜色 */
	}
</style>