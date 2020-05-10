/*Data base (creditos ao Reinaldo Trindade pela explicação do fletch)*/ 
const apiURL = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
const cardsConts = document.querySelector("#main_card");
let data = [];

 //Utilities
 function isPetAllowed(property){
  if(property === "Casa" ){
    return "A combinar!";
  }else if(property === "Chácara" || property === "Sítio"){
   return "Sim";
 }else {
   return "Não";
 }
}

function isBeddingIncluded(property){
 if(property === "Casa" || property === "Quarto"){
   return "Incluso";
 }else if(property === "Chácara" || property === "Sítio"){
  return "Adicional Compravel (5% do valor da diaria)";
}else {
  return "Não";
}
}

//Fetch code
async function fetchCards() {
    const response = await fetch(apiURL);
    return await response.json();
 }

 function setupCards(cards){
     cardsConts.innerHTML = "";
     cards.map(renderCard);
 }

 function renderCard(card){
     const div = document.createElement("div");
     div.className = "card mx-auto";
     div.style.width = "20rem";
     div.style.margin = "1rem"
     div.innerHTML = `
     <img src= "${card.photo}" class="card-img-top" alt="${card.name}" width:="200" height="150"/> 
     <div class="card-body">
      <h5 class="card-title">${card.name}</h5>
      <p class="card-text">
        Tipo: ${card.property_type}
      </p>
      <p class="card-text">
        Preço: R$${card.price},00
      </p>
      <a href="#" class="btn btn-primary">Alugar</a>
      <p class="card-text">
      <hr>
      <b>Aceitam pets:</b> ${isPetAllowed(card.property_type)}<br>
      <b>Roupa de cama e banho:</b> ${isBeddingIncluded(card.property_type)}
     </p>
     </div>`;

   cardsConts.appendChild(div);
 }

 async function main(){
     data = await fetchCards();
     if(data[0]){
         setupCards(data);
     }
 }

 main();