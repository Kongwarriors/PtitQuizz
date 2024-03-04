function showForm() {
    document.getElementById("formContainer").style.display = "block";
}

function addQuestion() {
    var ul = document.getElementById("questions");
    var li = document.createElement("li");
    li.innerHTML = '<textarea name="question" placeholder="Câu hỏi"></textarea> ' +
                   '<textarea name="answer" placeholder="Câu trả lời"></textarea> ' +
                   '<button type="button" onclick="editQuestion(this)">Chỉnh sửa</button> ' +
                   '<button type="button" onclick="removeQuestion(this)">Xóa</button>';
    ul.appendChild(li);
}

function editQuestion(button) {
    var li = button.parentElement;
    var textareas = li.getElementsByTagName("textarea");
    for (var i = 0; i < textareas.length; i++) {
        textareas[i].removeAttribute("readonly");
    }
    button.innerHTML = "Lưu";
    button.setAttribute("onclick", "saveQuestion(this)");
}

function saveQuestion(button) {
    var li = button.parentElement;
    var textareas = li.getElementsByTagName("textarea");
    for (var i = 0; i < textareas.length; i++) {
        textareas[i].setAttribute("readonly", "readonly");
    }
    button.innerHTML = "Chỉnh sửa";
    button.setAttribute("onclick", "editQuestion(this)");
}

function removeQuestion(button) {
    var li = button.parentElement;
    li.parentElement.removeChild(li);
}

function importFromExcel() {
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        
        reader.onload = function(event) {
            var data = new Uint8Array(event.target.result);
            var workbook = XLSX.read(data, { type: 'array' });
            var sheet = workbook.Sheets[workbook.SheetNames[0]];
            var jsonData = XLSX.utils.sheet_to_json(sheet);

            // Hiển thị dữ liệu hoặc xử lý dữ liệu ở đây
            handleExcelData(jsonData);
        };

        reader.readAsArrayBuffer(file);
    };

    input.click();
}

function handleExcelData(data) {
var ul = document.getElementById("questions");
data.forEach(function(row) {
    var li = document.createElement("li");
    li.innerHTML = '<textarea name="question" placeholder="Câu hỏi">' + row["Câu hỏi"] + '</textarea> ' +
                   '<textarea name="answer" placeholder="Câu trả lời">' + row["Câu trả lời"] + '</textarea> ' +
                   '<button type="button" onclick="editQuestion(this)">Chỉnh sửa</button> ' +
                   '<button type="button" onclick="removeQuestion(this)">Xóa</button>';
    ul.appendChild(li);
});
}