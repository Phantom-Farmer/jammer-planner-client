/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { React, useEffect, useState } from 'react';
import { getSingleSet } from '../../../utils/data/setData';
import SetDetailCard from '../../../components/SetDetailCard';

export default function SingleSetDetails() {
  const [setCard, setSetCard] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getOneSet = () => {
    getSingleSet(id).then(setSetCard);
  };

  useEffect(() => {
    getOneSet(id);
  }, [id]);

  return (
    <>
      <div style={{ padding: 120 }} className="container-fluid">
        <h2>
          set details
        </h2>
        <div className="d-flex flex-wrap">
          <SetDetailCard setObj={setCard} />
        </div>
      </div>
    </>
  );
}
