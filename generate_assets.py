#!/usr/bin/env python3
"""Generate all monochrome SVG assets for MONO/FORM fashion site."""
import os

OUT = os.path.join(os.path.dirname(__file__), "assets")
os.makedirs(OUT, exist_ok=True)

INK = "#111111"
PAPER = "#F7F7F5"
STONE = "#6F6F6F"
BONE = "#DDD9D2"
MIST = "#C9C9C6"

GRAIN = """
<filter id="grain">
  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="n"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0"/>
  <feComposite operator="over" in2="SourceGraphic"/>
</filter>
"""

def wrap(w, h, body, bg=PAPER):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">
<defs>{GRAIN}
<linearGradient id="tone" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="{INK}"/><stop offset="1" stop-color="#3a3a3a"/>
</linearGradient>
<linearGradient id="bone" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="{BONE}"/><stop offset="1" stop-color="{MIST}"/>
</linearGradient>
</defs>
<rect width="{w}" height="{h}" fill="{bg}"/>
<g filter="url(#grain)">{body}</g>
</svg>'''

# ---------------- MODEL FIGURE (shared base) ----------------
def model_base():
    # abstract fashion-illustration figure, 480x760 canvas
    return f'''
<!-- floor shadow -->
<ellipse cx="240" cy="726" rx="120" ry="12" fill="{INK}" opacity="0.08"/>
<!-- head -->
<circle cx="240" cy="86" r="34" fill="{INK}"/>
<!-- neck -->
<rect x="230" y="116" width="20" height="26" fill="{INK}"/>
<!-- arms (bare, drawn behind garments) -->
<path d="M164 190 C 148 260, 146 330, 154 402 L 172 400 C 166 332, 170 264, 184 200 Z" fill="{INK}"/>
<path d="M316 190 C 332 260, 334 330, 326 402 L 308 400 C 314 332, 310 264, 296 200 Z" fill="{INK}"/>
<!-- legs -->
<path d="M212 440 L 204 700 L 226 700 L 234 452 Z" fill="{INK}"/>
<path d="M268 440 L 276 700 L 254 700 L 246 452 Z" fill="{INK}"/>
<!-- shoes -->
<path d="M200 700 L 228 700 L 232 716 L 192 716 Z" fill="{INK}"/>
<path d="M252 700 L 280 700 L 288 716 L 248 716 Z" fill="{INK}"/>
'''

def look_1():  # tailored long coat
    g = model_base() + f'''
<path d="M240 142 L 178 168 C 158 250, 156 380, 166 560 L 226 560 L 232 300 L 240 280 L 248 300 L 254 560 L 314 560 C 324 380, 322 250, 302 168 Z"
      fill="url(#tone)"/>
<path d="M240 142 L 214 176 L 236 292 L 240 280 Z" fill="{PAPER}" opacity="0.14"/>
<path d="M240 142 L 266 176 L 244 292 L 240 280 Z" fill="{PAPER}" opacity="0.22"/>
<line x1="240" y1="300" x2="240" y2="548" stroke="{PAPER}" stroke-width="2" opacity="0.35"/>
<rect x="176" y="330" width="4" height="220" fill="{PAPER}" opacity="0.12"/>
<rect x="300" y="330" width="4" height="220" fill="{PAPER}" opacity="0.12"/>
'''
    return wrap(480, 760, g, bg="none").replace(f'<rect width="480" height="760" fill="none"/>', '')

def look_2():  # bone knit + wide trousers
    g = model_base() + f'''
<path d="M240 142 L 184 170 C 172 220, 170 280, 176 352 L 304 352 C 310 280, 308 220, 296 170 Z" fill="url(#bone)"/>
<path d="M184 170 C 176 210, 174 250, 176 296 L 192 296 C 188 250, 190 212, 198 178 Z" fill="{MIST}"/>
<path d="M296 170 C 304 210, 306 250, 304 296 L 288 296 C 292 250, 290 212, 282 178 Z" fill="{MIST}"/>
<g stroke="{STONE}" stroke-width="1.4" opacity="0.4">
  <line x1="186" y1="200" x2="298" y2="200"/><line x1="182" y1="240" x2="300" y2="240"/>
  <line x1="180" y1="280" x2="302" y2="280"/><line x1="178" y1="320" x2="303" y2="320"/>
</g>
<path d="M178 352 L 168 704 L 224 704 L 236 420 L 244 420 L 256 704 L 312 704 L 302 352 Z" fill="{INK}"/>
<path d="M236 420 L 240 352 L 244 420 Z" fill="{PAPER}" opacity="0.1"/>
'''
    return wrap(480, 760, g, bg="none").replace(f'<rect width="480" height="760" fill="none"/>', '')

def look_3():  # column dress
    g = model_base() + f'''
<path d="M240 142 L 192 172 C 182 240, 184 300, 196 340 C 186 460, 184 580, 196 700 L 284 700 C 296 580, 294 460, 284 340 C 296 300, 298 240, 288 172 Z"
      fill="url(#tone)"/>
<path d="M240 142 L 210 300 L 240 700 L 244 700 L 250 300 Z" fill="{PAPER}" opacity="0.08"/>
<path d="M196 340 L 284 340" stroke="{PAPER}" stroke-width="1.5" opacity="0.3"/>
<path d="M212 700 C 220 560, 218 440, 214 360" stroke="{PAPER}" stroke-width="1.5" fill="none" opacity="0.22"/>
<path d="M268 700 C 260 560, 262 440, 266 360" stroke="{PAPER}" stroke-width="1.5" fill="none" opacity="0.22"/>
'''
    return wrap(480, 760, g, bg="none").replace(f'<rect width="480" height="760" fill="none"/>', '')

open(f"{OUT}/model-look-1.svg", "w").write(look_1())
open(f"{OUT}/model-look-2.svg", "w").write(look_2())
open(f"{OUT}/model-look-3.svg", "w").write(look_3())

# ---------------- PRODUCT GARMENTS (600x750 cards) ----------------
def product(body):
    return wrap(600, 750, f'''
<rect x="0" y="0" width="600" height="750" fill="{PAPER}"/>
<line x1="40" y1="710" x2="560" y2="710" stroke="{MIST}" stroke-width="1"/>
{body}''')

garments = {}

garments["coat-structure"] = product(f'''
<g transform="translate(300 360)">
<path d="M0 -240 L -96 -206 C -122 -100, -124 60, -110 220 L -18 220 L -8 -60 L 0 -84 L 8 -60 L 18 220 L 110 220 C 124 60, 122 -100, 96 -206 Z" fill="url(#tone)"/>
<path d="M0 -240 L -40 -190 L -6 -66 L 0 -84 Z" fill="{PAPER}" opacity="0.15"/>
<path d="M0 -240 L 40 -190 L 6 -66 L 0 -84 Z" fill="{PAPER}" opacity="0.25"/>
<line x1="0" y1="-60" x2="0" y2="204" stroke="{PAPER}" stroke-width="2.5" opacity="0.35"/>
<circle cx="14" cy="-20" r="4" fill="{PAPER}" opacity="0.5"/><circle cx="14" cy="40" r="4" fill="{PAPER}" opacity="0.5"/>
<circle cx="14" cy="100" r="4" fill="{PAPER}" opacity="0.5"/>
</g>''')

garments["blazer-line"] = product(f'''
<g transform="translate(300 380)">
<path d="M0 -230 L -104 -192 C -118 -110, -118 -10, -108 120 L -20 120 L -10 -40 L 0 -66 L 10 -40 L 20 120 L 108 120 C 118 -10, 118 -110, 104 -192 Z" fill="{INK}"/>
<path d="M0 -230 L -58 -170 L -8 -44 L 0 -66 Z" fill="{PAPER}" opacity="0.12"/>
<path d="M0 -230 L 58 -170 L 8 -44 L 0 -66 Z" fill="{PAPER}" opacity="0.2"/>
<path d="M-104 -192 L -140 -60 L -110 -40 L -96 -150 Z" fill="{INK}"/>
<path d="M104 -192 L 140 -60 L 110 -40 L 96 -150 Z" fill="{INK}"/>
<circle cx="0" cy="20" r="4.5" fill="{PAPER}" opacity="0.6"/>
<line x1="-70" y1="60" x2="-40" y2="60" stroke="{PAPER}" stroke-width="2" opacity="0.3"/>
<line x1="40" y1="60" x2="70" y2="60" stroke="{PAPER}" stroke-width="2" opacity="0.3"/>
</g>''')

garments["dress-column"] = product(f'''
<g transform="translate(300 370)">
<path d="M0 -250 L -66 -214 C -78 -140, -74 -80, -60 -40 C -78 80, -82 180, -66 300 L 66 300 C 82 180, 78 80, 60 -40 C 74 -80, 78 -140, 66 -214 Z" fill="url(#tone)"/>
<path d="M0 -250 L -34 -60 L 0 300 L 6 300 L 12 -60 Z" fill="{PAPER}" opacity="0.09"/>
<line x1="-60" y1="-40" x2="60" y2="-40" stroke="{PAPER}" stroke-width="1.8" opacity="0.35"/>
<path d="M-40 300 C -30 160, -34 40, -38 -20" stroke="{PAPER}" stroke-width="1.5" fill="none" opacity="0.25"/>
<path d="M40 300 C 30 160, 34 40, 38 -20" stroke="{PAPER}" stroke-width="1.5" fill="none" opacity="0.25"/>
</g>''')

garments["shirt-paper"] = product(f'''
<g transform="translate(300 380)">
<path d="M0 -220 L -100 -184 C -112 -100, -110 0, -100 110 L 100 110 C 110 0, 112 -100, 100 -184 Z" fill="url(#bone)"/>
<path d="M0 -220 L -26 -186 L 0 -120 L 26 -186 Z" fill="{PAPER}"/>
<path d="M0 -220 L -26 -186 L -12 -178 L 0 -196 Z" fill="{STONE}" opacity="0.5"/>
<path d="M0 -220 L 26 -186 L 12 -178 L 0 -196 Z" fill="{STONE}" opacity="0.5"/>
<line x1="0" y1="-120" x2="0" y2="96" stroke="{STONE}" stroke-width="1.6" opacity="0.5"/>
<circle cx="0" cy="-90" r="3" fill="{STONE}"/><circle cx="0" cy="-40" r="3" fill="{STONE}"/><circle cx="0" cy="10" r="3" fill="{STONE}"/><circle cx="0" cy="60" r="3" fill="{STONE}"/>
<path d="M-100 -184 L -128 -60 L -102 -46 L -92 -140 Z" fill="url(#bone)" stroke="{STONE}" stroke-width="1" stroke-opacity="0.3"/>
<path d="M100 -184 L 128 -60 L 102 -46 L 92 -140 Z" fill="url(#bone)" stroke="{STONE}" stroke-width="1" stroke-opacity="0.3"/>
</g>''')

garments["trouser-wide"] = product(f'''
<g transform="translate(300 130)">
<path d="M-92 0 L 92 0 L 104 60 L 84 500 L 16 500 L 4 120 L -4 120 L -16 500 L -84 500 L -104 60 Z" fill="{INK}"/>
<rect x="-92" y="0" width="184" height="26" fill="{INK}"/>
<line x1="-92" y1="26" x2="92" y2="26" stroke="{PAPER}" stroke-width="1.5" opacity="0.3"/>
<path d="M-50 60 L -44 480" stroke="{PAPER}" stroke-width="1.5" opacity="0.2"/>
<path d="M50 60 L 44 480" stroke="{PAPER}" stroke-width="1.5" opacity="0.2"/>
<rect x="-8" y="4" width="16" height="18" fill="{PAPER}" opacity="0.25"/>
</g>''')

garments["knit-cloud"] = product(f'''
<g transform="translate(300 390)">
<path d="M0 -210 L -110 -170 C -126 -90, -124 10, -112 100 L 112 100 C 124 10, 126 -90, 110 -170 Z" fill="url(#bone)"/>
<path d="M-110 -170 C -146 -120, -152 -40, -140 30 L -112 22 C -120 -40, -118 -110, -102 -156 Z" fill="{MIST}"/>
<path d="M110 -170 C 146 -120, 152 -40, 140 30 L 112 22 C 120 -40, 118 -110, 102 -156 Z" fill="{MIST}"/>
<path d="M0 -210 C -30 -206, -44 -192, -46 -178 C -20 -168, 20 -168, 46 -178 C 44 -192, 30 -206, 0 -210 Z" fill="{MIST}"/>
<g stroke="{STONE}" stroke-width="1.3" opacity="0.35">
  <line x1="-116" y1="-130" x2="116" y2="-130"/><line x1="-120" y1="-85" x2="120" y2="-85"/>
  <line x1="-122" y1="-40" x2="122" y2="-40"/><line x1="-120" y1="5" x2="120" y2="5"/>
  <line x1="-116" y1="50" x2="116" y2="50"/><line x1="-113" y1="88" x2="113" y2="88"/>
</g>
</g>''')

garments["skirt-bias"] = product(f'''
<g transform="translate(300 200)">
<path d="M-70 0 L 70 0 L 96 180 C 110 260, 104 330, 90 400 L -90 400 C -104 330, -110 260, -96 180 Z" fill="url(#tone)"/>
<rect x="-70" y="0" width="140" height="20" fill="{INK}"/>
<path d="M-20 20 C -30 160, -34 280, -30 396" stroke="{PAPER}" stroke-width="1.5" fill="none" opacity="0.25"/>
<path d="M30 20 C 38 160, 40 280, 36 396" stroke="{PAPER}" stroke-width="1.5" fill="none" opacity="0.25"/>
<path d="M-70 8 L 70 8" stroke="{PAPER}" stroke-width="1.2" opacity="0.3"/>
</g>''')

garments["top-halter"] = product(f'''
<g transform="translate(300 400)">
<path d="M0 -230 L -14 -206 L -78 -150 C -90 -70, -86 20, -74 90 L 74 90 C 86 20, 90 -70, 78 -150 L 14 -206 Z" fill="url(#bone)"/>
<path d="M0 -230 L -14 -206 L 0 -186 L 14 -206 Z" fill="{STONE}" opacity="0.4"/>
<path d="M-78 -150 C -40 -120, 40 -120, 78 -150" stroke="{STONE}" stroke-width="1.4" fill="none" opacity="0.4"/>
<line x1="0" y1="-186" x2="0" y2="80" stroke="{STONE}" stroke-width="1.2" opacity="0.3"/>
</g>''')

for name, svg in garments.items():
    open(f"{OUT}/{name}.svg", "w").write(svg)

# ---------------- EDITORIAL / ATMOSPHERE IMAGES ----------------
ed1 = wrap(900, 1200, f'''
<rect width="900" height="1200" fill="{INK}"/>
<circle cx="450" cy="380" r="150" fill="{PAPER}" opacity="0.06"/>
<path d="M450 260 L 330 310 C 306 480, 304 720, 322 1040 L 578 1040 C 596 720, 594 480, 570 310 Z" fill="{PAPER}" opacity="0.92"/>
<circle cx="450" cy="180" r="52" fill="{PAPER}"/>
<line x1="450" y1="440" x2="450" y2="1010" stroke="{INK}" stroke-width="3" opacity="0.5"/>
<text x="60" y="1140" font-family="Georgia, serif" font-size="34" fill="{PAPER}" opacity="0.8" letter-spacing="10">ATELIER — FW26</text>
''', bg=INK)
open(f"{OUT}/editorial-1.svg", "w").write(ed1)

ed2 = wrap(900, 1200, f'''
<rect width="900" height="1200" fill="{BONE}"/>
<rect x="90" y="120" width="720" height="960" fill="{PAPER}"/>
<path d="M450 240 L 360 280 C 344 420, 344 620, 356 900 L 544 900 C 556 620, 556 420, 540 280 Z" fill="{INK}"/>
<circle cx="450" cy="180" r="44" fill="{INK}"/>
<path d="M450 240 L 410 300 L 446 520 L 450 500 Z" fill="{PAPER}" opacity="0.12"/>
<path d="M450 240 L 490 300 L 454 520 L 450 500 Z" fill="{PAPER}" opacity="0.2"/>
<text x="120" y="1050" font-family="Georgia, serif" font-size="30" fill="{INK}" letter-spacing="8">CUT IN SILENCE</text>
''', bg=BONE)
open(f"{OUT}/editorial-2.svg", "w").write(ed2)

ed3 = wrap(1600, 900, f'''
<rect width="1600" height="900" fill="{PAPER}"/>
<g opacity="0.9">
<path d="M300 200 L 240 226 C 228 320, 228 480, 238 680 L 362 680 C 372 480, 372 320, 360 226 Z" fill="{INK}"/>
<path d="M800 180 L 736 208 C 722 320, 722 500, 734 700 L 866 700 C 878 500, 878 320, 864 208 Z" fill="url(#bone)" stroke="{STONE}" stroke-width="1" stroke-opacity="0.3"/>
<path d="M1300 200 L 1244 228 C 1232 330, 1234 500, 1246 680 L 1354 680 C 1366 500, 1368 330, 1356 228 Z" fill="url(#tone)"/>
</g>
<line x1="80" y1="790" x2="1520" y2="790" stroke="{MIST}" stroke-width="1"/>
<text x="80" y="840" font-family="Georgia, serif" font-size="26" fill="{STONE}" letter-spacing="6">THREE CUTS. ONE LINE.</text>
''', bg=PAPER)
open(f"{OUT}/editorial-3.svg", "w").write(ed3)

# favicon-ish logo mark
logo = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
<rect width="64" height="64" fill="#111111"/>
<path d="M14 48 L14 16 L24 34 L32 20 L40 34 L50 16 L50 48" stroke="#F7F7F5" stroke-width="4" fill="none" stroke-linejoin="miter"/>
</svg>'''
open(f"{OUT}/mark.svg", "w").write(logo)

print("generated:", sorted(os.listdir(OUT)))
