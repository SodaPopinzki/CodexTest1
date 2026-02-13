import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const outputDir = join(projectRoot, 'public', 'audio');

const tracks = [
  'bitterroot-river-roots.mp3',
  'highway-93-cipher.mp3',
  'mountain-morning.mp3',
  'valley-fog.mp3',
  'steel-and-sawdust.mp3',
  'midnight-in-missoula.mp3'
];

const base64 = (await readFile(join(__dirname, 'silent-10s.mp3.b64'), 'utf8')).trim();
const audioBuffer = Buffer.from(base64, 'base64');

await mkdir(outputDir, { recursive: true });
await Promise.all(
  tracks.map((filename) => writeFile(join(outputDir, filename), audioBuffer))
);

console.log(`Generated ${tracks.length} placeholder audio files in public/audio.`);
