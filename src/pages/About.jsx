import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Image, Text, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  A11y,
  Controller,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";

export function About() {
  const [filmsData, setFilmsData] = useState([]);
  const [upcomingDataFilm, setUpcomingData] = useState([]);
  const [top_ratedOptionsFilim, setTop_ratedOptionsFilim] = useState([]);
  const navigate = useNavigate();
  const url =
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGE0OGYyNGNlMWRjZmU3YTI2YTA1YmU3YTNhYmEzZSIsIm5iZiI6MTcwNzExMjEyNi43NzMsInN1YiI6IjY1YzA3NmJlNDM5OTliMDE4NGM5ODllOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._uGk-QvvbXMxib7CyStOVycDVbZ4Zhg_74K2PkCsXMQ",
    },
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(url, options);
      setFilmsData(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const upcomingUrl = "https://api.themoviedb.org/3/movie/upcoming";

  const upcomingOptions = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGE0OGYyNGNlMWRjZmU3YTI2YTA1YmU3YTNhYmEzZSIsIm5iZiI6MTcwNzExMjEyNi43NzMsInN1YiI6IjY1YzA3NmJlNDM5OTliMDE4NGM5ODllOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._uGk-QvvbXMxib7CyStOVycDVbZ4Zhg_74K2PkCsXMQ",
    },
  };

  const upcomingData = async () => {
    try {
      const { data } = await axios.get(upcomingUrl, upcomingOptions);
      setUpcomingData(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const top_ratedUrl = "https://api.themoviedb.org/3/movie/top_ratednp";

  const top_ratedOptions = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGE0OGYyNGNlMWRjZmU3YTI2YTA1YmU3YTNhYmEzZSIsIm5iZiI6MTcwNzExMjEyNi43NzMsInN1YiI6IjY1YzA3NmJlNDM5OTliMDE4NGM5ODllOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._uGk-QvvbXMxib7CyStOVycDVbZ4Zhg_74K2PkCsXMQ",
    },
  };

  const top_ratedOptionsData = async () => {
    try {
      const { data } = await axios.get(top_ratedUrl, top_ratedOptions);
      setTop_ratedOptionsFilim(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    upcomingData();
    top_ratedOptionsData();
  }, []);
  console.log(upcomingDataFilm);

  return (
    <>
      <Box w="full" p={4}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <Box className="films-container">
            {top_ratedOptionsFilim.map((film) => (
              <SwiperSlide key={film.id}>
                <VStack
                  className="film-card"
                  spacing={4}
                  p={4}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  boxShadow="md"
                  transition="transform 0.3s"
                  _hover={{
                    transform: "scale(1.05)",
                    boxShadow: "lg",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(
                      `/films/${film?.title?.toLowerCase()}-${film?.id}
                      }`
                    )
                  }
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${film.backdrop_path}`}
                    alt={film.title}
                    borderRadius="md"
                    objectFit="cover"
                    width="100%"
                    height="700px"
                    border="1px solid"
                    borderColor="gray.200"
                    boxShadow="md"
                    transition="transform 0.3s"
                  />
                </VStack>
              </SwiperSlide>
            ))}
          </Box>
        </Swiper>
      </Box>
      <Heading as="h3" sizi="md">
        Popular Kino
      </Heading>
      <Box w="full" p={4}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <Box className="films-container">
            {filmsData.map((film) => (
              <SwiperSlide key={film.id}>
                <VStack
                  className="film-card"
                  spacing={4}
                  p={4}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  boxShadow="md"
                  transition="transform 0.3s"
                  _hover={{
                    transform: "scale(1.05)",
                    boxShadow: "lg",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(
                      `/films/${film?.title?.toLowerCase()}-${film?.id}-${
                        film?.overview
                      }`
                    )
                  }
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                    alt={film.title}
                    borderRadius="md"
                  />
                  <Heading as="h3" size="md" textAlign="center">
                    {film.title}
                  </Heading>
                  <Text
                    noOfLines={3}
                    textAlign="center"
                    fontSize="sm"
                    color="gray.600"
                  >
                    {film.overview}
                  </Text>
                </VStack>
              </SwiperSlide>
            ))}
          </Box>
        </Swiper>
      </Box>
      <Heading as="h3" sizi="md">
        Kelgusi kinolar
      </Heading>
      <Box w="full" p={4}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <Box className="films-container">
            {upcomingDataFilm.map((film) => (
              <SwiperSlide key={film.id}>
                <VStack
                  className="film-card"
                  spacing={4}
                  p={4}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  boxShadow="md"
                  transition="transform 0.3s"
                  _hover={{
                    transform: "scale(1.05)",
                    boxShadow: "lg",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(
                      `/films/${film?.title?.toLowerCase()}-${film?.id}-${
                        film?.overview
                      }`
                    )
                  }
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                    alt={film.title}
                    borderRadius="md"
                  />
                  <Heading as="h3" size="md" textAlign="center">
                    {film.title}
                  </Heading>
                  <Text
                    noOfLines={3}
                    textAlign="center"
                    fontSize="sm"
                    color="gray.600"
                  >
                    {film.overview}
                  </Text>
                </VStack>
              </SwiperSlide>
            ))}
          </Box>
        </Swiper>
      </Box>
    </>
  );
}
