// Envia eventos para os pixels que estiverem carregados na página; sem pixel, não faz nada.
type Fbq = (action: string, event: string, params?: Record<string, unknown>) => void;

export function track(
  event: "ViewContent" | "AddToCart" | "InitiateCheckout",
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  fbq?.("track", event, params);
}

export function metaPixelSnippet(id: string): string {
  return `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');fbq('track','PageView');`;
}
