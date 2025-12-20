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
              referrerpolicy="no-referrer-when-downgrade"
            />
          </noscript>
          <script src="https://cdn.jsdelivr.net/gh/ihmissuti/console-chat/scripts/dist/console-chat-min.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
