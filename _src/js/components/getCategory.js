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

