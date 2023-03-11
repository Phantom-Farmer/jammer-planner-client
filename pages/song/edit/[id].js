import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleSong } from '../../../utils/data/songData';
import NewSongForm from '../../../components/NewSongForm';

export default function UpdateSongCard() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleSong(id).then(setEditItem);
  }, [id]);

  if (editItem.id) {
    return (<NewSongForm obj={editItem} />);
  }

  return null;
}
