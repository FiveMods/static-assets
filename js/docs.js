const docsAnchors = document.querySelectorAll(".docs-content-anchor");
const docsIndexItem = document.querySelectorAll("#docs-index-item");

document.addEventListener('scroll', e => {
    docsAnchors.forEach(anchor => {
        anchorTitle = anchor.getElementsByClassName("anchor-title");
        let anchorMargin = 105;
        if (anchor.getBoundingClientRect().top < anchorMargin && anchor.getBoundingClientRect().top > anchorMargin - anchor.getBoundingClientRect().height) {
            let active = anchorTitle[0].id;
            docsIndexItem.forEach(indexItem => {
                if (indexItem.getAttribute("href").split('#')[1] == anchorTitle[0].id) {
                    if (!indexItem.classList.contains('active')) {
                        indexItem.classList.add('active');
                    }
                } else {
                    if (indexItem.classList.contains('active')) {
                        indexItem.classList.remove('active');
                    }
                }
            })
        }
    });
});

/*
window.addEventListener('hashchange', e => {
    docsIndexItem.forEach(indexItem => {
        if (indexItem.getAttribute("href").split('#')[1] == location.hash.split('#')[1]) {
            if (!indexItem.classList.contains('active')) {
                indexItem.classList.add('active');
            }
        } else {
            if (indexItem.classList.contains('active')) {
                indexItem.classList.remove('active');
            }
        }
    });

    if (!location.hash.split('#')[1]) {
        docsIndexItem[0].classList.add('active');
    }
});
*/