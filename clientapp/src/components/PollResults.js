import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useParams } from 'react-router-dom';
import { Card, ListGroup, ProgressBar, Container } from 'react-bootstrap';

const PollResults = () => {
  const { pollId } = useParams();  // Get pollId from the URL
  const [options, setOptions] = useState([]);

  // Fetch initial poll results when the component loads
  useEffect(() => {
    if (!pollId) return;  // Check if pollId is defined

    const fetchInitialResults = async () => {
      try {
        const response = await fetch(`http://localhost:5261/api/polls/${pollId}/results`);
        if (response.ok) {
          const data = await response.json();
          setOptions(data);  // Set initial poll results
        } else {
          console.error('Failed to fetch initial poll results.');
        }
      } catch (error) {
        console.error('Error fetching poll results:', error);
      }
    };

    fetchInitialResults();

    // Create a SignalR connection to listen for real-time updates
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5261/voteHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.start()
      .then(() => {
        console.log('Connected to the SignalR hub');
        
        // Listen for real-time vote updates
        connection.on("ReceiveVoteUpdate", (updatedPollId, updatedOptions) => {
            if (updatedPollId === parseInt(pollId)) {
                console.log('Message received');

            setOptions(updatedOptions);  // Update results with real-time data
          }
        });
      })
      .catch(err => console.error('Error connecting to SignalR hub:', err));

    return () => {
      // Clean up the SignalR connection when the component is unmounted
      connection.stop();
    };
  }, [pollId]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Poll Results</h2>
      <Card>
        <Card.Body>
          <ListGroup>
            {options.map(option => (
              <ListGroup.Item key={option.id}>
                <div className="d-flex justify-content-between">
                  <span>{option.text}</span>
                  <span>{option.votes} votes</span>
                </div>
                <ProgressBar 
                  now={(option.votes / Math.max(...options.map(o => o.votes))) * 100} 
                  label={`${option.votes}`} 
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PollResults;
