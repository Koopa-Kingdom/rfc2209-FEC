import React, {useState, useEffect} from 'react';
import Images from './Images.jsx';

// Sub-component for AnswerList: AnswerEntry
const AnswerEntry = ({answer, handleAnswerHelpful}) => {
  // console.log('Inside answer entry', answer);
  const [report, setReport] = useState(false);
  const [helpfulness, setHelpfulness] = useState(false);
  const [helpCount, setHelpCount] = useState(answer.helpfulness);

  let helpful = false;
  // Helper function to toggle helpfulness flag and pass data to parent function
  const handleClickHelpfulness = () => {
    // helpful = !helpful;

    /* Pseudocode-ish
    Once the user clicks on 'Yes', send a PUT request to server. The server will keep track of the answer.id and a boolean will be set to false. In the server, any repeat PUT requests to the same answer id will be handled to just return the boolean instead of sending another PUT request. On the client side, I'll use the boolean to disable the link to upvote the helpfulness.
    */
    !helpfulness && setHelpCount(helpCount + 1);
    // The helpfulness state should be set to the boolean sent back by the server
    setHelpfulness(true);
    handleAnswerHelpful(answer.id, helpful);
  };

  // Send PUT request to report this answer
  const handleClickReport = () => {
    setReport(true);
    console.log(`You have reported answer ${answer.id} to admin`);
  };
  // Format date into readable format for user
  const formatDate = (date) => {
    return new Date(`${date}`).toDateString().slice(3);
  };

  const answerStyle = {
    margin: '10px 30px 0 30px',
    padding: '0 0 10px 0',
    borderBottom: '1px solid rgba(0, 0, 0, 0.4)'
  };
  const answerer = {
    fontStyle: 'italic',
    fontSize: '12px',
    margin: '30px 0 0 0',
    color: 'black'
  };

  return (
    <div style={answerStyle}>
      {answer.body} <br/>
      { (answer.photos.length > 0) &&
      <Images images={answer.photos} />}
      <span style={answerer}>
        by {answer.answerer_name}, {formatDate(answer.date)} | Helpful?
        {!helpfulness ?
          (<a href='javascript:null' onClick={handleClickHelpfulness}> Yes </a> ) : <span> Voted </span>}

        ({helpCount}) |
        {!report ?
          <a href='javascript:null' onClick={handleClickReport}> Report </a> :
          <span> Reported </span>}
      </span>
    </div>
  );
};

export default AnswerEntry;