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
        <main>
            ${authorPanel()}
            <article id="post-${options.id}">
                <script src="https://gist.github.com/rodionovd/${options.id}.js"></script>
                <link rel="stylesheet" href="/blog/gist-style-overrides.css">
                <script>
                    renderTimestampBelowPostTitle("${options.timestamp}");
                    fixExternalAndAnchorLinksInPost();
                    renderTableOfContents();
                </script>
            </article>
        </main>
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

function renderTableOfContents() {
    const headers = document.querySelectorAll(".gist h2, .gist h3");
    const tocItems = Array.from(headers).flatMap((h) => {
        const label = h.textContent;
        const anchor = h.nextElementSibling;

        if (!label || !anchor || anchor.className != "anchor") {
            return [];
        }

        const href = anchor.getAttribute('href');
        if (!href || !href.startsWith("#")) {
            return [];
        }

        return [{
            "label": label, "link": href, "tag": h.tagName
        }];
    });

    if (tocItems.length < 2) {
        return;
    }

    const toc = _html(`
        <aside class="toc">
            <div class="toc-header">
                <span class="toc-header-label">Navigation</span>
                <div
                    class="toc-header-scroll-to-top"
                    onclick="window.scrollTo({ top: 0, behavior: 'instant' });"
                    title="Scroll to the top">↑</div>
            </div>
        </aside>
    `)[0];

    tocItems.forEach((item) => {
        const row = _html(`<${item.tag}><a href="${item.link}">${item.label}</a></${item.tag}>`)[0];
        toc.appendChild(row);
    });

    const container = document.querySelector("main");
    container.insertBefore(toc, container.firstChild);
}

function _html(htmlText) {
    const template = document.createElement("template");
    template.innerHTML = htmlText;
    return Array.from(template.content.children);
}