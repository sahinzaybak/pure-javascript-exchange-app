// Üyeleri listeler -> async await ile üye listesini çektik.
const member = async() => {
    let data;
    try{
        const response = await fetch ('https://takas-ec767.firebaseio.com/membership.json')
        data =  await response.json(); // -> Direk objeyi verir bize.
    }
    catch{console.log("API'den veri çekilirken bir hata oluştu !")}
    return data;
}

