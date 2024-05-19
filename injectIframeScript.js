(function() {
    function clickSecondInstance() {
      const elements = document.querySelectorAll('div.click_behavior_box .MuiBox-root');
      if (elements.length >= 2) {
        elements[1].click();
      }
    }
  
    // Check if the script is running in an iframe
    if (window.self !== window.top) {
      clickSecondInstance();
    } else {
      const iframes = document.getElementsByTagName('iframe');
      for (const iframe of iframes) {
        iframe.addEventListener('load', () => {
          try {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            const iframeElements = iframeDocument.querySelectorAll('div.click_behavior_box .MuiBox-root');
            if (iframeElements.length >= 2) {
              iframeElements[1].click();
            }
          } catch (e) {
            console.error('Could not access iframe content:', e);
          }
        });
      }
    }
  })();
  