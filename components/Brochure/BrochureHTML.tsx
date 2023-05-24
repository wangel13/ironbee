// // app/precompile.js
// const getData = async (component) => {
//   const ReactDOMServer = (await import("react-dom/server")).default;
//   const staticMarkup = ReactDOMServer.renderToStaticMarkup(component);
//   return staticMarkup;
// };

// export default getData;

// // app/page.js
// const STATIC_COMPONENT = <p>Static Component</p>;

// // export default async function TestPage() {
// //   // this works OK
// //   const prerenderStaticComponent = await getData(STATIC_COMPONENT);

// //   // this does not work (error)
// //   /**
// //    * Error: Objects are not valid as a React child (found: object with keys {$$typeof, filepath, name, async}). * If you meant to render a collection of children, use an array instead.
// //    */
// //   // const prerenderAClientComponent = await getData(PageWrapperClient);

// //   // this does not work (warning)
// //   /**
// //    * Warning: Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.
// //    */
// //   // const prerenderAServerComponent = await getData(PageWrapperServer);

// //   return (
// //     <PageWrapperClient>
// //       <h3>This is a page with static markup</h3>
// //       <div dangerouslySetInnerHTML={{ __html: prerenderStaticComponent }} />
// //     </PageWrapperClient>
// //   );
// // }
