# 项目部署

服务器地址
- IP：39.99.254.148
- 用户名：root
- 密码：Dial-2023

安装宝塔
```shell
wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh ed8484bec
```

========================面板账户登录信息==========================

- 外网面板地址: https://39.99.254.148:37281/4db36ae6
- 内网面板地址: https://172.29.177.20:37281/4db36ae6
- username: uugra3ie
- password: 535cf18f

阿里云服务器添加安全组规则，增加三个端口：37281（宝塔运维用）、10001（虚拟人后端用）、10002（虚拟人前端用）