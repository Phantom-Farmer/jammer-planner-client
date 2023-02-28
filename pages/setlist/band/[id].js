/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { React, useEffect, useState } from 'react';
import { getSetsByBand } from '../../../utils/data/setData';
import SetCard from '../../../components/SetCard';

export default function DisplaySets() {
  const [setCards, setSetCards] = useState([]);
  const router = useRouter();

  const { id } = router.query;
  console.warn(router.pathname);
  const getAllSets = () => {
    getSetsByBand(id).then((setArray) => {
      setSetCards(setArray);
    });
  };

  useEffect(() => {
    getAllSets();
  }, []);
  return (
    <>
      <div style={{ padding: 120 }} className="container-fluid">
        <h2>
          your setlists
        </h2>
        <div className="d-flex flex-wrap">
          {setCards.map((setObj) => (
            <SetCard key={setObj.id} setObj={setObj} onUpdate={getAllSets} />
          ))}
        </div>
      </div>
    </>
  );
}
