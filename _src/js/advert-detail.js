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
    getProducts().then(allProdcuts => {
        const advertDetail = allProdcuts.filter(x => x.slug == query).map(item => { // filter ile ürüne ait bilgileri getirdik. -> advertDetail
            return {
                urunid : item.advertId,
                Yayıncıid: item.ownerid,
                ürünResmi: item.cover,
                ürünAdı: item.name,
                ürünDetay: item.detail,
                fiyat: item.price,
                takasİstedigiUrunler: item.swapWant,
                kategori: item.category,
                yorumlar: item.commnets
            }
        })
        //İlanı veren kişinin bilgilerini aldık.
        const owners = owner.filter(item => item.id == advertDetail[0].Yayıncıid);
        //İlan cover resmini aldık.
        const cover = document.querySelector('.slider .images img');
        cover.src = advertDetail[0].ürünResmi;

        //Takas istedği ürünler kımsı array olduğu için template literal'de "map" ile döngü kurduk. Template literalde döngü kurarken foreach kullanamayız. Her defasunda "undefined" hatası verecektir.
        const x = advertDetail[0].takasİstedigiUrunler;

        //Burada ilanın detay görünümünü oluşturduk. (Product Detail)
        const detailWrp = ` 
            <h1>${advertDetail[0].ürünAdı} </h1>
            <h2>${advertDetail[0].fiyat} ₺</h2>
            <div class="area">
                <h3 class="mb-2">Takas yapmak istediği ürünler</h3>
                <div class="area-wrp"> 
                ${x.map(element => { return `<p>${element.name}</p>` })} 
                </div>
            </div>
            <div class="info">
                <div class="info-item d-flex align-items-center">
                    <h4>Kategori:</h4>
                    <p>${advertDetail[0].kategori}</p>
                 
                </div>
                <a href="#" class="area-button" data-toggle="modal" data-target="#advertModal">Takas Teklifi Ver</a>
            </div>
            `
        const detailWrpMain = document.querySelector('.detail-wrp');
        detailWrpMain.innerHTML = detailWrp;

        //Burada ilanı veren kişinin bilgilerini görüntüledik. (Owner)
        const ownerWrp = `
            <img class="mt-2" src="${owners[0].photo}">
            <h2 class="mt-3">${owners[0].name}</h2>
            <p class="mb-3">${owners[0].country}</p>
            <a href="#" ><i class="fas fa-phone mr-3"></i>${owners[0].phone}</a>
            <div class="social d-flex mb-3 mt-3">
                <i class="fab fa-facebook-f"></i>
                <i class="fab fa-twitter"></i>
                <i class="fab fa-instagram"></i>
            </div>
            <div class="buttons mt-4 d-flex flex-column">
                <a href="#">Soru Sor</a>
                <a href="#">Takip Et</a>
            </div>`

        const ownerWrpMain = document.querySelector('.owner');
        ownerWrpMain.innerHTML = ownerWrp;


        //Burada ilan detayının text'ini gösterdik.
        const productDesc = advertDetail[0].ürünDetay;
        const desc = document.querySelector('.detail-title__text');
        desc.textContent = productDesc;

        //Burda yorumlar kısmını yaptık.
        const productComments = advertDetail[0].yorumlar;
        const commentWrp = document.querySelector('.comments-wrp');
        productComments.forEach(element => {
            const item = document.createElement('div'); //her döngüde yeni bir "div" nesnesi oluşturduk.
            item.classList.add('comments-item', 'd-flex'); 
            item.innerHTML =
            `
                <div class="img">
                    <img src="https://img.icons8.com/clouds/2x/user.png" width="80px" alt="">
                </div>
                <div class="text ml-3 mt-2">
                    <div class="user d-flex align-items-center">
                        <h4 class="mb-0 mr-4">${element.author} </h4>
                        <p>${element.date}</p>
                    </div>
                    <div class="desc mt-2">
                    ${element.text}
                    </div>
                </div>
            `
            commentWrp.appendChild(item);  //oluşrulan "div" nesnesini commentWrp'nin altına (çocuklarına) ekledik.
        });

        //Üyenin takas etmek istediği ürünlerinin listesi. (Şu anda tek üye --> Şahin ZAYBAK)
        getAdvertProducts().then(data => {
            const ownerId = owner.filter( x => x.id == data[0].id) // ownerId yi aldık.
            data[0].adverts.forEach(element => {
                const advertProductList = allProdcuts.filter(x => x.advertId == element.advertId).map(item => { //bütün ürünlerde filter yaptık, "advertProduct".
                    return{
                        urunid : item.advertId,
                        ürünResmi: item.cover,
                        ürünAdı: item.name,
                        fiyat: item.price,
                        kategori: item.category,
                        takasSahibiAdı : ownerId[0].name
                    }
                });
                console.log(advertProductList) // Üyenin takas etmek istediği ürünler --> advertProductList
                const chooseAdvert = document.querySelector('.modal-body select');
                const chooseOptions = document.createElement('option');
                chooseAdvert.addEventListener('change', selectAdvert); // dropdown'dan seçildiği zaman "selectAdvert" fonksiyonu çalışsın.
                chooseOptions.innerText=advertProductList[0].ürünAdı;
                chooseAdvert.appendChild(chooseOptions); //takas etmek istediği ürünleri dropdown'ı doldurduk.
            });

            //Takas etmek istediği ürün modal'dan bir ürün seçildiğinde seçili ürünün bilgilerini getir.
            let detailPr;
            function selectAdvert(e){
                const selected = e.target.value;
                detailPr = allProdcuts.filter(x => x.name == selected).map(item => { //seçilen isim ile listedeki isim aynı ise bilgileri getir.
                    return{
                        urunResim : item.cover,
                        urunAdi : item.name,
                        urunFiyati : item.price
                    }
                })
                const showSelectedDetail = `
                    <div class="detail-wrp d-flex align-items-center mt-4">
                        <div class="image">
                            <img src="${detailPr[0].urunResim}" alt="">
                        </div>
                        <div class="detail ml-4">
                            <h1>${detailPr[0].urunAdi}</h1>
                            <p>${detailPr[0].urunFiyati} ₺ </p>
                        </div>
                    </div>
                `
                const modalBody = document.querySelector('.modal-body .products');
                modalBody.innerHTML = showSelectedDetail; //gelen bilgileri "modal-body .products" içerisine yazdırdık.
            }
        })
    });
})


