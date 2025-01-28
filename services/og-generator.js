const path = require('path');
const satori = require('satori').default;
const fs = require('fs');
const html = (...args) => import('satori-html').then(({ html }) => html(...args));

const fontData = fs.readFileSync(
    path.join(__dirname, '..', 'assets', 'fonts', 'OpenSans-Regular.ttf')
);

async function generateSvg(reactObject, options = null) {
    const defaultOptions = {
        width: 1200,
        height: 630,
        fonts: [{ name: 'Open Sans', data: fontData, style: 'normal' }]
    }
    const finalOptions = options ? { ...defaultOptions, ...options } : defaultOptions;
    return await satori(reactObject, finalOptions);
}

async function renderTemplate(res, template, context) {
    return new Promise((resolve, reject) => {
        res.render(template, context, (err, html) => {
            if (err) {
                reject(new Error(`Error rendering template: ${err.message}`));
            } else {
                resolve(html);
            }
        });
    })
}

async function generateOgImage(res, template, context = {}, options = null) {
    const rendered = await renderTemplate(res, template, context);
    const reactObject = await html(rendered.replace(/(\r?\n|\r)\s*/g, ''));
    return await generateSvg(reactObject, options);
}

module.exports = generateOgImage;
