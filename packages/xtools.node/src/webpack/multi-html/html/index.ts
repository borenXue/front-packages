const pages = require('./data-files.json');

let str = ''
for (const key in pages) {
  if (key === '__multi_pages') continue;

  var item = pages[key];

  let titleHtml = '<div class="title-line">'
  if (item.title) {
    titleHtml += `
      <span class="name">${item.title}</span>
      <span class="desc">${item.filename}</span>
    `
  } else {
    titleHtml += `
      <span class="name">${item.filename}</span>
    `
  }
  titleHtml += '</div>'

  let chunksHtml = '<div class="chunks">'
  const chunks = typeof item.chunks === 'string' ? [item.chunks] : item.chunks;
  for (const chunk of chunks) {
    chunksHtml += `<span class="chunk">${chunk}</span>`
  }
  chunksHtml += '</div>'
  
  str += `
    <div class="file-item">
      ${titleHtml}
      <div class="file-content">
        <div class="entry-line">
          <span>入口文件:</span>
          <span>${item.entry}</span>
        </div>
        <div class="templage-line">
          <span>HTML 模板:</span>
          <span>${item.template}</span>
        </div>
        <div class="chunks-line">
          <span>chunks:</span>
          ${chunksHtml}
        </div>
      </div>
    </div>
  `;
}

const block = document.createElement('div')
block.setAttribute('class', 'files-block')
block.innerHTML = str
document.body.appendChild(block)
