// ==UserScript==
// @name         Bitbucket PR Count
// @version      1.0
// @description  Show number of pull requests for each repository
// @match        https://{server}/projects/****
// ==/UserScript==
function addCounts() {
    'use strict';
    const repos = document.getElementsByClassName('repository-name');
    if (!repos.length) {
        setTimeout(addCounts, 100);
        return;
    }
    for (let i = 0; i < repos.length; i++) {
        const repo = repos[i];
        const url = repo.getElementsByTagName('a')[0].href;
        fetch(url)
        .then((response) => response.text())
        .then(responseText => {
            const page = document.createElement('div');
            page.innerHTML = responseText;
            const sidebarContainer = page.getElementsByClassName('aui-sidebar-group')[1];
            const prCountContainer = sidebarContainer.querySelectorAll('aui-badge');
            if (prCountContainer.length > 0) {
                const prCount = prCountContainer[0].innerHTML;
                const badge = document.createElement('span');
                badge.setAttribute('class', 'aui-badge');
                badge.setAttribute('style', 'margin-left: 10px; text-align: text-bottom');
                badge.innerHTML = prCount;
                repo.appendChild(badge);
            }
        })
        .catch((err) => console.error(err));
    }
}

addCounts();