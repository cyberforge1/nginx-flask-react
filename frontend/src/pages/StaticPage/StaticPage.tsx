// src/pages/StaticPage/StaticPage.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMainMessage } from '../../api/api';

const StaticPage: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('Welcome');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const fetchedMessage = await getMainMessage();
        setMessage(fetchedMessage);
        setError(null);
      } catch {
        setError('Failed to load the message. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessage();
  }, []);

  const redirectToForm = () => {
    navigate('/form');
  };

  return (
    <div data-testid="static-page">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <h1>{message}</h1>
      )}
      <button onClick={redirectToForm} aria-label="Go to Form">
        Go to Form
      </button>
    </div>
  );
};

export default StaticPage;
