/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { deleteSingleBand } from '../utils/data/bandData';

export default function BandCard({ bObj, onUpdate }) {
  const deleteThisBandCard = () => {
    if (window.confirm('Are you sure you want to delete this Band?')) {
      deleteSingleBand(bObj.id).then(onUpdate);
    }
  };

  return (
    <>
      <Card className="sc" style={{ width: '75rem' }}>
        <Card.Body style={{ backgroundColor: 'lightblue' }}>
          <Card.Text style={{ fontSize: '50px' }}>
            {bObj.name}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="cardFooter" style={{ backgroundColor: 'lightblue' }}>
          <Link href={`song/new/${bObj.id}`} passHref>
            <Button className="m-3">
              add song
            </Button>
          </Link>
          <Link href={`setlist/new/${bObj.id}`} passHref>
            <Button className="m-3">
              add setlist
            </Button>
          </Link>
          <Link href={`rehearsal/new/${bObj.id}`} passHref>
            <Button className="m-3">
              add rehearsal
            </Button>
          </Link>
          <Link href={`song/band/${bObj.id}`} passHref>
            <Button className="m-3">
              song list
            </Button>
          </Link>
          <Link href={`setlist/band/${bObj.id}`} passHref>
            <Button className="m-3">
              set lists
            </Button>
          </Link>
          <Link href={`rehearsal/band/${bObj.id}`} passHref>
            <Button className="m-3">
              rehearsals
            </Button>
          </Link>
          <Link href={`/band/edit/${bObj.id}`} passHref>
            <Button className="m-4">
              edit
            </Button>
          </Link>
          <Link href="/" passHref>
            <Button className="m-5" onClick={deleteThisBandCard}>
              delete
            </Button>
          </Link>
        </Card.Footer>
      </Card>
    </>
  );
}

BandCard.propTypes = {
  bObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    author: PropTypes.number,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
