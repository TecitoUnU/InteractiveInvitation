"""Genera una pieza de caja de música ambiental original (sin copyright).

Composición propia en Do mayor, 72 BPM, pensada para reproducirse en bucle
como fondo suave de la invitación. No usa samples ni melodías existentes.
"""

import math
import random
import struct
import wave

SR = 32000
DURATION = 32.0
N = int(SR * DURATION)

# Frecuencias (temperamento igual, La 440)
def note(name: str) -> float:
    names = {"C": 0, "C#": 1, "D": 2, "D#": 3, "E": 4, "F": 5,
             "F#": 6, "G": 7, "G#": 8, "A": 9, "A#": 10, "B": 11}
    pitch = name[:-1]
    octave = int(name[-1])
    midi = 12 * (octave + 1) + names[pitch]
    return 440.0 * (2.0 ** ((midi - 69) / 12.0))

# Progresión: Cmaj7 · Am7 · Fmaj7 · G6 (4 s cada acorde)
CHORDS = [
    (["C3", "E3", "G3", "B3"], "C2", [("C5", 0.0), ("E5", 0.5), ("G5", 1.0), ("E5", 1.5),
                                      ("D5", 2.0), ("G5", 2.5), ("A5", 3.0), ("G5", 3.5)]),
    (["A2", "C3", "E3", "G3"], "A1", [("A5", 0.0), ("G5", 0.5), ("E5", 1.0), ("D5", 1.5),
                                      ("C5", 2.0), ("E5", 2.5), ("A5", 3.0), ("G5", 3.5)]),
    (["F2", "A2", "C3", "E3"], "F1", [("F5", 0.0), ("A5", 0.5), ("C6", 1.0), ("A5", 1.5),
                                      ("G5", 2.0), ("E5", 2.5), ("D5", 3.0), ("C5", 3.5)]),
    (["G2", "B2", "D3", "E3"], "G1", [("G5", 0.0), ("B5", 0.5), ("D6", 1.0), ("B5", 1.5),
                                      ("A5", 2.0), ("G5", 2.5), ("E5", 3.0), ("D5", 3.5)]),
]

mix = [0.0] * N
random.seed(8)

def add_tone(start: float, freq: float, amp: float, decay: float, duration: float,
             harmonics=(1.0, 0.32, 0.12, 0.05)) -> None:
    begin = int(start * SR)
    length = int(duration * SR)
    if begin >= N:
        return
    length = min(length, N - begin)
    # pequeño ataque para evitar clics
    attack = int(0.006 * SR)
    for i in range(length):
        t = i / SR
        env = math.exp(-t * decay)
        if i < attack:
            env *= i / attack
        value = 0.0
        for h, gain in enumerate(harmonics, start=1):
            value += gain * math.sin(2 * math.pi * freq * h * t)
        mix[begin + i] += amp * env * value


def add_pad(start: float, freqs: list[float], amp: float, duration: float) -> None:
    begin = int(start * SR)
    length = int(duration * SR)
    if begin >= N:
        return
    length = min(length, N - begin)
    attack = int(0.9 * SR)
    release = int(1.4 * SR)
    for i in range(length):
        t = i / SR
        env = 1.0
        if i < attack:
            env = i / attack
        if i > length - release:
            env = min(env, max(0.0, (length - i) / release))
        value = 0.0
        for f in freqs:
            detune = 1.0 + random.uniform(-0.0012, 0.0012)
            value += math.sin(2 * math.pi * f * detune * t)
            value += 0.18 * math.sin(2 * math.pi * f * 2.001 * t)
        mix[begin + i] += amp * env * value / len(freqs)


# Dos ciclos de la progresión → 32 s
for cycle in range(2):
    for chord_index, (chord, bass, melody) in enumerate(CHORDS):
        base = cycle * 16.0 + chord_index * 4.0
        chord_freqs = [note(n) for n in chord]
        add_pad(base, chord_freqs, 0.052, 4.2)
        add_tone(base, note(bass), 0.10, 0.45, 4.0, harmonics=(1.0, 0.18))
        for note_name, offset in melody:
            add_tone(base + offset, note(note_name), 0.082, 3.4, 2.2)

# Eco suave tipo salón
delay_samples = int(0.31 * SR)
feedback = 0.24
echo = list(mix)
for i in range(delay_samples, N):
    echo[i] += echo[i - delay_samples] * feedback
mix = echo

# Filtro de suavizado muy ligero (media móvil de 3 puntos)
smoothed = mix[:]
for i in range(1, N - 1):
    smoothed[i] = 0.82 * mix[i] + 0.09 * mix[i - 1] + 0.09 * mix[i + 1]
mix = smoothed

# Fundidos de entrada/salida para un bucle amable
fade_in = int(1.6 * SR)
fade_out = int(2.4 * SR)
for i in range(fade_in):
    mix[i] *= i / fade_in
for i in range(fade_out):
    mix[N - 1 - i] *= i / fade_out

# Normalizar a un nivel suave
peak = max(abs(v) for v in mix) or 1.0
scale = 0.62 / peak
frames = bytearray()
for value in mix:
    sample = int(max(-1.0, min(1.0, value * scale)) * 32767)
    frames += struct.pack("<h", sample)

with wave.open("public/audio/garden-ambience.wav", "wb") as handle:
    handle.setnchannels(1)
    handle.setsampwidth(2)
    handle.setframerate(SR)
    handle.writeframes(bytes(frames))

print("Listo: public/audio/garden-ambience.wav")
