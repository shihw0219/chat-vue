// utils/device.ts
export const isMobile = (): boolean => {
    // 方法1: 检查用户代理
    const userAgent = navigator.userAgent
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    const isMobileUserAgent = mobileRegex.test(userAgent)
    // 方法3: 检查屏幕宽度
    const isMobileScreen = window.innerWidth <= 768
    // 方法4: 检查设备方向（移动设备特有）
    const hasOrientation = 'orientation' in window
    // 如果用户代理是移动设备，或者有触摸屏且屏幕较小，则认为是移动设备
    return isMobileUserAgent || isMobileScreen || hasOrientation
}

export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
    const width = window.innerWidth
    if (width <= 768) return 'mobile'
    if (width <= 1024) return 'tablet'
    return 'desktop'
}

// 更详细的设备信息
export const getDeviceInfo = () => {
    const userAgent = navigator.userAgent.toLowerCase()
    return {
        isAndroid: /android/.test(userAgent),
        isIOS: /iphone|ipad|ipod/.test(userAgent),
        isWechat: /micromessenger/.test(userAgent),
        isMobile: isMobile(),
        deviceType: getDeviceType(),
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight
    }
}