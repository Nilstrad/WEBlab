function changeColor(color) {
    document.body.style.backgroundColor = color;
}

function cosinus() {
    var ValueOfCos = document.getElementById('ValueOfCos').value;
    var ValueOfCos1 = parseFloat(ValueOfCos);
    
    if (isNaN(ValueOfCos1)) {
        document.getElementById("result").innerText = "Ошибка: Введите допустимое числовое значение.";
    } else {
        var newValueOfCos = Math.cos(ValueOfCos1);
        document.getElementById("result").innerText = newValueOfCos;
    }
}
