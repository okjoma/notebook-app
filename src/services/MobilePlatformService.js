import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { LocalNotifications } from '@capacitor/local-notifications'
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { Preferences } from '@capacitor/preferences'
import { Filesystem, Directory } from '@capacitor/filesystem'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Geolocation, Position } from '@capacitor/geolocation'

class MobilePlatformService {
  /**
   * 检查是否运行在移动端
   */
  static async isMobile() {
    const platform = await this.getPlatform()
    return platform === 'ios' || platform === 'android'
  }

  /**
   * 获取当前平台
   */
  static async getPlatform() {
    const { platform } = await Capacitor.getPlatform()
    return platform
  }

  /**
   * 获取平台能力
   */
  static async getCapabilities() {
    const platform = await this.getPlatform()
    return {
      supportsNotifications: platform !== 'web',
      supportsWidget: platform !== 'web',
      supportsCamera: platform !== 'web',
      supportsTray: false, // 移动端不支持托盘
      supportsGlobalHotkey: false, // 移动端不支持全局快捷键
      supportsOfflineMode: true,
    }
  }

  /**
   * 调用相机拍照
   */
  static async takePhoto() {
    try {
      const result = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
      })

      return result.dataUrl
    } catch (error) {
      console.error('Camera error:', error)
      throw error
    }
  }

  /**
   * 从相册选择照片
   */
  static async pickPhoto() {
    try {
      const result = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      })

      return result.dataUrl
    } catch (error) {
      console.error('Photo picker error:', error)
      throw error
    }
  }

  /**
   * 获取当前位置
   */
  static async getCurrentPosition(): Promise<Position | null> {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000,
      })
      return position
    } catch (error) {
      console.error('Geolocation error:', error)
      return null
    }
  }

  /**
   * 发送本地通知
   */
  static async scheduleNotification(options: {
    title: string
    body: string
    id?: number
    schedule?: Date
  }) {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: options.id || Date.now(),
            title: options.title,
            body: options.body,
            scheduleAt: options.schedule,
            largeBody: options.body,
            sound: 'default',
          },
        ],
      })
    } catch (error) {
      console.error('Notification error:', error)
    }
  }

  /**
   * 取消通知
   */
  static async cancelNotification(id: number) {
    try {
      await LocalNotifications.cancel({ notifications: [{ id }] })
    } catch (error) {
      console.error('Cancel notification error:', error)
    }
  }

  /**
   * 请求通知权限
   */
  static async requestNotificationPermission() {
    try {
      const result = await LocalNotifications.requestPermissions()
      return result.display === 'granted'
    } catch (error) {
      console.error('Request notification permission error:', error)
      return false
    }
  }

  /**
   * 触发震动反馈
   */
  static async hapticImpact(style: ImpactStyle = ImpactStyle.Medium) {
    try {
      await Haptics.impact({ style })
    } catch (error) {
      console.error('Haptics error:', error)
    }
  }

  /**
   * 触发成功反馈
   */
  static async hapticSuccess() {
    return this.hapticImpact(ImpactStyle.Light)
  }

  /**
   * 触发错误反馈
   */
  static async hapticError() {
    return this.hapticImpact(ImpactStyle.Heavy)
  }

  /**
   * 保存到本地存储
   */
  static async setItem(key: string, value: string) {
    try {
      await Preferences.set({ key, value })
    } catch (error) {
      console.error('Set item error:', error)
    }
  }

  /**
   * 从本地存储读取
   */
  static async getItem(key: string): Promise<string | null> {
    try {
      const { value } = await Preferences.get({ key })
      return value
    } catch (error) {
      console.error('Get item error:', error)
      return null
    }
  }

  /**
   * 保存草稿
   */
  static async saveDraft(entryId: string, data: any) {
    return this.setItem(`draft_${entryId}`, JSON.stringify(data))
  }

  /**
   * 获取草稿
   */
  static async getDraft(entryId: string): Promise<any | null> {
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
  static async deleteDraft(entryId: string) {
    await Preferences.remove({ key: `draft_${entryId}` })
  }

  /**
   * 设置状态栏样式
   */
  static async setStatusBarStyle(style: 'light' | 'dark' = 'dark') {
    try {
      await StatusBar.setStyle({
        style: style === 'light' ? Style.Dark : Style.Light,
      })
    } catch (error) {
      console.error('Set status bar error:', error)
    }
  }

  /**
   * 隐藏状态栏
   */
  static async hideStatusBar() {
    try {
      await StatusBar.hide()
    } catch (error) {
      console.error('Hide status bar error:', error)
    }
  }

  /**
   * 显示状态栏
   */
  static async showStatusBar() {
    try {
      await StatusBar.show()
    } catch (error) {
      console.error('Show status bar error:', error)
    }
  }
}

export default MobilePlatformService
