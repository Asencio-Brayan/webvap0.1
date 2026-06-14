import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useCanonical() {
  const location = useLocation();

  useEffect(() => {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    // Asigna la ruta limpia ignorando query strings
    canonicalLink.setAttribute('href', `https://www.auravapes.shop${location.pathname}`);
  }, [location.pathname]);
}
