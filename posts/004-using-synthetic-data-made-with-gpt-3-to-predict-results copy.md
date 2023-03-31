---
title: "Using synthetic data made with GPT-3 to predict marketing performance"
date: 2021-07-06
---

## Using synthetic data made with GPT-3 to predict marketing performance

Our product, Superlines, uses a pool of email benchmark data (e.g., subject lines, open rate %, body text, CTR%) and machine learning to simulate email marketing results. The more and better data we can collect, the better the predictions.

Besides collecting stats from our own email campaigns and manually categorizing email content, I have been thinking of new ways to scale our database. For example, I had a wild idea to give GPT-3 our real data and command it to write more similar data automatically.

### Prototyping with Twitter API
Before using the approach in production for the email use case, I'm using Twitter as a sandbox. I have now collected a set of artificial tweets and engagement metrics by feeding real tweets as an example to GPT-3 and letting it write more data.

### A real-world prototype
To make my experiment more concrete, I used my synthetic tweet data to train a machine learning model and wrapped it with a UI for predicting Twitter text success. The idea is that if my data and algorithms could be trusted, I could use this tool for making fast decisions when optimizing Twitter texts.