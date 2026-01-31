# 移动端 App 构建指南

## 已完成配置

1. Capacitor 核心及插件已安装
2. Android 和 iOS 平台已添加
3. 平台服务已创建（相机、通知、地理位置、震动、存储）
4. 应用图标已创建

## 构建步骤

### 1. 构建 Web 项目

```bash
npm run build
```

### 2. 同步到原生平台

```bash
# 同步到 Android
npx cap sync android

# 同步到 iOS
npx cap sync ios
```

### 3. 运行应用

#### Android（需安装 Android Studio）
```bash
# 在 Android Studio 中打开项目
npx cap open android

# 或直接运行（需连接模拟器或真机）
npx cap run android
```

#### iOS（需 Mac + Xcode）
```bash
# 在 Xcode 中打开项目
npx cap open ios

# 或直接运行（需连接模拟器或真机）
npx cap run ios
```

## 目录结构

```
workspace/
├── android/           # Android 原生项目
├── ios/             # iOS 原生项目
├── src/
│   ├── services/
│   │   ├── MobilePlatformService.js   # 移动端服务
│   │   ├── WebPlatformService.js       # Web 端服务
│   │   └── PlatformService.js        # 平台适配器
│   ├── pages/        # 页面组件
│   ├── components/    # UI 组件
│   ├── store.js       # 状态管理
│   └── main.jsx      # 入口文件
├── resources/       # 应用资源
│   └── icon.svg    # 应用图标
├── capacitor.config.json    # Capacitor 配置
├── vite.config.js
└── package.json
```

## 平台功能对照

| 功能 | Web | 移动端 |
|-----|------|---------|
| 拍照 | 文件选择 | 原生相机 API |
| 地理位置 | 浏览器 API | 原生定位 API |
| 通知 | Notification API | LocalNotifications 插件 |
| 震动 | navigator.vibrate | Haptics 插件 |
| 状态栏 | N/A | StatusBar 插件 |
| 存储 | localStorage | Preferences 插件 |
