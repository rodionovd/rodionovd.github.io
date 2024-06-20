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
                makeExternalLinksInPostToOpenInNewTabs();
            </script>
        </article>
    `);
}

function renderTimestampBelowPostTitle(formattedTimestamp) {
    function html(htmlText) {
        const template = document.createElement("template");
        template.innerHTML = htmlText;
        return Array.from(template.content.children);
    }

    const title = document.querySelector(".gist .markdown-body h1");
    if (!title) { return; }

    const timestamp = html(`
        <p style="font-size: 85%;">
            <code>${formattedTimestamp}</code>
        </p>`
    )[0];
    title.after(timestamp);
}

function makeExternalLinksInPostToOpenInNewTabs() {
    const links = document.querySelectorAll(".gist a");
    links.forEach((link) => {
        if (link.href && link.href.startsWith("http")) {
            link.target = "_blank";
        }
    });
}