from PIL import Image
import sys

def classify(rgb):
    r, g, b = rgb
    mx = max(rgb); mn = min(rgb)
    # categories
    if r > 235 and g > 235 and b > 235:
        return ' '  # white
    if r > 180 and g < 100 and b < 110:
        return 'R'  # red
    if r > 220 and g > 150 and b > 180:
        return 'p'  # pink
    if g > r and g > b and g > 90:
        return 'G'  # green
    if r > 225 and g > 210 and b > 175:
        return '.'  # cream
    if r < 120 and g < 100 and b < 100:
        return '#'  # dark
    if r > 170 and g > 140 and b > 120:
        return 'o'  # skin/tan
    return '+'

path = sys.argv[1]
width = int(sys.argv[2]) if len(sys.argv) > 2 else 40
im = Image.open(path).convert('RGB')
ratio = im.height / im.width
h = max(1, int(width * ratio * 0.5))
im = im.resize((width, h))
chars = []
for y in range(h):
    row = ''
    for x in range(width):
        row += classify(im.getpixel((x, y)))
    chars.append(row)
print('\n'.join(chars))
