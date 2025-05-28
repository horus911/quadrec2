function updateShareLink() {
  const data = {
    text: textInput.value,
    files: filesData
  };
  const encoded = encodeURIComponent(JSON.stringify(data));
  const url = `${location.origin}${location.pathname}?data=${encoded}`;
  shareLinkInput.value = url;
}
