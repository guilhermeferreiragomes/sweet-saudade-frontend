import { useState, useEffect } from 'react';

export const useCookies = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookies-accepted') === 'true';
    setCookiesAccepted(accepted);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true');
    localStorage.setItem('CookieConsent', 'true');
    document.cookie = 'CookieConsent=true; path=/; max-age=' + (150 * 24 * 60 * 60);
    setCookiesAccepted(true);
    window.location.reload();
  };

  return { cookiesAccepted, acceptCookies };
};