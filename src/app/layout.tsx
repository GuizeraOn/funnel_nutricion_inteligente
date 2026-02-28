import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#059669",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Nutrición Inteligente — Tu Dieta Personalizada",
    template: "%s | Nutrición Inteligente",
  },
  description:
    "Crea tu plan de alimentación personalizado basado en tus preferencias, macros y objetivos. Planes desde $8.99 con soporte, recetas fitness y entrenamiento.",
  keywords: [
    "dieta personalizada",
    "nutrición inteligente",
    "plan alimenticio",
    "recetas fitness",
    "macros",
    "entrenamiento",
    "pérdida de peso",
    "masa muscular",
    "calculadora de macros",
  ],
  authors: [{ name: "Nutrición Inteligente" }],
  creator: "Nutrición Inteligente",
  metadataBase: new URL("https://nutricioninteligente.com"),
  openGraph: {
    type: "website",
    locale: "es_419",
    siteName: "Nutrición Inteligente",
    title: "Nutrición Inteligente — Tu Dieta Personalizada",
    description:
      "Crea tu plan de alimentación personalizado basado en tus preferencias, macros y objetivos. Planes desde $8.99.",
    images: [
      {
        url: "https://i.postimg.cc/x86zt0Ln/Nutricion.webp",
        width: 1200,
        height: 630,
        alt: "Nutrición Inteligente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nutrición Inteligente — Tu Dieta Personalizada",
    description:
      "Crea tu plan de alimentación personalizado basado en tus preferencias, macros y objetivos.",
    images: ["https://i.postimg.cc/x86zt0Ln/Nutricion.webp"],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1798850820783090');
          fbq('track', 'PageView');
        `}</Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1798850820783090&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* Microsoft Clarity */}
        <Script id="ms-clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vo6oajb5k7");
        `}</Script>
        {/* End Microsoft Clarity */}
      </head>
      <body className={cn(inter.className, "min-h-screen bg-slate-50 text-slate-900 antialiased")}>
        <main className="mx-auto max-w-md bg-white min-h-screen shadow-2xl overflow-hidden flex flex-col">
          {children}
        </main>
        <Toaster richColors position="top-center" />

        {/* Hotmart UTM Tracking Script */}
        <Script id="hotmart-utm" strategy="afterInteractive">{`
          (function() {
            var prefix = ["https://payment.hotmart.com", "https://pay.hotmart.com"];

            function getParams() {
              var t = "", e = window.top.location.href, r = new URL(e);
              if (null != r) {
                var a = r.searchParams.get("utm_source"),
                    n = r.searchParams.get("utm_medium"),
                    o = r.searchParams.get("utm_campaign"),
                    m = r.searchParams.get("utm_term"),
                    c = r.searchParams.get("utm_content");
                if (e.indexOf("?") !== -1) {
                  t = "&sck=" + a + "|" + n + "|" + o + "|" + m + "|" + c;
                }
              }
              return t;
            }

            var params = new URLSearchParams(window.location.search);
            if (params.toString()) {
              document.querySelectorAll("a").forEach(function(e) {
                for (var r = 0; r < prefix.length; r++) {
                  if (e.href.indexOf(prefix[r]) !== -1) {
                    if (e.href.indexOf("?") === -1) {
                      e.href += "?" + params.toString() + getParams();
                    } else {
                      e.href += "&" + params.toString() + getParams();
                    }
                  }
                }
              });
            }
          })();
        `}</Script>
      </body>
    </html>
  );
}
