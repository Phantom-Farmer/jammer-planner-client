import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleBand } from '../../../utils/data/bandData';
import NewBandForm from '../../../components/NewBandForm';

export default function UpdateBandCard() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleBand(id).then(setEditItem);
  }, [id]);

  return (<NewBandForm obj={editItem} />);
}
