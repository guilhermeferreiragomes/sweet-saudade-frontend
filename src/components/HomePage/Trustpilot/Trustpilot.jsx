import { useEffect } from 'react';
import './Trustpilot.css';

const Trustpilot = () => {
  useEffect(() => {
    const existingScript = document.querySelector('script[src*="tp.widget.bootstrap"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
    script.async = true;
    
    script.onload = () => {
      if (window.Trustpilot) {
        window.Trustpilot.loadFromElement(document.querySelector('.trustpilot-widget'));
      }
    };
    
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div>
      <div className="trustpilot-widget" data-locale="en-GB" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="68a8713a83fac16f7f142fe6" data-style-height="52px" data-style-width="100%" data-token="7e051ca3-ba08-43b3-82e0-9cd843f1b855">
        <a href="https://uk.trustpilot.com/review/sweet-saudade.netlify.app" target="_blank" rel="noopener">Trustpilot</a>
      </div>
    </div>
  )
}

export default Trustpilot
