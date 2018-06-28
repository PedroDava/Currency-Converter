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
        for(key in currency){
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

//SORT METHOD
   //let sorting = Object.values(results.results).sort((a,b)=>{ return a.currencyName.localeCompare(b.currencyName)
            //});

               //JSON.stringify(sorting);
          //  console.log(currency);
          //  let sjon =JSON.parse(currency)
            // console.log(sjon);

/*  how  my  social life changed 

on the  beggining  of  the journy i had  this  type  of  life... used  to go out every weekend. friday  to sunday and sometimes on holidays i  could  go till monday;;;;
that  seemed  good for me  cause i was  having  fun...  was  meeting  people... and  yes  spending  money  i  didnt really have.
that  delayed my  work  so bad... and the company  work... i  wasnt only  sabotaging myself  but the company tooo...
they  */