/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from 'react';
import Head from 'next/head';
import { getBandsByUserId } from '../utils/data/bandData';
import BandCard from '../components/BandCard';
import { useAuth } from '../utils/context/authContext';

  <Head>
    <meta charset="UTF-8" />
    <meta name="keywords" content="title, meta, nextjs" />
    <meta name="author" content="joel mcanulty" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>jammer-planner</title>
  </Head>;

export default function Home() {
  const [bandCards, setBandCards] = useState([]);
  const { user } = useAuth();
  const getAllBandCards = () => {
    getBandsByUserId(user.id).then((bArray) => {
      setBandCards(bArray);
    });
  };

  useEffect(() => {
    document.title = 'jammer-planner';
  }, []);

  useEffect(() => {
    getAllBandCards();
  }, [user.uid]);
  console.warn(bandCards);
  return (
    <>
      <div style={{ padding: 120 }} className="container-fluid">
        <h2>
          your bands
        </h2>
        <div className="d-flex flex-wrap">
          {bandCards.map((bObj) => (
            <BandCard key={bObj.id} bObj={bObj} onUpdate={getAllBandCards} />
          ))}
        </div>
      </div>
    </>
  );
}
/* return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <p>Your Bio: {user.bio}</p>
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home; */
