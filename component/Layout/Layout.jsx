import Head from 'next/head';
import Navbar from '../Navbar/Navbar';

export default function Layout(props) {
  return(
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <Navbar setWebSoket={props.setWebSoket}/>
      {props.children}
    </div>
  )
};