// ==UserScript==
// @name        Remove Reddit Monetization Buttons
// @description Removes the "Shop Avatars" and "Buy coins" buttons from Reddit.
// @namespace   https://github.com/ianchrist/greasemonkey
// @downloadURL https://raw.githubusercontent.com/ianchrist/greasemonkey/main/removeRedditMonetizationLinks.user.js
// @match       https://www.reddit.com/*
// @icon        https://cdn.iconscout.com/icon/free/png-256/reddit-2752088-2284905.png
// @grant       none
// @version     1.1.0
// @author      ianchrist
// @run-at      document-start
// @license     MIT
// ==/UserScript==

const xpathSearches = [
    "//button[text()='Shop Avatars']", // Shop Avatars button
    "//button[@id='COIN_PURCHASE_DROPDOWN_ID']" // Get coins button
]

const observeDOM = (fn, e = document.documentElement, config = { attributes: 1, childList: 1, subtree: 1 }) => {
    const observer = new MutationObserver(fn);
    observer.observe(e, config);
    return () => observer.disconnect();
};
  
observeDOM(() => {
    for (const xpathSearch of xpathSearches) {
        const button = document.evaluate(xpathSearch, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        if (button) {
            button.parentElement.remove();
        }
    }
})
