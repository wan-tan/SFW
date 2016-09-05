function deletehistory() {
    getTags(function(test) {
        test.map(function(item) {
            var search = { 'text': item.tag }
            chrome.history.search(search, function(history) {
                history.map(function(item, index) {
                    chrome.history.deleteUrl({ "url": item.url })
                })
            })
        })
    })
}

function getTags(cb) {
    chrome.storage.sync.get('sfw_tags', function(obj) {
        cb(obj.sfw_tags)
    })
}

function addTag(value) {
    chrome.storage.sync.get('sfw_tags', function(obj) {
        if (Array.isArray(obj.sfw_tags)) {
            obj.sfw_tags.push({ 'tag': value, 'id': cuid() });
        } else {
            obj.sfw_tags = [{ 'tag': value, 'id': cuid().toString() }]
        }
        chrome.storage.sync.set({ 'sfw_tags': obj.sfw_tags });
    })
}

function removeTag(id) {
    chrome.storage.sync.get('sfw_tags', function(obj) {
        sfw_tags = obj.sfw_tags.filter(function(item) {
            if (id == item.id) {
                return false;
            } else {
                return true;
            }
        })
        chrome.storage.sync.set({ 'sfw_tags': sfw_tags });
    })
}

// UI
document.addEventListener('DOMContentLoaded', function() {
    var e = document.getElementById('enable-list');
    e.addEventListener('click', function() {
        document.getElementById("item-list").classList.toggle("item-list-visible");
        document.getElementById("enable-list").classList.toggle("item-list-visible");
    });
});
