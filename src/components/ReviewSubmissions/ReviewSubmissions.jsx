import React, { useState } from 'react';
import {useSelector} from 'react-redux';

function ReviewSubmissions() {
  const store = useSelector((store) => store);

  return (
    <div>
      <h2>Review Submissions</h2>
    </div>
  );
}

export default ReviewSubmissions;