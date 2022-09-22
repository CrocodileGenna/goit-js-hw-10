export function fetchCountries(name){
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then((res)=>{
        if(!res.ok){
            throw new Error ("Oops, there is no country with that name")
        }
        return res
    })
    .then((resp)=>{
        return resp.json()
    })
    // .then(obj => {
    //     console.log(obj)
    // })
}