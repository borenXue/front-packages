import fs from 'fs';
import path from 'path';
import scss from 'sass';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

postcss([autoprefixer()])
  .process(
    scss.renderSync({ file: path.resolve(__dirname, 'index.scss') }).css,
    { map: false },
  )
  .then(res => {
    fs.writeFileSync(path.resolve(__dirname, '../lib/index.css'), res.toString(), { encoding: 'utf-8' })
  })
