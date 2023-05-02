import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';

import { initializeApp } from 'firebase/app';
import { collection, query, onSnapshot, addDoc, doc, getDoc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from './firestore';

// Replace with your own Firebase app config

// Initialize Firebase



function TableWithFilter({ docs, filter }) {
   const filteredDocs = docs.filter((doc) => {
    //if (filter === 'all') return true;
    if (filter === 'approved') return doc.approved;
    if (filter === 'unapproved') return !doc.approved;
    return false;
  });

 return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Account ID</th>
          <th>Account Name</th>
          {filter === 'unapproved' && <th>Acceptance Status</th>}
          <th>Date</th>
          <th>Post Reference</th>
          {filter === 'approved' && <th>Acceptance Status</th>}
        </tr>
      </thead>
      <tbody>
        {filteredDocs?.map((doc) => (
          <tr key={Math.random()}>
            <td>{doc.jeNumber}</td>
            <td>{doc.user}</td>
            {filter === 'unapproved' && <td>{doc.approved ? 'Approved' : 'Unapproved'}</td>}
            <td>{(doc.dateTime)}</td>
            <td>{doc.pr}</td>
            {filter === 'approved' && <td>{doc.approved ? 'Approved' : 'Unapproved'}</td>}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export  function FilterSearch() {
  const [filter, setFilter] = useState('all');
  const [docs, loading, error] = useCollectionData(
    collection(db, "journalEntries"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [rejectedDocs, rejectedLoading, rejectedError] = useCollectionData(
    collection(db, "rejected_journals"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  if (loading || rejectedLoading) {
    return <div>Loading...</div>;
  }

  if (error || rejectedError) {
    return <div>Error: {error || rejectedError}</div>;
  }

  return (
    <div>
      <div>
        
        <button onClick={() => setFilter('approved')}>Approved</button>
        <button onClick={() => setFilter('unapproved')}>Unapproved</button>
      </div>
      {filter === 'unapproved' ? (
        <TableWithFilter docs={rejectedDocs} filter={filter} />
      ) : (
        <TableWithFilter docs={docs} filter={filter} />
      )}
    </div>
  );
}
