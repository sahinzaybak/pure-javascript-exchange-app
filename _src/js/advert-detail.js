//Buradan ürünün query'sini aldık.
function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
 }
const query = getParameterByName('urun'); //ürün bilgisi

member().then(owner => {
    getProducts().then(data => {
        const advertDetail = data.filter(x => x.slug == query).map(item => { // filter ile ürüne ait bilgileri getirdik.
            return{
                Yayıncıid:item.ownerid,
                ürünResmi : item.cover,
                ürünAdı :item.name,
                fiyat: item.price,
                takasİstedigiUrunler : item.swapWant,
                kategori :item.category
            }
        })

        //İlanı veren kişinin bilgilerini aldık.
        const owners = owner.filter(item => item.id == advertDetail[0].Yayıncıid);
        //İlan cover resmini aldık.
        const cover = document.querySelector('.slider .images img');
        cover.src= advertDetail[0].ürünResmi;
    
        //Takas istedği ürünler kımsı array olduğu için template literal'de "map" ile döngü kurduk. Template literalde döngü kurarken foreach kullanamayız. Her defasunda "undefined" hatası verecektir.
        const x  = advertDetail[0].takasİstedigiUrunler;
    
        //Burada ilanın detay görünümünü oluşturduk.
        const detailWrp = ` 
            <h1>${advertDetail[0].ürünAdı} </h1>
            <h2>${advertDetail[0].fiyat} ₺</h2>
            <div class="area">
                <h3 class="mb-2">Takas yapmak istediği ürünler</h3>
                <div class="area-wrp"> 
                ${x.map(element => { return `<p>${element.name}</p>`})} 
                </div>
            </div>
            <div class="info">
                <div class="info-item d-flex align-items-center">
                    <h4>Kategori:</h4>
                    <p>${advertDetail[0].kategori}</p>
                </div>
            </div>
            `
            const detailWrpMain = document.querySelector('.detail-wrp');
            detailWrpMain.innerHTML=detailWrp;

        //Burada ilanı veren kişinin bilgilerini görüntüledik.
        const ownerWrp = `
            <img src="${owners[0].photo}">
            <h2>${owners[0].name}</h2>
            <p>${owners[0].country}</p>
            <a href="#"><i class="fas fa-phone"></i>${owners[0].phone}</a>
            <div class="social d-flex">
                <i class="fab fa-facebook-f"></i>
                <i class="fab fa-twitter"></i>
                <i class="fab fa-instagram"></i>
            </div>
            <div class="buttons d-flex flex-column">
                <a href="#">Soru Sor</a>
                <a href="#">Takip Et</a>
            </div>`
            
            const ownerWrpMain = document.querySelector('.owner');
            ownerWrpMain.innerHTML = ownerWrp;
    });
})


 