import { useState, useEffect } from 'react';

export const useData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      const filteredData = data.docs.map((item) => ({
        authorName: item.name,
        subject: item.top_subjects[0],
        birthDate: item.birth_date,
        topWork: item.top_work,
      }));
      setData(filteredData);
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, loading };
};