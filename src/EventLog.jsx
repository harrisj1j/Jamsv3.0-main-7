import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import { collection, query, onSnapshot, addDoc,doc,getDoc } from 'firebase/firestore';
import { db } from './firestore';

export const EventLog = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'accounts')), (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const account = change.doc.data();
        const accountId = change.doc.id;
        const timestamp = moment().format();
        let eventType, beforeImage, afterImage;

        if (change.type === 'added') {
          eventType = 'Account Added';
          afterImage = JSON.stringify(account);
        } else if (change.type === 'modified') {
          eventType = 'Account Modified';
          const oldAccountSnapshot = await getDoc(doc(db, 'accounts', accountId));
          const oldAccount = oldAccountSnapshot.data();
          beforeImage = JSON.stringify(oldAccount);
          afterImage = JSON.stringify(account);
        } else if (change.type === 'removed') {
          eventType = 'Account Removed';
          beforeImage = JSON.stringify(account);
        }

        await addDoc(collection(db, 'events'), {
          account_id: accountId,
          event_type: eventType,
          timestamp,
          before_image: beforeImage,
          after_image: afterImage,
        });
      });
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      <h1>Event Log</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Event Type</th>
            <th>Timestamp</th>
            <th>Before Image</th>
            <th>After Image</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.account_id}</td>
              <td>{event.event_type}</td>
              <td>{moment(event.timestamp).format('LLL')}</td>
              <td>{event.before_image}</td>
              <td>{event.after_image}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
