import {
  Box,
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Image,
} from "@chakra-ui/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "../hook/useDebounce";
import { useNavigate } from "react-router-dom";

export function SearchModal({ isOpen, setOpenToggle }) {
  const [searchedValue, setSearchedValue] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false); // Loading holati
  const { debouncedValue } = useDebounce(searchedValue);
  const navigate = useNavigate();

  const fetchSearchData = async () => {
    if (!searchedValue.trim()) {
      setMovieData([]);
      return;
    }

    setLoading(true);
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchedValue}`;
    const options = {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGE0OGYyNGNlMWRjZmU3YTI2YTA1YmU3YTNhYmEzZSIsIm5iZiI6MTcwNzExMjEyNi43NzMsInN1YiI6IjY1YzA3NmJlNDM5OTliMDE4NGM5ODllOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._uGk-QvvbXMxib7CyStOVycDVbZ4Zhg_74K2PkCsXMQ",
      },
    };

    try {
      const { data, status } = await axios.get(url, options);
      if (status === 200 || status === 201) {
        setMovieData(data.results);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchData();
  }, [debouncedValue]);

  return (
    <Modal
      size={["sm", "md", "lg", "xl", "2xl"]}
      isOpen={isOpen}
      onClose={() => setOpenToggle(false)}
      closeOnOverlayClick={false}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="auto"
        backdropBlur="20px"
      />
      <ModalContent>
        <ModalHeader>
          <InputGroup>
            <InputLeftElement>
              <FontAwesomeIcon icon={faSearch} />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="Film qidirish"
              onChange={(e) => setSearchedValue(e.target.value)}
              cursor="pointer"
            />
          </InputGroup>
        </ModalHeader>
        <ModalBody>
          <Flex flexDir="column" gap="5">
            {loading && (
              <Flex py={5} justify="center">
                <Spinner
                  size="xl"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                />
              </Flex>
            )}
            {!loading &&
              movieData.map((item) => (
                <Flex
                  key={item.id}
                  gap="5"
                  alignItems="center"
                  border="1px solid rgba(0,0,0,0.2)"
                  p="3"
                  borderRadius="10px"
                  boxShadow="2xl"
                  userSelect="none"
                  cursor="pointer"
                  _hover={{
                    bgColor: "rgba(0,0,0,0.1)",
                    transform: "translateY(-7px)",
                    transition: "0.2s",
                  }}
                  onClick={() =>
                    navigate(
                      `/films/${item?.title
                        ?.toLowerCase()
                        .replace(/ /g, "-")}-${item?.id}
                      }`
                    )
                  }
                >
                  <Box
                    width="300px"
                    height="100px"
                    boxShadow="2xl"
                    borderRadius="20px"
                    overflow="hidden"
                  >
                    <Image
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      src={
                        item.backdrop_path
                          ? `https://image.tmdb.org/t/p/original/${item.backdrop_path}`
                          : "https://via.placeholder.com/300x100" // Zaxira rasm
                      }
                      alt={item.original_title || "No Image"}
                    />
                  </Box>
                  <Box>
                    <Text fontSize="2rem" fontWeight="800" as="h1">
                      {item.original_title}
                    </Text>
                    <Text>{item.overview}</Text>
                  </Box>
                </Flex>
              ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
