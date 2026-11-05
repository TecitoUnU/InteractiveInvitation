const { chromium } = require('playwright')

;(async () => {
  const b = await chromium.launch()
  const p = await b.newPage({ viewport: { width: 390, height: 844 } })
  await p.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
  await p.getByRole('button', { name: 'Abrir la invitación' }).click()
  await p.waitForTimeout(3800)
  const data = await p.evaluate(() => {
    const a = document.querySelector('a[href^="https://wa.me"]')
    const as = getComputedStyle(a)
    return {
      anchor: {
        rect: a.getBoundingClientRect().toJSON(),
        styles: {
          height: as.height,
          minHeight: as.minHeight,
          lineHeight: as.lineHeight,
          flexDirection: as.flexDirection,
          flexWrap: as.flexWrap,
          alignItems: as.alignItems,
          justifyContent: as.justifyContent,
          whiteSpace: as.whiteSpace,
          fontSize: as.fontSize,
          letterSpacing: as.letterSpacing,
        },
      },
      children: [...a.children].map((c) => {
        const s = getComputedStyle(c)
        return {
          tag: c.tagName,
          cls: String(c.className),
          text: c.textContent.trim(),
          rect: c.getBoundingClientRect().toJSON(),
          styles: {
            display: s.display,
            fontSize: s.fontSize,
            lineHeight: s.lineHeight,
            width: s.width,
            height: s.height,
            position: s.position,
            whiteSpace: s.whiteSpace,
          },
        }
      }),
    }
  })
  console.log(JSON.stringify(data, null, 2))
  await b.close()
})()
