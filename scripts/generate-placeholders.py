"""Generates clearly-labelled placeholder photographs (WebP) into public/images.
Optional dev tool: run `python3 scripts/generate-placeholders.py` (needs Pillow).
Replace the generated files with real photographs of the same name."""
import os, random
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
L, P, T = (1800, 1200), (1200, 1500), (1200, 1800)  # landscape, portrait 4:5, tall 2:3

PROJECTS = {
    "ctf-competition":  ((24, 32, 36), (96, 118, 120), [L, P, P, L, T, L]),
    "tech-conference":  ((70, 66, 60), (190, 180, 164), [L, L, P, P, L, T]),
    "cultural-night":   ((58, 28, 26), (176, 118, 92), [P, L, T, L, P, L]),
    "hackathon":        ((38, 44, 34), (150, 156, 122), [L, P, L, P, P, L]),
}

def font(size):
    for f in ("DejaVuSans.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"):
        try: return ImageFont.truetype(f, size)
        except OSError: pass
    return ImageFont.load_default()

def make(size, dark, light, seed, label, out, q=62):
    w, h = size
    rnd = random.Random(seed)
    sw, sh = w // 4, h // 4
    base = Image.new("RGB", (sw, sh))
    px = base.load()
    ang = rnd.uniform(0.2, 0.8)
    for y in range(sh):
        for x in range(sw):
            t = min(1, max(0, (y / sh) * (1 - ang) + (x / sw) * ang))
            t = t * t * (3 - 2 * t)
            px[x, y] = tuple(int(dark[i] + (light[i] - dark[i]) * t) for i in range(3))
    glow = Image.new("RGB", (sw, sh), (0, 0, 0))
    d = ImageDraw.Draw(glow)
    for _ in range(rnd.randint(7, 11)):
        r = rnd.randint(sh // 14, sh // 4)
        x, y = rnd.randint(0, sw), rnd.randint(0, sh)
        c = tuple(min(255, int(light[i] * rnd.uniform(0.9, 1.3))) for i in range(3))
        d.ellipse((x - r, y - r, x + r, y + r), fill=tuple(int(v * 0.35) for v in c))
    glow = glow.filter(ImageFilter.GaussianBlur(sh // 14))
    from PIL import ImageChops
    base = ImageChops.add(base, glow)
    img = base.resize((w, h), Image.BICUBIC)
    noise = Image.effect_noise((w, h), 14).convert("RGB")
    img = Image.blend(img, noise, 0.035)
    dr = ImageDraw.Draw(img)
    f = font(max(14, w // 70))
    dr.text((w * 0.03, h - h * 0.06), f"PLACEHOLDER  {label}", fill=(245, 242, 236), font=f)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    img.save(out, "WEBP", quality=q, method=4)

n = 0
for slug, (dark, light, sizes) in PROJECTS.items():
    make((1800, 1200), dark, light, hash(slug) % 997, f"{slug} / cover", f"{ROOT}/{slug}/cover.webp")
    for i, s in enumerate(sizes, 1):
        make(s, dark, light, i * 31 + len(slug), f"{slug} / photo-{i:02d}", f"{ROOT}/{slug}/photo-{i:02d}.webp")
make((2400, 1100), (40, 36, 32), (176, 160, 138), 7, "hero / hero.webp", f"{ROOT}/hero/hero.webp", 66)
make((1200, 1500), (62, 56, 50), (190, 176, 156), 11, "about / portrait.webp", f"{ROOT}/about/portrait.webp")
print("done")
