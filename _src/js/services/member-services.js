// Üyeleri listeler -> async await ile üye listesini çektik.
const member = async() => {
    try{
        const response = await fetch ('https://takas-ec767.firebaseio.com/membership.json')
        const data =  await response.json(); // -> Direk objeyi verir bize.
        return data;
    }
    catch{console.log("API'den veri çekilirken bir hata oluştu !")}

}

