const emoji = document.currentScript.getAttribute('emoji') ?? "🦺";
const noPrint = document.currentScript.getAttribute('noPrint') != null;

document.write(`
    <div class="photo ${noPrint ? "no-print" : ""}"">
        <span style="margin-right: -10pt;">👋</span>
        <img src="/shared/img/me.jpeg" alt="A photo of myself" width="115" style="margin-top: 10pt;">
        <span class="flipped" style="margin-left: -10pt;">👋</span>
        <div style="margin-top: -10pt; font-size: 200%;"><span>${emoji}</span></div>
    </div>
`)