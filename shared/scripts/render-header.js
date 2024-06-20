function renderHeader(options) {
    const clickableHeroSection = (innerHTML) => {
        if (!options.heroClickRedirectsTo) {
            return innerHTML;
        }
        return `<a href="${options.heroClickRedirectsTo}">${innerHTML}</a>`
    }

    document.write(`
        <header>
            <nav class="navigation no-print">
                <a href="/about/">About</a> • <a href="/blog/">Blog</a>
            </nav>
            <div class="photo no-print">
                <span style="margin-right: -10pt;">👋</span>
                ${clickableHeroSection(
                    `<img src="/shared/img/me.jpeg" alt="A photo of myself" width="115" height="115" style="margin-top: 10pt;">`
                )}
                <span class="flipped" style="margin-left: -10pt;">👋</span>
                <div style="margin-top: -10pt; font-size: 200%;"><span>${options.emoji ?? "🦺"}</span></div>
            </div>
        </header>
    `);
}