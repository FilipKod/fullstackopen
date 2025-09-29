const Notification = ({ notification }) => {
  if (notification === null || Object.keys(notification).length === 0)
    return null;

  return (
    <div className={`notification ${notification.status}`}>
      {notification.message}
    </div>
  );
};
export default Notification;
