window.onload = loaded

function loaded() {
    GetTable();
}


function GetTable() {
    $.ajax({
        url: 'http://localhost:3000/kullanici',
        type: 'GET',
        contentType: 'application/json',
        data: JSON.stringify({
        }),
        success: function(res) {
            console.log(res);

            $('.kullanicilar').html('');
            $.each(res, function (i, v) {
                let contents = `
                    
                    <table id="table" class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Kullanıcı Adı</th>
                                <th scope="col">Şifre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${v.kullaniciadi}</td>
                                <td>${v.sifre}</td>
                            </tr>
                        </tbody></table>`
                $('.kullanicilar').append(contents);
            }
            );
        }
    });
}

function kullaniciEkle() {
    var kkadi = $("#kkadi").val();
    var sifre = $("#sifre").val();
    console.log(kkadi);
    console.log(sifre);
    $.ajax({
        url: 'http://localhost:3000/kullaniciekleme',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            kkadi: kkadi,
            sifre: sifre
        }),
        success: function(res) {
            console.log(res);
            if(res.length >= 0){
                alert("Kullanıcı Mevcut");
            }
            else{
                alert("Kullanıcı Eklendi");
            }
        }

    });
    EklemeTemizle();
    GetTable();
}





function KullaniciPanel() {
    var x = document.getElementById("eklemePanel");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none"; 
    }
}

function KullaniciPanel2() {
    var x = document.getElementById("silmePanel");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none"; 
    }

}

function KullaniciSil() {
    var kkadi = $("#Kkadisilmek").val();
    console.log(kkadi);
    $.ajax({
        url: 'http://localhost:3000/kullanicisilme',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            kkadi: kkadi
        }),
    });
    var x = document.getElementById("Kkadisilmek");
    x.value = "";
    GetTable();
}

function KullaniciAramaPaneli() {
    var x = document.getElementById("KullaniciAraPanel");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none"; 
    }
}

function kullaniciAra() {
    var kkadi = $("#kkadi22").val();
    console.log(kkadi);
    $.ajax({
        url: 'http://localhost:3000/kullaniciarama',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            kkadi: kkadi
        }),
        success: function(res) {
            console.log(res);

            $('.kullanicilar').html('');
            $.each(res, function (i, v) {
                let contents = `
                    
                    <table id="table" class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Kullanıcı Adı</th>
                                <th scope="col">Şifre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${v.kullaniciadi}</td>
                                <td>${v.sifre}</td>
                            </tr>
                        </tbody></table>`
                $('.kullanicilar').append(contents);
            }
            );
        }

    });
}

function Temizle() {
    var x = document.getElementById("kkadi22");
    x.value = "";
    GetTable();
}

function KullaniciGuncelleme () {
    var x = document.getElementById("KullaniciGuncellePanel");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none"; 
    }
}


function kullaniciGuncel() {
    var kkadi = $("#kkadi222").val();
    var sifre = $("#sifre22").val();
    console.log(kkadi);
    console.log(sifre);
    $.ajax({
        url: 'http://localhost:3000/kullaniciguncelleme',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            kkadi: kkadi,
            sifre: sifre
        }),
        success: function(res) {
            console.log(res);
            if(res.affectedRows == 0){
                alert("Kullanıcı Mevcut Değil");
            }
            else{
                alert("Kullanıcı Güncellendi");
            }
        }

    });
    GuncelTemizle();
    GetTable();
}

function EklemeTemizle() {
    var x = document.getElementById("kkadi");
    var y = document.getElementById("sifre");
    x.value = "";
    y.value = "";
    GetTable();
}

function GuncelTemizle() {
    var x = document.getElementById("kkadi222");
    var y = document.getElementById("sifre22");
    x.value = "";
    y.value = "";
    GetTable();
}