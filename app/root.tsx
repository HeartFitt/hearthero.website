import * as React from 'react';

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import "./app.css";
import type { Route } from "./+types/root";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
//fallback for squircle-js 

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const SmartBannerConfig = (
  <>
    <meta name="smartbanner:title" content="HeartHero SOLO"/>
    <meta name="smartbanner:author" content="HeartFitt LLC"/>
    <meta name="smartbanner:price" content="FREE"/>
    <meta name="smartbanner:price-suffix-google" content=" - In Google Play"/>
    <meta name="smartbanner:icon-google" content="https://play-lh.googleusercontent.com/_wPWlbUxcJ4CbqXtM7GfGQ0KNJpOJ9lZC9dhX0h6khnFds-O3_2ZT0303y1TvoB0QB_8-KSQNRRrFReSbUAS4w=w240-h480"/>
    <meta name="smartbanner:button" content="View"/>
    <meta name="smartbanner:button-url-google" content="https://play.google.com/store/apps/details?id=app.hearthero.solo"/>
    <meta name="smartbanner:close-label" content="Close"/>
    <meta name="smartbanner:hide-ttl" content="1296000"/>
    <meta name="smartbanner:button-url-apple" content="https://apps.apple.com/us/app/hearthero-solo/id6757622917"/>
    <meta name="smartbanner:icon-apple" content="/hearthero_app_icon_500x500.png"/>
    {/* <link rel="stylesheet" href="/dist/smartbanner.min.css"/> */}
    {/* <script src="/dist/smartbanner.min.js"/> */}
  </>
)

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Default iOS banner on Safari Only: */}
        <meta name="apple-itunes-app" content="app-id=6757622917"></meta>
        {/* Other banners: */}
        {SmartBannerConfig}
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex flex-col max-w-[75rem] mx-auto">
          <NavBar />
          {children}
          <ScrollRestoration />
          <Scripts />
        </div>
        <Footer />
      </body>
    </html>
  );
}

export default function App() {
 const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true); // Only true after mount (client)

    if (!isMounted) return; // redundant but clear

    const isIosSafari = 
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !/CriOS| FxiOS/.test(navigator.userAgent); // not Chrome/Firefox on iOS

    if (isIosSafari) return;
      // Only run on mobile
    if (/Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent)) {
      console.log('Smartbanner: Mobile detected, loading...');

      // Import CSS as side-effect (Vite bundles & injects it automatically)
      import('smartbanner.js/dist/smartbanner.min.css');

      // Import & init JS
      import('smartbanner.js')
        .then((module) => {
          // Call the init function (default export is usually the init fn)
          module.default?.();
          console.log('Smartbanner: Initialized');
        })
        .catch((err) => {
          console.error('Smartbanner load failed:', err);
        });
    }
  }, [isMounted]);

  return <Outlet />;

}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
