import fs from "node:fs";
import path from "node:path";

const [input, outputDirectory, prefix] = process.argv.slice(2);
const pdf = fs.readFileSync(input);
const marker = Buffer.from("/Filter /DCTDecode");
let cursor = 0;
let imageNumber = 1;

fs.mkdirSync(outputDirectory, { recursive: true });

while ((cursor = pdf.indexOf(marker, cursor)) !== -1) {
  const streamMarker = pdf.indexOf(Buffer.from("stream"), cursor);
  if (streamMarker === -1) break;

  let start = streamMarker + 6;
  if (pdf[start] === 13 && pdf[start + 1] === 10) start += 2;
  else if (pdf[start] === 10) start += 1;

  const end = pdf.indexOf(Buffer.from("endstream"), start);
  if (end === -1) break;

  let imageEnd = end;
  while (imageEnd > start && (pdf[imageEnd - 1] === 10 || pdf[imageEnd - 1] === 13)) imageEnd -= 1;

  const output = path.join(outputDirectory, `${prefix}-${String(imageNumber).padStart(2, "0")}.jpg`);
  fs.writeFileSync(output, pdf.subarray(start, imageEnd));
  console.log(output);

  imageNumber += 1;
  cursor = end + 9;
}
