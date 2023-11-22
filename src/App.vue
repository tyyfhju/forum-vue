<template>
	<div id="app">
		<!-- 背景容器 -->
		<div class="background-container">
			<img src="../public/img/zhuye.jpg" class="background-image" />
		</div>

		<!-- 导航栏 -->
		<div class="navbar">
			<!-- 导航按钮 -->
			<div class="btn"><router-link to="/">首页</router-link></div>
			<div class="btn"><router-link to="/about">讨论</router-link></div>
			<div class="btn"><router-link to="/login">登录</router-link></div>
			<div class="btn"><router-link to="/register">注册</router-link></div>
		</div>

		<!-- 路由视图容器 -->
		<router-view class="router-view-container" />

		<!-- 右上角登录按钮 -->
		<div class="login-btn">
			<el-dropdown trigger="click">
				<span class="el-dropdown-link">
					保持登录<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			// 退出登录操作
			logout() {
				// 在这里执行退出登录的逻辑，例如清除登录状态等
				console.log("退出登录");
			},
		},
	};
</script>

<style>
	/* 根元素样式 */
	#app {
		position: relative;
	}

	.login-btn {
		position: absolute;
		top: 30px;
		right: 30px;
		z-index: 2;
	}

	/* 背景容器样式 */
	.background-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: 1;
	}

	/* 背景图片样式 */
	.background-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* 导航栏样式 */
	.navbar {
		position: absolute;
		top: 30px;
		display: flex;
		flex-direction: row;
		/* Set default direction to row */
		justify-content: space-between;
		/* Add space between buttons */
		z-index: 2;
		color: #fff;
	}

	/* 按钮样式 */
	.btn {
		position: relative;
		width: 120px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* 链接样式 */
	.btn a {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 15px 15px rgba(0, 0, 0, 0.3);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 30px;
		padding: 10px;
		letter-spacing: 1px;
		text-decoration: none;
		overflow: hidden;
		color: #fff;
		font-weight: 400;
		z-index: 1;
		transition: 0.5s;
	}

	/* 按钮悬停效果 */
	.btn:hover a {
		letter-spacing: 3px;
	}

	/* 按钮前置渐变效果 */
	.btn a::before,
	.btn:hover a::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 50%;
		height: 100%;
		background: linear-gradient(to left, rgba(255, 255, 255, 0.15), transparent);
		transform: skewX(45deg) translate(0);
		transition: 0.5s;
	}

	/* 按钮前置渐变悬停效果 */
	.btn:hover a::before {
		transform: skewX(45deg) translate(200px);
	}

	/* 按钮底部标记样式 */
	.btn::before,
	.btn:hover::before {
		content: "";
		position: absolute;
		left: 50%;
		transform: translatex(-50%);
		bottom: -5px;
		width: 30px;
		height: 10px;
		background: #f00;
		border-radius: 10px;
		transition: 0.5s;
		transition-delay: 0.5;
	}

	/* 按钮底部标记悬停效果 */
	.btn:hover::before {
		bottom: 0;
		height: 50%;
		width: 80%;
		border-radius: 30px;
	}

	/* 按钮顶部标记样式 */
	.btn::after,
	.btn:hover::after {
		content: "";
		position: absolute;
		left: 50%;
		transform: translatex(-50%);
		top: -5px;
		width: 30px;
		height: 10px;
		background: #f00;
		border-radius: 10px;
		transition: 0.5s;
		transition-delay: 0.5;
	}

	/* 按钮顶部标记悬停效果 */
	.btn:hover::after {
		top: 0;
		height: 50%;
		width: 80%;
		border-radius: 30px;
	}

	/* 不同按钮的颜色和阴影 */
	.btn:nth-child(1)::before,
	.btn:nth-child(1)::after {
		background: #ff1f71;
		box-shadow: 0 0 5px #ff1f71, 0 0 15px #ff1f71, 0 0 30px #ff1f71, 0 0 60px #ff1f71;
	}

	.btn:nth-child(2)::before,
	.btn:nth-child(2)::after {
		background: #2db2ff;
		box-shadow: 0 0 5px #2db2ff, 0 0 15px #2db2ff, 0 0 30px #2db2ff, 0 0 60px #2db2ff;
	}

	.btn:nth-child(3)::before,
	.btn:nth-child(3)::after {
		background: #1eff45;
		box-shadow: 0 0 5px #1eff45, 0 0 15px #1eff45, 0 0 30px #1eff45, 0 0 60px #1eff45;
	}

	/* 路由视图容器样式 */
	.router-view-container {
		position: relative;
		z-index: 2;
	}

	/* Media query for mobile devices */
	@media (max-width: 767px) {
		.navbar {
			flex-direction: column;
			/* Change to column direction for mobile */
			align-items: center;
			/* Center items horizontally */
		}
	}
</style>