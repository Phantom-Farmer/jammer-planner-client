/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { deleteSingleSet } from '../utils/data/setData';

export default function SetCard({ setObj, onUpdate }) {
  const deleteThisSetCard = () => {
    if (window.confirm('Are you sure?')) {
      deleteSingleSet(setObj.id).then(onUpdate);
    }
  };
  return (
    <>
      <Card className="stc" style={{ width: '40rem' }}>
        <Card.Body style={{ backgroundColor: 'rgb(184, 231, 184)' }}>
          <Card.Text style={{ fontSize: '50px' }}>
            {setObj.title}
          </Card.Text>
          <div>
            <h4>- songs:</h4>
            <h3 style={{ marginLeft: '4rem' }}>{setObj.song}</h3>
          </div>
          <div>
            <h4>- notes:</h4>
            <h3 style={{ marginLeft: '4rem' }}>{setObj.note}</h3>
          </div>
          <Link href={`/setlist/detail/${setObj.id}`} passHref>
            <Button className="m-2">
              view details
            </Button>
          </Link>
          <Link href={`/setlist/edit/${setObj.id}`} passHref>
            <Button className="m-6">
              edit
            </Button>
          </Link>
          <Link href={`/setlist/band/${setObj.band.id}`} passHref>
            <Button onClick={deleteThisSetCard} className="m-5">
              delete
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

SetCard.propTypes = {
  setObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    song: PropTypes.string,
    note: PropTypes.string,
    band: PropTypes.string,
    author: PropTypes.number,
  }),
  onUpdate: PropTypes.func.isRequired,
};

SetCard.defaultProps = {
  setObj: PropTypes.shape({
    id: '',
    title: '',
    song: '',
    note: '',
    band: '',
    author: '',
  }),

};
