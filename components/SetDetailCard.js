/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function SetCard({ setObj }) {
  return (
    <>
      <Card className="dc" style={{ width: '75rem' }}>
        <Card.Body style={{ backgroundColor: 'rgb(184, 231, 184)' }}>
          <Card.Text style={{ fontSize: '50px' }}>
            {setObj.title}
          </Card.Text>
          <div>
            <h4>- songs:</h4>
          </div>
          <div>
            <h4>- notes:</h4>
            <h3 style={{ marginLeft: '4rem' }}>{setObj.note}</h3>
          </div>
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
    band: PropTypes.number,
    author: PropTypes.number,
  }),
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
