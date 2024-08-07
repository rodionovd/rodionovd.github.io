function renderPost(options) {
    if (options.id == null) {
        document.write("oh no, missing gistID 😥");
        return;
    }
    
    const authorPanel = () => {
        if (!options.author) { return ``; }
        return `
            <p style="font-size: 85%; text-align: right;">
                <a href="https://gist.github.com/rodionovd/${options.id}/edit" target="_blank">Edit this post on GitHub</a> ↗
            </p>
        `;
    }
  
    document.write(`
        ${authorPanel()}
        <article id="post-${options.id}">
            <script src="https://gist.github.com/rodionovd/${options.id}.js"></script>
            <link rel="stylesheet" href="/blog/gist-style-overrides.css">
            <script>
                renderTimestampBelowPostTitle("${options.timestamp}");
                fixExternalAndAnchorLinksInPost();
            </script>
        </article>
    `);
}

function renderTimestampBelowPostTitle(formattedTimestamp) {
    const title = document.querySelector(".gist .markdown-body h1");
    if (!title) { return; }

    const timestamp = _html(`
        <p style="font-size: 85%;">
            <code>${formattedTimestamp}</code>
        </p>`
    )[0];
    title.after(timestamp);
}

function fixExternalAndAnchorLinksInPost() {
    const links = document.querySelectorAll(".gist a");
    links.forEach((link) => {
        const href = link.getAttribute("href");
        if (!href) { return; }

        if (href.startsWith("http")) {
            // Open all external links in a new tab/window
            link.target = "_blank";
        } else if (href.startsWith("#") && link.className == "anchor") {
            // The actual destination for an anchor link is not available when a Gist is embedded,
            // so we insert an artificial one right before the corresponding header element
            const anchor = _html(`<div id="${href.substring(1)}"></div>`)[0];
            link.parentElement.before(anchor);
        }
    });
}

function _html(htmlText) {
    const template = document.createElement("template");
    template.innerHTML = htmlText;
    return Array.from(template.content.children);
}