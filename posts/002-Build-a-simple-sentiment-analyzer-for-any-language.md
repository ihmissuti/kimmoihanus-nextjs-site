---
title: "Build a Simple Sentiment Analyzer for Any Language with Node.js"
date: 2020-12-07
---

Here are instructions on how to conduct simple sentiment analysis for any language using node.js

Prerequisites: nodejs installed. You can install it [here](https://nodejs.org/en/).

Start by creating an empty folder and install [Sentiment](https://github.com/thisandagain/sentiment) open source software (by Andrew Sliwinski) by entering the below commands to your terminal.

```
$ mkdir my-sentiment-analysis
$ cd my-sentiment-analysis
$ npm install sentiment
```

Next, locate the file containing a word list that Sentiment uses to conduct sentiment analysis. The file is located in your project folder path:
```
node_modules/sentiment/languages/en/labels.json
```
![Labels.json](/blog/images/sentiment_view.png)

Copy-paste the whole content of labels.json file to your text editor / notepad.

Now, let's translate the list to the language we want to analyze. First, open google translator. Then paste the content of the JSON word list to the translator, and paste the translated text into a new text file. Google translator can't fit the whole list so you need to process it piece by piece.

Now you should have a new JSON file containing a translated word list in your preferred language. Finally, replace the original labels.json list in the Sentiment program with the newly translated JSON file. You might need to use [JSON lint](https://jsonlint.com/) or some other cleaning program to check your JSON file for errors.

Let's test the program. Create a javascript file (eg index.js) with the below content:

```javascript
var Sentiment = require(&#39;sentiment&#39;);
var sentiment = new Sentiment();
var result = sentiment.analyze(&#39;Kiva kesä&#39;);
console.log(result);
```

Replace 'Kiva kesä' with a string you want to analyze, and run the program:

```
$ node index
```

You should see the result of the analysis in the terminal window.

That's it! This method is not perfect or the most sophisticated, but it's a hack that gets the job done quickly and you can tweak it for your purposes.

Here's a [demo](http://sentiment-analyzer-fi.herokuapp.com/) application that I build that uses the same approach to conduct Finnish sentiment analysis. Check the source code from [Github](https://github.com/ihmissuti/fi-sentiment-analysis).