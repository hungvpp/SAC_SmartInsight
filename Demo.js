// Hàm gọi GPT-4o thông qua API Chat Completions
var ajaxCall = (key, prompt) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://api.openai.com/v1/chat/completions",
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1024,
        temperature: 0.5,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      success: function (response, status, xhr) {
        resolve({ response, status, xhr });
      },
      error: function (xhr, status, error) {
        const err = new Error("xhr error");
        err.status = xhr.status;
        reject(err);
      },
    });
  });
};
  
  const url = "https://api.openai.com/v1";
  
  (function () {
    const template = document.createElement("template");
    template.innerHTML = `
      <style></style>
      <div id="root" style="width: 100%; height: 100%;"></div>
    `;
  
    class MainWebComponent extends HTMLElement {
      async post(apiKey, prompt) {
        const { response } = await ajaxCall(apiKey, prompt);
        return response.choices[0].message.content; // Lưu ý: GPT-4o trả kết quả trong "message.content"
      }
    }
  
    customElements.define("custom-widget", MainWebComponent);
  })();