# Nuxt 3 Minimal Starter
npm install
npm run dev
npx nuxi generate --dotenv .evn.dev
npx nuxi generate --dotenv .evn.prod
# Nuxt cache clean
npx nuxi clean

===============================================================================
How delect browsers and devices in vue file ( e.g. v-if="$device.isMobileOrTablet" )
====================================================================================
 ```
# $device.isDesktop
# $device.isMobile
# $device.isTablet
# $device.isMobileOrTablet
# $device.isDesktopOrTablet
# $device.isIos
# $device.isWindows
# $device.isMacOS
# $device.isApple
# $device.isAndroid
# $device.isFirefox
# $device.isEdge
# $device.isChrome
# $device.isSafari
# $device.isSamsung
# $device.isCrawler
