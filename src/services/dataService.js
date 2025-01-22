const recordsPathLocation = 'https://gist.githubusercontent.com/budi6969420/976f9232253a0e4886287b0dceec62c9/raw';

const getAllAvailableDays = async () => {
    try {
      const response = await fetch(recordsPathLocation)
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return [];
    }
  };
  
  const getRecordByDate = async (date) => {
    try {
      const response = await fetch(recordsPathLocation);
      const data = await response.json();
      const record = data.find(record => record.date === date);
      return record || null;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  };
  
  export default {
    getAllAvailableDays,
    getRecordByDate
  };