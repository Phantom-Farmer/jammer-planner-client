/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { React, useEffect, useState } from 'react';
import { getSingleSong } from '../../../utils/data/songData';
import SongDetailCard from '../../../components/SongDetailCard';

export default function SingleSongDetails() {
  const [songCard, setSongCard] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getOneSong = () => {
    getSingleSong(id).then(setSongCard);
  };

  useEffect(() => {
    getOneSong(id);
  }, [id]);

  return (
    <>
      <div style={{ padding: 120 }} className="container-fluid">
        <h2>
          song details for {songCard.title}
        </h2>
        <div className="d-flex flex-wrap">
          <SongDetailCard sObj={songCard} onUpdate={getOneSong} />
        </div>
      </div>
    </>
  );
}
