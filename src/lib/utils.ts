import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generatedArray = Array.from({ length: 10 }, (_, index) => ({
  message: `blablablabla ${
    index + 1
  } je marche tu vas bien ? est ce que c'est bon ? zzzzzzzzzzz ${
    index + 1
  } je marche tu vas bien ? est ce que c'est bon ? zzzzzzzzzzz ${index + 1}`,
  titre: `The magic ${index + 1}`,
  date: new Date().toDateString(),
  id: index + 1,
  nbrComment: getRandomInt(0, 100),
  nbrVote: getRandomInt(0, 50),
  hasVoted: getRandomInt(-1, 1),
  account: {
    pseudo: `user${index + 1}`,
    picture: `https://example.com/user${index + 1}.png`,
  },
}));


export function decodeJwt<T>(token :string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload) as T;
}
export function deleteCookie(cookieName : string) {
  // Set the expiration date to a date in the past
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}


export function getCookie(cookieName : string ) {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return null;
}