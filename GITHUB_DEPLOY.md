# GitHub Pages 部署指南

## 步骤 1：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 仓库名称：`mining-competition-website`（或你喜欢的名字）
3. 选择 "Public"（公开）
4. 勾选 "Add a README file"
5. 点击 "Create repository"

## 步骤 2：初始化本地 Git 仓库

在 PowerShell 中运行以下命令：

```powershell
cd "C:\Users\黄锦港\Desktop\python-work\ai\mining-competition-website"

# 初始化 git 仓库
git init

# 添加所有文件
git add .

# 提交文件
git commit -m "Initial commit: Mining competition website with experiment video"
```

## 步骤 3：连接到 GitHub 仓库

```powershell
# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/mining-competition-website.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

## 步骤 4：启用 GitHub Pages

1. 访问你的 GitHub 仓库页面
2. 点击 "Settings"（设置）
3. 左侧菜单选择 "Pages"
4. "Source" 部分选择 "Deploy from a branch"
5. "Branch" 选择 "main"，文件夹选择 "/ (root)"
6. 点击 "Save"

## 步骤 5：访问网站

等待 1-2 分钟后，访问：
`https://YOUR_USERNAME.github.io/mining-competition-website`

（替换 YOUR_USERNAME 为你的 GitHub 用户名）

## 注意事项

1. 视频文件较大（约 20-30MB），首次推送可能需要一些时间
2. 如果视频无法播放，确保视频文件已正确上传到 `assets/videos/` 目录
3. GitHub Pages 免费版有 1GB 存储限制

## 更新网站

修改文件后，运行以下命令更新：

```powershell
cd "C:\Users\黄锦港\Desktop\python-work\ai\mining-competition-website"
git add .
git commit -m "更新描述"
git push origin main
```

等待 1-2 分钟后，网站会自动更新。
