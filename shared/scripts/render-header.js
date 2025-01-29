function renderHeader(options = {}) {
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
                ${clickableHeroSection(
                    `<img src="/shared/img/me.jpeg" title="This is me, the Dmitry" width="115" height="115">`
                )}
            </div>
        </header>
    `);
}