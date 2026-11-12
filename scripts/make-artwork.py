#!/usr/bin/env python3
"""Generates the original app/driver artwork (PNG) and icons (SVG). Requires Pillow + numpy.
Run from the app folder:  python3 scripts/make-artwork.py
All artwork is drawn from scratch; it does not copy any manufacturer photo or logo."""
import math, os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SS = 3  # supersampling factor
ROOT = os.path.join(os.path.dirname(__file__), '..')


def lerp(a, b, t):
    return a + (b - a) * t


def gradient(w, h, c1, c2, mode='diag'):
    xs = np.linspace(0, 1, w)[None, :]
    ys = np.linspace(0, 1, h)[:, None]
    t = (xs * 0.55 + ys * 0.45) if mode == 'diag' else (ys + 0 * xs)
    c1, c2 = np.array(c1, float), np.array(c2, float)
    arr = (c1 * (1 - t[..., None]) + c2 * t[..., None]).astype('uint8')
    return Image.fromarray(arr, 'RGB')


def blank(size):
    return Image.new('RGBA', size, (255, 255, 255, 0))


def soft_shadow(base, box, radius, offset, blur, alpha, color=(18, 52, 92)):
    layer = Image.new('L', base.size, 0)
    x0, y0, x1, y1 = box
    ImageDraw.Draw(layer).rounded_rectangle(
        (x0 + offset[0], y0 + offset[1], x1 + offset[0], y1 + offset[1]), radius, fill=alpha)
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    base.paste(Image.new('RGB', base.size, color), (0, 0), layer)


def draw_unit(base, x, y, w, h, outline=None):
    """Wall-mounted split indoor unit, front view, louver slightly open."""
    r = h * 0.24
    soft_shadow(base, (x, y, x + w, y + h), r, (0, h * 0.10), h * 0.12, 120)
    mask = Image.new('L', base.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((x, y, x + w, y + h), r, fill=255)
    body = Image.new('RGB', base.size)
    body.paste(gradient(int(w), int(h), (253, 254, 255), (221, 228, 237), 'v'), (int(x), int(y)))
    base.paste(body, (0, 0), mask)
    d = ImageDraw.Draw(base)
    if outline:
        d.rounded_rectangle((x, y, x + w, y + h), r, outline=outline, width=max(2, int(h * 0.012)))
    d.line((x + w * 0.05, y + h * 0.60, x + w * 0.95, y + h * 0.60),
           fill=(212, 220, 230), width=max(2, int(h * 0.008)))
    sx0, sx1, sy0, sy1 = x + w * 0.07, x + w * 0.93, y + h * 0.68, y + h * 0.84
    d.rounded_rectangle((sx0, sy0, sx1, sy1), (sy1 - sy0) / 2, fill=(50, 64, 82))
    sw = sx1 - sx0
    flap = [(sx0 + sw * 0.03, sy1 - h * 0.03), (sx1 - sw * 0.03, sy1 - h * 0.03),
            (sx1 - sw * 0.07, sy1 + h * 0.13), (sx0 + sw * 0.07, sy1 + h * 0.13)]
    d.polygon(flap, fill=(238, 242, 247))
    d.line((flap[3], flap[2]), fill=(200, 209, 220), width=max(2, int(h * 0.012)))
    lx, ly, lr = x + w * 0.88, y + h * 0.30, h * 0.035
    glow = blank(base.size)
    ImageDraw.Draw(glow).ellipse((lx - lr * 2.6, ly - lr * 2.6, lx + lr * 2.6, ly + lr * 2.6), fill=(60, 214, 130, 150))
    base.alpha_composite(glow.filter(ImageFilter.GaussianBlur(lr * 1.4)))
    ImageDraw.Draw(base).ellipse((lx - lr, ly - lr, lx + lr, ly + lr), fill=(58, 208, 126))


def bezier(p0, p1, p2, p3, n=70):
    pts = []
    for i in range(n + 1):
        t = i / n
        a, b, c, d = (1 - t) ** 3, 3 * (1 - t) ** 2 * t, 3 * (1 - t) * t ** 2, t ** 3
        pts.append((a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]))
    return pts


def stream(base, pts, w0, w1, a0, a1):
    layer = blank(base.size)
    d = ImageDraw.Draw(layer)
    n = len(pts)
    for i in range(n - 1):
        t = i / (n - 1)
        wa, wb = lerp(w0, w1, t), lerp(w0, w1, (i + 1) / (n - 1))
        (x0, y0), (x1, y1) = pts[i], pts[i + 1]
        dx, dy = x1 - x0, y1 - y0
        ln = math.hypot(dx, dy) or 1
        nx, ny = -dy / ln, dx / ln
        d.polygon([(x0 + nx * wa / 2, y0 + ny * wa / 2), (x1 + nx * wb / 2, y1 + ny * wb / 2),
                   (x1 - nx * wb / 2, y1 - ny * wb / 2), (x0 - nx * wa / 2, y0 - ny * wa / 2)],
                  fill=(255, 255, 255, int(lerp(a0, a1, t))))
    base.alpha_composite(layer.filter(ImageFilter.GaussianBlur(SS * 1.5)))


def arcs(base, cx, cy, r0, step, count, width, alpha):
    layer = blank(base.size)
    d = ImageDraw.Draw(layer)
    for i in range(count):
        r = r0 + i * step
        d.arc((cx - r, cy - r, cx + r, cy + r), 230, 310, fill=(255, 255, 255, alpha - i * 25), width=width)
    d.ellipse((cx - width, cy - width, cx + width, cy + width), fill=(255, 255, 255, alpha))
    base.alpha_composite(layer)


def app_image(W=1000, H=700):
    w, h = W * SS, H * SS
    base = gradient(w, h, (6, 88, 156), (88, 188, 240)).convert('RGBA')
    bokeh = blank((w, h))
    bd = ImageDraw.Draw(bokeh)
    for cx, cy, r, a in [(0.12, 0.2, 0.16, 38), (0.86, 0.78, 0.22, 30), (0.78, 0.12, 0.09, 34), (0.2, 0.86, 0.1, 26)]:
        bd.ellipse((cx * w - r * h, cy * h - r * h, cx * w + r * h, cy * h + r * h), fill=(255, 255, 255, a))
    base.alpha_composite(bokeh.filter(ImageFilter.GaussianBlur(h * 0.02)))

    ux, uw, uh, uy = w * 0.17, w * 0.66, h * 0.27, h * 0.16
    draw_unit(base, ux, uy, uw, uh)
    y0 = uy + uh * 0.93
    for fx, dx1, dy1, length, a in [(0.12, -0.22, 0.20, 0.50, 150), (0.30, -0.10, 0.27, 0.56, 150), (0.50, 0.00, 0.30, 0.58, 160),
                                    (0.70, 0.10, 0.27, 0.56, 150), (0.88, 0.22, 0.20, 0.50, 150)]:
        sx = ux + uw * fx
        p0 = (sx, y0)
        p1 = (sx + dx1 * w * 0.05, y0 + h * 0.12)
        p2 = (sx + dx1 * w * 0.22, y0 + h * dy1 * 0.75)
        p3 = (sx + dx1 * w * 0.40, y0 + h * length * 0.82)
        stream(base, bezier(p0, p1, p2, p3), w * 0.020, w * 0.003, a, 0)
    arcs(base, ux + uw * 0.88, uy - h * 0.035, h * 0.030, h * 0.030, 3, max(3, int(h * 0.007)), 215)
    return base.convert('RGB')


def driver_image(S=1000):
    s = S * SS
    base = Image.new('RGBA', (s, s), (255, 255, 255, 255))
    ux, uw, uh, uy = s * 0.09, s * 0.82, s * 0.25, s * 0.17
    draw_unit(base, ux, uy, uw, uh, outline=(206, 214, 225))
    # interface module with cable
    mx, my, mw, mh = s * 0.50, s * 0.62, s * 0.34, s * 0.17
    soft_shadow(base, (mx, my, mx + mw, my + mh), mh * 0.22, (0, mh * 0.12), mh * 0.12, 110)
    d = ImageDraw.Draw(base)
    cable = bezier((mx + mw * 0.1, my), (mx - s * 0.03, my - s * 0.08), (ux + uw * 0.78, uy + uh + s * 0.16), (ux + uw * 0.72, uy + uh * 0.92), 60)
    d.line(cable, fill=(60, 74, 92), width=max(3, int(s * 0.008)), joint='curve')
    mask = Image.new('L', base.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((mx, my, mx + mw, my + mh), mh * 0.22, fill=255)
    body = Image.new('RGB', base.size)
    body.paste(gradient(int(mw), int(mh), (252, 253, 254), (224, 230, 238), 'v'), (int(mx), int(my)))
    base.paste(body, (0, 0), mask)
    d = ImageDraw.Draw(base)
    d.rounded_rectangle((mx, my, mx + mw, my + mh), mh * 0.22, outline=(206, 214, 225), width=max(2, int(s * 0.004)))
    lr = mh * 0.07
    d.ellipse((mx + mw * 0.12 - lr, my + mh * 0.5 - lr, mx + mw * 0.12 + lr, my + mh * 0.5 + lr), fill=(10, 110, 189))
    for i in range(3):
        rr = mh * (0.16 + i * 0.12)
        cx, cy = mx + mw * 0.30, my + mh * 0.5
        d.arc((cx - rr, cy - rr, cx + rr, cy + rr), -45, 45, fill=(10, 110, 189), width=max(3, int(mh * 0.035)))
    return base.convert('RGB')


def save(img, path, size):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.resize(size, Image.LANCZOS).save(path, optimize=True)


app = app_image()
for name, size in {'small': (250, 175), 'large': (500, 350), 'xlarge': (1000, 700)}.items():
    save(app, os.path.join(ROOT, 'assets/images', name + '.png'), size)
drv = driver_image()
for name, px in {'small': 75, 'large': 500, 'xlarge': 1000}.items():
    save(drv, os.path.join(ROOT, 'drivers/naviclim-ac/assets/images', name + '.png'), (px, px))

# --- icons (single colour, transparent background) ---
APP_ICON = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="6" y="9" width="52" height="22" rx="6" fill="none" stroke="#000" stroke-width="3"/><path d="M12 25h40" stroke="#000" stroke-width="3" stroke-linecap="round"/><g fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"><path d="M18 39q-4 5 0 10t0 10"/><path d="M32 39q-4 5 0 10t0 10"/><path d="M46 39q-4 5 0 10t0 10"/></g></svg>
'''
DRIVER_ICON = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"><path d="M26.34 18.34A8 8 0 0 1 37.66 18.34"/><path d="M22.1 14.1A14 14 0 0 1 41.9 14.1"/><path d="M17.86 9.86A20 20 0 0 1 46.14 9.86"/><rect x="10" y="30" width="44" height="24" rx="6"/><path d="M34 42h14"/></g><circle cx="21" cy="42" r="3.5" fill="#000"/></svg>
'''
open(os.path.join(ROOT, 'assets/icon.svg'), 'w').write(APP_ICON)
open(os.path.join(ROOT, 'drivers/naviclim-ac/assets/icon.svg'), 'w').write(DRIVER_ICON)
print('artwork written')
