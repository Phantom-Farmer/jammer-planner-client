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
      <Card className="dc" style={{ width: '75rem' }}>
        <Card.Body style={{ backgroundColor: 'pink' }}>
          <Card.Text>
            {setObj.title}
          </Card.Text>
          <div>
            <h4>- songs:</h4>
            <h3>{setObj.song}</h3>
          </div>
          <div>
            <h4>- notes:</h4>
            <h3>{setObj.note}</h3>
          </div>
          <Link href={`/setlist/detail/${setObj.id}`} passHref>
            <Button className="m-2">
              view details
            </Button>
          </Link>
          <Link href={`/setlist/edit/${setObj.id}`} passHref>
            <Button className="m-2">
              edit
            </Button>
          </Link>
          <Link href={`/setlist/band/${setObj.band.id}`} passHref>
            <Button onClick={deleteThisSetCard} className="m-2">
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
