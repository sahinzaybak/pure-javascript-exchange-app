// Üyeleri getirir -> member-services.js
member().then(owner => {
        //İlan sahiplerinin şehir bilgisini filter yapmak için dropdown'a bastırdık.
        const countryList = new Set (owner.map(item => item.country)); //"new Set" diyerek aynı olan şehirlerin tekrar gelmemesini sağladık.
        countryList.forEach(element => {
            const option = document.createElement('option');
            option.innerText = element;
            option.value=element;
            select.appendChild(option);
        });
  
    // İlanları getirir -> getProducts dediğimde bana "ilan" array döner. -> products-services.js
    let productDetail;
    getProducts().then( data => {
         productDetail = data.map( x => {
            //İlanı veren kişinin detaylarını almak için "owner" tablosu ile "product" tablosundan ilgili id ile eşleştirdik.
            const ownerDetail = owner.filter(item => item.id == x.ownerid).map( x => {
                return{
                    ilanSahibiAdı: x.name,
                    ilanSahibiResmi : x.photo,
                    ilanSahibiSehir : x.country
                }
            });
            //product-detail return.
            return{
                ürünLink:x.slug,
                ürünAdı:x.name,
                ürünResmi:x.cover,
                ürünFiyatı:x.price,
                ilanSahibi:ownerDetail //ilan sahibinin detaylarını burada map'a ekledik. (ownerDetail)
            }
        });
        viewProduct(productDetail);
    })
});

//Ürünleri listeleyen fonksiyon.
function viewProduct(value) {
    //Artık istediğimiz herşey productDetail'de. Şimdi ise foreach ile dönüp elamanları html olarak ekliyoruz.
    value.forEach(element => {
        const listWrp = document.querySelector('.list-wrp .row');
        const a = document.createElement('a');
        a.href= `product-detail.html?urun=${element.ürünLink}`
        a.classList.add('col-md-4');
        a.innerHTML = ` 
        <div class="list-item">
            <div class="list-img">
                <img class="img-fluid"
                    src="${element.ürünResmi}" >
                <span>${element.ürünFiyatı} ₺ </span>
            </div>
            <div class="list-detail text-center">
                <h2>${element.ürünAdı}</h2>
                <p class="list-location"><i class="fas fa-map-marker-alt mr-2"></i>${element.ilanSahibi[0].ilanSahibiSehir}</p>
                <div class="owner d-flex align-items-center justify-content-center">
                    <div class="image">
                        <img class="img-fluid" src="${element.ilanSahibi[0].ilanSahibiResmi} ">
                    </div>
                    <p>${element.ilanSahibi[0].ilanSahibiAdı}</p>
                </div>
                <p class="list-button">Teklif Ver</p>
            </div>
         </div>
         `
        listWrp.appendChild(a);
    });
}

//Seçilen İl'e göre filtreleme yaptık.
const select = document.querySelector('.list-filter select');
select.addEventListener('change', selectCountry);
function selectCountry(e){
    //Önceki oluşan product list elementlerini DOM'dan kaldırdık.
    let row = document.querySelector('.list-wrp .row');
    while (row.firstChild) row.removeChild(row.firstChild);
    
    //seçilen il'e göre "productDetail" içerisinde filter yaptık.
    const selectedCountry = e.target.value;
    let filterCountry = productDetail.filter(item => item.ilanSahibi[0].ilanSahibiSehir == selectedCountry);
    if(selectedCountry == "bütün-iller") filterCountry = productDetail; // eğer "bütün iller" seçili ise tüm ürünleri getirir."

    viewProduct(filterCountry); //fonksiyonu çağırdık.
}








