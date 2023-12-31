var upload = document.getElementById('upload');

// uploadボタンを使わずファイル選択したらすぐuploadしたい場合は、changeを使う
// uploadFile.addEventListener('change', function() {

// uploadボタンをクリックでアップロード処理をし、ダウンロード用リンクを作成する
upload.addEventListener('click', function () {
    var uploadFile = document.getElementById('upload-file');
    var file = uploadFile.files[0];
    if (!file) alert('ファイルを選択してください。');

    /********************************
     * upload処理
     ********************************/
    var uploadData;
    var uploadText = document.getElementById('upload-text');
    var reader = new FileReader();

    reader.readAsText(file);
    reader.onload = function () {
        // そのまま表示
        uploadText.innerHTML = reader.result;
        // JSONに変換
        uploadData = JSON.parse(reader.result);
    }

    /********************************
     * download用リンクの作成
     ********************************/
    //reader.onloadが非同期処理なので、ちょっとだけ遅延させる
    setTimeout(function () {
        var downloadFile = JSON.stringify(uploadData);
        var a = document.createElement('a');
        a.textContent = 'download';
        a.download = 'file.json';
        a.href = URL.createObjectURL(new Blob([downloadFile], {type: 'text.plain'}));
        a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');

        var downloadLink = document.getElementById('download');
        downloadLink.appendChild(a);
    }, 1000);
});