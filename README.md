<h3>Quick start project for electrong back and angular front.</h3>
<p>Includes electron-builder and typescript for back.</p>
<p>Includes bulma, electron, ngx-translate for front.</p>

<p>It is two package.json project. Backend package in the root, frontend pakcage in ./front</p>

<p>
    <ul>
    Stepst to build from scratch:
        <li>npm i</li>
        <li>npm --prefix=front i</li>
        <li>npm run build-all</li>
        <li>Now you can launch appimage in ./release directory</li>
    </ul>
<p>

<p>To add new translation, create .json file in ./front/assets/i18n/ and include it in ./front/src/app/translate-universal-loader.service.ts like others</p>


//to be continued