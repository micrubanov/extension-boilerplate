import ext from "./utils/ext";

function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

var checkState = () => {
  var url = document.location.href;
  if (!url || !url.match(/^https/)) return;

  var data = {
    title: "",
    description: "",
    url: document.location.href
  };

  let startWithRegexp = /^https:\/\/console\.aws\.amazon\.com\/elasticbeanstalk/;
  let r = new RegExp(startWithRegexp);

  let statusElement = getElementByXpath(
    "/html/body/div[1]/div[2]/div/div[2]/div[2]/div[2]/div[2]/div[2]/div[1]/div/p[2]/strong"
  );
  if (data.url.match(r) !== null) {
    if (statusElement) {
      let statusText = statusElement.innerText;
      data.status = statusElement.innerText;
    }else {
      console.debug('not found a status DOM element');
    }
  } else {
    console.debug("not an elastic beanstalk console url.");
  }

  //TODO : make sound maped to state
  //<audio xmlns="http://www.w3.org/1999/xhtml" id="clickSound" src="click.ogg" />
  //document.getElementById("clickSound").play();
  //http://plnkr.co/edit/S9Ipogq4M2fqWVKPvvEh?p=preview
  console.log(data,'data');

  return data;
};

function onRequest(request, sender, sendResponse) {
  if (request.action === "check-state") {
    sendResponse(checkState());
  }
}

ext.runtime.onMessage.addListener(onRequest);
