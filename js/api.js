export const getPosts = async () => {
  try {
    const response = await fetch('https://29.javascript.pages.academy/kekstagram/data');
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const sendUploadForm = async (form) => {
  try {
    var formData = new FormData(form);
    const response = await fetch('https://29.javascript.pages.academy/kekstagram', {
      method: 'POST',
      body: formData
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
