export function formatLayoutParam(layoutParam) {
  const lines = layoutParam.split("\n");
  const processedLines = lines.map((line) =>
    line.replace(/\s+/g, "").split("").join(" ")
  );

  return processedLines.join("\n");
}
