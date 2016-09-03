function deletehistory() {
    var domain = { "text": "freelancer" }
    chrome.history.search(domain, function(history) { history.map(function(item, index) { console.log(item.url);
            chrome.history.deleteUrl({ "url": item.url }) }) })
}
