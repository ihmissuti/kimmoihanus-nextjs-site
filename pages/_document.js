import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <script src="/noflash.js" />
          <Main />
          <NextScript />
          <script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
          <noscript>
            <img
              src="https://queue.simpleanalyticscdn.com/noscript.gif"
              alt=""
              referrerPolicy="no-referrer-when-downgrade"
            />
          </noscript>
          <script src="https://cdn.jsdelivr.net/gh/ihmissuti/console-chat/scripts/dist/console-chat-min.js"></script>
          {/* AI Search Index */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(){
                  var img = new Image(1,1);
                  var params = "tid=sl_bt_oayse5b51usyrtcp1rt06e648s6a9zgi&url=" + encodeURIComponent(window.location.href);
                  if (document.referrer) params += "&ref=" + encodeURIComponent(document.referrer);
                  img.src = "https://api.aisearchindex.com/api/pixel?" + params;
                  img.style.cssText = "position:absolute;left:-9999px;visibility:hidden";
                  img.alt = "";
                  document.body.appendChild(img);
                })();
              `,
            }}
          />
          <noscript>
            <img
              src="https://api.aisearchindex.com/api/pixel?tid=sl_bt_oayse5b51usyrtcp1rt06e648s6a9zgi"
              width="1"
              height="1"
              style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}
              alt=""
            />
          </noscript>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
