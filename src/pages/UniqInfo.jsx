import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./uniqInfo.css";

export function UniqInfo() {
  const [getUniqInfo, setGetUniqInfo] = useState({});
  const [getSimilarFromInfo, setGetSimilarFormInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { filmID } = useParams();
  let newNumbers = [];
  filmID
    .split("")
    .forEach((e) =>
      String(Number(e)) === "NaN" ? Number(e) : newNumbers.push(e)
    );
  console.log(newNumbers.join(""));

  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGE0OGYyNGNlMWRjZmU3YTI2YTA1YmU3YTNhYmEzZSIsIm5iZiI6MTcwNzExMjEyNi43NzMsInN1YiI6IjY1YzA3NmJlNDM5OTliMDE4NGM5ODllOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._uGk-QvvbXMxib7CyStOVycDVbZ4Zhg_74K2PkCsXMQ",
    },
  };

  const getUniqInfoFormApi = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${newNumbers.join("")}`,
        options
      );
      setGetUniqInfo(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const getSimilarInfo = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${newNumbers.join("")}/similar`,
        options
      );
      setGetSimilarFormInfo(data);
      console.log(data);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUniqInfoFormApi();
    getSimilarInfo();
  }, []);
  console.log(getSimilarFromInfo);

  if (loading) {
    return <div className="loading-message">Yuklanmoqda...</div>;
  }

  if (error) {
    return <div className="error-message">Xatolik yuz berdi: {error}</div>;
  }

  return (
    <div className="container">
      <h2 className="title">{getUniqInfo.original_title}</h2>
      <p className="info">
        <strong>Nomi:</strong> {getUniqInfo.title}
      </p>
      <p className="info">
        <strong>Tavsifi:</strong> {getUniqInfo.overview}
      </p>
      <p className="info">
        <strong>Chiqarilgan sana:</strong> {getUniqInfo.release_date}
      </p>
      <p className="info">
        <strong>Reyting:</strong> {getUniqInfo.vote_average}
      </p>
      <p className="info">
        <strong>Ovoz beruvchilar soni:</strong> {getUniqInfo.vote_count}
      </p>
      <img
        className="poster"
        src={`https://image.tmdb.org/t/p/w500${getUniqInfo.poster_path}`}
        alt={getUniqInfo.title}
      />
    </div>
  );
}
