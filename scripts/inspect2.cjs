const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Abrir la invitación' }).click()
  await page.waitForTimeout(3800)
  const info = await page.evaluate(() => {
    const links = [...document.querySelectorAll('a')].map((a) => {
      const r = a.getBoundingClientRect()
      const s = getComputedStyle(a)
      return {
        text: a.textContent.trim(),
        href: a.getAttribute('href'),
        rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        display: s.display, position: s.position, padding: s.padding, margin: s.margin,
        transform: s.transform,
        parent: a.parentElement?.className,
      }
    })
    const sections = [...document.querySelectorAll('article section, article footer, article header')].map((el) => {
      const r = el.getBoundingClientRect()
      return { tag: el.tagName, cls: el.className, text: el.textContent.trim().slice(0, 50), rect: { y: Math.round(r.y), h: Math.round(r.height) } }
    })
    return { links, sections }
  })
  console.log(JSON.stringify(info, null, 2))
  await browser.close()
})()
