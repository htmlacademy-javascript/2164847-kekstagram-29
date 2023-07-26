export const getPosts = async () => {
  const response = await fetch('https://29.javascript.pages.academy/kekstagram/data');
  const json = await response.json();
  return json;
};

export const sendUploadForm = async (form) => {
  const formData = new FormData(form);
  const response = await fetch('https://29.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: formData
  });
  const json = await response.json();
  return json;
};
