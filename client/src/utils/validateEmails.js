const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default emails => {
  const invalidEmailsArray = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => regex.test(email) === false); // pass regex test means valid

  if (invalidEmailsArray.length) {
    return `These emails are invalide ${invalidEmailsArray}`;
  }

  return null;
};
