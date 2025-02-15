import Auth from '../utils/auth';

const retrieveUsers = async () => {
  try {
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      if (response.status === 403 || response.status === 401) {
        Auth.logout();
      } else {
          throw new Error('Could not invalid API response, check network tab!');
      }
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

export { retrieveUsers };
