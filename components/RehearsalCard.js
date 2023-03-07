/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { deleteSingleRehearsal } from '../utils/data/rehearsalData';

export default function RehearsalCard({ rObj, onUpdate }) {
  const deleteThisRehearsalCard = () => {
    if (window.confirm('Are you sure?')) {
      deleteSingleRehearsal(rObj.id).then(onUpdate);
    }
  };
  return (
    <>
      <Card className="dc" style={{ width: '75rem' }}>
        <Card.Body style={{ backgroundColor: 'peachpuff' }}>
          <Card.Text style={{ fontSize: '50px' }}>
            rehearsal for {rObj.date} at {rObj.time} at {rObj.location} in preparation for the show at {rObj.show}
          </Card.Text>
          <div>
            <h4>- message:</h4>
            <h3 style={{ marginLeft: '4rem' }}>{rObj.message}</h3>
          </div>
          <div>
            <h4>- setlist:</h4>
            <h3 style={{ marginLeft: '4rem' }}>{rObj.set.title}</h3>
          </div>
          <Link href={`/setlist/detail/${rObj.set.id}`} passHref>
            <Button className="m-2">
              view set list
            </Button>
          </Link>
          <Link href={`/rehearsal/edit/${rObj.id}`} passHref>
            <Button className="m-6">
              edit
            </Button>
          </Link>
          <Link href={`/rehearsal/band/${rObj.band.id}`} passHref>
            <Button onClick={deleteThisRehearsalCard} className="m-5">
              delete
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

RehearsalCard.propTypes = {
  rObj: PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.string,
    time: PropTypes.string,
    location: PropTypes.string,
    show: PropTypes.string,
    message: PropTypes.string,
    band: PropTypes.string,
    set: PropTypes.number,
    author: PropTypes.number,
  }),
  onUpdate: PropTypes.func.isRequired,
};

RehearsalCard.defaultProps = {
  rObj: PropTypes.shape({
    id: '',
    date: '',
    time: '',
    location: '',
    show: '',
    message: '',
    band: '',
    set: '',
    author: '',
  }),

};
