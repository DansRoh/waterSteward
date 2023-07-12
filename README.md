# waterSteward
 鲜水管家小程序用户端
 
#项目说明
 此项目使用uniapp框架进行微信小程序的开发，基于vant-weapp UI组件库，引入了lodash.js工具库，以及使用vuex来储存全局数据。
 
#运行
 1.使用 “npm i” 安装依赖
 2.在Hbuilderx中运行项目至微信小程序模拟器

#本地storage说明
 navHeight: 自定义导航栏高度，在App.vue文件中进行获取，存储本地方便使用
 userInfo: 登录之后获取到的用户信息以及用户token, 在修改用户数据时需要重新设置
 
#项目目录说明
	├── api # API接口相关文件
	├── components # 公共组件
	├── pages # 页面文件
	│ ├── home # 个人主页
	│ ├── accountSafe # 账号安全页
	│ ├── changePhone # 更改手机号验证页
	│ └── devManage # 净水器管理页
	├── static # 静态资源，如图片、字体等
	│ ├── icon # icon文件夹
	│ ├── css # 全局公共css文件目录
	├── store # Vuex状态管理
	├── utils # 工具类函数和方法
	│ ├── request.js # 请求封装文件
	│ ├── tool.js # 个人封装工具方法文件
	├── wxcomponents # 微信小程序组件,存放vant-weapp组件
	├── App.vue # App入口文件
	├── main.js # 项目主入口文件
	├── manifest.json # uni-app项目配置文件
	└── pages.json # 页面配置文件