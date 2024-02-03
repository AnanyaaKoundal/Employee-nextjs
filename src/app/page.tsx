import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hello</title>
        <meta name="description" content="Hello World" />
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/3/w3.css"></link>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <section>
          <img className="mySlides" src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" width="100px" />
          <img className="mySlides" src="img_ny.jpg" width="100px" />
          <img className="mySlides" src="img_chicago.jpg" width="100%" />
        </section>
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Hello
          </p>
        </div>
      </main>
    </div>
  );
}
