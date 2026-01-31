/**
 * Web 平台服务 - 用于浏览器端
 */
class WebPlatformService {
  /**
   * 检查是否运行在移动端
   */
  static isMobile() {
    return window.innerWidth < 768
  }

  /**
   * 获取当前平台
   */
  static getPlatform() {
    return 'web'
  }

  /**
   * 获取平台能力
   */
  static async getCapabilities() {
    return {
      supportsNotifications: 'Notification' in window,
      supportsWidget: false,
      supportsCamera: false,
      supportsTray: false,
      supportsGlobalHotkey: false,
      supportsOfflineMode: true,
    }
  }

  /**
   * 调用相机拍照
   */
  static async takePhoto() {
    throw new Error('Web 端不支持直接调用相机，请使用文件上传')
  }

  /**
   * 从相册选择照片
   */
  static async pickPhoto() {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => resolve(e.target?.result)
          reader.onerror = reject
          reader.readAsDataURL(file)
        } else {
          resolve(null)
        }
      }
      input.click()
    })
  }

  /**
   * 获取当前位置
   */
  static async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        resolve(null)
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
            },
            timestamp: position.timestamp,
          })
        },
        (error) => {
          console.error('Geolocation error:', error)
          resolve(null)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
        }
      )
    })
  }

  /**
   * 发送本地通知
   */
  static async scheduleNotification(options) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(options.title, {
        body: options.body,
      })
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        new Notification(options.title, {
          body: options.body,
        })
      }
    }
  }

  /**
   * 取消通知
   */
  static async cancelNotification() {
    // Web 端不支持取消特定通知
  }

  /**
   * 请求通知权限
   */
  static async requestNotificationPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    }
    return false
  }

  /**
   * 触发震动反馈
   */
  static async hapticImpact() {
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }
  }

  /**
   * 触发成功反馈
   */
  static async hapticSuccess() {
    this.hapticImpact()
  }

  /**
   * 触发错误反馈
   */
  static async hapticError() {
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100])
    }
  }

  /**
   * 保存到本地存储
   */
  static async setItem(key, value) {
    localStorage.setItem(key, value)
  }

  /**
   * 从本地存储读取
   */
  static async getItem(key) {
    return localStorage.getItem(key)
  }

  /**
   * 保存草稿
   */
  static async saveDraft(entryId, data) {
    return this.setItem(`draft_${entryId}`, JSON.stringify(data))
  }

  /**
   * 获取草稿
   */
  static async getDraft(entryId) {
    const data = await this.getItem(`draft_${entryId}`)
    if (data) {
      try {
        return JSON.parse(data)
      } catch {
        return null
      }
    }
    return null
  }

  /**
   * 删除草稿
   */
  static async deleteDraft(entryId) {
    localStorage.removeItem(`draft_${entryId}`)
  }

  /**
   * 设置状态栏样式
   */
  static async setStatusBarStyle() {
    // Web 端不适用
  }

  /**
   * 隐藏状态栏
   */
  static async hideStatusBar() {
    // Web 端不适用
  }

  /**
   * 显示状态栏
   */
  static async showStatusBar() {
    // Web 端不适用
  }
}

export default WebPlatformService
