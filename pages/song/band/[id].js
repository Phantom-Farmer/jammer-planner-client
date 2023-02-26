/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { React, useEffect, useState } from 'react';
import { getSongsByBand } from '../../../utils/data/songData';
import SongCard from '../../../components/SongCard';
// import { useAuth } from '../../utils/context/authContext';

export default function DisplaySongs() {
  const [songCards, setSongCards] = useState([]);
  const router = useRouter();
  // const { user } = useAuth();
  // const { band } =

  const { id } = router.query;
  console.warn(router.pathname);
  const getAllSongs = () => {
    getSongsByBand(id).then((scArray) => {
      setSongCards(scArray);
    });
  };

  useEffect(() => {
    getAllSongs();
  }, []);
  // console.warn(songCards);
  return (
    <>
      <div style={{ padding: 120 }} className="container-fluid">
        <h2>
          your songs
        </h2>
        <div className="d-flex flex-wrap">
          {songCards.map((sObj) => (
            <SongCard key={sObj.id} sObj={sObj} onUpdate={getAllSongs} />
          ))}
        </div>
      </div>
    </>
  );
}
