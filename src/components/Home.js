import styled from "styled-components";
import ImgSlier from "./ImgSlider";
import { Viewers } from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";

export const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    const moviesCollection = collection(db, "movies");
    const q = query(moviesCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let recommends = [];
      let newDisneys = [];
      let originalsMovies = [];
      let trendingMovies = [];

      snapshot.docs.forEach((doc) => {
        switch (doc.data().type) {
          case "recommend":
            // recommends.push({ id: doc.id, ...doc.data() });
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;
          case "new":
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            // newDisneys.push({ id: doc.id, ...doc.data() });
            break;
          case "original":
            originalsMovies = [
              ...originalsMovies,
              { id: doc.id, ...doc.data() },
            ];
            break;
          case "trending":
            trendingMovies = [...trendingMovies, { id: doc.id, ...doc.data() }];
            // trendingMovies.push({ id: doc.id, ...doc.data() });
            break;
          default:
            break;
        }
      });

      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisneys,
          original: originalsMovies,
          trending: trendingMovies,
        })
      );
    });

    // Cleanup function to unsubscribe from the firestore collection when the component unmounts
    return () => unsubscribe();
  }, [userName, dispatch]); // Include dispatch in the dependency array if it could potentially change

  return (
    <Container>
      <ImgSlier />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
export default Home;
