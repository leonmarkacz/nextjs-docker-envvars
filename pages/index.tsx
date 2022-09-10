import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

interface CatFact {
  fact?: string;
  length?: number
}


const Home: NextPage<CatFact> = ({ fact }) => {
  // versuch dieses komischer hyrdration error zu umgeben.. ich glaub react meckert, weil er nicht erwartet die values der env variablen im template zu rendern
  const nodeenv = process.env.NODE_ENV || ''
  const backendUri =  process.env.BACKENDURI || ''
  const nextBackendUri = process.env.NEXT_PUBLIC_BACKENDURI || '';
  const ICHBINEINEWICHTIEENVVARIABLEFUERAZURE = process.env.NEXT_PUBLIC_ICHBINEINEWICHTIEENVVARIABLEFUERAZURE || ''
  const randomEnv = process.env.RANDOMENV || '';
  const nextRandomEnv = process.env.NEXT_PUBLIC_RANDOMENV || '';

  return (
    <div className={styles.container}>
      <Head>
        <title>Env variablen</title>
        <meta name="description" content="Env variablen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <h1>Node_ENV: { nodeenv }</h1>
        <hr />
        
        <h2>NEXT_PUBLIC_ Prefix um die Variable fuer den Browser zu exposen</h2>
        <p>NEXT_PUBLIC_ICHBINEINEWICHTIEENVVARIABLEFUERAZURE: { ICHBINEINEWICHTIEENVVARIABLEFUERAZURE }</p>

        <h2>Env variable ohne NEXT_PUBLIC Prefix</h2>
        <p>Kann der Browser nichts mit anfangen</p>
        <p>BACKENDURI { backendUri }</p>
        <p>NEXT BACKENDURI { nextBackendUri }</p>

        <h2>Random Env Variable welche nur im Container geschrieben wurde</h2>
        <p>ohne NEXT_PUBLIC_: { randomEnv }</p>
        <p>mit NEXT_PUBLIC_: { nextRandomEnv }</p>

        <h2>Random Katzenfakt von &#34;https://catfact.ninja/&#34;</h2>
        <p>{ fact }</p>

      </main>

      <footer>
      </footer>
    </div>
  )
}

Home.getInitialProps = async ({ req }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKENDURI}/fact`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const json = await res.json();

    return { fact: json.fact };
}


export default Home
