import { handleResponse, handleError } from "./apiUtils";

export function getBeers() {
  return fetch("/beers").then(handleResponse).catch(handleError);
}

export function saveBeer(beer) {
  return fetch("/beers/" + (beer.id || ""), {
    method: beer.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(beer),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteBeer(beerId) {
  return fetch(`/beers/${beerId}`, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
