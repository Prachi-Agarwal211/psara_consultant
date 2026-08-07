#!/usr/bin/env python3
"""PSARA asset generation via Pollinations (keyless, seed-stable)."""
import json, os, sys, time, urllib.request, urllib.parse

BASE = "https://image.pollinations.ai/prompt/{}?width={}&height={}&nologo=true&seed={}"
OUT = "/mnt/c/Users/15anu/OneDrive/文档/code/psara-consultant/public/assets/images/generated"
UA = {"User-Agent": "Mozilla/5.0 (PSARA-asset-gen)"}
NO_TEXT = ", no text, no words, no letters, no watermark, no logo"

# prompt, w, h, seed, filename
JOBS = [
    # Batch 2 — hero art replacement (kills the slop)
    ("professional Indian government PSARA license certificate mockup displayed on dark navy presentation background, elegant mint green header bar, gold seal emblem, ornamental certificate border, studio lighting, photorealistic" + NO_TEXT, 1536, 1024, 2001, "certificate-mockup.jpg"),
    ("abstract cinematic security background, dark navy blue with glowing amber gold shield and checkmark motif, soft bokeh light particles, premium corporate, wide composition" + NO_TEXT, 1920, 1080, 2002, "hero-bg.jpg"),
    # Batch 3 — per-state identity (top 5)
    ("cinematic night skyline of Mumbai India with Marine Drive and Gateway of India silhouette, private security guard silhouette in foreground, dark navy blue and amber gold color grade, premium corporate photography, dramatic lighting" + NO_TEXT, 1536, 1024, 2003, "state-maharashtra.jpg"),
    ("cinematic night view of India Gate and Rashtrapati Bhavan New Delhi, private security patrol silhouette in foreground, dark navy blue and amber gold color grade, premium corporate photography, dramatic lighting" + NO_TEXT, 1536, 1024, 2004, "state-delhi-ncr.jpg"),
    ("cinematic dusk view of Taj Mahal Agra silhouette, private security guard walking patrol in foreground, dark navy blue and amber gold color grade, premium corporate photography, dramatic lighting" + NO_TEXT, 1536, 1024, 2005, "state-uttar-pradesh.jpg"),
    ("cinematic dusk skyline of Bangalore India with Vidhana Soudha and technology towers, private security guard silhouette in foreground, dark navy blue and amber gold color grade, premium corporate photography, dramatic lighting" + NO_TEXT, 1536, 1024, 2006, "state-karnataka.jpg"),
    ("cinematic dusk skyline of Chennai India with Marina Beach lighthouse, private security guard silhouette in foreground, dark navy blue and amber gold color grade, premium corporate photography, dramatic lighting" + NO_TEXT, 1536, 1024, 2007, "state-tamil-nadu.jpg"),
    # Batch 4 — thematic backgrounds (reusable across 220 city pages)
    ("industrial warehouse at night with floodlights, private security guard silhouette patrolling with flashlight, dark navy blue and amber gold grade, cinematic" + NO_TEXT, 1536, 1024, 2008, "theme-industrial-night.jpg"),
    ("long government office corridor at dusk, polished floor reflections, warm amber lighting, empty and serene, dark navy blue and gold grade, cinematic" + NO_TEXT, 1536, 1024, 2009, "theme-govt-corridor.jpg"),
    ("private security guard silhouette walking patrol at night, dramatic rim lighting, amber gold highlights on dark navy background, cinematic wide shot" + NO_TEXT, 1536, 1024, 2010, "theme-guard-patrol.jpg"),
    ("modern corporate towers at dusk with city lights, rooftop security guard silhouette, dark navy blue and amber gold color grade, cinematic" + NO_TEXT, 1536, 1024, 2011, "theme-corporate-dusk.jpg"),
]

def fetch(url, tries=2):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=90) as r:
                data = r.read()
                ct = r.headers.get("Content-Type", "")
            if data and (ct.startswith("image/") or data[:2] == b"\xff\xd8"):
                return data
            print(f"  bad content-type {ct}, retry {i+1}")
        except Exception as e:
            print(f"  error: {e}, retry {i+1}")
            time.sleep(3)
    return None

def main():
    os.makedirs(OUT, exist_ok=True)
    # probe first
    probe = "https://image.pollinations.ai/prompt/test%20probe?width=256&height=256&nologo=true&seed=1"
    d = fetch(probe)
    if not d:
        print("PROBE FAILED — endpoint unreachable"); sys.exit(1)
    is_jpeg = d[:2] == b"\xff\xd8"
    print(f"PROBE OK: {len(d)} bytes, jpeg={is_jpeg}")
    results = []
    for prompt, w, h, seed, fname in JOBS:
        url = BASE.format(urllib.parse.quote(prompt), w, h, seed)
        t0 = time.time()
        data = fetch(url)
        dt = time.time() - t0
        if data:
            path = os.path.join(OUT, fname)
            with open(path, "wb") as f:
                f.write(data)
            results.append((fname, len(data), f"{dt:.1f}s", "OK"))
        else:
            results.append((fname, 0, f"{dt:.1f}s", "FAIL"))
        print(f"{fname}: {results[-1][1]} bytes in {results[-1][2]} -> {results[-1][3]}")
    ok = sum(1 for r in results if r[3] == "OK")
    print(f"\nDONE: {ok}/{len(results)} downloaded to {OUT}")
    with open(os.path.join(OUT, "manifest.json"), "w") as f:
        json.dump([{ "file": r[0], "bytes": r[1], "time_s": r[2], "status": r[3] } for r in results], f, indent=2)

if __name__ == "__main__":
    main()
