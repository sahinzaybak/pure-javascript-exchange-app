//Kategorileri getir -> getCategory dediğimde bana "category" objesi döner. -> category-services.js
getCategory().then( data => {
    const header = document.querySelector('.header');
    data.forEach(element => {
        //a elementi oluşturdum ve içerisine kategori ile ilgili bilgileri girdim.
       const aElement = document.createElement('a');
       aElement.innerHTML= element.categoryName;
       aElement.href= element.categoryName;
       aElement.classList.add('header-item', 'd-flex' ,'align-items-center','justify-content-center', 'h-100')
       header.appendChild(aElement);
    });
})

// Üyeleri getirir -> member-services.js
member().then(owner => {
    // İlanları getirir -> getProducts dediğimde bana "ilan" array döner. -> products-services.js
    getProducts().then( data => {
        const productDetail = data.map( x => {
            //İlanı veren kişinin detaylarını almak için "owner" tablosu ile "product" tablosundan ilgili id ile eşleştirdik.
            const ownerDetail = owner.filter(item => item.id == x.ownerid).map ( x => {
                return{
                    ilanSahibiAdı: x.name,
                    ilanSahibiResmi : x.photo,
                    ilanSahibiSehir : x.country
                }
            });
            return{
                ürünAdı:x.name,
                ürünResmi:x.cover,
                ürünFiyatı:x.price,
                ilanSahibi:ownerDetail //ilan sahibinin detaylarını burada map'a ekledik. (ownerDetail)
            }
        });
        console.log(productDetail);

        //Artık istediğimiz herşey productDetail'de. Şimdi ise foreach ile dönüp elamanları html olarak ekliyoruz.
        productDetail.forEach(element => {
            const listWrp = document.querySelector('.list-wrp .row');
            const a = document.createElement('a');
            a.href="#";
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
    })
});



