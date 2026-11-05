const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)

  const report = await page.evaluate(() => {
    const pick = (selector) => {
      const el = document.querySelector(selector)
      if (!el) return null
      const r = el.getBoundingClientRect()
      const s = getComputedStyle(el)
      return {
        x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
        top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right),
        z: s.zIndex, transform: s.transform, position: s.position,
      }
    }
    const seal = document.querySelector('.wax-seal__button')
    const sr = seal?.getBoundingClientRect()
    const center = sr ? { x: sr.x + sr.width / 2, y: sr.y + sr.height / 2 } : null
    const atCenter = center ? document.elementFromPoint(center.x, center.y) : null
    return {
      viewport: { w: innerWidth, h: innerHeight },
      header: pick('header'),
      scene: pick('.welcome-scene'),
      arch: pick('.welcome-arch'),
      character: pick('.welcome-character'),
      kitty: pick('.welcome-kitty'),
      envelopeStage: pick('.envelope-stage'),
      seal: pick('.wax-seal'),
      sealButton: pick('.wax-seal__button'),
      footer: pick('footer'),
      hint: pick('.open-invitation-button'),
      atSealCenter: atCenter ? `${atCenter.tagName}.${atCenter.className}` : null,
      bodyText: document.body.innerText,
    }
  })
  console.log(JSON.stringify(report, null, 2))

  await page.getByRole('button', { name: 'Abrir la invitación' }).click()
  await page.waitForTimeout(3800)
  const inv = await page.evaluate(() => {
    const pick = (selector) => {
      const el = document.querySelector(selector)
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), bottom: Math.round(r.bottom) }
    }
    return {
      scroll: { y: scrollY, h: document.documentElement.scrollHeight },
      card: pick('.invitation-card'),
      header: pick('article header'),
      details: pick('.ornate-frame'),
      countdown: pick('[aria-labelledby="cuenta-regresiva"]'),
      rsvp: pick('a[href^="https://wa.me"]'),
      replay: pick('button[aria-label*="animación"]'),
      music: pick('button[aria-label*="música"]'),
      cardOverflow: document.querySelector('.invitation-card')?.scrollWidth,
    }
  })
  console.log(JSON.stringify(inv, null, 2))
  await browser.close()
})()
