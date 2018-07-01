
let selected_from,selected_to, converted_value, amount;
function countries(){

    
    fetch('https://free.currencyconverterapi.com/api/v5/currencies')
    .then(
       successResponse =>{
        
       return successResponse.json();
        
    },
     errorReponse =>{
        console.log(errorReponse);
    })
    .then(
        results =>{
        let currency =  results.results;
        let selectBoxFrom = document.getElementById('country_currency_from');
        let selectBoxTo = document.getElementById('country_currency_to');

       indexedDBStore(results.results); // Data to the  Database
            
            
        for(key in currency){ // Populate the view
            selectBoxFrom.innerHTML += '<option value='+key+'>'+key+" - "+currency[key].currencyName +'</option>';
            selectBoxTo.innerHTML += '<option value='+key+'>'+key+" - "+currency[key].currencyName +'</option>';          
         }

    })
}

function country_currency_from(){
    selected_from = document.getElementById("country_currency_from").value;
}

function country_currency_to(){
    selected_to = document.getElementById("country_currency_to").value;
}

function convert(){
    amount = document.getElementById("amount").value;
    fetch('https://free.currencyconverterapi.com/api/v5/convert?q='+selected_from+'_'+selected_to)
    .then(
        successResponse =>{
            return(successResponse.json());
        },
        errorReponse =>{
            console.log(errorReponse);
        })
    .then(
        results =>{
            let tax = results.results;
           for(key in tax){
           converted_value = tax[key].val*amount;
           document.getElementById("converted").innerText = "Converted Value: "+converted_value.toFixed(3)+" "+selected_to;

           }
        }
    )
}

function indexedDBStore(currencies){
    const dbPromise = idb.open('currency-store', 1, upgradeDB => {
        upgradeDB.createObjectStore('currency');

        console.log("Data Base Created");
      });

      dbPromise.then(db => {
        const tx = db.transaction('currency', 'readwrite');
        for( key in currencies)
        {tx.objectStore('currency').put(currencies[key],key);}
        return tx.complete;
      },
        error => {
        console.log(error);
    });
}




//SORT METHOD
   //let sorting = Object.values(results.results).sort((a,b)=>{ return a.currencyName.localeCompare(b.currencyName)
            //});

               //JSON.stringify(sorting);
          //  console.log(currency);
          //  let sjon =JSON.parse(currency)
            // console.log(sjon);
