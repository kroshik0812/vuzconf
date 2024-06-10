import React from 'react';
import { useParams } from 'react-router-dom';
import ConferenceDetails from '../components/ConferenceDetails';

const ConferencePage = () => {
  const { university } = useParams();
  return <ConferenceDetails university={university} />;
};

export default ConferencePage;
