const { chromium } = require('playwright')
const fs = require('fs')

const out = '/tmp/opencode/screens'
fs.mkdirSync(out, { recursive: true })

;(async () => {
  const browser = await chromium.launch()
  const errors = []

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  })
  const page = await mobile.newPage()
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text()}`)
  })
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`))

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `${out}/01-welcome-390.png` })

  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    clientHeight: document.documentElement.clientHeight,
    scrollHeight: document.documentElement.scrollHeight,
  }))
  console.log('overflow welcome 390', overflow)

  await page.getByRole('button', { name: 'Abrir la invitación' }).click()
  await page.waitForTimeout(300)
  await page.screenshot({ path: `${out}/02-seal-300ms.png` })
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${out}/03-flap-800ms.png` })
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${out}/04-letter-1400ms.png` })
  await page.waitForTimeout(900)
  await page.screenshot({ path: `${out}/05-zoom-2300ms.png` })
  await page.waitForTimeout(1300)
  await page.screenshot({ path: `${out}/06-invitation-390.png` })
  await page.screenshot({ path: `${out}/07-invitation-390-full.png`, fullPage: true })

  const overflowInvitation = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight,
  }))
  console.log('overflow invitation 390', overflowInvitation)

  const counts = await page.evaluate(() => ({
    countdownTiles: document.querySelectorAll('[aria-labelledby="cuenta-regresiva"] .grid > div').length,
    rsvpHref: document.querySelector('a[href^="https://wa.me"]')?.getAttribute('href'),
    mapsHref: document.querySelector('a[href*="google.com/maps"]')?.getAttribute('href'),
  }))
  console.log('counts', counts)

  // Replay
  await page.getByRole('button', { name: /Volver a ver la animación/i }).click()
  await page.waitForTimeout(2800)
  await page.screenshot({ path: `${out}/08-replay-mid.png` })
  await page.waitForTimeout(1500)
  await page.screenshot({ path: `${out}/09-after-replay.png` })

  // Small screen
  const small = await browser.newContext({
    viewport: { width: 360, height: 640 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  })
  const smallPage = await small.newPage()
  smallPage.on('pageerror', (err) => errors.push(`small pageerror: ${err.message}`))
  await smallPage.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
  await smallPage.waitForTimeout(1000)
  await smallPage.screenshot({ path: `${out}/10-welcome-360.png` })
  const smallOverflow = await smallPage.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    scrollHeight: document.documentElement.scrollHeight,
  }))
  console.log('overflow welcome 360', smallOverflow)

  // Desktop
  const desktop = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
  })
  const deskPage = await desktop.newPage()
  deskPage.on('pageerror', (err) => errors.push(`desktop pageerror: ${err.message}`))
  await deskPage.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
  await deskPage.waitForTimeout(1000)
  await deskPage.screenshot({ path: `${out}/11-welcome-desktop.png` })
  await deskPage.getByRole('button', { name: 'Abrir la invitación' }).click()
  await deskPage.waitForTimeout(3800)
  await deskPage.screenshot({ path: `${out}/12-invitation-desktop.png` })
  await deskPage.screenshot({ path: `${out}/13-invitation-desktop-full.png`, fullPage: true })

  console.log('errors', errors)
  await browser.close()
})()
