/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { React, useEffect, useState } from 'react';
import { getRehearsalsByBand } from '../../../utils/data/rehearsalData';
import RehearsalCard from '../../../components/RehearsalCard';
// import { useAuth } from '../../utils/context/authContext';

export default function DisplayRehearsals() {
  const [rehearsalCards, setRehearsalCards] = useState([]);
  const router = useRouter();
  // const { user } = useAuth();
  // const { band } =

  const { id } = router.query;
  console.warn(router.pathname);
  const getAllRehearsals = () => {
    getRehearsalsByBand(id).then((scArray) => {
      setRehearsalCards(scArray);
    });
  };

  useEffect(() => {
    getAllRehearsals();
  }, []);
  return (
    <>
      <div style={{ padding: 120 }} className="container-fluid">
        <h2>
          your rehearsals
        </h2>
        <div className="d-flex flex-wrap">
          {rehearsalCards.map((rObj) => (
            <RehearsalCard key={rObj.id} rObj={rObj} onUpdate={getAllRehearsals} />
          ))}
        </div>
      </div>
    </>
  );
}
