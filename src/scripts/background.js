import ext from "./utils/ext";

ext.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.action === "check-state") {
      console.debug("data handled by bg:", request.data);

      sendResponse({ action: "makeNoise", data: request.data });
    }
  }
);
